"use client";
import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  AiFillFacebook,
  AiFillApple,
  AiFillPhone,
  AiFillMail,
} from "react-icons/ai";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { toast } from "react-hot-toast";
import { FcGoogle, FcPhone } from "react-icons/fc";
import useRegisterModel from "../hooks/useRegisterModel";
import Model from "./Model";
import Heading from "./Heading";
import Input from "./Input";
import Button from "./Button";
import PhoneInputElement from "./PhoneInput";
import VerifyPhone from "./VerifyPhone";
import Signup from "./Signup";
export interface ErrorType {
  email?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
  dob?: string;
  password?: string;
}
export interface IData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dob: string;
}
function Register() {
  const registerState = useRegisterModel();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errors, setErrors] = useState<ErrorType>({});
  const [data, setData] = useState<IData>({
    email: "",
    password: "",
    dob: "",
    firstname: "",
    lastname: "",
  });
  const [registerType, setRegisterType] = useState("email");
  const [hasNextPage, setNextPage] = useState(false);
  const handleClose = () => {
    registerState.onClose();
  };
  const handleSubmit = () => {
    setErrors({});
    if (registerType === "email" && !data.email) {
      setErrors((prev) => ({ ...prev, email: "Email is Required" }));
    } else if (registerType === "phone" && !phoneNumber) {
      toast.error("Please provide phone Number");
      setErrors((prev) => ({ ...prev, phone: "PhoneNumber is Required" }));
    } else if (registerType === "email" && hasNextPage) {
      console.log("Next Page You Are in");
    } else {
      setNextPage(true);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleGoogle = () => {};
  const handleFacebook = () => {};
  const handleEmail = () => {
    setRegisterType("email");
  };
  const handlePhone = () => {
    setRegisterType("phone");
  };
  const BodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" />

      {registerType === "phone" ? (
        hasNextPage ? (
          <VerifyPhone phoneNumber={phoneNumber} />
        ) : (
          <PhoneInputElement
            value={phoneNumber}
            onChange={(val) => setPhoneNumber(val)}
          />
        )
      ) : hasNextPage ? (
        <Signup errors={errors} handleChange={handleChange} data={data} />
      ) : (
        <Input
          id="email"
          type="email"
          label="Email"
          onChange={handleChange}
          value={data.email}
          required
          errors={errors}
        />
      )}
    </div>
  );
  const FooterContent = (
    <div className="flex flex-col gap-4 mt-4 h-[220px] overflow-y-scroll">
      <hr />
      <Button
        outline
        label="Continue With Google"
        onClick={handleGoogle}
        icon={FcGoogle}
      />
      <Button
        label="Continue With Apple"
        outline
        onClick={handleGoogle}
        icon={AiFillApple}
      />
      <Button
        label="Continue With Facebook"
        onClick={handleFacebook}
        outline
        icon={AiFillFacebook}
      />
      {registerType === "email" ? (
        <Button
          label="Continue With Phone"
          onClick={handlePhone}
          outline
          icon={MdOutlinePhoneAndroid}
        />
      ) : (
        <Button
          label="Continue With Email"
          onClick={handleEmail}
          outline
          icon={AiFillMail}
        />
      )}
    </div>
  );
  return (
    <div>
      <Model
        onClose={handleClose}
        actionLabel={
          hasNextPage && registerType === "email"
            ? "Agree and Continue"
            : "Continue"
        }
        title={
          hasNextPage && registerType === "email"
            ? "Finish signing up"
            : hasNextPage && registerType === "phone"
            ? "Confirm your number"
            : "Log in or sign up"
        }
        isOpen={registerState.isOpen}
        onSubmit={handleSubmit}
        body={BodyContent}
        footer={FooterContent}
        hasNextPage={hasNextPage}
        setNextPage={setNextPage}
      />
    </div>
  );
}

export default Register;
