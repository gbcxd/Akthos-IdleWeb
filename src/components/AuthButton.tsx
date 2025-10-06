'use client';

import Image from 'next/image';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

export default function AuthButton() {
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  async function handleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error('Sign-in failed', e);
      alert('Sign-in failed. Check console for details.');
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      setOpen(false);
    } catch (e) {
      console.error('Sign-out failed', e);
      alert('Sign-out failed. Check console for details.');
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
        Checking…
      </div>
    );
  }

  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        className="rounded-xl bg-sky-600 px-3 py-1.5 text-sm font-medium hover:bg-sky-500"
      >
        Sign in with Google
      </button>
    );
  }

  // Logged in
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm hover:bg-white/10"
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
        ) : (
          <div className="h-5 w-5 rounded-full bg-slate-700" />
        )}
        <span className="max-w-[120px] truncate">{user.displayName ?? 'Player'}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 text-sm shadow-xl backdrop-blur">
            <div className="px-3 py-2 text-xs text-slate-400">{user.email}</div>
            <button
              onClick={handleSignOut}
              className="block w-full px-3 py-2 text-left hover:bg-white/5"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
