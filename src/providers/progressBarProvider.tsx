"use client";

import { ReactNode } from "react";
import { AppProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppProgressBar height="10px" color="#307b80" />
      {children}
    </>
  );
};

export default Providers;
