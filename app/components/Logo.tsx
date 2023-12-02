"use client";
import Image from "next/image";
import React from "react";
import LogoNew from "../../public/images/logo.png";
import { useRouter } from "next/navigation";
function Logo() {
  const router = useRouter();
  return (
    <div
      className="hidden md:block cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image alt="Logo" src={LogoNew} width="100" height="100" />
    </div>
  );
}

export default Logo;
