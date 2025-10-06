'use client';
import TimerCard from '@/components/TimerCard';
import StatCard from '@/components/StatCard';
import { usePlayerStore } from '@/stores/usePlayerStore';


export default function Page(){
const start = usePlayerStore(s => s.startCookingTuna);
const name = usePlayerStore(s => s.name);
const level = usePlayerStore(s => s.level);


return (
<main className="mx-auto max-w-5xl p-6 space-y-6">
<header className="flex items-center justify-between">
<h1 className="text-3xl font-bold">{name}</h1>
<button onClick={start} className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500">Start Cooking</button>
</header>


<section className="grid grid-cols-2 md:grid-cols-4 gap-4">
<StatCard title="Combat Level" value={level} />
<StatCard title="Gold" value={15470} />
<StatCard title="Diamonds" value={160} />
<StatCard title="Total Level" value={434} />
</section>


<TimerCard />
</main>
);
}