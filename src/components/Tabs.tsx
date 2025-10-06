'use client';
import { ReactNode, useState } from 'react';


export function Tabs({ tabs }: { tabs: { key: string; label: string; content: ReactNode }[] }) {
const [active, setActive] = useState(tabs[0]?.key);
const activeTab = tabs.find((t) => t.key === active);
return (
<div>
<div className="flex gap-1">
{tabs.map((t) => (
<button
key={t.key}
onClick={() => setActive(t.key)}
className={`rounded-xl px-3 py-1.5 text-sm transition-colors ${
t.key === active ? 'bg-sky-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
}`}
>
{t.label}
</button>
))}
</div>
<div className="mt-3 rounded-xl border border-white/5 bg-slate-900/40 p-3">
{activeTab?.content}
</div>
</div>
);
}