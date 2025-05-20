import { GET as nextAuthGET, POST as nextAuthPOST } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    return await nextAuthGET(request);
  } catch (error) {
    console.error("[auth] GET handler error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    return await nextAuthPOST(request);
  } catch (error) {
    console.error("[auth] POST handler error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const runtime = "nodejs";
