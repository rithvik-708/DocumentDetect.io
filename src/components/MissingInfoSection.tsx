import React from 'react';
import { MissingInfo } from '@/lib/types';
import { HelpCircle, AlertTriangle } from 'lucide-react';

interface MissingInfoSectionProps {
  missingInfo: MissingInfo[];
}

export function MissingInfoSection({ missingInfo }: MissingInfoSectionProps) {
  if (!missingInfo || missingInfo.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400" />
            <span>Missing or Ambiguous Information</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Key details left unspecified by the issuing authority that require your verification.
          </p>
        </div>
        <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-xs font-medium text-rose-400">
          {missingInfo.length} Items
        </span>
      </div>

      <div className="space-y-3">
        {missingInfo.map((info, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4"
          >
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300">
              <HelpCircle className="h-4 w-4" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-semibold text-rose-200">
                  {info.item}
                </h4>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {info.confidence} confidence
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                {info.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
