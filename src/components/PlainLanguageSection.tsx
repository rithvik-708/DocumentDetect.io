import React from 'react';
import { PlainLanguageExplanation } from '@/lib/types';
import { BookA, ArrowRight, Quote } from 'lucide-react';

interface PlainLanguageSectionProps {
  explanations: PlainLanguageExplanation[];
}

export function PlainLanguageSection({ explanations }: PlainLanguageSectionProps) {
  if (!explanations || explanations.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <BookA className="h-4 w-4 text-purple-400" />
            <span>Difficult Wording Decoded</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Complex legal, academic, or bureaucratic phrasing translated into plain English.
          </p>
        </div>
        <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-xs font-medium text-purple-300">
          {explanations.length} Translations
        </span>
      </div>

      <div className="space-y-4">
        {explanations.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 transition-all hover:border-zinc-700/80"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* As written */}
              <div className="rounded-lg bg-zinc-900/80 p-3.5 border border-zinc-800/60">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">
                  As Written in Notice
                </span>
                <blockquote className="text-xs italic text-zinc-300 leading-relaxed">
                  &ldquo;{item.originalText}&rdquo;
                </blockquote>
                {item.page && (
                  <span className="text-[10px] text-zinc-500 block mt-2">
                    Page {item.page}
                  </span>
                )}
              </div>

              {/* Plain English */}
              <div className="rounded-lg bg-purple-950/20 p-3.5 border border-purple-500/20">
                <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <span>What It Means in Plain English</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
                <p className="text-xs text-purple-100 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
