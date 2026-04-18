import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { input, tone } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an excuse generator. Generate a single, creative, believable, and detailed excuse. Include backstory, specific details, and make it sound authentic. Reply with ONLY the excuse text — no quotes, no prefix, no explanation.\n\nI need a ${tone} excuse for this situation: ${input}. Make it 3-5 sentences with vivid details and a convincing narrative.`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.9,
      },
    });

    const excuse = result.response.text().trim();

    return NextResponse.json({ excuse });
  } catch (error: unknown) {
    console.error("OpenAI error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate excuse";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
