import { education, languages } from "@/lib/content";

export default function Background() {
  return (
    <section id="background" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">
          Education & languages
        </h2>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div>
            <h3 className="font-mono text-xs text-accent">Education</h3>
            <div className="mt-2 flex flex-col gap-1">
              {education.map((e) => (
                <p key={e.degree} className="leading-relaxed">
                  {e.degree}
                  <span className="text-muted"> — {e.school}, {e.period}</span>
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-mono text-xs text-accent">Languages</h3>
            <p className="mt-2 leading-relaxed">{languages.join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
