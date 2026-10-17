'use client';

import React, { useState, useMemo } from 'react';
import { Deadline, EvidenceItem } from '@/lib/types';
import {
  CalendarClock,
  Clock,
  AlertCircle,
  CheckCircle2,
  Square,
  CheckSquare,
  ArrowUpDown,
  Filter,
  Flame,
  Calendar,
  Quote,
  ShieldCheck,
} from 'lucide-react';

interface DeadlineRadarProps {
  deadlines: Deadline[];
  onInspectEvidence: (evidence: EvidenceItem) => void;
}

export function DeadlineRadar({ deadlines, onInspectEvidence }: DeadlineRadarProps) {
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState<'all' | 'strict' | 'reference'>('all');

  const toggleComplete = (index: number) => {
    setCompletedMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Helper to parse dates into sortable timestamps if possible
  const getSortTimestamp = (d: Deadline): number => {
    if (d.parsedDate) {
      const parsed = Date.parse(d.parsedDate);
      if (!isNaN(parsed)) return parsed;
    }
    // Attempt parsing from dateText (e.g., "October 25, 2026")
    const safeDateText = String(d.dateText || '').trim();
    if (!safeDateText) return Number.MAX_SAFE_INTEGER;
    const extractedDate = safeDateText.replace(/at\s+\d+:\d+.*$/i, '').trim();
    const parsed = Date.parse(extractedDate);
    if (!isNaN(parsed)) return parsed;
    return Number.MAX_SAFE_INTEGER; // Put unparseable dates at the end
  };

  const processedDeadlines = useMemo(() => {
    return deadlines
      .map((deadline, originalIndex) => ({
        deadline,
        originalIndex,
        timestamp: getSortTimestamp(deadline),
        isStrict: deadline.isStrictDeadline ?? (
          /deadline|last date|due|cutoff|fine|penalty|late/i.test(deadline.action || '') ||
          /deadline|last date|due|cutoff/i.test(deadline.dateText || '')
        ),
      }))
      .filter(({ isStrict }) => {
        if (filterType === 'all') return true;
        if (filterType === 'strict') return isStrict;
        if (filterType === 'reference') return !isStrict;
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') return a.timestamp - b.timestamp;
        return b.timestamp - a.timestamp;
      });
  }, [deadlines, filterType, sortOrder]);

  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const progressPercent = deadlines.length > 0 ? Math.round((completedCount / deadlines.length) * 100) : 0;

  const getPriorityBadge = (priority?: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400 border border-rose-500/20">
            <Flame className="h-2.5 w-2.5" /> High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
            Medium Priority
          </span>
        );
      case 'low':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
            Low Priority
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header and Radar Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
              <CalendarClock className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Deadline Radar</span>
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 border border-amber-500/30">
                Timeline Tracked
              </span>
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Chronological schedule distinguishing hard cutoffs and penalties from general document reference dates.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3">
          <div className="w-28 sm:w-36 bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-zinc-300 min-w-[50px] text-right">
            {completedCount}/{deadlines.length} done
          </span>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-1 border-b border-zinc-800">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-zinc-500 flex items-center gap-1 mr-1">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            All Dates ({deadlines.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('strict')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterType === 'strict'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Strict Cutoffs Only
          </button>
          <button
            type="button"
            onClick={() => setFilterType('reference')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterType === 'reference'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Events &amp; Reference Dates
          </button>
        </div>

        {/* Sort Order Toggle */}
        <button
          type="button"
          onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
        >
          <ArrowUpDown className="h-3 w-3" />
          <span>{sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}</span>
        </button>
      </div>

      {/* Deadlines Timeline Grid */}
      <div className="space-y-3">
        {processedDeadlines.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-8 text-center text-xs text-zinc-500">
            No deadlines match the selected filter.
          </div>
        ) : (
          processedDeadlines.map(({ deadline, originalIndex, isStrict }) => {
            const isCompleted = !!completedMap[originalIndex];

            return (
              <div
                key={originalIndex}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border p-4 transition-all ${
                  isCompleted
                    ? 'border-emerald-500/20 bg-emerald-500/5 opacity-70'
                    : isStrict
                    ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50'
                    : 'border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700'
                }`}
              >
                {/* Left: Checkbox + Date & Action */}
                <div className="flex items-start gap-3.5 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleComplete(originalIndex)}
                    className={`mt-0.5 shrink-0 rounded transition-colors ${
                      isCompleted ? 'text-emerald-400' : 'text-zinc-500 hover:text-amber-400'
                    }`}
                    title="Mark deadline action as attended/completed"
                  >
                    {isCompleted ? (
                      <CheckSquare className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-sm font-bold ${
                          isCompleted
                            ? 'line-through text-zinc-500'
                            : isStrict
                            ? 'text-amber-300'
                            : 'text-zinc-200'
                        }`}
                      >
                        {deadline.dateText}
                      </span>

                      {/* Strict Cutoff vs Reference Badge */}
                      {isStrict ? (
                        <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/20">
                          Hard Cutoff
                        </span>
                      ) : (
                        <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                          Event / Reference Date
                        </span>
                      )}

                      {getPriorityBadge(deadline.priority)}
                    </div>

                    <p
                      className={`text-xs leading-relaxed ${
                        isCompleted ? 'line-through text-zinc-500' : 'text-zinc-300'
                      }`}
                    >
                      {deadline.action}
                    </p>
                  </div>
                </div>

                {/* Right: Proof Mode Trigger */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() =>
                      onInspectEvidence({
                        title: deadline.dateText,
                        claim: deadline.action,
                        sourceQuote: deadline.sourceQuote,
                        page: deadline.page,
                        confidence: deadline.confidence,
                        category: 'deadline',
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-purple-500/30 bg-purple-600/10 px-2.5 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-600/20 hover:text-white transition-colors"
                  >
                    <Quote className="h-3 w-3" />
                    <span>View Evidence</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
