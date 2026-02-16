import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center space-x-3">
          <img src="/logo.svg" alt="ReformLogic" className="h-6 w-6" />
          <span className="text-sm tracking-wide text-slate-200 transition-colors group-hover:text-indigo-400">
            ReformLogic
          </span>
        </Link>

        <div className="flex items-center space-x-6 text-sm uppercase tracking-wide">
          <Link href="/churches" className="hidden text-slate-500 transition-colors hover:text-indigo-400 sm:inline">
            Churches
          </Link>
          <Link href="/commercial" className="hidden text-slate-500 transition-colors hover:text-emerald-400 sm:inline">
            Commercial
          </Link>
          <Link href="/portfolio" className="text-slate-500 transition-colors hover:text-slate-300">
            Portfolio
          </Link>
          <Link href="/about" className="hidden text-slate-500 transition-colors hover:text-slate-300 sm:inline">
            About
          </Link>
          <Link href="/contact" className="text-slate-500 transition-colors hover:text-slate-300">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
