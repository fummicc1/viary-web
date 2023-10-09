import { getServerSession } from "next-auth";
import options from "@/options";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const session = await getServerSession(options()); // セッション情報を取得
  if (session) {
    return NextResponse.redirect(new URL("/timeline", request.url));
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};
