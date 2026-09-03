import { method } from "@/lib/content";

export default function Method() {
  return (
    <section id="approach" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">
          How I work
        </h2>
        <div className="mt-10 flex flex-col">
          {method.map((m, i) => (
            <div
              key={m.step}
              className={`flex gap-6 py-6 ${i !== 0 ? "border-t border-rule" : ""}`}
            >
              <span className="font-mono text-sm text-accent">{m.step}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl italic">{m.title}</h3>
                <p className="max-w-xl leading-relaxed text-muted">
                  {m.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
