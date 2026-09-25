---
title: "Building a Zero Allocation Streaming Engine"
date: "2026-09-25"
description: "Why fixed-memory allocation is critical for low-latency payment processing, and how to build an O(1) Ring Buffer."
tags: ["Architecture", "System Design", "Python", "Performance", "Streaming"]
featuredImage: "/images/posts/zero-allocation-engine.png"
draft: false
---

Lately I wanted to take on building a real-time payment processing and fraud detection system.
As per custom, in these agentic days, I hoped on my keyboard and frantically started drafting what could be the product requirements and architecture before handing it to AI and start prompting back and forth. Then I remembered [No sloptober](https://no-sloptober.com/), and while we're still not there yet, I convinced myself to give it a try (at least for some of the core components).


## 1. The itch

Now, where to start ? What does real-time payment processing involve ? Is fraud detection a separate concern ? Did I feed the dogs already ?

Focus. Take a notebook and a pen, dumb it down.

Dumb it down until the hype fades away and only the raw constraints remain. Let's just start with the basics : someone pays, and somehow we receive a bunch of information and we want to detect fraud. What are we actually trying to do here? We're not building microservices for the sake of it, nor are we fine-tuning LLMs just yet.

When you strip away the visual interfaces, the fancy dashboards with live updating numbers, and the architectural buzzwords, you're left with one fundamental job: evaluate incoming transactions against rules and metrics as fast as humanly possible, without crashing the underlying infrastructure.

Rules like: How many transactions failed in the last 15 minutes? What's the total volume for this account in the past hour? Did a particular account attempt an insane amount of transactions in a short period ?

In payment processing and fraud engineering, they call these **Velocity Checks**:
  - *“How many failed payment attempts occurred on this card in the last 3 minutes?”* (Card testing / Bot attack)
  - *“Has this account transferred more than $10,000 across multiple micro-transactions in the past 24 hours?”* (AML / Structuring)
  - *“What is the failure rate of this merchant over the last 15 minutes?”* (Circuit breaker)

Now this implies that your system is able to process each transaction as it arrives. Every single transaction, evaluated, triggers an aggregation query over sliding time windows, meaning your state is constantly moving, expanding, and evicting items in real time.

Rings a bell...I've seen this before...Something to do with memory, and memory not being freed up properly...Keeping data in memory indefinitely and crashing stuff.

Oh! Yes! **Memory thrashing**. You do know what it is, but I'll try to illustrate it anyway :

Imagine an accountant at a desk:
  - Their desk surface (RAM) is small: it can only hold 2 folders at a time.
  - Their filing cabinet at the end of the hallway (Disk / SWAP) holds 100 folders.

If a project suddenly requires working across 10 folders simultaneously:
  - They grab 2 folders from the cabinet, walk back to their desk, and read a single line.
  - To read the next folder, they have to get up, walk down the hall, archive one folder, and pull out another.

Very quickly, they spend 99% of their workday pacing back and forth along the hallway and only 1% actually getting work done.

That’s memory thrashing; not the act of swapping itself, but the systemic collapse where swap traffic completely dominates, and almost no real work gets done because the working set is simply too large for the desk.

Sure, you could buy a bigger desk (scaling up RAM) to fit the working set. But a better accountant doesn't buy a larger desk, they change how they process paperwork. Instead of pulling full folders, they keep a single pre-printed tally sheet on their desk, overwriting old numbers as time ticks by. No walking down the hallway, no wasted space.

Coming back to velocity checks. In practice, this means calculating indicators over continuous streams of payment events by answering questions in real time. This brings us directly to **time-windowed metrics**.

Most of the time, to do that kind of calculation, I'd rely on one of the following patterns :
  1. **SQL:** Executing expensive `SUM()` or `COUNT()` queries over sliding window intervals on a live transactional database.
  2. **Dynamic allocation:** Continuously instantiating, appending, and evicting objects in-memory to hold short-lived sliding window state.

While the second approach moves computation off the database, it introduces a subtle, devastating side effect in high-throughput environments: **Garbage Collection (GC) pressure**. When millions of ephemeral objects are created and discarded every minute, GC pauses can cause severe *p99 latency spikes* (well it's rarely the pause alone; it's the cascade as the system catches up). In a payments pipeline, a latency spike isn't just a nuisance; it's a failed transaction, a dropped web-hook, or a degraded user experience.

## 2. Why Zero Allocation ?

To achieve sub-millisecond, predictable latency under heavy load, we must shift our mental model from **dynamic state creation** to **static footprint orchestration**.

The core philosophy of a Zero-Allocation engine is simple: allocate all required memory once during application startup, and never allocate or release memory on the critical hot path again.

Instead of creating short-lived data structures for every incoming payment event, we pre-allocate a fixed, contiguous block of memory at boot time: never grow, never shrink, and operate within a completely deterministic, pre-allocated memory envelope.

When a new event arrives:
  - We do not call new or instantiate objects.
  - We do not push items onto dynamic slices or lists.
  - We overwrite existing memory slots directly in-place.

By forcing the runtime to work with a fixed memory envelope, the Garbage Collector has virtually nothing to sweep or compact during execution.

## 3. How to put it in practice ?

Let's imagine a streaming pipeline ingesting payment events from a payment gateway.

The following schema to represent an event is quite common:

```json
{
  "event_id": "9f8a3c1e-2b4a-4d3e-8f1a-5b2c3d4e5f6a",
  "account_id": "ACC-84920",
  "timestamp": 1790265600,  // unix timestamp in seconds
  "amount": 25000.0,
  "currency": "MGA",
  "status": "COMPLETED",      
  "channel": "USSD"           
}
```

We ingest those events, one by one. Upon ingesting each incoming event, the system must instantly provide for instance:
  - **Total cumulative volume** (for `COMPLETED` transactions only) over a **15-minute sliding window**.
  - **Top 3 accounts** with the highest count of `FAILED` transactions within that same 15-minute window.

Let's keep in mind the zero-allocation thinking: we need to use a structure that can store all events in a contiguous block of memory, for the given 15-minute sliding window.

Rephrasing it, we need three properties that standard dynamic structures cannot give us simultaneously:
  - **Contiguous memory allocation** allocated once at startup.
  - **O(1) append and eviction** without re-indexing or shifting elements in memory.
  - **Fixed spatial bounds** so memory usage remains strictly constant over time, whether we process 10 or 10,000,000 events.

You got it! A ring buffer, or circular buffer, is the perfect data structure for this job.

By wrapping a fixed array onto itself using modular arithmetic, time becomes a circle. As the present advances, the future overwrites the past in-place.

Look:
  - **Time Discretization:** Instead of recording every transaction individually, we aggregate events into time slots (e.g., 10-second buckets).
  - **Fixed Size:** For a 15-minute (900 seconds) sliding window with 10-second granularity, we need exactly 90 buckets.
  - **Circular Mapping:** As time ticks forward, an index wraps around the fixed array using modular arithmetic:
  <div align="center">
  
  `bucket_index = (floor(event_timestamp / bucket_size)) % total_buckets`
  
  </div>
  
There you have it: declare an array of size `total_buckets` allocated at boot time. 
  
However, mapping time to a ring buffer introduces a classic edge case: two timestamps separated by exactly the duration of the sliding window (e.g., 900 seconds) will map to the exact same bucket index. To solve this without reallocating memory, each bucket must track its active time window and perform a reset whenever an outdated bucket is accessed.
  
Here is how I would structure the engine and its buckets:
  
  ```python
  from dataclasses import dataclass, field
  from typing import Dict
  
  @dataclass
  class Bucket:
      window_start: int = -1
      total_volume: float = 0.0
      failed_counts: Dict[str, int] = field(default_factory=dict)
  
      def reset(self, new_window_start: int) -> None:
          """Wipe metrics in-place when a new time cycle begins."""
          self.window_start = new_window_start
          self.total_volume = 0.0
          self.failed_counts.clear()
  
  class StreamingMetricsEngine:
      def __init__(self, window_seconds: int = 900, bucket_size: int = 10):
          self.window_seconds = window_seconds
          self.bucket_size = bucket_size
          self.total_buckets = self.window_seconds // self.bucket_size
          self.buckets: list[Bucket] = [Bucket() for _ in range(self.total_buckets)]
```

## 4. Handling the real world : Chronological Event Ordering

Now that we know how to map time to buckets, we need to handle the real world. Because, ideally, our events will arrive in a strict chronological order. In payment engineering, network reality makes that assumption moot.

A payment callback triggered 8 minutes ago might land on your ingestion pipeline after a transaction that occurred 2 seconds ago.

If your streaming engine blindly assumes `event_timestamp` is always increasing, a late event will either corrupt your current bucket metrics or cause a full state recalculation.

Our ring Buffer handles late events deterministically in O(1) constant time using two concepts: the High-Water Mark and Bounded Bucket Lookups.

Think back to our accountant standing now in front of a circular wheel with **exactly 90 physical slots (numbered 0 to 89)**. Each slot represents a **10-second window**, combining to hold a total 15-minute sliding period.

Here is how High-Water Mark (HWM) and Bounded Bucket Lookups work.

1. **First event:**
   On startup, the wheel is empty and his mechanical wall clock is set to 0.
   A receipt arrives dated **02:00:05 PM**. The accountant inspects the receipt's timestamp, sees it is greater than his wall clock (0), and bumps his clock forward to **02:00:05 PM** setting his initial High-Water Mark (HWM). His active 15-minute window is now set to `01:45:05`–`02:00:05 PM`.
   He calculates the index: `(02:00:05 // 10) % 90` => **Slot #0**, tags it `02:00:00 PM`, and logs the amount.

2. **Time Progression & Reset:**
   Events pour in over the next 15 minutes, filling slots 1 through 89. 
   At **02:15:02 PM**, a new receipt arrives:
   - He inspects the receipt's timestamp (`02:15:02 PM`), sees it exceeds his current wall clock (`02:14:50 PM`), and advances his **HWM to 02:15:02 PM**. The active window slides to `02:00:02`–`02:15:02 PM`.
   - Index math points back to **Slot #0**. Checking Slot #0, he reads its tag: `02:00:00 PM`. Since `02:00:00` is older than the window boundary (`02:00:02 PM`), the slot has expired.
   - **Lazy Reset:** He wipes Slot #0 clean, updates its tag to `02:15:00 PM`, and records the new transaction.

3. **Out-of-Order Resiliency:**
   A delayed receipt arrives dated **02:05:30 PM**.
   - Inspecting the receipt (`02:05:30 PM`), he sees it does **not** exceed his clock (`02:15:02 PM`). The clock stays put.
   - Since `02:05:30 PM` falls within his active window (`02:00:02`–`02:15:02 PM`), it's a valid late event.
   - Index math points to **Slot #33**. He uses Slot #33 to add the transaction in-place.

4. **Bounded Bucket Lookup:**
   When the CEO asks for the last 15-minutes metrics, the accountant doesn't iterate over individual transaction receipts.

   He simply iterates over the **exact 90 slots of the wheel**, sums their pre-aggregated totals in $O(B)$ time, and delivers the metrics instantly.

> A quick note, regarding the number of slots: if your watermark is at `t = 905`, your 900-second sliding window covers the range `]5, 905]`.
> The most recent slot spans 900 to 910. The oldest slot still partially valid spans 0 to 10.

> Between 0 and 900, that represents exactly **91 overlapping 10-second slots**.

> If you cap the buffer at 90 slots, an incoming event at timestamp 905 resolves to index `idx = (905 // 10) % 90 = 0`. It immediately overwrites the t = 0 slot, destroying valid historical metrics covering the ]5, 10] sub-interval before they expire.

> **The verdict:** Scaling to **91 slots** is mandatory if you want to retain 100% of the active 900-second window without premature modulo eviction.

## 5. Putting it all together

I couldn't resist the idea of a good old [Claude's Artifact](/artifacts/zero-allocation-ring-buffer.html) to illustrate my code. 

## 6. Conclusion

By replacing dynamic sliding-window allocations with a pre-allocated Ring Buffer, we eliminate the primary bottleneck of high-throughput streaming engines: unpredictable memory allocation and GC churn.

I'll continue exploring real-time payment processing and fraud detection systems, and no doubt, those rabbit holes will yield more deep dives like this one.

To summarize the key engineering takeaways from this implementation:

- **O(1) Ingestion, O(B) Aggregation:** Event ingestion executes in true constant time regardless of throughput, while metric queries remain strictly bounded by B buckets rather than stream cardinality.
- **Zero GC Overhead:** Lazy slot eviction via in-place resets avoids dynamic object creation/destruction, pinning the heap footprint.
- **CPython Realities:** While `sorted()` outpaces `heapq.nlargest()` for top-k extraction at typical cardinalities, the unified Ring Buffer architecture ensures p99 latency determinism under heavy load.
