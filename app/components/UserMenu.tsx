"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModel from "../hooks/useRegisterModel";
import useAuthModel from "../hooks/useAuthModel";
import toast from "react-hot-toast";
import axios from "axios";
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const registerHook = useRegisterModel();
  const authModel = useAuthModel();
  const handleUser = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const handleMenuToggle = async (openType: string) => {
    if (openType === "logout") {
      try {
        const res = await axios.get("http://localhost:3000/api/logout");
        if (res?.data.success) {
          toast.success(res.data.message);
          authModel.onLogout();
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      registerHook.onOpen(openType);
    }
  };
  const handleAirbnbHome = () => {};
  return (
    <div className="relative">
      <div className="flex flex-row  items-center gap-3">
        <div
          onClick={handleAirbnbHome}
          className="hidden md:block text-sm  font-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={handleUser}
          className="p-4 md:py-2 md:px-2 rounded-full flex flex-row items-center border-[1px] border-neutral-200 transition cursor-pointer hover:shadow-sm gap-2"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-12 w-[40vw] md:w-3/4 right-4 text-sm  overflow-hidden  bg-white rounded-lg">
          <div className="flex flex-col cursor-pointer">
            <>
              {authModel.isAuth ? (
                <MenuItem
                  label="Logout"
                  onClick={() => handleMenuToggle("logout")}
                />
              ) : (
                <>
                  <MenuItem
                    label="Login"
                    onClick={() => handleMenuToggle("login")}
                  />
                  <MenuItem
                    label="Sign Up"
                    onClick={() => handleMenuToggle("register")}
                  />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
