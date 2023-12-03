"use client";
import React, { useEffect } from "react";
import Container from "./Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthModel, { RegisterStoreType } from "../hooks/useAuthModel";
const getMe = async (authModel: RegisterStoreType) => {
  try {
    const res = await axios.get("http://localhost:3000/api/me");
    if (res?.data.success) {
      toast.success(res.data.message);
      authModel.onLogin(res.data.user);
    }
  } catch (err: any) {
    console.log(err.message);
  }
};
function Navbar() {
  const authModel = useAuthModel();
  useEffect(() => {
    getMe(authModel);
  }, [authModel.isAuth]);
  return (
    <div className="fixed shadow-sm z-10 w-full bg-white">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;
