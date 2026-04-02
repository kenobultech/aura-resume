// app/api/resume/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { Resume } from "@/models/Resume";
import { User } from "@/models/User";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("CRITICAL CONNECTION ERROR:", err);
    throw err;
  }
};

// GET: Load the resume
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. FIX: Grab the templateId from the URL query
    const { searchParams } = new URL(req.url);
    const templateId = searchParams.get("templateId");

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. FIX: Search by BOTH user ID and template ID
    const query: any = { userId: user._id };
    if (templateId) {
      query.templateId = templateId; 
    }

    // This now fetches the specific resume for the selected template
    const resume = await Resume.findOne(query).sort({ updatedAt: -1 });

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("GET Resume Error:", error);
    return NextResponse.json({ error: "Error fetching resume" }, { status: 500 });
  }
}

// POST: Save (Upsert) the resume
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const targetTemplateId = body.templateId || 'free-1';

    // 3. CRITICAL FIX: Match by both userId AND templateId
    const resume = await Resume.findOneAndUpdate(
      { 
        userId: user._id, 
        templateId: targetTemplateId // <--- Now it separates resumes by template!
      }, 
      {
        $set: {
          templateId: targetTemplateId,
          themeColor: body.themeColor,
          personalInfo: body.personalInfo,
          experience: body.experience,
          education: body.education,
          skills: body.skills,
          certificates: body.certificates, 
          languages: body.languages,       
          hobbies: body.hobbies,           
          aiAnalysis: body.aiAnalysis      
        }
      },
      { returnDocument: 'after', upsert: true } 
    );

    return NextResponse.json({ success: true, resume });
    
  } catch (error) {
    console.error("POST Resume Error:", error);
    return NextResponse.json({ error: "Error saving resume" }, { status: 500 });
  }
}