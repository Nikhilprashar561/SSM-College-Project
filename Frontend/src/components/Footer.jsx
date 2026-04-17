import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
            
                * {
                    font-family: "Poppins", sans-serif;Z
                }
            `}</style>
      <footer className="bg-gray-700 py-12 mt-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
            <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
              <Link className="text-3xl text-white" href="https://prebuiltui.com">
                SSM College <br/> Dinanagar
              </Link>
              <div className="w-full max-w-52 h-px mt-8 bg-linear-to-r from-black via-white/25 to-black"></div>
              <p className="text-sm text-white/60 mt-6 max-w-sm leading-relaxed">
                Empowering students through quality education, innovation, and growth. Shaping future leaders with knowledge, skills, and real-world experience
              </p>
            </div>

            <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-sm text-white font-medium">
                Important Links
              </h3>
              <div className="flex flex-col gap-2 mt-6">
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  College Events
                </Link>
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Teachers
                </Link>
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  HOD's
                </Link>
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Student Achivements
                </Link>
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Courses Offered
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-sm text-white font-medium">Departments</h3>
              <div className="flex flex-col gap-2 mt-6">
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Computer Science
                </Link>
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Commerce
                </Link>
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Arts & Science
                </Link>
                <Link
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                 Fashion Designing
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-sm text-white font-medium">
                Subscribe for admissions
              </h3>
              <div className="flex items-center border gap-2 border-white/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
                <input
                  type="email"
                  placeholder="Enter your email.."
                  className="w-full h-full pl-6 outline-none text-sm bg-transparent text-white placeholder-white/60 placeholder:text-xs"
                  required
                />
                <button
                  type="submit"
                  className="bg-linear-to-b from-[#5623D8] to-[#7B53E2] active:scale-95 transition w-56 h-10 rounded-full text-sm text-white cursor-pointer mr-1.5"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60">© 2026 SSM College</p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <div className="w-px h-4 bg-white/20"></div>
              <Link
                href="#"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
