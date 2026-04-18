import React from "react";

import CommonForm from "@/components/common/form";
import { loginFormControls } from "../../config/index";
import SelectLoginType from "@/components/SelectLoginType";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [formData, setFormData] = React.useState(initialState);
  const [SelectOpen, setSelectOpen] = React.useState(false)

  function onSubmit(event) {
    event.preventDefault();
    alert("Abe Chirkunde");
  }
  
  return (
    <>
    <h5 className="text-4xl md:text-[52px]/[65px] font-semibold text-center max-w-3xl mt-16 bg-gradient-to-r from-slate-900 to-[#6D8FE4] text-transparent bg-clip-text">
      Swami Swatantranand Memorial College, Dinanagar
    </h5>
    <div className="mx-auto w-full mt-10 mb-16 max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <p
           onClick={() => setSelectOpen(true)} 
           className="font-medium ml-2 cursor-pointer text-blue-400 hover:underline"
          >
            Register
          </p>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
      {SelectOpen && <SelectLoginType close={() => setSelectOpen(false)} />}
    </div>
    </>
    
  );
};
