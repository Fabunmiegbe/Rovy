import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b rule">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12.5" stroke="#C9A24B" strokeWidth="1" />
            <path d="M14 5 L16.5 12.5 L14 23 L11.5 12.5 Z" fill="#C9A24B" />
            <circle cx="14" cy="14" r="1.6" fill="#12151A" stroke="#C9A24B" />
          </svg>
          <span className="font-display text-lg tracking-tight text-paper">Rovyn</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/#mint" className="hover:text-paper">Mint</Link>
          <Link href="/#roadmap" className="hover:text-paper">Route</Link>
          <Link href="/whitepaper" className="hover:text-paper">Whitepaper</Link>
          <a href="#" className="hover:text-paper">Gallery</a>
        </nav>
        <a
          href="/#mint"
          className="rounded-sm border border-brass/60 px-4 py-2 text-sm text-brass transition hover:bg-brass hover:text-ink"
        >
          Connect wallet
        </a>
      </div>
    </header>
  );
}
