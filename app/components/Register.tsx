"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { AiFillFacebook, AiFillApple, AiFillMail } from "react-icons/ai";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useRegisterModel from "../hooks/useRegisterModel";
import Model from "./Model";
import Heading from "./Heading";
import Input from "./Input";
import { signIn, useSession } from "next-auth/react";
import Button from "./Button";
import PhoneInputElement from "./PhoneInput";
import VerifyPhone from "./VerifyPhone";
import Signup from "./Signup";
import useAuthModel from "../hooks/useAuthModel";
export interface ErrorType {
  email?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
  dob?: string;
  password?: string;
}
interface User {
  _id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}
interface SuccessRegisterResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}
export interface IData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dob: string;
  phone?: string;
}
function Register() {
  const session = useSession();
  console.log(session);
  const registerState = useRegisterModel();
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneRegister, setPhoneRegister] = useState(false);
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
  const authModel = useAuthModel();
  useEffect(() => {
    const getSignUP = async () => {
      if (session.data?.user) {
        try {
          const res = await axios.post("http://localhost:3000/api/checkemail", {
            email: session?.data?.user?.email,
          });
          if (res?.data?.success) {
            toast.success("user loggedIn Successfully");
            return;
          } else {
            setData((prev) => ({
              ...prev,
              email: session?.data?.user?.email!,
              firstname: session?.data?.user?.name?.split(" ")[0]!,
              lastname: session?.data?.user?.name?.split(" ")[1]!,
            }));
            setRegisterType("email");
            setNextPage(true);
            registerState.onOpen(registerState.isOpenType);
          }
        } catch (err) {
          toast.error("Something Went Wrong");
        }
      }
    };
    getSignUP();
  }, [session?.data?.user?.email]);
  const handleClose = () => {
    registerState.onClose();
  };
  const handleSubmit = async () => {
    setErrors({});
    if (registerType === "email" && !data.email) {
      toast.error("Email is Required");
      setErrors((prev) => ({ ...prev, email: "Email is Required" }));
      return;
    } else if (
      registerType === "email" &&
      !data.email &&
      !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        data.email
      )
    ) {
      toast.error("Email Should Be Valid");
      return;
    }
    if (registerType === "phone" && !phoneNumber) {
      toast.error("Please provide phone Number");
      setErrors((prev) => ({ ...prev, phone: "PhoneNumber is Required" }));
      return;
    }
    if (
      registerType === "phone" &&
      hasNextPage &&
      !phoneRegister &&
      (registerState.isOpenType === "register" ||
        registerState.isOpenType === "login")
    ) {
      try {
        const passedData = {
          phoneNumber,
          otp,
          ...(registerState.isOpenType === "login" && { isLoginFor: true }),
        };
        setLoading(true);
        const res = await axios.post(
          "http://localhost:3000/api/verifyotp",
          passedData
        );
        if (res?.data.success) {
          if (res?.data?.phoneExists) {
            toast.success(res.data.message);
            setNextPage(false);
            authModel.onHandleAuthFLag();
            registerState.onClose();
          } else {
            toast.success(res.data.message);
            setPhoneRegister(true);
          }
        }
        toast.success(res.data.message);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setOTP("");
        setLoading(false);
      }
      return;
    }
    if (
      registerType === "phone" &&
      !hasNextPage &&
      (registerState.isOpenType === "register" ||
        registerState.isOpenType === "login")
    ) {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:3000/api/phoneLogin", {
          phoneNumber,
        });
        if (res?.data.success) {
          toast.success(res.data.message);
          setNextPage(true);
        }
        toast.success(res.data.message);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (
      (registerType === "email" &&
        hasNextPage &&
        registerState.isOpenType === "register") ||
      (registerType === "phone" && phoneRegister)
    ) {
      if (
        !data.email ||
        !data.password ||
        !data.dob ||
        !data.firstname ||
        !data.lastname
      ) {
        toast.error("Please All Field Data");
        return;
      }
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:3000/api/signup", {
          ...data,
          phone: phoneNumber,
          registerType,
        });
        if (res?.data.success) {
          toast.success(res.data.message);
          authModel.onHandleAuthFLag();
          setData({
            email: "",
            password: "",
            dob: "",
            firstname: "",
            lastname: "",
          });
          setPhoneNumber("");
          setNextPage(false);
          registerState.onClose();
          setPhoneRegister(false);
        }
        toast.success(res.data.message);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }
    if (
      registerType === "email" &&
      hasNextPage &&
      registerState.isOpenType === "login"
    ) {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:3000/api/login", data);
        if (res?.data.success) {
          toast.success(res.data.message);
          authModel.onHandleAuthFLag();
          setData({
            email: "",
            password: "",
            dob: "",
            firstname: "",
            lastname: "",
          });
          setNextPage(false);
          registerState.onClose();
        }
        toast.success(res.data.message);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setNextPage(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGoogle = () => {
    signIn();
    data;
  };
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
          phoneRegister ? (
            <Signup
              errors={errors}
              handleChange={handleChange}
              data={data}
              registerType={registerType}
            />
          ) : (
            <VerifyPhone phoneNumber={phoneNumber} otp={otp} setOTP={setOTP} />
          )
        ) : (
          <PhoneInputElement
            value={phoneNumber}
            onChange={(val) => setPhoneNumber(val)}
          />
        )
      ) : hasNextPage ? (
        registerState.isOpenType === "login" ? (
          <Input
            id="password"
            type="password"
            label="Password"
            onChange={handleChange}
            value={data.password}
            required
            errors={errors}
          />
        ) : (
          <Signup
            errors={errors}
            handleChange={handleChange}
            data={data}
            registerType={registerType}
          />
        )
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
        onClick={() => {}}
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
            ? loading
              ? "Loading..."
              : "Agree and Continue"
            : loading
            ? "Loading..."
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
        phoneRegister={phoneRegister}
        setPhoneRegister={setPhoneRegister}
      />
    </div>
  );
}

export default Register;
