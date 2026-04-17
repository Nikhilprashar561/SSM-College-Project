import { ArtsHod } from "@/components/ArtsHod";
import { HeroSection } from "@/components/HeroSection";
import { HodSection } from "@/components/HodSection";
import { OurResults } from "@/components/OurResults";
import { OurStudents } from "@/components/OurStudents";
import { OurTeacher } from "@/components/OurTeacher";
import Principal from "@/components/Principal";
import { ScienceHod } from "@/components/ScienceHod";
import React from "react";

export const Home = () => {
  return (
    <>
      <HeroSection />
      <Principal />
      <HodSection />
      <ScienceHod />
      <ArtsHod/>
      <OurTeacher />
      <OurResults />
      <OurStudents />
    </>
  );
};
