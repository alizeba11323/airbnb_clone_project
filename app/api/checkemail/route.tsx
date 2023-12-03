import dbConnect from "@/app/dbconfig/dbconnect";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
