import PhoneModel from "@/app/models/phone";
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();
    const accountSid = process.env.SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const code = Math.floor(100000 + Math.random() * 900000);
    const msg = await client.messages.create({
      body: "your otp is " + code,
      from: process.env.TWILLIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    if (msg.sid) {
      const phone = await PhoneModel.create({ phoneNumber, code });
      return NextResponse.json({
        success: true,
        message: "OTP Sent Successfully",
        phone,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
