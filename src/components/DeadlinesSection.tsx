'use client';

import React, { useState } from 'react';
import { Deadline } from '@/lib/types';
import { CalendarClock, AlertCircle, Quote, ChevronDown, ChevronUp } from 'lucide-react';

interface DeadlinesSectionProps {
  deadlines: Deadline[];
}

export function DeadlinesSection({ deadlines }: DeadlinesSectionProps) {
  const [expandedQuotes, setExpandedQuotes] = useState<Record<number, boolean>>({});

  const toggleQuote = (index: number) => {
    setExpandedQuotes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-amber-400" />
            <span>Critical Dates &amp; Deadlines</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Key cutoff dates, examination schedules, and submission deadlines.
          </p>
        </div>
        <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
          {deadlines.length} Deadlines
        </span>
      </div>

      <div className="space-y-3">
        {deadlines.map((deadline, index) => {
          const isExpanded = !!expandedQuotes[index];

          return (
            <div
              key={index}
              className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 transition-all hover:border-amber-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                    <CalendarClock className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-amber-300">
                    {deadline.dateText}
                  </span>
                </div>

                <span className="self-start sm:self-auto rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 uppercase tracking-wider">
                  {deadline.confidence} confidence
                </span>
              </div>

              <p className="mt-2 text-xs sm:text-sm text-zinc-200 pl-9">
                {deadline.action}
              </p>

              {deadline.sourceQuote && (
                <div className="mt-3 pl-9 pt-2 border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={() => toggleQuote(index)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 hover:text-amber-300 transition-colors"
                  >
                    <Quote className="h-3 w-3" />
                    <span>{isExpanded ? 'Hide quote' : 'Verify in notice'}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </button>

                  {isExpanded && (
                    <blockquote className="mt-2 rounded-lg bg-zinc-900 p-2.5 text-[11px] italic text-zinc-300 border-l-2 border-amber-500">
                      &ldquo;{deadline.sourceQuote}&rdquo;
                      {deadline.page && (
                        <span className="block mt-1 text-[10px] text-zinc-500 not-italic">
                          Page {deadline.page}
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
