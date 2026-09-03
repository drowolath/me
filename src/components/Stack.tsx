import { stack } from "@/lib/content";

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">
          Stack
        </h2>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-12">
          {stack.map((group) => (
            <div key={group.group}>
              <h3 className="font-mono text-xs text-accent">{group.group}</h3>
              <p className="mt-2 leading-relaxed">{group.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
