import { MiddlewareConfig, NextResponse } from "next/server";

export function middleware(req: Request) {
  console.log(req);
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: "/news",
};
