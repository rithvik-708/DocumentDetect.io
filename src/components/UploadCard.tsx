'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileText, AlertCircle, ArrowRight, X, Sparkles, Check, Download } from 'lucide-react';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE, FILE_TYPE_LABELS } from '@/lib/types';

interface UploadCardProps {
  onAnalyzeFile: (file: File) => void;
  onLoadSample: () => void;
  isLoading: boolean;
}

export function UploadCard({ onAnalyzeFile, onLoadSample, isLoading }: UploadCardProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrorMessage(
        'Unsupported file format. Please upload a PDF or image file (PNG, JPG, WebP).'
      );
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 10 MB.`
      );
      return false;
    }

    setSelectedFile(file);
    return true;
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    onAnalyzeFile(selectedFile);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/webp"
          onChange={handleChange}
          className="hidden"
          id="document-upload-input"
        />

        {/* Drop Zone */}
        {!selectedFile ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
              dragActive
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-900/50'
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-purple-400 group-hover:scale-105 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all">
              <UploadCloud className="h-7 w-7" />
            </div>

            <h2 className="mt-4 text-base font-semibold text-white">
              Drop your document here, or{' '}
              <span className="text-purple-400 group-hover:underline">browse files</span>
            </h2>

            <p className="mt-1.5 text-xs text-zinc-400">
              Supports PDF, PNG, JPG, or WebP up to 10 MB
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-[11px] text-zinc-400">
                PDF Notices
              </span>
              <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-[11px] text-zinc-400">
                Scanned Circulars
              </span>
              <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-[11px] text-zinc-400">
                Photo of Documents
              </span>
            </div>
          </div>
        ) : (
          /* File Preview Card */
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base truncate max-w-[260px] sm:max-w-md">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {FILE_TYPE_LABELS[selectedFile.type] || selectedFile.type} •{' '}
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearFile}
                disabled={isLoading}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                title="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Change file
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-xl gradient-accent px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-600/20 hover:opacity-95 disabled:opacity-50 transition-all"
              >
                <span>Decode Document</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Sample document prompt banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-purple-400 shrink-0" />
            <span className="text-xs text-zinc-300">
              Want to test with a sample official circular?
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/sample-exam-notice.png"
              download="University-Exam-Notice-Fall-2026.png"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
              title="Download realistic official notice image to test live upload"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Get Test Notice</span>
            </a>
            <button
              type="button"
              onClick={onLoadSample}
              disabled={isLoading}
              className="inline-flex items-center gap-1 rounded-lg border border-purple-500/30 bg-purple-600/20 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-600/30 hover:text-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Instant Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

