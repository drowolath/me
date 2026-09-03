import { achievements } from "@/lib/content";

export default function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">
          Key achievements
        </h2>
        <div className="mt-10 flex flex-col divide-y divide-rule">
          {achievements.map((a) => (
            <div key={a.title} className="flex flex-col gap-1 py-5 first:pt-0">
              <h3 className="text-lg">{a.title}</h3>
              <p className="max-w-xl leading-relaxed text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
