import { NextResponse } from "next/server";
import { generateStyleConsultation, StyleConsultationRequest } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const requestData: StyleConsultationRequest = {
      faceShape: body.faceShape || "square",
      hairTexture: body.hairTexture || "straight",
      lifestyle: body.lifestyle || "corporate",
      currentLength: body.currentLength || "medium",
      beardPreference: body.beardPreference || "sculpted",
    };

    const consultation = await generateStyleConsultation(requestData);

    return NextResponse.json({
      success: true,
      consultation,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate haircut consultation",
      },
      { status: 500 }
    );
  }
}
