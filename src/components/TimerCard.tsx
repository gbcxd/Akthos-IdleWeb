'use client';
import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { nowMs } from '@/lib/time';
import { getActionProgress } from '@/core/engine';
import { saveActiveAction, loadActiveAction } from '@/lib/persist';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function TimerCard() {
  const action   = usePlayerStore((s) => s.activeAction);
  const clear    = usePlayerStore((s) => s.clearAction);
  const hydrate  = usePlayerStore((s) => s.hydrate);

  const [tick, setTick] = useState(0);

  // Hydrate from Firestore whenever auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const a = await loadActiveAction();
        hydrate(a);
      } else {
        hydrate(undefined);
      }
    });
    return () => unsub();
  }, [hydrate]);

  // Local render tick
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 250);
    return () => clearInterval(id);
  }, []);

  if (!action)
    return (
      <div className="rounded-2xl bg-slate-900/60 p-4">
        <div className="font-medium">No active action</div>
        <div className="text-sm text-slate-400">Choose something to do.</div>
      </div>
    );

  const { pct, remaining } = getActionProgress(nowMs(), action);
  const sec = Math.ceil(remaining / 1000);

  async function handleCollect() {
    clear();
    await saveActiveAction(undefined); // persist clear
    // TODO: grant items/XP server-side
  }

  return (
    <div className="rounded-2xl bg-slate-900/60 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-medium">Cooked Tuna</div>
        <div className="text-sm text-slate-400">{Math.max(0, sec)}s</div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div className="h-2 bg-sky-500" style={{ width: `${Math.min(100, pct * 100)}%` }} />
      </div>

      {pct >= 1 && (
        <button onClick={handleCollect} className="text-sm text-sky-300 underline">
          Collect
        </button>
      )}
    </div>
  );
}
