const waypoints = [
  {
    label: "Bearings",
    status: "done",
    detail: "Contract audited internally, unrevealed art set, wallet on Robinhood Chain funded for gas.",
  },
  {
    label: "Departure",
    status: "done",
    detail: "Mint opens at 0.01 ETH. Five per wallet. No allowlist — first transaction, first served.",
  },
  {
    label: "Open route",
    status: "active",
    detail: "Full collection revealed. Secondary trading opens on Robinhood Chain venues.",
  },
  {
    label: "Landmark",
    status: "upcoming",
    detail: "Holder-gated drop for a second, smaller waypoint set. Details shared to holders first.",
  },
  {
    label: "Horizon",
    status: "upcoming",
    detail: "Cross-chain bridge exploration and listing outreach beyond Robinhood Chain.",
  },
];

const statusStyle: Record<string, string> = {
  done: "bg-brass border-brass",
  active: "bg-ink border-brass",
  upcoming: "bg-ink border-line",
};

export default function RoadmapTrail() {
  return (
    <div id="roadmap" className="relative">
      <div className="absolute left-0 right-0 top-[9px] h-px waypoint-line md:top-[9px]" />
      <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
        {waypoints.map((w) => (
          <li key={w.label} className="relative pl-6 md:pl-0">
            <div
              className={`absolute left-0 top-1 h-[18px] w-[18px] rounded-full border-2 md:static md:mb-4 ${statusStyle[w.status]}`}
            />
            <h4 className="font-display text-lg text-paper">{w.label}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{w.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
