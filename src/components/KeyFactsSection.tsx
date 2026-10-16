'use client';

import React, { useState } from 'react';
import { KeyFact } from '@/lib/types';
import { Database, ChevronDown, ChevronUp, Quote } from 'lucide-react';

interface KeyFactsSectionProps {
  keyFacts: KeyFact[];
}

export function KeyFactsSection({ keyFacts }: KeyFactsSectionProps) {
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

          return (
            <div
              key={index}
              className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 transition-all hover:border-zinc-700/80"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-zinc-400">
                  {fact.label}
                </span>
                {getConfidenceBadge(fact.confidence)}
              </div>

              <p className="mt-1.5 text-sm sm:text-base font-semibold text-white">
                {fact.value}
              </p>

              {fact.sourceQuote && (
                <div className="mt-3 pt-2.5 border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={() => toggleQuote(index)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Quote className="h-3 w-3" />
                    <span>{isExpanded ? 'Hide source quote' : 'Verify in document'}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </button>

                  {isExpanded && (
                    <blockquote className="mt-2 rounded-lg bg-zinc-900 p-2.5 text-[11px] italic text-zinc-300 border-l-2 border-purple-500">
                      &ldquo;{fact.sourceQuote}&rdquo;
                      {fact.page && (
                        <span className="block mt-1 text-[10px] text-zinc-500 not-italic">
                          Page {fact.page}
                        </span>
                      )}
                    </blockquote>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
