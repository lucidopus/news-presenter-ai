import { NextResponse } from 'next/server';
import { getNewsPresentation } from '@/lib/agent';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category } = body;
    console.log(`[API] Received request for category: ${category}`);

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    const presentation = await getNewsPresentation(category);
    
    // Check if presentation generation actually succeeded
    if (!presentation || !presentation.script) {
        throw new Error('Failed to generate script content');
    }
    
    return NextResponse.json(presentation);
    
  } catch (error: unknown) {
    console.error('API Error:', error);
    
    let message = 'Internal server error';
    let status = 500;

    if (error instanceof Error) {
        message = error.message;
        if (message.includes('Tavily') || message.includes('Groq')) {
            status = 503;
        }
    }

    return NextResponse.json(
      { error: message },
      { status: status }
    );
  }
}
