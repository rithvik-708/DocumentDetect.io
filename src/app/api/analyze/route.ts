import { NextRequest, NextResponse } from 'next/server';
import { digitiseDocument, analyzeWithLLM } from '@/lib/sarvam';
import { SAMPLE_ANALYSIS } from '@/lib/sample-data';
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from '@/lib/types';

export const maxDuration = 120; // Allow sufficient time for digitization and LLM analysis

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const isSample = formData.get('isSample') === 'true';

    // If requesting the bundled sample document
    if (isSample) {
      return NextResponse.json({
        success: true,
        data: SAMPLE_ANALYSIS,
        source: 'sample',
      });
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded.' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type (${file.type}). Please upload a PDF or image (PNG, JPG, WebP).`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 10 MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(1)} MB.`,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.SARVAM_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            'SARVAM_API_KEY is not configured on the server. Please add SARVAM_API_KEY in .env.local to run live analyses, or use the "Try Sample Document" button to test the full experience with our bundled test document.',
          missingKey: true,
        },
        { status: 503 }
      );
    }

    // Step 1: Digitise document using Sarvam Doc AI
    const extractedText = await digitiseDocument(file, apiKey);

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sarvam Doc AI was unable to extract legible text from this document. Please ensure the document is clear and readable.',
        },
        { status: 422 }
      );
    }

    // Step 2: Analyze using Sarvam 105B LLM
    const analysis = await analyzeWithLLM(extractedText, apiKey);
    analysis.rawExtractedText = extractedText;

    return NextResponse.json({
      success: true,
      data: analysis,
      source: 'live',
    });
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred during document analysis.',
      },
      { status: 500 }
    );
  }
}
