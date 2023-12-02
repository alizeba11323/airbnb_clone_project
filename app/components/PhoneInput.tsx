import React from "react";
import PhoneInput from "react-phone-number-input";
function PhoneInputElement({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: string) => void;
}) {
  return (
    <PhoneInput
      className="flex flex-col"
      international
      countryCallingCodeEditable={false}
      defaultCountry="IN"
      value={value}
      onChange={onChange}
    />
  );
}

export default PhoneInputElement;
