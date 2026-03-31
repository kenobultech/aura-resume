// app/api/resume/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Resume } from "@/models/Resume";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { RESUME_TEMPLATES } from "@/data/templates";
import mongoose from "mongoose";

// Helper to determine credit category from templateId
const getCategory = (templateId: string) => {
  const prefix = templateId.split("-")[0].toLowerCase();
  if (prefix === "corp") return "corporate";
  if (["creative", "basic", "pro"].includes(prefix)) return prefix;
  return "basic"; // fallback safety
};

export async function POST(req: NextRequest) {
  try {
    // 1. Validation: Body parsing
    const body = await req.json().catch(() => null);
    if (!body || !body.resumeId) {
       return NextResponse.json({ error: "Missing resumeId" }, { status: 400 });
    }
    const { resumeId } = body;

    // 2. Validation: ID Format
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 3. Fetch User & Resume
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId: user._id });
    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // 4. Check Template Type (Free vs Premium)
    const template = RESUME_TEMPLATES.find((t) => t.id === resume.templateId);
    const isFreeTemplate = template ? template.price === 0 : false;

    if (isFreeTemplate) {
      return NextResponse.json({ status: "allowed" });
    }

    // --- PREMIUM LOGIC ---

    // Combine First and Last Name and format for comparison
    const currentName = `${resume.personalInfo?.firstName || ""} ${resume.personalInfo?.lastName || ""}`.trim().toLowerCase();
    const category = getCategory(resume.templateId);

    // Case 1: Forever Unlock Check
    // If it is paid AND the name exactly matches what it was unlocked for
    if (resume.isPaid && resume.unlockedForName === currentName) {
      return NextResponse.json({ status: "allowed" });
    }

    // Case 2: Use Category Credit (Atomic Operation)
    let updatedUser = await User.findOneAndUpdate(
      { _id: user._id, [`credits.${category}`]: { $gt: 0 } }, // Condition: Has category credit
      { $inc: { [`credits.${category}`]: -1 } },              // Action: Decrease by 1
      { returnDocument: "after" }
    );

    // Case 3: Use Multi Credit Fallback (Atomic Operation)
    let usedMulti = false;
    if (!updatedUser) {
      updatedUser = await User.findOneAndUpdate(
        { _id: user._id, "credits.multi": { $gt: 0 } },       // Condition: Has multi credit
        { $inc: { "credits.multi": -1 } },                    // Action: Decrease by 1
        { returnDocument: "after" }
      );
      if (updatedUser) usedMulti = true;
    }

    // If a credit was successfully deducted (either Category or Multi)
    if (updatedUser) {
      // Unlock Resume forever for this specific name
      resume.isPaid = true;
      resume.paidAt = new Date();
      resume.unlockedForName = currentName;
      await resume.save();

      return NextResponse.json({ 
        status: "allowed", 
        creditTypeUsed: usedMulti ? "multi" : category 
      });
    }

    // Case 4: No Payment, No Category Credits, No Multi Credits
    return NextResponse.json({ status: "payment_required", category });

  } catch (error) {
    console.error("Download Route Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}