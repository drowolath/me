"use client";

import { useState } from "react";

const links = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="/" className="font-mono text-xs tracking-widest uppercase">
          T.A.
        </a>

        <ul className="hidden items-center gap-6 md:flex">
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="font-mono text-xs text-muted transition-colors hover:text-accent md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-rule px-6 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/thomas-ayih-akakpo-resume.pdf"
              download
              className="block py-2 font-mono text-xs text-accent underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
