import { refresh } from "app/actions/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const response = NextResponse.next();

  if (!accessToken) {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (refreshToken) {
      const accessToken = await refresh();

      if (accessToken) {
        response.cookies.set("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    }
  }

  return response;
}
