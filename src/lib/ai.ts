export interface StyleConsultationRequest {
  faceShape: "oval" | "square" | "round" | "diamond" | "heart";
  hairTexture: "straight" | "wavy" | "curly" | "coarse" | "thinning";
  lifestyle: "corporate" | "creative" | "athletic" | "casual";
  currentLength: "short" | "medium" | "long" | "unkempt";
  beardPreference: "clean" | "stubble" | "sculpted" | "full";
}

export interface StyleConsultationResponse {
  recommendationName: string;
  recommendedBarber: string;
  recommendedService: string;
  clipperGuardAndScissorFormula: string;
  stylingProduct: string;
  maintenanceCadenceWeeks: number;
  consultationRationale: string;
  provider: "openai" | "gemini" | "deterministic";
  model: string;
  latencyMs: number;
}

export async function generateStyleConsultation(
  req: StyleConsultationRequest
): Promise<StyleConsultationResponse> {
  const startTime = Date.now();

  const prompt = `You are the Head Barber & Creative Director at 'Atelier Men's Grooming', a world-class luxury barbershop.
Analyze this client profile and recommend the ideal haircut and grooming regimen:
- Face Shape: ${req.faceShape}
- Hair Texture: ${req.hairTexture}
- Professional / Daily Lifestyle: ${req.lifestyle}
- Current Length: ${req.currentLength}
- Facial Hair / Beard Preference: ${req.beardPreference}

Return a STRICT JSON object with these exact keys:
{
  "recommendationName": "e.g., The Executive Mid-Taper Quiff",
  "recommendedBarber": "One of: Julian Vance (Scissor & Texture), Marcus Cole (Skin Fades & Lineups), Stefan Rossi (Beard & Razor)",
  "recommendedService": "One of: The Signature Atelier Haircut, Master Cut & Sculpted Beard, Precision Skin Fade & Taper, The Executive Grooming Ritual",
  "clipperGuardAndScissorFormula": "e.g., #1.5 on sides tapered to #0.5 around ear contour, 3.5 inches on crown point-cut for weight removal",
  "stylingProduct": "e.g., Atelier Matte Clay with Sea Salt Pre-Styler",
  "maintenanceCadenceWeeks": 3,
  "consultationRationale": "2 concise sentences explaining why this geometry balances their ${req.faceShape} face shape and suits their ${req.lifestyle} routine."
}
JSON ONLY. No markdown wrapper, no extra keys.`;

  // 1. Try OpenAI (gpt-4o-mini)
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.3,
          max_tokens: 500,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: "You are a senior master barber providing professional haircut consultation in valid JSON format.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return {
            recommendationName: parsed.recommendationName || "The Classic Executive Taper",
            recommendedBarber: parsed.recommendedBarber || "Julian Vance",
            recommendedService: parsed.recommendedService || "The Signature Atelier Haircut",
            clipperGuardAndScissorFormula: parsed.clipperGuardAndScissorFormula || "#2 to #1 low taper, point-cut scissor top",
            stylingProduct: parsed.stylingProduct || "Atelier Matte Paste",
            maintenanceCadenceWeeks: Number(parsed.maintenanceCadenceWeeks) || 3,
            consultationRationale: parsed.consultationRationale || "Balanced proportions highlighting jawline structure.",
            provider: "openai",
            model: "gpt-4o-mini",
            latencyMs: Date.now() - startTime,
          };
        }
      }
    } catch {
      // Fall through to Gemini
    }
  }

  // 2. Try Google Gemini (gemini-2.0-flash)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 500,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            recommendationName: parsed.recommendationName || "Modern Textured Crop & Low Fade",
            recommendedBarber: parsed.recommendedBarber || "Marcus Cole",
            recommendedService: parsed.recommendedService || "Precision Skin Fade & Taper",
            clipperGuardAndScissorFormula: parsed.clipperGuardAndScissorFormula || "#1 foil transition into blunt crown layers",
            stylingProduct: parsed.stylingProduct || "Atelier Styling Clay",
            maintenanceCadenceWeeks: Number(parsed.maintenanceCadenceWeeks) || 3,
            consultationRationale: parsed.consultationRationale || "Sharp angles creating geometric definition.",
            provider: "gemini",
            model: "gemini-2.0-flash",
            latencyMs: Date.now() - startTime,
          };
        }
      }
    } catch {
      // Fall through to deterministic
    }
  }

  // 3. Deterministic Local Fallback (Guaranteed 0ms offline immunity)
  const fallbackByShape: Record<string, StyleConsultationResponse> = {
    square: {
      recommendationName: "Classic Executive Scissor Taper & Razor Line",
      recommendedBarber: "Julian Vance",
      recommendedService: "The Signature Atelier Haircut",
      clipperGuardAndScissorFormula: "#2 on sides into scissor-over-comb transition; 3 inches left on top with textured point cutting",
      stylingProduct: "Atelier Featherweight Matte Paste",
      maintenanceCadenceWeeks: 3,
      consultationRationale: "A clean low taper complements strong jawline geometry without exaggerating width, while subtle top volume lengthens facial symmetry.",
      provider: "deterministic",
      model: "atelier-barber-engine-v1",
      latencyMs: Date.now() - startTime,
    },
    oval: {
      recommendationName: "Modern Textured Quiff & Mid Skin Fade",
      recommendedBarber: "Marcus Cole",
      recommendedService: "Precision Skin Fade & Taper",
      clipperGuardAndScissorFormula: "Skin fade starting at mid-ear; crown textured with feather razor for effortless directional sweep",
      stylingProduct: "Atelier Sea Salt Spray + Matte Pomade",
      maintenanceCadenceWeeks: 2,
      consultationRationale: "An oval structure supports versatile volume; the mid-fade sharpens temple boundaries while backward flow accentuates cheekbones.",
      provider: "deterministic",
      model: "atelier-barber-engine-v1",
      latencyMs: Date.now() - startTime,
    },
    round: {
      recommendationName: "High Pompadour with Hard Taper & Beard Sculpt",
      recommendedBarber: "Stefan Rossi",
      recommendedService: "Master Cut & Sculpted Beard",
      clipperGuardAndScissorFormula: "#1 closed on sideburns tapered into high temple; square graduation on crown with 4 inches front height",
      stylingProduct: "Atelier High Hold Texture Balm",
      maintenanceCadenceWeeks: 3,
      consultationRationale: "Vertical elevation on the crown combined with sharp angular beard lines slims facial roundness and establishes masculine definition.",
      provider: "deterministic",
      model: "atelier-barber-engine-v1",
      latencyMs: Date.now() - startTime,
    },
  };

  const selected = fallbackByShape[req.faceShape] || fallbackByShape.square;
  return {
    ...selected,
    latencyMs: Date.now() - startTime,
  };
}
