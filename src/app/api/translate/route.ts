import { NextRequest, NextResponse } from 'next/server';
import { translateBatch } from '@/lib/sarvam';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { texts, targetLanguage } = body;

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No text items provided for translation.' },
        { status: 400 }
      );
    }

    if (!targetLanguage || (targetLanguage !== 'te-IN' && targetLanguage !== 'hi-IN')) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported target language code: ${targetLanguage}. Supported codes: 'te-IN', 'hi-IN'.`,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'SARVAM_API_KEY is not configured on the server. Translation requires an active Sarvam subscription key.',
        },
        { status: 503 }
      );
    }

    const translations = await translateBatch(texts, targetLanguage, apiKey);

    return NextResponse.json({
      success: true,
      translations,
      targetLanguage,
    });
  } catch (error: any) {
    console.error('Error in /api/translate:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred during translation.',
      },
      { status: 500 }
    );
  }
}
