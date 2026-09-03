const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <a href="#" className="font-mono text-xs tracking-widest uppercase">
          T.A.
        </a>
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/thomas-ayih-akakpo-resume.pdf"
              download
              className="font-mono text-xs text-accent underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
