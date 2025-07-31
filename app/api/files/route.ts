import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinata"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = (data as any).get("file");
    
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }
    
    const { cid } = await pinata.upload.public.file(file)
    console.log(cid)
    return NextResponse.json(cid, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}