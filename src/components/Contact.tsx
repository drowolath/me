import { contact } from "@/lib/content";

const links = [
  { label: "Email", href: `mailto:${contact.email}`, value: contact.email },
  { label: "LinkedIn", href: contact.linkedin, value: "in/thomasayihakakpo" },
  { label: "GitHub", href: contact.github, value: "@drowolath" },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">
          Contact
        </h2>
        <p className="mt-6 text-2xl leading-snug italic">
          Let&apos;s fix what&apos;s structurally weak.
        </p>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          A creaking integration, a data architecture that needs stabilizing,
          or a role where it matters — let&apos;s talk.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-baseline gap-3"
            >
              <span className="w-20 font-mono text-xs text-muted">
                {link.label}
              </span>
              <span className="underline decoration-rule underline-offset-4 group-hover:decoration-accent">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
