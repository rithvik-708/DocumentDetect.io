import React from 'react';
import { CheckCircle2, Clock, ShieldAlert, Languages, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onLoadSample: () => void;
}

export function HeroSection({ onLoadSample }: HeroSectionProps) {
  const documentTypes = [
    'University Circulars',
    'Exam Notices & Admit Cards',
    'Tax & Compliance Letters',
    'Bank Notifications',
    'Government Orders',
    'Legal Agreements',
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-12 sm:pb-16 text-center">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-600/10 blur-3xl" />

      {/* Pill header */}
      <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1 text-xs font-medium text-purple-300 mb-6">
        <span>✨ Built for Sarvam Campus &apos;26 HackCulture</span>
      </div>

      {/* Main Headline */}
      <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Stop wrestling with <span className="gradient-text">bureaucratic jargon</span>.
      </h1>

      {/* Subheadline */}
      <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
        Upload complex notices, circulars, or official forms. Document Decoder
        digitizes the text, isolates deadlines, clarifies ambiguous clauses, and
        turns complicated legalese into an actionable checklist.
      </p>

      {/* Supported Documents Badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-zinc-500 font-medium">Supported documents:</span>
        {documentTypes.map((type) => (
          <span
            key={type}
            className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-400"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Quick feature highlights grid */}
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 text-left sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
          <Languages className="h-5 w-5 text-purple-400 mb-2" />
          <h2 className="text-xs font-semibold text-zinc-200">Plain English</h2>
          <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
            Translates obscure clauses into simple terms anyone can understand.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
          <Clock className="h-5 w-5 text-amber-400 mb-2" />
          <h2 className="text-xs font-semibold text-zinc-200">Deadlines Isolated</h2>
          <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
            Never miss registration cutoff dates, submission limits, or penalties.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 mb-2" />
          <h2 className="text-xs font-semibold text-zinc-200">Action Checklist</h2>
          <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
            Interactive, prioritized task list directly derived from requirements.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
          <ShieldAlert className="h-5 w-5 text-rose-400 mb-2" />
          <h2 className="text-xs font-semibold text-zinc-200">Missing Info Flagged</h2>
          <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
            Highlights ambiguous fees, unmentioned venues, or absent guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
