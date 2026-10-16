import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Document Decoder — Understand Official Documents in Plain English',
  description:
    'Document Decoder transforms complex official, legal, academic, and bureaucratic documents into clear summaries, actionable checklists, key facts, and plain-English translations. Powered by Sarvam AI.',
  keywords: [
    'Document Decoder',
    'Sarvam AI',
    'Document AI',
    'AI Summarizer',
    'Legal document simplified',
    'Bureaucracy decoder',
    'Official notice reader',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] font-sans selection:bg-purple-500/30 selection:text-purple-200 antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
