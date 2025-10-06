// src/components/Sidebar.tsx
'use client';

import AuthButton from '@/components/AuthButton';
import { usePlayerStore } from '@/stores/usePlayerStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Diamond,
  Flame,
  Sword,
  Pickaxe,
  Fish,
  CookingPot,
  Hammer,
  Brain,
  Shield,
  Home,
  Package,
  Map,
  Crown,
  ScrollText,
} from 'lucide-react';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400/70">
        {title}
      </div>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );
}

function Item({
  href,
  icon: Icon,
  label,
  badge,
}: {
  href: string;
  icon: React.ComponentType<any>;
  label: string;
  badge?: string | number;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 ${
        active ? 'bg-white/10 text-sky-300' : 'text-slate-300'
      }`}
    >
      <Icon className="h-4 w-4 opacity-80" />
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] leading-none text-slate-300">
          {badge}
        </span>
      )}
    </Link>
  );
}

function Group({
  icon: Icon,
  label,
  children,
  defaultOpen = false,
}: {
  icon: React.ComponentType<any>;
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5"
      >
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        <Icon className="h-4 w-4 opacity-80" />
        <span>{label}</span>
      </button>

      {open && (
        <div className="ml-7 mt-1 space-y-1 border-l border-white/5 pl-3">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden ${open ? 'block' : 'hidden'}`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={`fixed z-50 h-full w-72 shrink-0 overflow-y-auto border-r border-white/5 bg-slate-950 px-3 py-4 transition-transform md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand/profile tile */}
        <div className="flex items-center gap-3 px-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500/20 text-orange-300 ring-1 ring-inset ring-orange-300/30">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">gAbeN</div>
            <div className="text-[11px] text-slate-400">Total Lv 434</div>
          </div>
        </div>

        <Section title="You">
          <Item href="/character" icon={Home} label="Character" />
          <Item href="/inventory" icon={Package} label="Inventory" />
        </Section>

        <Section title="Play">
          <Group icon={Diamond} label="Skills" defaultOpen>
            <Item href="/skills/woodcutting" icon={AxeIcon} label="Woodcutting" badge={29} />
            <Item href="/skills/mining" icon={Pickaxe} label="Mining" badge={36} />
            <Item href="/skills/fishing" icon={Fish} label="Fishing" badge={35} />
            <Item href="/skills/alchemy" icon={CookingPot} label="Alchemy" badge={8} />
            <Item href="/skills/smelting" icon={Hammer} label="Smelting" badge={15} />
            <Item href="/skills/cooking" icon={CookingPot} label="Cooking" badge={25} />
            <Item href="/skills/forge" icon={Hammer} label="Forge" badge={12} />
            <Item href="/skills/meditation" icon={Brain} label="Meditation" badge={1} />
          </Group>

          <Group icon={Sword} label="Combat">
            <Item href="/combat/battle" icon={Sword} label="Battle" />
            <Item href="/combat/dungeons" icon={Map} label="Dungeons" />
            <Item href="/combat/world-bosses" icon={Crown} label="World Bosses" />
          </Group>
        </Section>

        <Section title="Meta">
          <Item href="/quests" icon={ScrollText} label="Quests" />
          <Item href="/market" icon={Package} label="Market" />
          <Item href="/museum" icon={Diamond} label="Museum" />
          <Item href="/effects" icon={Shield} label="Active Effects" badge={5} />
        </Section>
      </aside>
    </>
  );
}

// Simple axe icon (fallback)
function AxeIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 3l7 7" />
      <path d="M10 7l7 7" />
      <path d="M5 21l6-6" />
      <path d="M7 9l-4 4 8 8 4-4z" />
    </svg>
  );
}
