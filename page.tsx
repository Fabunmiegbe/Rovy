import Navbar from "@/components/Navbar";
import Link from "next/link";

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-10 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-brass">{n}</span>
        <h2 className="font-display text-2xl text-paper">{title}</h2>
      </div>
      <div className="mt-5 max-w-prose space-y-4 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function Whitepaper() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-wide text-brass">
          Rovyn — Whitepaper — v1.0
        </p>
        <h1 className="mt-4 font-display text-4xl text-paper">
          The Rovyn field log
        </h1>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
          This document explains what Rovyn is, how the mint works, where the
          money goes, and what to expect after launch. It is written to be
          read before you mint, not after.
        </p>

        <Section n="01" title="What Rovyn is">
          <p>
            Rovyn is a fixed-supply collection of 5,555 ERC-721 tokens
            deployed on Robinhood Chain, an Ethereum-compatible Layer 2 built
            on the Arbitrum Orbit stack. Each token — a "waypoint" — is a
            unique piece of generated art with its own trait combination and
            rank, recorded permanently on-chain.
          </p>
          <p>
            There is no companion token. Rovyn is a collectible NFT project.
            Nothing in this document should be read as an offer of
            securities, a promise of price appreciation, or investment
            advice.
          </p>
        </Section>

        <Section n="02" title="Supply and mint mechanics">
          <ul className="list-disc space-y-2 pl-5">
            <li>Total supply: 5,555 waypoints, hard-capped in the contract.</li>
            <li>Mint price: 0.01 ETH per waypoint, paid in ETH (Robinhood Chain's gas token).</li>
            <li>Per-wallet limit: 5 waypoints, enforced on-chain.</li>
            <li>Team/community reserve: 100 waypoints, minted separately from the public sale for giveaways and contributor allocations.</li>
            <li>No allowlist or presale tiers — the public mint is the only mint.</li>
          </ul>
          <p>
            Metadata is unrevealed at mint and switches to the final,
            ranked artwork once the collection sells out or the team
            triggers reveal manually — whichever comes first.
          </p>
        </Section>

        <Section n="03" title="Where mint proceeds go">
          <p>
            Mint proceeds are held in the contract until withdrawn by the
            project wallet. There is no automatic liquidity pool seeded from
            mint funds, because Rovyn does not have a token — proceeds fund
            three things, in order of priority:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Ongoing hosting and metadata costs for the collection.</li>
            <li>Artist and contributor payments for the reserved allocation.</li>
            <li>Treasury reserve for the Landmark and Horizon waypoints described in the roadmap.</li>
          </ol>
          <p>
            The withdrawal address and any treasury movements will be shared
            with holders through the project's official channels once the
            mint concludes.
          </p>
        </Section>

        <Section n="04" title="Contract and chain details">
          <div className="border border-line bg-panel/60 p-5 font-mono text-xs">
            <dl className="space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Network</dt>
                <dd className="text-paper">Robinhood Chain (mainnet)</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Chain ID</dt>
                <dd className="text-paper">4663</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Token standard</dt>
                <dd className="text-paper">ERC-721</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Contract address</dt>
                <dd className="text-paper">To be published at deploy time</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Explorer</dt>
                <dd className="text-paper">robinhoodchain.blockscout.com</dd>
              </div>
            </dl>
          </div>
          <p>
            Always verify the contract address against the project's
            official channels before minting. This whitepaper will be
            updated with the live address the moment the contract is
            deployed and verified.
          </p>
        </Section>

        <Section n="05" title="Roadmap">
          <p>
            Full detail lives on the <Link href="/#roadmap" className="text-brass underline underline-offset-4">route page</Link>.
            In short: Bearings and Departure cover setup and the public mint.
            Open route covers reveal and secondary trading. Landmark and
            Horizon are funded from the treasury reserve described above and
            depend on where the collection stands after mint — they are
            intentions, not commitments with dates attached.
          </p>
        </Section>

        <Section n="06" title="Risks">
          <ul className="list-disc space-y-2 pl-5">
            <li>Robinhood Chain is a new network; bridges, RPC providers, and tooling are still maturing.</li>
            <li>Secondary market liquidity for Rovyn is not guaranteed and depends entirely on organic demand.</li>
            <li>NFT prices are volatile and can go to zero. Only mint with funds you can afford to lose.</li>
            <li>Smart contracts, even audited ones, can contain bugs. Interact with the contract at your own risk.</li>
          </ul>
        </Section>

        <Section n="07" title="Contact">
          <p>
            Official links will be posted on the project's mint page as they
            go live. Treat any account, link, or DM not linked from
            rovyn.xyz as unverified.
          </p>
        </Section>
      </div>
    </main>
  );
}
