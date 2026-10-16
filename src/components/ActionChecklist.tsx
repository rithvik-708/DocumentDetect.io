'use client';

import React, { useState } from 'react';
import { ActionItem } from '@/lib/types';
import { CheckSquare, Square, Clock, Flag, CheckCircle2 } from 'lucide-react';

interface ActionChecklistProps {
  actionItems: ActionItem[];
}

export function ActionChecklist({ actionItems }: ActionChecklistProps) {
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const toggleItem = (index: number) => {
    setCompletedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const filteredItems = actionItems
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => {
      if (priorityFilter === 'all') return true;
      return item.priority === priorityFilter;
    });

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = actionItems.length > 0 ? Math.round((completedCount / actionItems.length) * 100) : 0;

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400 border border-rose-500/20">
            <Flag className="h-2.5 w-2.5" /> High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
            <Flag className="h-2.5 w-2.5" /> Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
            <Flag className="h-2.5 w-2.5" /> Low
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      {/* Header and Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Prioritized Action Checklist</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Step-by-step checklist to ensure full compliance with this document.
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="w-28 sm:w-36 bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-zinc-300 min-w-[50px] text-right">
            {completedCount}/{actionItems.length} done
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-4 pb-2 border-b border-zinc-800">
        {(['all', 'high', 'medium', 'low'] as const).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setPriorityFilter(filter)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
              priorityFilter === filter
                ? 'bg-purple-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {filter === 'all' ? 'All Tasks' : `${filter} Priority`}
          </button>
        ))}
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {filteredItems.map(({ item, originalIndex }) => {
          const isDone = !!completedItems[originalIndex];

          return (
            <div
              key={originalIndex}
              onClick={() => toggleItem(originalIndex)}
              className={`group flex items-start gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                isDone
                  ? 'border-emerald-500/20 bg-emerald-500/5 opacity-75'
                  : 'border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700'
              }`}
            >
              <button
                type="button"
                className={`mt-0.5 shrink-0 rounded transition-colors ${
                  isDone
                    ? 'text-emerald-400'
                    : 'text-zinc-500 group-hover:text-zinc-300'
                }`}
              >
                {isDone ? (
                  <CheckSquare className="h-5 w-5" />
                ) : (
                  <Square className="h-5 w-5" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4
                    className={`text-sm font-semibold transition-all ${
                      isDone
                        ? 'line-through text-zinc-500'
                        : 'text-white group-hover:text-purple-200'
                    }`}
                  >
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-2">
                    {getPriorityBadge(item.priority)}
                  </div>
                </div>

                <p
                  className={`mt-1 text-xs leading-relaxed ${
                    isDone ? 'line-through text-zinc-600' : 'text-zinc-300'
                  }`}
                >
                  {item.description}
                </p>

                {item.deadline && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-amber-300/90">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Deadline: {item.deadline}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
