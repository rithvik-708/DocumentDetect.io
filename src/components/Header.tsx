'use client';

import React from 'react';
import { FileText, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  hasResult: boolean;
}

export function Header({ onLoadSample, onReset, hasResult }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#0b0c10]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Document<span className="text-purple-400">Decoder</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-300">
                <Sparkles className="h-2.5 w-2.5 text-purple-400" />
                Sarvam AI
              </span>
            </div>
            <p className="hidden text-xs text-zinc-400 sm:block">
              Decode official notices into plain English & checklists
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {hasResult ? (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
              Analyze Another
            </button>
          ) : (
            <button
              onClick={onLoadSample}
              className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-600/20 px-3 py-1.5 text-xs font-medium text-purple-300 transition-colors hover:bg-purple-600/30 hover:text-white"
            >
              <BookOpen className="h-3.5 w-3.5 text-purple-400" />
              Try Sample Notice
            </button>
          )}

          <a
            href="https://sarvam.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-200 md:inline-flex"
          >
            Sarvam Campus &apos;26
          </a>
        </div>
      </div>
    </header>
  );
}
