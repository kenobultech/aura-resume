import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium"; 
import puppeteer from "puppeteer-core";      
import connectDB from "@/lib/db";
import { Resume } from "@/models/Resume";
import os from "os"; // <-- ADD THIS IMPORT

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;

    // 1. Fetch Resume
    await connectDB();
    const resume = await Resume.findById(id);
    if (!resume) return new NextResponse("Resume Not Found", { status: 404 });

    const baseUrl = process.env.NEXTAUTH_URL || req.nextUrl.origin;
    const previewUrl = `${baseUrl}/preview/${id}`;

    // 2. LAUNCH LOGIC
    let browser;

    if (process.env.NODE_ENV === "production") {
      // PRODUCTION SETTINGS
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(), 
        headless: chromium.headless,
      });
    } else {
      // LOCAL DEVELOPMENT SETTINGS
      
      // Auto-detect OS to find Chrome
      let localExecutablePath = "";
      if (os.platform() === "win32") {
        localExecutablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
      } else if (os.platform() === "darwin") {
        localExecutablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
      } else {
        // LINUX PATHS (Ubuntu/Debian)
        localExecutablePath = "/usr/bin/google-chrome"; 
      }

      browser = await puppeteer.launch({
        headless: true,
        // Added --disable-setuid-sandbox which is often required on Linux
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: localExecutablePath, 
      });
    }
    
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123 });
    
    await page.goto(previewUrl, { waitUntil: "networkidle0" });
    
    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" }
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfUint8Array), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resume.personalInfo.firstName}_Resume.pdf"`,
      },
    });

  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}