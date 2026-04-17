import React, { useState } from "react";
import { X } from "lucide-react";

const SelectLoginType = ({ close }) => {

  const [open, setOpen] = useState(false);

  return (
    <div
      className="
      fixed inset-0 z-50
      bg-white/40 backdrop-blur-md
      flex items-center justify-center
    "
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={close}
        className="fixed top-4 right-4 cursor-pointer z-50 h-9 w-9 rounded-full p-0"
      >
        <X className="h-5 text-black w-5" />
      </button>

      {/* DROPDOWN */}
      <div className="flex flex-col w-44 text-sm">

        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-4 pr-2 py-2 border cursor-pointer border-black rounded bg-white text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Verify your identity
        </button>

        {open && (
          <ul className="overflow-hidden w-44 text-black bg-white border rounded shadow-md mt-2 py-1">
            <li className="px-4 py-2 hover:bg-gray-500/10">
              <a href="/principal-register">Principal</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-500/10">
              <a href="/hod-register">Head of Department</a>
            </li>

            <li className="px-4 py-2 hover:bg-gray-500/10">
              <a href="/teacher-register">College Teacher</a>
            </li>

            <li className="px-4 py-2 hover:bg-gray-500/10">
              <a href="/student-register">College Student</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-500/10">
              <a href="/devloper-register">Admin Developer</a>
            </li>
          </ul>
        )}

      </div>
    </div>
  );
};

export default SelectLoginType;