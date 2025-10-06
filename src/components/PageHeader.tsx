'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';


export type Crumb = { label: string; href?: string };


export default function PageHeader({
title,
subtitle,
breadcrumbs,
actions,
children,
}: {
title: string;
subtitle?: string;
breadcrumbs?: Crumb[];
actions?: ReactNode;
children?: ReactNode; // optional extra row (tabs, filters)
}) {
return (
<div className="mb-6 rounded-2xl border border-white/5 bg-gradient-to-b from-slate-900/60 to-slate-950 p-4 shadow">
{/* Breadcrumbs */}
{breadcrumbs && breadcrumbs.length > 0 && (
<nav className="mb-2 flex items-center gap-1 text-xs text-slate-400">
{breadcrumbs.map((c, i) => (
<span key={i} className="flex items-center">
{c.href ? (
<Link href={c.href} className="hover:text-slate-200">
{c.label}
</Link>
) : (
<span className="text-slate-400">{c.label}</span>
)}
{i < breadcrumbs.length - 1 && (
<ChevronRight className="mx-1 h-3 w-3 opacity-60" />
)}
</span>
))}
</nav>
)}


{/* Title row */}
<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
<div>
<h1 className="text-2xl font-bold leading-tight">{title}</h1>
{subtitle && (
<p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
)}
</div>
{actions && <div className="flex items-center gap-2">{actions}</div>}
</div>


{children && <div className="mt-4">{children}</div>}
</div>
);
}