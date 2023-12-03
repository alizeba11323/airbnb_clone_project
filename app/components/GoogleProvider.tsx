"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
interface IGoogleProvider {
  children: React.ReactNode;
}
function GoogleProvider(props: IGoogleProvider) {
  return <SessionProvider>{props.children}</SessionProvider>;
}

export default GoogleProvider;
