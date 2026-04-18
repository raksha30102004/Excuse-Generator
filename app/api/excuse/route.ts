import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { situation, tone } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an excuse generator. Generate a single, creative, believable, and detailed excuse. Include backstory, specific details, and make it sound authentic. Reply with ONLY the excuse text — no quotes, no prefix, no explanation.",
        },
        {
          role: "user",
          content: `Generate a ${tone} excuse for: ${situation}. Make it 3-5 sentences with vivid details and a convincing narrative.`,
        },
      ],
      max_tokens: 250,
      temperature: 0.9,
    });

    const excuse = completion.choices[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ excuse });
  } catch (error: unknown) {
    console.error("OpenAI error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate excuse";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
