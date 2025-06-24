import { MiddlewareConfig, NextResponse } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

export async function middleware() {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
