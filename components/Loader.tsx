"use client";

import React from "react";
import { Oval } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Oval
      visible={true}
      height="40"
      width="40"
      color="#0735AC"
      secondaryColor="#0A4CF6"
      ariaLabel="завантаження"
      wrapperClass="loader"
    />
  );
};

Loader;
