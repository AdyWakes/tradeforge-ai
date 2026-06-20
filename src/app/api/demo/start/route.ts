import { NextResponse, type NextRequest } from "next/server";

const defaultNextPath = "/dashboard";

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return defaultNextPath;
  }

  return value;
}

export function GET(request: NextRequest) {
  const nextPath = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const response = NextResponse.redirect(new URL(nextPath, request.url));

  response.cookies.set("tf_session", "demo", {
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax"
  });

  return response;
}
