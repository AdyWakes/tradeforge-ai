import { NextResponse } from "next/server";
import { z } from "zod";

import { analyzeInvoiceFile } from "@/lib/services/invoice-ai";

const schema = z.object({
  fileName: z.string().min(1)
});

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  return NextResponse.json(analyzeInvoiceFile(body.fileName));
}
