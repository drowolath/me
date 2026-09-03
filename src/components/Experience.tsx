import { experience } from "@/lib/content";

export default function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">
          Experience
        </h2>
        <div className="mt-10 flex flex-col divide-y divide-rule">
          {experience.map((role) => (
            <div
              key={`${role.company}-${role.period}`}
              className="flex flex-col gap-1 py-6 first:pt-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl">
                  {role.role} <span className="text-muted">· {role.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted">
                  {role.period}
                </span>
              </div>
              <p className="mt-1 max-w-xl leading-relaxed text-muted">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
