'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { UploadCard } from '@/components/UploadCard';
import { AnalysisProgress } from '@/components/AnalysisProgress';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { SAMPLE_ANALYSIS } from '@/lib/sample-data';
import { AnalysisResult } from '@/lib/types';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [documentSource, setDocumentSource] = useState<'sample' | 'live'>('sample');
  const [isLoading, setIsLoading] = useState(false);
  const [currentFileName, setCurrentFileName] = useState<string | undefined>();
  const [apiError, setApiError] = useState<string | null>(null);

  // Load the bundled sample document
  const handleLoadSample = () => {
    setIsLoading(true);
    setCurrentFileName('University Examination Notice — Fall 2026.pdf');
    setApiError(null);

    // Provide a brief realistic loading experience so the user sees the stages
    setTimeout(() => {
      setAnalysisResult(SAMPLE_ANALYSIS);
      setDocumentSource('sample');
      setIsLoading(false);
    }, 1200);
  };

  // Upload and analyze real document with Sarvam AI
  const handleAnalyzeFile = async (file: File) => {
    setIsLoading(true);
    setCurrentFileName(file.name);
    setApiError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze document.');
      }

      setAnalysisResult(data.data);
      setDocumentSource('live');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setApiError(
        err.message || 'An error occurred while connecting to Sarvam AI.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setApiError(null);
    setCurrentFileName(undefined);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0c10] text-[#e0e2ec]">
      {/* Navigation Header */}
      <Header
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        hasResult={!!analysisResult}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Error Banner */}
          {apiError && (
            <div className="mx-auto max-w-2xl mb-8 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-xs text-rose-200 shadow-xl">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <p className="font-semibold text-rose-100 text-sm">
                  Analysis Could Not Proceed
                </p>
                <p className="leading-relaxed text-rose-300/90">{apiError}</p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="rounded-lg bg-rose-600/30 border border-rose-500/40 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600/50 transition-colors"
                  >
                    View Sample Examination Notice Instead
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* View States */}
          {isLoading ? (
            <AnalysisProgress fileName={currentFileName} />
          ) : analysisResult ? (
            <AnalysisDashboard
              analysis={analysisResult}
              onReset={handleReset}
              documentSource={documentSource}
            />
          ) : (
            <div>
              <HeroSection onLoadSample={handleLoadSample} />
              <UploadCard
                onAnalyzeFile={handleAnalyzeFile}
                onLoadSample={handleLoadSample}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer & Disclaimer */}
      <footer className="border-t border-zinc-900 bg-[#09090d] py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-4xl px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-zinc-400 font-medium">
            <ShieldAlert className="h-4 w-4 text-zinc-500" />
            <span>Informational Aid Disclaimer</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            Document Decoder uses optical character recognition and large language models
            to assist in understanding official documents. It does not provide legal,
            statutory, or financial advice. Always verify deadlines, fees, and critical
            stipulations against the original document and official channels.
          </p>
          <p className="text-[10px] text-zinc-600">
            Document Decoder — Powered by Sarvam AI Document AI &amp; Chat Completion (sarvam-105b)
          </p>
        </div>
      </footer>
    </div>
  );
}
