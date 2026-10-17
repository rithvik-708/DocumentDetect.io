'use client';

import React, { useState } from 'react';
import { KeyFact, EvidenceItem } from '@/lib/types';
import { Database, ChevronDown, ChevronUp, Quote, ShieldAlert, Sparkles } from 'lucide-react';

interface KeyFactsSectionProps {
  keyFacts: KeyFact[];
  onInspectEvidence?: (item: EvidenceItem) => void;
}

export function KeyFactsSection({ keyFacts, onInspectEvidence }: KeyFactsSectionProps) {
  const [expandedQuotes, setExpandedQuotes] = useState<Record<number, boolean>>({});

  const toggleQuote = (index: number) => {
    setExpandedQuotes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getConfidenceBadge = (confidence: 'high' | 'medium' | 'low') => {
    switch (confidence) {
      case 'high':
        return (
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
            High Confidence
          </span>
        );
      case 'medium':
        return (
          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400 border border-amber-500/20">
            Medium Confidence
          </span>
        );
      case 'low':
        return (
          <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-medium text-rose-400 border border-rose-500/20">
            Low Confidence
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Database className="h-4 w-4 text-purple-400" />
            <span>Extracted Key Facts</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Verified facts and parameters pulled directly from the document.
          </p>
        </div>
        <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
          {keyFacts.length} Facts
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {keyFacts.map((fact, index) => {
          const isExpanded = !!expandedQuotes[index];
          const hasQuote = Boolean(fact.sourceQuote && fact.sourceQuote.trim().length > 0);

          return (
            <div
              key={index}
              className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 transition-all hover:border-zinc-700/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-400">
                    {fact.label}
                  </span>
                  {getConfidenceBadge(fact.confidence)}
                </div>

                <p className="mt-1.5 text-sm sm:text-base font-semibold text-white">
                  {fact.value}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between gap-2">
                {hasQuote ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleQuote(index)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 hover:text-purple-300 transition-colors"
                    >
                      <Quote className="h-3 w-3" />
                      <span>{isExpanded ? 'Hide inline quote' : 'Inline Quote'}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>

                    {onInspectEvidence && (
                      <button
                        type="button"
                        onClick={() =>
                          onInspectEvidence({
                            title: fact.label,
                            claim: fact.value,
                            sourceQuote: fact.sourceQuote,
                            page: fact.page,
                            confidence: fact.confidence,
                            category: 'fact',
                          })
                        }
                        className="inline-flex items-center gap-1 rounded bg-purple-500/10 border border-purple-500/30 px-2 py-1 text-[10px] font-semibold text-purple-300 hover:bg-purple-500/20 hover:text-white transition-colors"
                      >
                        <Sparkles className="h-2.5 w-2.5 text-purple-400" />
                        <span>Proof Mode</span>
                      </button>
                    )}
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <ShieldAlert className="h-3 w-3" />
                    <span>Evidence unavailable</span>
                  </span>
                )}
              </div>

              {isExpanded && hasQuote && (
                <blockquote className="mt-2.5 rounded-lg bg-zinc-900 p-2.5 text-[11px] italic text-zinc-300 border-l-2 border-purple-500">
                  &ldquo;{fact.sourceQuote}&rdquo;
                  {fact.page && (
                    <span className="block mt-1 text-[10px] text-zinc-500 not-italic">
                      Page {fact.page}
                    </span>
                  )}
                </blockquote>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
