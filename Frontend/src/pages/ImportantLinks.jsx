import { LinkCard } from "@/components/LinkedCard";
import { linksData } from "@/config/linked";
import React from "react";

export const ImportantLinks = () => {
  return (
    <>
      <h1 class="text-center text-5xl mt-10 leading-[68px] md:text-6xl md:leading-[70px] font-semibold max-w-2xl">
        Important Link's to be Store
      </h1>
      <p class="text-center text-base max-w-lg mt-2">
        Our platform helps you build, test, and deliver faster — so you can
        focus on what matters.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 md:grid-cols-3 gap-8 p-4">
        {linksData.map((item, index) => (
          <LinkCard
            key={index}
            title={item.title}
            description={item.description}
            path={item.path}
            Icon={item.icon}
          />
        ))}
      </div>
    </>
  );
};
