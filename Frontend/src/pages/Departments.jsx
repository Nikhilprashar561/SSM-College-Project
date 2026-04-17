import { Breadcrumb } from "@/components/Breadcrumb";
import React from "react";
import { Outlet } from "react-router-dom";

export const Departments = () => {
  return (
    <>
      <Breadcrumb />
      <Outlet />
    </>
  );
};
