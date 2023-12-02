import dbConnect from "@/app/dbconfig/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";
import bcrypt from "bcryptjs";
import { genToken } from "@/app/helpers/genToken";
dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { email, firstname, lastname, dob, password } = await req.json();
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists) {
      return NextResponse.json({
        success: false,
        message: "User Already Exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      password: hashPassword,
      firstname,
      lastname,
      dob,
    });
    const token = await genToken(
      { id: user._id, name: user.firstname },
      "1d",
      process.env.JWT_SECRET!
    );
    return NextResponse.json(
      { success: true, user, token, message: "user Register Successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
