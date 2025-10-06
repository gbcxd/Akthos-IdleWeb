'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useEffect } from 'react';
import { syncServerTime } from '@/lib/time';


export default function AppShell({ children }: { children: React.ReactNode }) {
const [open, setOpen] = useState(false);

useEffect(() => { syncServerTime(); }, []);
return (
<div className="min-h-screen bg-slate-950 text-slate-100">
{/* Mobile top bar */}
<div className="sticky top-0 z-40 flex items-center gap-3 border-b border-white/5 bg-slate-950/80 px-4 py-3 backdrop-blur md:hidden">
<button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-xl border border-white/10 px-3 py-2 text-sm">Menu</button>
<div className="font-semibold">Akthos Idle</div>
</div>


<div className="mx-auto flex w-full max-w-[1400px]">
{/* Sidebar */}
<Sidebar open={open} onClose={() => setOpen(false)} />


{/* Main */}
<main className="flex-1 p-4 md:p-6 lg:p-8">
{children}
</main>
</div>
</div>
);
}