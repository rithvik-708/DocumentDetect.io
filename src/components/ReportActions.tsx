'use client';

import React, { useState } from 'react';
import { AnalysisResult } from '@/lib/types';
import {
  copyToClipboard,
  generateSummaryText,
  generateChecklistText,
  downloadReport,
} from '@/lib/export';
import { Copy, Check, Download, RotateCcw } from 'lucide-react';

interface ReportActionsProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export function ReportActions({ analysis, onReset }: ReportActionsProps) {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  const handleCopySummary = async () => {
    const text = generateSummaryText(analysis);
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  const handleCopyChecklist = async () => {
    const text = generateChecklistText(analysis);
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedChecklist(true);
      setTimeout(() => setCopiedChecklist(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadReport(analysis);
  };

  return (
    <div className="sticky bottom-4 z-30 mx-auto max-w-4xl px-4">
      <div className="glass-panel-glow flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3.5 sm:p-4 shadow-2xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload New Document</span>
            <span className="sm:hidden">New Doc</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Summary */}
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            {copiedSummary ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Summary Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          {/* Copy Checklist */}
          <button
            type="button"
            onClick={handleCopyChecklist}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            {copiedChecklist ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Checklist Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span>Copy Checklist</span>
              </>
            )}
          </button>

          {/* Download Report */}
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-xl gradient-accent px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-600/20 hover:opacity-95 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Report (.md)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
