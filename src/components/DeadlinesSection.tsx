'use client';

import React from 'react';
import { Deadline, EvidenceItem } from '@/lib/types';
import { DeadlineRadar } from './DeadlineRadar';

interface DeadlinesSectionProps {
  deadlines: Deadline[];
  onInspectEvidence?: (evidence: EvidenceItem) => void;
}

export function DeadlinesSection({ deadlines, onInspectEvidence }: DeadlinesSectionProps) {
  // If onInspectEvidence is not provided, provide a default no-op
  const handleInspect = onInspectEvidence || (() => {});
  return <DeadlineRadar deadlines={deadlines} onInspectEvidence={handleInspect} />;
}
