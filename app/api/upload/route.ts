// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
// CHANGE THIS LINE BELOW:
import { v2 as cloudinary } from 'cloudinary'; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { 
                folder: "resume_photos",
                resource_type: "image",
                // This ensures the face is centered and cropped to a square
                transformation: [
                    { width: 400, height: 400, crop: "fill", gravity: "face" } 
                ] 
            },
            (error: any, result: unknown) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}