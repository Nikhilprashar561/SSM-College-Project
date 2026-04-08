import React from "react";

import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { loginFormControls } from "../../config/index";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [formData, setFormData] = React.useState(initialState);

  function onSubmit(event) {
    event.preventDefault();
    alert("Abe Chirkunde");
  }
  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-blue-400 hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};
