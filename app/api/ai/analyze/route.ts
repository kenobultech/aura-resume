import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { resumeData } = await req.json();

    if (!resumeData) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // 1. Construct the Prompt (Slightly simplified since we enforce JSON later)
    const prompt = `
      You are an expert HR Manager and Resume Writer. Analyze the following resume data.
      
      RESUME DATA:
      ${JSON.stringify(resumeData)}

      Please provide a critique and score based on:
      1. Impact (Quantifiable metrics, numbers, ROI).
      2. Clarity and Grammar.
      3. ATS Compatibility (Keywords).

      Return the response using this exact JSON schema:
      {
        "score": number, // 0-100
        "summaryFeedback": "string", 
        "bulletPointsFeedback": "string", 
        "generalSuggestions": 
      }
    `;

    // 2. Call a CURRENT Gemini Model & Enforce JSON
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",       generationConfig: {
        responseMimeType: "application/json", // <-- ADDED: Forces raw JSON output natively
      }
    });
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 3. Cleanly parse the JSON (Regex cleanup is no longer needed)
    const analysis = JSON.parse(text);

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}