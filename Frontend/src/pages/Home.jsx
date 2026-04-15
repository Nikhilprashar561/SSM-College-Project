import { HeroSection } from "@/components/HeroSection";
import { OurStudents } from "@/components/OurStudents";
import Principal from "@/components/Principal";
import React from "react";

export const Home = () => {
  return (
    <>
      <HeroSection />
      <Principal />
      <OurStudents />
    </>
  );
};
