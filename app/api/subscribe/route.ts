import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// Replace with your actual auth options import path if different
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";

export const dynamic = "force-dynamic"; 

export async function POST(req: Request) {
  try {
    // 1. Check if user has an active session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in to subscribe." },
        { status: 401 },
      );
    }
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    // 3. Update the user
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { isSubscribed: true } },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. Return success
    return NextResponse.json(
      { message: "Successfully subscribed!", isSubscribed: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: "An error occurred while subscribing." },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // If not logged in, they aren't subscribed
    if (!session || !session.user?.email) {
      return NextResponse.json({ isSubscribed: false }, { status: 200 });
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    // Find the user in the database
    const user = await User.findOne({ email: session.user.email });

    // Return their actual subscription status
    return NextResponse.json(
      { isSubscribed: user?.isSubscribed || false },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return NextResponse.json({ isSubscribed: false }, { status: 500 });
  }
}
