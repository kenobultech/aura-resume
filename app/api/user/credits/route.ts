// app/api/user/credits/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path if needed
import connectDB from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ credits: 0 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email }).select("credits");

    return NextResponse.json({ credits: user?.credits || 0 });
  } catch (error) {
    console.error("Error fetching credits:", error);
    return NextResponse.json({ credits: 0 });
  }
}