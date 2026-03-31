// app/api/resumes/[id]/download-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import connectDB from "@/lib/db";
import { Resume } from "@/models/Resume";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextRequest, 
  // 1. Update the type to be a Promise
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // 2. Await the params to unwrap them
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // 1. Verify User Session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

    // 2. Fetch Resume
    await connectDB();
    // 3. Use the unwrapped `id`
    const resume = await Resume.findById(id);
    if (!resume) return new NextResponse("Resume Not Found", { status: 404 });

    // 3. Construct the internal URL for Puppeteer to visit
    const baseUrl = process.env.NEXTAUTH_URL || req.nextUrl.origin;
    // 4. Use the unwrapped `id` here too
    const previewUrl = `${baseUrl}/preview/${id}`;

    // 4. Launch Puppeteer & Generate PDF
    const browser = await puppeteer.launch({ 
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const page = await browser.newPage();
    
    // Visit the clean page we created in Step 2
    await page.goto(previewUrl, { waitUntil: "networkidle0" });
    
    // page.pdf returns a Uint8Array
    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" }
    });

    await browser.close();

    // 5. Send the file to the user
    // Convert Uint8Array to Buffer using Buffer.from()
    return new NextResponse(Buffer.from(pdfUint8Array), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // Ensure filenames are safe (remove spaces/special chars if needed)
        "Content-Disposition": `attachment; filename="${resume.personalInfo.firstName}_Resume.pdf"`,
      },
    });

  } catch (error) {
    console.error("PDF Generation Error:", error);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}