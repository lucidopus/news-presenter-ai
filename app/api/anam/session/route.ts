import { NextResponse } from 'next/server';
import { getAnamSessionToken } from '@/lib/anam';

export async function GET() {
  try {
    const token = await getAnamSessionToken();

    if (!token) {
      return NextResponse.json(
        { error: 'Failed to get session token' },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionToken: token });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
