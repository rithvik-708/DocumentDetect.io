'use client';

import React, { useState } from 'react';
import { AnalysisResult } from '@/lib/types';
import { DocumentOverview } from './DocumentOverview';
import { KeyFactsSection } from './KeyFactsSection';
import { DeadlinesSection } from './DeadlinesSection';
import { ActionChecklist } from './ActionChecklist';
import { MissingInfoSection } from './MissingInfoSection';
import { PlainLanguageSection } from './PlainLanguageSection';
import { ReportActions } from './ReportActions';
import {
  FileText,
  CheckSquare,
  Clock,
  Database,
  BookA,
  AlertTriangle,
  Layers,
} from 'lucide-react';

interface AnalysisDashboardProps {
  analysis: AnalysisResult;
  onReset: () => void;
  documentSource?: 'sample' | 'live';
}

export function AnalysisDashboard({
  analysis,
  onReset,
  documentSource = 'live',
}: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'checklist' | 'deadlines' | 'facts' | 'jargon' | 'missing'>('all');

  const tabs = [
    { id: 'all', label: 'Complete Report', icon: Layers },
    { id: 'checklist', label: `Checklist (${analysis.actionItems.length})`, icon: CheckSquare },
    { id: 'deadlines', label: `Deadlines (${analysis.deadlines.length})`, icon: Clock },
    { id: 'facts', label: `Facts (${analysis.keyFacts.length})`, icon: Database },
    { id: 'jargon', label: 'Jargon Decoded', icon: BookA },
    { id: 'missing', label: 'Missing Info', icon: AlertTriangle },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-24">
      {/* Top Banner indicating document analysis source */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {documentSource === 'sample' ? (
              <strong className="text-zinc-200">
                Sample Document Loaded: University Examination Notice — Fall 2026
              </strong>
            ) : (
              <strong className="text-zinc-200">Document Analysis Complete</strong>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 font-mono">
            Sarvam AI 105B
          </span>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200 border border-transparent'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Report Sections */}
      <div className="space-y-6">
        {(activeTab === 'all' || activeTab === 'facts') && (
          <DocumentOverview
            documentType={analysis.documentType}
            issuingOrganization={analysis.issuingOrganization}
            documentDate={analysis.documentDate}
            summary={analysis.summary}
            limitations={analysis.limitations}
          />
        )}

        {(activeTab === 'all' || activeTab === 'checklist') && (
          <ActionChecklist actionItems={analysis.actionItems} />
        )}

        {(activeTab === 'all' || activeTab === 'deadlines') && (
          <DeadlinesSection deadlines={analysis.deadlines} />
        )}

        {(activeTab === 'all' || activeTab === 'facts') && (
          <KeyFactsSection keyFacts={analysis.keyFacts} />
        )}

        {(activeTab === 'all' || activeTab === 'jargon') && (
          <PlainLanguageSection explanations={analysis.plainLanguageExplanations} />
        )}

        {(activeTab === 'all' || activeTab === 'missing') && (
          <MissingInfoSection missingInfo={analysis.missingInformation} />
        )}
      </div>

      {/* Sticky Bottom Action bar */}
      <ReportActions analysis={analysis} onReset={onReset} />
    </div>
  );
}
