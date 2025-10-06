'use client';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth } from '@/lib/firebase';
import type { TimerAction } from '@/core/types';

export async function saveActiveAction(action: TimerAction | undefined) {
  const user = auth.currentUser;
  if (!user) return;
  const ref = doc(db, 'users', user.uid, 'state', 'current');
  await setDoc(ref, { activeAction: action ?? null }, { merge: true });
}

export async function loadActiveAction(): Promise<TimerAction | undefined> {
  const user = auth.currentUser;
  if (!user) return undefined;
  const ref = doc(db, 'users', user.uid, 'state', 'current');
  const snap = await getDoc(ref);
  const data = snap.data();
  return (data?.activeAction ?? undefined) as TimerAction | undefined;
}
