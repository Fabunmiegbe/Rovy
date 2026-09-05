# Rovyn

A 5,555-piece NFT collection site and contract, built for Robinhood Chain
(chain ID 4663 mainnet, 46630 testnet).

## What's in here

- `app/`, `components/` — Next.js site: hero, mint panel, roadmap, whitepaper page
- `contracts/Rovyn.sol` — ERC-721 mint contract (OpenZeppelin-based)
- `hardhat.config.js`, `scripts/deploy.js` — deployment to Robinhood Chain
- `.env.example` — everything you need to fill in before deploying

## 1. Install

```bash
npm install
```

## 2. Configure before deploying

Copy `.env.example` to `.env` and fill in:

- `PRIVATE_KEY` — your deployer wallet's private key. **This wallet needs
  real ETH on Robinhood Chain mainnet to pay gas.** Never commit `.env`.
- `UNREVEALED_URI` — a URL to placeholder metadata JSON shown before reveal.

To change supply, price, per-wallet limit, or reserve size, edit the
constants at the top of `contracts/Rovyn.sol`:

```solidity
uint256 public constant MAX_SUPPLY = 5555;
uint256 public constant MAX_PER_WALLET = 5;
uint256 public mintPrice = 0.01 ether;
uint256 public reservedForOwner = 100;
```

## 3. Compile

```bash
npm run compile
```

## 4. Deploy

Testnet first is strongly recommended even though the plan is to go
straight to mainnet — it costs nothing and catches config mistakes before
they cost real ETH:

```bash
npm run deploy:testnet
```

Get testnet ETH from `faucet.testnet.chain.robinhood.com`. Once you've
confirmed mint, owner controls, and metadata all behave as expected:

```bash
npm run deploy:mainnet
```

This prints the deployed contract address. Put it in `.env` as
`NEXT_PUBLIC_ROVYN_CONTRACT_ADDRESS` so the frontend can find it.

## 5. Verify on Blockscout

```bash
npm run verify:mainnet -- <CONTRACT_ADDRESS> "<UNREVEALED_URI>" <YOUR_WALLET_ADDRESS>
```

## 6. Run the site

```bash
npm run dev
```

The mint panel in `components/MintPanel.tsx` is currently a static UI
shell — it shows price, supply, and quantity selection but isn't wired to
a wallet provider yet. To make it functional:

1. Get a WalletConnect Cloud project ID (free) if you want mobile wallet support.
2. Wire `wagmi`'s `useConnect` / `useWriteContract` hooks (already installed
   as a dependency) to the `mint(uint256)` function on the deployed
   contract, using the ABI from `artifacts/contracts/Rovyn.sol/Rovyn.json`
   after compiling.
3. Add Robinhood Chain as a custom chain in your wagmi config:
   - Chain ID: `4663`
   - RPC: `https://rpc.mainnet.chain.robinhood.com`
   - Explorer: `https://robinhoodchain.blockscout.com`

## 7. Deploy the site

This is a standard Next.js app — push to GitHub and import into Vercel,
same as your other projects. No special build steps beyond `npm install`.

## Before you open the mint publicly

- [ ] Contract deployed to mainnet and verified on Blockscout
- [ ] `NEXT_PUBLIC_ROVYN_CONTRACT_ADDRESS` set in Vercel env vars
- [ ] Wallet connection wired up and tested with a real Robinhood Chain wallet
- [ ] Unrevealed metadata live at the URL in `unrevealedURI`
- [ ] Whitepaper contract address section updated with the real address
- [ ] `setMintOpen(true)` called from the owner wallet when ready to go live
