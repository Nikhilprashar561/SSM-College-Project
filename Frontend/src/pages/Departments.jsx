import React from "react";
import { Link } from "react-router-dom";
import { FaLaptopCode, FaAtom, FaChartLine } from "react-icons/fa";

export const Departments = () => {
    return (
      <>
      <h1 class="text-center text-3xl leading-[68px] md:text-5xl md:leading-[70px] font-semibold max-w-2xl">
        Select Your Department
      </h1>
        <div className="text-sm w-72 p-3 bg-white border mt-10 border-gray-500/30 text-gray-800/80 rounded-md font-medium">
            <ul className="flex flex-col gap-px">
                <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                    <Link to={"/department-computer-science"}>Department of Computer Science</Link>
                    <FaLaptopCode size={25} />
                </li>
                <div className="w-full h-px bg-gray-300/50 my-2"></div>
                <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                    <Link to={"/department-commerce"}>Department of Commerce</Link>
                    <FaChartLine size={25} />
                </li>
                <div className="w-full h-px bg-gray-300/50 my-2"></div>
                <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                    <Link to={"/department-arts-science"}>Department of Arts & Science</Link>
                    <FaAtom size={25} />
                </li>
            </ul>
        </div>
      </>
    );
};

