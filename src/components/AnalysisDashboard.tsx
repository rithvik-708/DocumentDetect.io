'use client';

import React, { useState, useMemo } from 'react';
import {
  AnalysisResult,
  EvidenceItem,
  LanguageCode,
  BhashaCache,
  TranslatedData,
} from '@/lib/types';
import { DocumentOverview } from './DocumentOverview';
import { KeyFactsSection } from './KeyFactsSection';
import { DeadlinesSection } from './DeadlinesSection';
import { ActionChecklist } from './ActionChecklist';
import { MissingInfoSection } from './MissingInfoSection';
import { PlainLanguageSection } from './PlainLanguageSection';
import { ReportActions } from './ReportActions';
import { EvidenceDrawer } from './EvidenceDrawer';
import { BhashaSelector } from './BhashaSelector';
import { SAMPLE_TRANSLATIONS_TE, SAMPLE_TRANSLATIONS_HI } from '@/lib/sample-data';
import {
  FileText,
  CheckSquare,
  Clock,
  Database,
  BookA,
  AlertTriangle,
  Layers,
  CalendarClock,
  Sparkles,
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
  const [activeTab, setActiveTab] = useState<
    'all' | 'checklist' | 'deadlines' | 'facts' | 'jargon' | 'missing'
  >('all');

  // Proof Mode state
  const [activeEvidence, setActiveEvidence] = useState<EvidenceItem | null>(null);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);

  // Bhasha Mode state
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en-IN');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [bhashaCache, setBhashaCache] = useState<BhashaCache>(() => {
    if (documentSource === 'sample') {
      return {
        'te-IN': SAMPLE_TRANSLATIONS_TE,
        'hi-IN': SAMPLE_TRANSLATIONS_HI,
      };
    }
    return {};
  });

  const handleInspectEvidence = (item: EvidenceItem) => {
    setActiveEvidence(item);
    setIsEvidenceOpen(true);
  };

  const handleLanguageChange = async (targetLang: LanguageCode) => {
    setTranslationError(null);
    if (targetLang === 'en-IN') {
      setCurrentLanguage('en-IN');
      return;
    }

    // Check if already in state cache
    if (bhashaCache[targetLang]) {
      setCurrentLanguage(targetLang);
      return;
    }

    // For sample document, use pre-bundled translations
    if (documentSource === 'sample') {
      const sampleTrans =
        targetLang === 'te-IN' ? SAMPLE_TRANSLATIONS_TE : SAMPLE_TRANSLATIONS_HI;
      setBhashaCache((prev) => ({ ...prev, [targetLang]: sampleTrans }));
      setCurrentLanguage(targetLang);
      return;
    }

    // For live document, translate via server API
    setIsTranslating(true);
    try {
      // Gather strings to translate:
      // 1. Summary bullets
      // 2. Key facts values
      // 3. Action item titles and descriptions
      // 4. Deadline actions
      const textsToTranslate: string[] = [
        ...analysis.summary,
        ...analysis.keyFacts.map((f) => f.value),
        ...analysis.actionItems.flatMap((a) => [a.title, a.description]),
        ...analysis.deadlines.map((d) => d.action),
      ];

      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: textsToTranslate,
          targetLanguage: targetLang,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to translate report.');
      }

      const translations: string[] = data.translations;
      let ptr = 0;

      const translatedSummary = translations.slice(ptr, ptr + analysis.summary.length);
      ptr += analysis.summary.length;

      const translatedKeyFactValues = translations.slice(ptr, ptr + analysis.keyFacts.length);
      ptr += analysis.keyFacts.length;

      const translatedActionItems: Array<{ title: string; description: string }> = [];
      for (let i = 0; i < analysis.actionItems.length; i++) {
        translatedActionItems.push({
          title: translations[ptr] || analysis.actionItems[i].title,
          description: translations[ptr + 1] || analysis.actionItems[i].description,
        });
        ptr += 2;
      }

      const translatedDeadlines: Array<{ action: string }> = [];
      for (let i = 0; i < analysis.deadlines.length; i++) {
        translatedDeadlines.push({
          action: translations[ptr] || analysis.deadlines[i].action,
        });
        ptr += 1;
      }

      const translatedPayload: TranslatedData = {
        summary: translatedSummary,
        keyFacts: analysis.keyFacts.map((f, i) => ({
          label: f.label,
          value: translatedKeyFactValues[i] || f.value,
        })),
        actionItems: translatedActionItems,
        deadlines: translatedDeadlines,
      };

      setBhashaCache((prev) => ({ ...prev, [targetLang]: translatedPayload }));
      setCurrentLanguage(targetLang);
    } catch (err: any) {
      console.error('Translation error:', err);
      setTranslationError(err.message || 'Translation unavailable.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Derive active displayed content based on language
  const displayedContent = useMemo(() => {
    if (currentLanguage === 'en-IN' || !bhashaCache[currentLanguage]) {
      return {
        summary: analysis.summary,
        keyFacts: analysis.keyFacts,
        actionItems: analysis.actionItems,
        deadlines: analysis.deadlines,
      };
    }

    const t = bhashaCache[currentLanguage]!;

    return {
      summary: t.summary || analysis.summary,
      keyFacts: analysis.keyFacts.map((f, i) => ({
        ...f,
        label: t.keyFacts?.[i]?.label || f.label,
        value: t.keyFacts?.[i]?.value || f.value,
      })),
      actionItems: analysis.actionItems.map((a, i) => ({
        ...a,
        title: t.actionItems?.[i]?.title || a.title,
        description: t.actionItems?.[i]?.description || a.description,
      })),
      deadlines: analysis.deadlines.map((d, i) => ({
        ...d,
        action: t.deadlines?.[i]?.action || d.action,
      })),
    };
  }, [analysis, currentLanguage, bhashaCache]);

  const tabs = [
    { id: 'all', label: 'Complete Report', icon: Layers },
    {
      id: 'deadlines',
      label: `Deadline Radar (${analysis.deadlines.length})`,
      icon: CalendarClock,
    },
    {
      id: 'checklist',
      label: `Checklist (${analysis.actionItems.length})`,
      icon: CheckSquare,
    },
    { id: 'facts', label: `Key Facts (${analysis.keyFacts.length})`, icon: Database },
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

      {/* Bhasha Mode Multilingual Selector */}
      <BhashaSelector
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        isTranslating={isTranslating}
      />

      {/* Translation error banner if any */}
      {translationError && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{translationError}</span>
        </div>
      )}

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
            summary={displayedContent.summary}
            limitations={analysis.limitations}
          />
        )}

        {(activeTab === 'all' || activeTab === 'deadlines') && (
          <DeadlinesSection
            deadlines={displayedContent.deadlines}
            onInspectEvidence={handleInspectEvidence}
          />
        )}

        {(activeTab === 'all' || activeTab === 'checklist') && (
          <ActionChecklist
            actionItems={displayedContent.actionItems}
            onInspectEvidence={handleInspectEvidence}
          />
        )}

        {(activeTab === 'all' || activeTab === 'facts') && (
          <KeyFactsSection
            keyFacts={displayedContent.keyFacts}
            onInspectEvidence={handleInspectEvidence}
          />
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

      {/* Proof Mode Evidence Inspector Drawer */}
      <EvidenceDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        evidence={activeEvidence}
        rawExtractedText={analysis.rawExtractedText}
      />
    </div>
  );
}
