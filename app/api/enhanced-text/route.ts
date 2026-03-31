//
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { text, context } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const prompt = `
      You are an expert Resume Writer and Career Coach. 
      Please improve the following text intended for a resume's "${context}" section.
      Make it highly professional, impactful, actionable, and ATS-friendly.
      Do not include any introductions, explanations, or quotes. Return ONLY the improved text.

      ORIGINAL TEXT:
      "${text}"
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const result = await model.generateContent(prompt);
    
    const improvedText = result.response.text().trim();

    return NextResponse.json({ improvedText });

  } catch (error) {
    console.error("AI Enhance Error:", error);
    return NextResponse.json({ error: "Failed to enhance text" }, { status: 500 });
  }
}