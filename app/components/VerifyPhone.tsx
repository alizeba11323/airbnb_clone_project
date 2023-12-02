import React, { useState } from "react";
interface VerifyPhoneProps {
  phoneNumber: string;
}
const VerifyPhone: React.FC<VerifyPhoneProps> = ({
  phoneNumber,
}): JSX.Element => {
  const [otp, setOTP] = useState("");
  return (
    <div>
      <div className="text-sm text-neutral-400">
        Enter the code we&apos;ve sent via SMS to {phoneNumber}:
      </div>
      <div className="flex gap-3">
        <input
          type="number"
          className="w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition"
        />
      </div>
    </div>
  );
};

export default VerifyPhone;
