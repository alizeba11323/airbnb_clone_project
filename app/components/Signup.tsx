import React from "react";
import Input from "./Input";
import { ErrorType, IData } from "./Register";
interface ISignupProps {
  data: IData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: ErrorType;
}

function Signup({ data, handleChange, errors }: ISignupProps) {
  return (
    <div className="flex flex-col gap-2">
      <Input
        id="firstname"
        type="text"
        label="FirstName"
        onChange={handleChange}
        value={data.firstname}
        required
        errors={errors}
      />
      <Input
        id="lastname"
        type="text"
        label="Lastname"
        onChange={handleChange}
        value={data.lastname}
        required
        errors={errors}
      />
      <Input
        id="dob"
        type="date"
        label="Date Of Birth"
        onChange={handleChange}
        value={data.dob}
        required
        errors={errors}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        onChange={handleChange}
        value={data.password}
        required
        errors={errors}
      />
    </div>
  );
}

export default Signup;
