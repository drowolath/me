import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">
          Selected projects
        </h2>
        <div className="mt-10 flex flex-col divide-y divide-rule">
          {projects.map((project) => {
            const body = (
              <>
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className={
                      project.href
                        ? "text-xl underline decoration-rule underline-offset-4 group-hover:decoration-accent"
                        : "text-xl"
                    }
                  >
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {project.href
                      ? project.href
                          .replace("https://github.com/", "")
                          .replace(/^https?:\/\//, "")
                          .replace(/\/$/, "")
                      : "private"}
                  </span>
                </div>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <p className="mt-3 font-mono text-xs text-accent">
                    {project.tags.join("  ·  ")}
                  </p>
                )}
              </>
            );

            return project.href ? (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group py-7 first:pt-0"
              >
                {body}
              </a>
            ) : (
              <div key={project.name} className="py-7 first:pt-0">
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
