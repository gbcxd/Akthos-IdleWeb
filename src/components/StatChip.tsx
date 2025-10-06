'use client';
export function StatChip({ label, value }: { label: string; value: string | number }) {
return (
<div className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">
<span className="mr-1 text-slate-400">{label}</span>
<span className="font-semibold text-slate-200">{value}</span>
</div>
);
}