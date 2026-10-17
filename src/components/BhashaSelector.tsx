'use client';

import React from 'react';
import { LanguageCode } from '@/lib/types';
import { Languages, Loader2, Sparkles } from 'lucide-react';

interface BhashaSelectorProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isTranslating: boolean;
}

export function BhashaSelector({
  currentLanguage,
  onLanguageChange,
  isTranslating,
}: BhashaSelectorProps) {
  const languages: Array<{ code: LanguageCode; label: string; native: string }> = [
    { code: 'en-IN', label: 'English', native: 'English' },
    { code: 'te-IN', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi-IN', label: 'Hindi', native: 'हिन्दी' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-3 sm:px-4 sm:py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/30 text-purple-300">
          <Languages className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">
              Bhasha Mode
            </span>
            <span className="rounded bg-purple-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-purple-300 border border-purple-500/30">
              Sarvam Translate
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 hidden sm:block">
            Read summaries &amp; checklists in Indian languages while preserving original source quotes
          </p>
        </div>
      </div>

      {/* Language Switcher Buttons */}
      <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;

          return (
            <button
              key={lang.code}
              type="button"
              disabled={isTranslating}
              onClick={() => onLanguageChange(lang.code)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              } disabled:opacity-50`}
            >
              <span>{lang.native}</span>
              {isActive && isTranslating && (
                <Loader2 className="h-3 w-3 animate-spin text-purple-200" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
