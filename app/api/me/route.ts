import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token");
    if (token) {
      const usr = await jwt.verify(token.value, process.env.JWT_SECRET!);
      return NextResponse.json({
        success: true,
        message: "User Fetched Successfully",
        user: usr,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Please LoggedIn First",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
