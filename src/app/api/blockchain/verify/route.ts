import { NextResponse } from "next/server";
import { z } from "zod";

import { verifyInvoiceOnPolygon } from "@/lib/services/blockchain";

const schema = z.object({
  invoiceNumber: z.string().min(1)
});

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  return NextResponse.json(await verifyInvoiceOnPolygon(body.invoiceNumber));
}
