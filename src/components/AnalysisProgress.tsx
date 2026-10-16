'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, FileSearch, Sparkles, Brain, Check } from 'lucide-react';

interface AnalysisProgressProps {
  fileName?: string;
}

export function AnalysisProgress({ fileName }: AnalysisProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Validating & Uploading',
      desc: 'Checking file format, structure, and readability.',
      icon: FileSearch,
    },
    {
      title: 'Digitizing with Sarvam Doc AI',
      desc: 'Extracting multilingual text, tables, and clauses with high-accuracy OCR.',
      icon: Sparkles,
    },
    {
      title: 'Analyzing with Sarvam 105B',
      desc: 'Identifying crucial deadlines, obligations, missing facts, and plain-language definitions.',
      icon: Brain,
    },
    {
      title: 'Assembling Action Checklist',
      desc: 'Structuring prioritized checklist and formatting report cards.',
      icon: CheckCircle2,
    },
  ];

  useEffect(() => {
    // Progress through steps smoothly to keep user engaged during API processing
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 4500);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="mx-auto max-w-xl py-12">
      <div className="glass-panel-glow rounded-2xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-300">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>

        <h3 className="mt-5 text-xl font-bold text-white">
          Decoding Document...
        </h3>

        {fileName && (
          <p className="mt-1 text-xs text-zinc-400 truncate max-w-xs mx-auto">
            {fileName}
          </p>
        )}

        <div className="mt-8 space-y-4 text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step.title}
                className={`flex items-start gap-3.5 rounded-xl border p-3.5 transition-all ${
                  isCurrent
                    ? 'border-purple-500/40 bg-purple-500/10 shadow-sm shadow-purple-500/10'
                    : isCompleted
                    ? 'border-zinc-800/60 bg-zinc-900/30 text-zinc-400'
                    : 'border-transparent opacity-40'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isCurrent
                      ? 'bg-purple-600 text-white animate-pulse'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs font-semibold ${
                        isCurrent
                          ? 'text-white'
                          : isCompleted
                          ? 'text-zinc-300'
                          : 'text-zinc-500'
                      }`}
                    >
                      {step.title}
                    </p>
                    {isCompleted && (
                      <span className="text-[10px] text-emerald-400 font-medium">
                        Done
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] text-purple-400 font-medium animate-pulse">
                        Processing...
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-[11px] text-zinc-500">
          Powered by Sarvam AI Document AI & Chat Completion V1 (sarvam-105b)
        </p>
      </div>
    </div>
  );
}
