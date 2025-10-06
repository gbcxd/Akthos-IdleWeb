"use client"
import PageHeader from "@/components/PageHeader";
import { StatChip } from "@/components/StatChip";
import { usePlayerStore } from "@/stores/usePlayerStore";

export default function Page() {
  const combat = usePlayerStore(s => s.combatLevel);
  const total = usePlayerStore(s => s.totalLevel);
  return (
    <div>
      <PageHeader
        title="Fishing"
        subtitle="Catch fish for food & XP"
        breadcrumbs={[ { label: "Home", href: "/" }, { label: 'Skills' }, { label: 'Fishing' } ]}
        actions={
          <div className="flex gap-2">
            <StatChip label="Combat Lv" value={combat} />
            <StatChip label="Total Lv" value={total} />
          </div>
        }
      />
      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4">
        Content coming soon
      </div>
    </div>
  );
}