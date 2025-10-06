import { NextResponse } from 'next/server';

export async function GET() {
  // Returns server time in ms; use it to compute an offset vs client clock.
  return NextResponse.json({ now: Date.now() });
}
