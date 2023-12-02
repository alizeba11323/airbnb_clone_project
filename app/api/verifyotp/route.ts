import PhoneModel from "@/app/models/phone";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, OTP } = await req.json();
    const phone = await PhoneModel.findOne({ phoneNumber });
    if (!phone)
      return NextResponse.json({
        success: false,
        message: "Phone Not Found",
        phone,
      });
    if (phone.code !== OTP) {
      return NextResponse.json({
        success: false,
        message: "Wrong OTP",
      });
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
