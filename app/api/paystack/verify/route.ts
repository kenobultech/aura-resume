// app/api/paystack/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Transaction } from "@/models/Transactions";
import { Resume } from "@/models/Resume";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();
    await connectDB();

    // 1. Verify with Paystack
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackRes.json();

    if (!paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json({ status: "failed" });
    }

    // 2. Find our local transaction record
    const transaction = await Transaction.findOne({ reference });

    if (!transaction) {
      return NextResponse.json({ status: "not_found" });
    }

    // 3. Idempotency Check (Prevent double updates)
    if (transaction.status === "success") {
      return NextResponse.json({ status: "already_verified" });
    }

    // 4. Mark Transaction as Success
    transaction.status = "success";
    await transaction.save();

    // 5. Handle Logic based on Plan Type

    // SCENARIO A: User bought a Bundle/Subscription (e.g., Corporate Bundle or Multi Bundle)
    if (transaction.plan === "bundle") {
      // Determine which category bucket to fill. Fallback to 'multi' if undefined.
      const category = transaction.targetCategory || "multi"; 
      
      await User.findByIdAndUpdate(transaction.userId, {
        // Dynamically increment the correct category!
        $inc: { [`credits.${category}`]: transaction.creditsPurchased }, 
      });
    }
    
    // SCENARIO B: User paid specifically for one resume (Pay-As-You-Go)
    else if (transaction.plan === "single" && transaction.resumeId) {
      const resume = await Resume.findById(transaction.resumeId);
      
      if (resume) {
        // Lock it to the current name just like we do in the credit flow!
        const currentName = `${resume.personalInfo?.firstName || ""} ${resume.personalInfo?.lastName || ""}`.trim().toLowerCase();
        
        resume.isPaid = true;
        resume.paidAt = new Date();
        resume.unlockedForName = currentName;
        
        await resume.save();
      }
    }

    return NextResponse.json({ status: "success" });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ status: "error" });
  }
}