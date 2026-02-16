import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="ReformLogic" className="h-6 w-6" />
          <span className="text-sm text-slate-400">ReformLogic</span>
        </div>

        <nav className="flex items-center space-x-6 text-sm text-slate-500">
          <Link href="/churches" className="transition-colors hover:text-indigo-400">Churches</Link>
          <Link href="/commercial" className="transition-colors hover:text-emerald-400">Commercial</Link>
          <Link href="/portfolio" className="transition-colors hover:text-slate-300">Portfolio</Link>
          <Link href="/about" className="transition-colors hover:text-slate-300">About</Link>
          <Link href="/contact" className="transition-colors hover:text-slate-300">Contact</Link>
        </nav>

        <p className="text-sm text-slate-600">© 2026 ReformLogic</p>
      </div>
    </footer>
  );
}
