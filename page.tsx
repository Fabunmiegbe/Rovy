import Navbar from "@/components/Navbar";
import MintPanel from "@/components/MintPanel";
import RoadmapTrail from "@/components/RoadmapTrail";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-brass">
              Robinhood Chain · 4663
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-paper md:text-6xl">
              5,555 waypoints.
              <br />
              One open route.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Rovyn is a fixed-supply collection minted directly on Robinhood
              Chain. No allowlist, no presale tiers — a wallet, a mint
              transaction, a waypoint.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#mint"
                className="bg-brass px-6 py-3 text-sm font-medium text-ink transition hover:bg-brass-dim"
              >
                Mint a waypoint
              </a>
              <Link
                href="/whitepaper"
                className="border border-line px-6 py-3 text-sm text-paper transition hover:border-brass"
              >
                Read the whitepaper
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 220 220" className="w-56 md:w-72">
              <circle cx="110" cy="110" r="100" stroke="#2A3038" strokeWidth="1" fill="none" />
              <circle cx="110" cy="110" r="70" stroke="#2A3038" strokeWidth="1" fill="none" />
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const x1 = 110 + Math.cos(angle) * 100;
                const y1 = 110 + Math.sin(angle) * 100;
                const x2 = 110 + Math.cos(angle) * 94;
                const y2 = 110 + Math.sin(angle) * 94;
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2A3038" strokeWidth="1" />
                );
              })}
              <path d="M110 40 L124 110 L110 180 L96 110 Z" fill="#C9A24B" />
              <path d="M40 110 L110 96 L180 110 L110 124 Z" fill="#6E8CA0" opacity="0.6" />
              <circle cx="110" cy="110" r="6" fill="#12151A" stroke="#C9A24B" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>

      {/* Mint */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-2xl text-paper md:text-3xl">
              The mint is the manifest.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Every waypoint minted is logged on-chain in the order it's
              claimed. There's no hidden reserve beyond the 100 pieces set
              aside for the team and future giveaways — everything else is
              first come, first served at a flat price.
            </p>
          </div>
          <MintPanel />
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display text-2xl text-paper md:text-3xl">The route so far</h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Five waypoints from setup to secondary trading. No promised
            price targets — just what's shipped and what's next.
          </p>
          <div className="mt-14">
            <RoadmapTrail />
          </div>
        </div>
      </section>

      {/* Whitepaper teaser */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-paper md:text-3xl">
                Read the full log before you mint.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Supply breakdown, treasury handling, the contract address once
                it's live, and what holding a Rovyn waypoint actually gets
                you. No promised returns — this is a collectible, not a
                security.
              </p>
              <Link
                href="/whitepaper"
                className="mt-6 inline-block border border-brass/60 px-6 py-3 text-sm text-brass transition hover:bg-brass hover:text-ink"
              >
                Open whitepaper
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Rovyn. Collectible NFT project. No promised returns. DYOR.</p>
          <div className="flex gap-6">
            <Link href="/whitepaper" className="hover:text-paper">Whitepaper</Link>
            <a href="#" className="hover:text-paper">Contract ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
