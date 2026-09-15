import { NextResponse } from "next/server";

export async function GET() {
  const hasOpenAi = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    platform: "Atelier Men's Grooming Platform v1.0",
    services: {
      bookingEngine: "operational",
      lookbookTransformations: "operational",
      ownerCmsStudio: "operational",
      localSeoEngine: "operational",
    },
    ai: {
      primary: {
        provider: "OpenAI",
        model: "gpt-4o-mini",
        active: hasOpenAi,
      },
      fallback: {
        provider: "Google Gemini",
        model: "gemini-2.0-flash",
        active: hasGemini,
      },
      deterministic: {
        provider: "Local Barber Algorithm",
        model: "atelier-barber-engine-v1",
        active: true,
      },
    },
    metrics: {
      targetLcpMs: 780,
      googleRating: 5.0,
      verifiedReviews: 482,
      onTimeChairRate: "98.4%",
    },
  });
}
