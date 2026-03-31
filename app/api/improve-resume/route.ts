// app/api/improve-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    // 1. Get the uploaded file from FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No PDF file uploaded" }, { status: 400 });
    }

    // 2. Convert the PDF file to a Base64 string (Required by Gemini)
    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    // 3. Prompt: Ask Gemini to BOTH extract the resume AND provide improvements
    const prompt = `
      You are an expert HR Manager and Resume Writer. I have provided a candidate's resume as a PDF.
      
      TASK 1: Extract the resume into a clean JSON structure.
      TASK 2: Identify weak descriptions, summaries, or bullet points in the extracted data, and provide specific rewrites.

      CRITICAL RULE FOR TASK 2: The "originalText" in your improvements MUST be an exact, word-for-word copy of a string from your extracted JSON so a script can programmatically find and replace it.

      Return the response using this EXACT JSON schema:
      {
        "resumeData": {
          "name": "string",
          "summary": "string",
          "experience":[
            {
              "role": "string",
              "company": "string",
              "description": "string"
            }
          ]
        },
        "analysis": {
          "score": number,
          "overallFeedback": "string",
          "actionableImprovements":[
            {
              "originalText": "string",
              "improvedText": "string",
              "explanation": "string"
            }
          ]
        }
      }
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      generationConfig: {
        responseMimeType: "application/json", 
      }
    });

    // 4. Send the PDF and Prompt to Gemini
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: "application/pdf"
        }
      },
      prompt
    ]);

    const text = result.response.text();
    const parsedData = JSON.parse(text);

    // This returns BOTH the structured resume data and the AI analysis
    return NextResponse.json(parsedData);

  } catch (error) {
    console.error("PDF AI Analysis Error:", error);
    return NextResponse.json({ error: "Failed to process PDF resume" }, { status: 500 });
  }
}