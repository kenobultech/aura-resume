import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min"; 
import puppeteer from "puppeteer-core";      
import connectDB from "@/lib/db";
import { Resume } from "@/models/Resume";
import os from "os"; 

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;

    await connectDB();
    const resume = await Resume.findById(id);
    if (!resume) return new NextResponse("Resume Not Found", { status: 404 });

    const baseUrl = process.env.NEXTAUTH_URL || `https://${req.headers.get("host")}` || req.nextUrl.origin;
    const previewUrl = `${baseUrl}/preview/${id}`;

    let browser;

    if (process.env.NODE_ENV === "production") {
      // VERCEL PRODUCTION: Dynamically download Chromium to bypass 50MB limit
      browser = await puppeteer.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        executablePath: await chromium.executablePath(
          `https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar`
        ),
        headless: true, // FIXED: hardcoded to true
      });
    } else {
      // LOCAL DEVELOPMENT (Works on Linux, Mac, Windows)
      let localExecutablePath = "";
      if (os.platform() === "win32") {
        localExecutablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
      } else if (os.platform() === "darwin") {
        localExecutablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
      } else {
        localExecutablePath = "/usr/bin/google-chrome"; 
      }

      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: localExecutablePath, 
        headless: true,
      });
    }
    
    const page = await browser.newPage();
    
    // We set the viewport here, which is why we don't need defaultViewport above!
    await page.setViewport({ width: 794, height: 1123 });
    
    await page.goto(previewUrl, { waitUntil: "networkidle2" });
    
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
    return new NextResponse(`Failed to generate PDF: ${error.message}`, { status: 500 });
  }
}