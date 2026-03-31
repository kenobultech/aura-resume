// app/api/resume/[id]/download-docx/route.ts
import { NextRequest, NextResponse } from "next/server";
import { 
  Document, Packer, Paragraph, TextRun, HeadingLevel, 
  AlignmentType, TabStopType, BorderStyle 
} from "docx";
import connectDB from "@/lib/db";
import { Resume } from "@/models/Resume";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    await connectDB();
    const resume = await Resume.findById(id);
    if (!resume) {
      return new NextResponse("Resume Not Found", { status: 404 });
    }

    const { personalInfo, experience, education, projects, skills, certificates, languages, hobbies } = resume;

    // --- Helper: Professional Section Headings with Bottom Border ---
    const createSectionHeading = (text: string) => {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        border: {
          bottom: {
            color: "000000",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      });
    };

    // --- Helper: Build contact line dynamically so it doesn't look messy if fields are missing ---
    const contactParts =[
      personalInfo.email,
      personalInfo.phone,
      [personalInfo.city, personalInfo.country].filter(Boolean).join(", "),
      personalInfo.website
    ].filter(Boolean);
    const contactLine = contactParts.join("  |  ");

    // --- Build the Word Document ---
    const doc = new Document({
      sections:[
        {
          properties: {},
          children:[
            // --- HEADER ---
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children:[
                new TextRun({ 
                  text: `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.toUpperCase(), 
                  bold: true, 
                  size: 36 // 18pt font
                }), 
              ],
            }),
            ...(personalInfo.role ?[
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 50, after: 50 },
                children:[new TextRun({ text: personalInfo.role, size: 24, color: "555555" })],
              })
            ] :[]),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
              children:[
                new TextRun({ 
                  text: contactLine, 
                  size: 20 
                }),
              ],
            }),

            // --- SUMMARY ---
            ...(personalInfo.summary ?[
              createSectionHeading("PROFESSIONAL SUMMARY"),
              new Paragraph({ text: personalInfo.summary, spacing: { after: 200 } }),
            ] : []),

            // --- EXPERIENCE ---
            ...(experience && experience.length > 0 ?[
              createSectionHeading("EXPERIENCE"),
              ...experience.map((exp: any) =>[
                new Paragraph({
                  // Right-aligns the dates
                  tabStops:[{ type: TabStopType.RIGHT, position: 9000 }],
                  children:[
                    new TextRun({ text: exp.jobTitle || "", bold: true }),
                    new TextRun({ text: exp.employer ? ` | ${exp.employer}` : "", italics: true }),
                    ...(exp.city ?[new TextRun({ text: `, ${exp.city}`, italics: true })] :[]),
                    new TextRun({ text: `\t${exp.startDate || ""} - ${exp.endDate || ""}`, bold: true }),
                  ],
                  spacing: { before: 150, after: 50 },
                }),
                // Splits description into native Word bullets
                ...(exp.description ? exp.description.split('\n').filter((line: string) => line.trim() !== "").map((line: string) => 
                  new Paragraph({
                    text: line.replace(/^[•\-\*]\s*/, ''),
                    bullet: { level: 0 },
                    spacing: { after: 50 }
                  })
                ) :[]),
              ]).flat(),
            ] : []),

            // --- PROJECTS ---
            ...(projects && projects.length > 0 ?[
              createSectionHeading("PROJECTS"),
              ...projects.map((proj: any) =>[
                new Paragraph({
                  tabStops: [{ type: TabStopType.RIGHT, position: 9000 }],
                  children:[
                    new TextRun({ text: proj.projectName || "", bold: true }),
                    ...(proj.link ?[new TextRun({ text: ` | ${proj.link}`, italics: true, color: "555555" })] :[]),
                    new TextRun({ text: `\t${proj.startDate || ""} - ${proj.endDate || ""}`, bold: true }),
                  ],
                  spacing: { before: 150, after: 50 },
                }),
                ...(proj.description ? proj.description.split('\n').filter((line: string) => line.trim() !== "").map((line: string) => 
                  new Paragraph({
                    text: line.replace(/^[•\-\*]\s*/, ''),
                    bullet: { level: 0 },
                    spacing: { after: 50 }
                  })
                ) : []),
              ]).flat(),
            ] :[]),

            // --- EDUCATION ---
            ...(education && education.length > 0 ?[
              createSectionHeading("EDUCATION"),
              ...education.map((edu: any) => [
                new Paragraph({
                  tabStops:[{ type: TabStopType.RIGHT, position: 9000 }],
                  children:[
                    new TextRun({ text: edu.degree || "", bold: true }),
                    new TextRun({ text: edu.school ? ` | ${edu.school}` : "", italics: true }),
                    new TextRun({ text: `\t${edu.startDate || ""} - ${edu.endDate || ""}`, bold: true }),
                  ],
                  spacing: { before: 100, after: 100 },
                }),
              ]).flat(),
            ] :[]),

            // --- SKILLS ---
            ...(skills && skills.length > 0 ?[
              createSectionHeading("SKILLS"),
              new Paragraph({ 
                text: Array.isArray(skills) ? skills.join("  •  ") : skills, 
                spacing: { after: 200 } 
              }),
            ] :[]),

            // --- CERTIFICATES ---
            ...(certificates && certificates.length > 0 ?[
              createSectionHeading("CERTIFICATES"),
              ...certificates.map((cert: any) => [
                new Paragraph({
                  children:[
                    new TextRun({ text: cert.name || "", bold: true }),
                    new TextRun({ text: ` - ${cert.issuer || ""} (${cert.date || ""})` }),
                  ],
                  spacing: { after: 50 }
                }),
              ]).flat(),
            ] :[]),

            // --- LANGUAGES ---
            ...(languages && languages.length > 0 ?[
              createSectionHeading("LANGUAGES"),
              new Paragraph({ 
                text: Array.isArray(languages) ? languages.join("  •  ") : languages, 
                spacing: { after: 200 } 
              }),
            ] :[]),

            // --- HOBBIES ---
            ...(hobbies && hobbies.length > 0 ?[
              createSectionHeading("INTERESTS & HOBBIES"),
              new Paragraph({ 
                text: Array.isArray(hobbies) ? hobbies.join("  •  ") : hobbies, 
                spacing: { after: 200 } 
              }),
            ] :[]),
          ],
        },
      ],
    });

    // Generate Node Buffer
    const buffer = await Packer.toBuffer(doc);

    // Return response with correct headers
    return new NextResponse(buffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${personalInfo.firstName || "Resume"}_ATS_Optimized.docx"`,
      },
    });

  } catch (error) {
    console.error("DOCX Generation Error:", error);
    return new NextResponse("Failed to generate DOCX", { status: 500 });
  }
}