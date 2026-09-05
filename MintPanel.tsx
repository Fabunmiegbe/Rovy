"use client";

import { useState } from "react";

const MINT_PRICE_ETH = "0.01";
const MAX_SUPPLY = 5555;
const MAX_PER_WALLET = 5;

export default function MintPanel() {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "connecting" | "minting">("idle");

  const total = (parseFloat(MINT_PRICE_ETH) * quantity).toFixed(3);

  return (
    <div id="mint" className="border border-line bg-panel/60 p-6 md:p-8">
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <h3 className="font-display text-xl text-paper">Claim a waypoint</h3>
        <span className="font-mono text-xs text-muted">Robinhood Chain · 4663</span>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-4 font-mono text-sm">
        <div>
          <dt className="text-muted">Price</dt>
          <dd className="mt-1 text-paper">{MINT_PRICE_ETH} ETH</dd>
        </div>
        <div>
          <dt className="text-muted">Supply</dt>
          <dd className="mt-1 text-paper">{MAX_SUPPLY.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-muted">Per wallet</dt>
          <dd className="mt-1 text-paper">{MAX_PER_WALLET}</dd>
        </div>
      </dl>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center border border-line">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-paper hover:bg-line/50"
          >
            −
          </button>
          <span className="w-10 text-center font-mono text-paper">{quantity}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(MAX_PER_WALLET, q + 1))}
            className="px-3 py-2 text-paper hover:bg-line/50"
          >
            +
          </button>
        </div>
        <span className="font-mono text-sm text-muted">= {total} ETH</span>
      </div>

      <button
        onClick={() => setStatus("connecting")}
        className="mt-6 w-full bg-brass py-3 text-sm font-medium text-ink transition hover:bg-brass-dim disabled:opacity-50"
      >
        {status === "idle" && "Connect wallet to mint"}
        {status === "connecting" && "Connecting..."}
        {status === "minting" && "Minting..."}
      </button>

      <p className="mt-4 text-xs text-muted">
        Minting is not yet live. This panel wires up to the deployed contract
        address in <code className="font-mono">NEXT_PUBLIC_ROVYN_CONTRACT_ADDRESS</code> —
        see the README for wiring it to your wallet provider of choice.
      </p>
    </div>
  );
}
