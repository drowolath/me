export default function Footer() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8 font-mono text-xs text-muted">
        <span>© {new Date().getFullYear()} Thomas Ayih-Akakpo</span>
        <span>thomas.ayih-akakpo.org</span>
      </div>
    </footer>
  );
}
