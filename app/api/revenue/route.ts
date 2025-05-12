// app/api/revenue/route.ts
import { fetchRevenue } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const revenue = await fetchRevenue();
    return NextResponse.json(revenue);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 }
    );
  }
}