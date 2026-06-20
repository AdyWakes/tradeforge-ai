import { NextResponse } from "next/server";
import { z } from "zod";

import { generateAssistantReply } from "@/lib/services/assistant";

const schema = z.object({
  message: z.string().min(1)
});

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  return NextResponse.json({ reply: generateAssistantReply(body.message) });
}
