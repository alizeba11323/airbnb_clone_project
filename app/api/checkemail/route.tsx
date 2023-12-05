import dbConnect from "@/app/dbconfig/dbconnect";
import { genToken } from "@/app/helpers/genToken";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = await UserModel.findOne({ email });
    if (user) {
      const response = NextResponse.json({ success: true });
      const token = await genToken(
        { id: user._id, name: user.firstname },
        "1d",
        process.env.JWT_SECRET!
      );
      response.cookies.set("token", token, { httpOnly: true });
      return response;
    }
    return NextResponse.json({ success: false });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
