// Document Decoder — Analysis Output Schema

export interface KeyFact {
  label: string;
  value: string;
  sourceQuote: string | null;
  page: number | null;
  confidence: 'high' | 'medium' | 'low';
}

export interface Deadline {
  dateText: string;
  action: string;
  sourceQuote: string | null;
  page: number | null;
  confidence: 'high' | 'medium' | 'low';
  isStrictDeadline?: boolean; // true if cutoff/penalty/action required, false if informational date mentioned
  priority?: 'high' | 'medium' | 'low';
  parsedDate?: string | null; // ISO YYYY-MM-DD for accurate chronological sorting
  completed?: boolean;
}

export interface ActionItem {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string | null;
  sourceQuote: string | null;
  page: number | null;
  confidence?: 'high' | 'medium' | 'low';
}

export interface MissingInfo {
  item: string;
  reason: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface PlainLanguageExplanation {
  originalText: string;
  explanation: string;
  sourceQuote: string;
  page: number | null;
}

export interface AnalysisResult {
  documentType: string;
  issuingOrganization: string | null;
  documentDate: string | null;
  summary: string[];
  keyFacts: KeyFact[];
  deadlines: Deadline[];
  actionItems: ActionItem[];
  missingInformation: MissingInfo[];
  plainLanguageExplanations: PlainLanguageExplanation[];
  limitations: string[];
  rawExtractedText?: string;
}

export interface EvidenceItem {
  title: string;
  claim: string;
  sourceQuote: string | null;
  page: number | null;
  confidence?: 'high' | 'medium' | 'low';
  category: 'fact' | 'deadline' | 'action' | 'clause';
}

export type LanguageCode = 'en-IN' | 'te-IN' | 'hi-IN';

export interface TranslatedData {
  summary?: string[];
  keyFacts?: Array<{ label: string; value: string }>;
  actionItems?: Array<{ title: string; description: string }>;
  deadlines?: Array<{ action: string }>;
  plainLanguageExplanations?: Array<{ explanation: string }>;
  missingInformation?: Array<{ item: string; reason: string }>;
}

export type BhashaCache = Partial<Record<LanguageCode, TranslatedData>>;

export type AnalysisStage =
  | 'reading'
  | 'extracting'
  | 'identifying'
  | 'preparing';

export interface UploadedFile {
  file: File;
  name: string;
  size: number;
  type: string;
}

export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const FILE_TYPE_LABELS: Record<string, string> = {
  'application/pdf': 'PDF Document',
  'image/png': 'PNG Image',
  'image/jpeg': 'JPEG Image',
  'image/webp': 'WebP Image',
};
