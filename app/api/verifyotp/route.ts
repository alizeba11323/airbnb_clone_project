import { genToken } from "@/app/helpers/genToken";
import PhoneModel from "@/app/models/phone";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, otp, isLoginFor } = await req.json();
    const phone = await PhoneModel.findOne({ phoneNumber });
    if (!phone)
      return NextResponse.json({
        success: false,
        message: "Phone Not Found",
        phone,
      });
    if (phone.code !== otp) {
      return NextResponse.json({
        success: false,
        message: "Wrong OTP",
      });
    }

    await PhoneModel.findByIdAndDelete(phone._id);
    if (isLoginFor) {
      const phoneExists = await UserModel.findOne({ phone: phoneNumber });
      if (!phoneExists) {
        return NextResponse.json({
          success: true,
          phoneExists: false,
        });
      } else {
        const token = await genToken(
          { id: phoneExists._id, name: phoneExists.firstname },
          "1d",
          process.env.JWT_SECRET!
        );
        const response = NextResponse.json({
          success: true,
          phoneExists: true,
          message: "User LoggedIn Successfully",
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
      }
    }
    return NextResponse.json({
      success: true,
      message: "Phone Verified Successfully",
      phone,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
