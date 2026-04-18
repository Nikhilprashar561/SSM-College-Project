import React from 'react'

import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { registerControlsForPrincipal } from "../../config/index";

export const PrincipalRegister = () => {

    const initialState = {
    email: "",
    password: "",
  };
  
      const [formData, setFormData] = React.useState(initialState);
    
      function onSubmit(event) {
        event.preventDefault();
        alert("Abe Chirkunde");
      }
  return (
    <>
    <h5 className="text-4xl md:text-[52px]/[65px] font-semibold text-center max-w-3xl mt-16 bg-gradient-to-r from-slate-900 to-[#6D8FE4] text-transparent bg-clip-text">
      Swami Swatantranand Memorial College, Dinanagar
    </h5>
     <div className="mx-auto mt-10 w-full mb-16 max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 cursor-pointer text-blue-400 hover:underline"
            to={"/login"}
            >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerControlsForPrincipal}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
    </div>
    </>
  )
}
