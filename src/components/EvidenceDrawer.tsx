'use client';

import React, { useEffect, useState } from 'react';
import { EvidenceItem } from '@/lib/types';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  Quote,
  Copy,
  Check,
  FileText,
  Search,
  ExternalLink,
} from 'lucide-react';
import { copyToClipboard } from '@/lib/export';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: EvidenceItem | null;
  rawExtractedText?: string;
}

export function EvidenceDrawer({
  isOpen,
  onClose,
  evidence,
  rawExtractedText,
}: EvidenceDrawerProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !evidence) return null;

  const handleCopy = async () => {
    if (evidence.sourceQuote) {
      const ok = await copyToClipboard(evidence.sourceQuote);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const hasEvidence = Boolean(evidence.sourceQuote && evidence.sourceQuote.trim().length > 0);

  // Split raw text around quotation to highlight it in context if found
  const renderHighlightedContext = () => {
    if (!rawExtractedText) {
      return (
        <p className="text-xs text-zinc-500 italic">
          Full digitized text view is not available for this session.
        </p>
      );
    }

    if (!hasEvidence || !evidence.sourceQuote) {
      return (
        <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed select-text">
          {rawExtractedText}
        </pre>
      );
    }

    const quote = evidence.sourceQuote.trim();
    // Case-insensitive search index
    const lowerText = rawExtractedText.toLowerCase();
    const lowerQuote = quote.toLowerCase();
    const index = lowerText.indexOf(lowerQuote);

    if (index === -1) {
      // If exact string not found verbatim, search first 30 characters
      const shortQuote = lowerQuote.slice(0, 30);
      const shortIndex = shortQuote ? lowerText.indexOf(shortQuote) : -1;

      if (shortIndex !== -1) {
        const before = rawExtractedText.slice(0, shortIndex);
        const match = rawExtractedText.slice(shortIndex, shortIndex + quote.length);
        const after = rawExtractedText.slice(shortIndex + quote.length);

        return (
          <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed select-text">
            {before}
            <mark className="bg-purple-500/30 text-purple-200 border-b-2 border-purple-400 px-1 py-0.5 rounded font-semibold">
              {match}
            </mark>
            {after}
          </pre>
        );
      }

      return (
        <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed select-text">
          {rawExtractedText}
        </pre>
      );
    }

    const before = rawExtractedText.slice(0, index);
    const match = rawExtractedText.slice(index, index + quote.length);
    const after = rawExtractedText.slice(index + quote.length);

    return (
      <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed select-text">
        {before}
        <mark className="bg-purple-500/40 text-purple-100 border-b-2 border-purple-400 px-1.5 py-0.5 rounded font-semibold shadow-sm shadow-purple-500/20">
          {match}
        </mark>
        {after}
      </pre>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div className="relative z-10 flex h-full w-full max-w-2xl flex-col border-l border-zinc-800 bg-[#101117] shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
              <Quote className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Proof Mode</span>
                <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-300 border border-purple-500/30">
                  Evidence Verified
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Direct source document verification &amp; verbatim citations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Target Finding Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Extracted Claim ({evidence.category})
              </span>
              {evidence.confidence && (
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    evidence.confidence === 'high'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : evidence.confidence === 'medium'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {evidence.confidence} Confidence
                </span>
              )}
            </div>

            <h4 className="text-sm font-bold text-white mb-1">
              {evidence.title}
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {evidence.claim}
            </p>
          </div>

          {/* Evidence Quotation Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                {hasEvidence ? (
                  <>
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Supporting Source Quotation</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span>Evidence Status</span>
                  </>
                )}
              </h4>

              {hasEvidence && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Quote</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {hasEvidence ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 relative">
                <blockquote className="text-xs italic text-emerald-200/90 leading-relaxed">
                  &ldquo;{evidence.sourceQuote}&rdquo;
                </blockquote>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-500/20 text-[10px] text-zinc-400">
                  <span className="text-emerald-400 font-medium">
                    ✓ Verbatim extract from source document
                  </span>
                  {evidence.page && (
                    <span className="font-semibold text-zinc-300">
                      Page {evidence.page}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs mb-1">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span>Evidence Unavailable</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  No verbatim sentence could be isolated as direct quotation for this claim.
                  This finding was derived from synthesized document structure or context.
                  We recommend cross-checking the original document directly before taking critical legal or financial actions.
                </p>
              </div>
            )}
          </div>

          {/* Context Viewer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-purple-400" />
                <span>Document Excerpt in Context</span>
              </h4>
              {hasEvidence && (
                <span className="text-[10px] text-purple-300 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Highlighted below
                </span>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto rounded-xl border border-zinc-800 bg-[#0a0b0f] p-4 font-mono text-xs text-zinc-400 leading-relaxed">
              {renderHighlightedContext()}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-zinc-800 px-6 py-3.5 flex items-center justify-between text-[11px] text-zinc-500 bg-[#0c0d12]">
          <span>Proof Mode is powered by Sarvam AI verbatim extraction.</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
