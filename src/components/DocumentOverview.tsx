import React from 'react';
import { Building2, Calendar, FileBadge, CheckCircle, Info } from 'lucide-react';

interface DocumentOverviewProps {
  documentType: string;
  issuingOrganization: string | null;
  documentDate: string | null;
  summary: string[];
  limitations: string[];
}

export function DocumentOverview({
  documentType,
  issuingOrganization,
  documentDate,
  summary,
  limitations,
}: DocumentOverviewProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      {/* Top Metadata Badges */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300">
          <FileBadge className="h-4 w-4 text-purple-400" />
          <span>{documentType}</span>
        </div>

        {issuingOrganization && (
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-300">
            <Building2 className="h-4 w-4 text-zinc-400" />
            <span>{issuingOrganization}</span>
          </div>
        )}

        {documentDate && (
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-300">
            <Calendar className="h-4 w-4 text-zinc-400" />
            <span>{documentDate}</span>
          </div>
        )}
      </div>

      {/* Plain English Summary */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <span>Plain English Summary</span>
        </h3>
        <p className="text-xs text-zinc-400">
          The core takeaways from this document without administrative jargon:
        </p>

        <div className="space-y-2.5 pt-2">
          {summary.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-3.5"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                <CheckCircle className="h-3.5 w-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations note */}
      {limitations && limitations.length > 0 && (
        <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-300/90">
          <div className="flex items-center gap-2 font-semibold text-amber-300 mb-1">
            <Info className="h-4 w-4" />
            <span>Analysis Notes &amp; Limitations</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px] mt-1.5">
            {limitations.map((lim, i) => (
              <li key={i}>{lim}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
