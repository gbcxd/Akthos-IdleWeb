export default function StatCard({ title, value }: { title: string; value: string|number; }){
return (
<div className="rounded-2xl bg-slate-900/60 p-4 shadow">
<div className="text-slate-400 text-sm">{title}</div>
<div className="text-2xl font-semibold">{value}</div>
</div>
);
}