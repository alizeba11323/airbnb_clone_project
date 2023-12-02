import dbConnect from "@/app/dbconfig/dbconnect";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { genToken } from "@/app/helpers/genToken";
dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const isUserExists = await UserModel.findOne({ email });
    if (!isUserExists)
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 200 }
      );
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExists.password
    );
    if (!isPasswordMatched)
      return NextResponse.json(
        { success: false, message: "Password Not Macthed" },
        { status: 200 }
      );
    const token = await genToken(
      { id: isUserExists._id, name: isUserExists.firstname },
      "1d",
      process.env.JWT_SECRET!
    );
    const response = NextResponse.json(
      { success: true, token, message: "user logged in Successfully" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err: any) {
    NextResponse.json({ success: false, message: err.message });
  }
}
