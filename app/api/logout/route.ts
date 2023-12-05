import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "User LoggedOut Successfully",
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    response.cookies.set("next-auth.session-token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
