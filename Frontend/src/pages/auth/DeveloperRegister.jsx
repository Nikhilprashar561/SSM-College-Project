import React from 'react'

import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { registerControlsForDeveloper } from "../../config/index";

const initialState = {
  email: "",
  password: "",
};

export const DeveloperRegister = () => {

    const [formData, setFormData] = React.useState(initialState);
  
    function onSubmit(event) {
      event.preventDefault();
      alert("Abe Chirkunde");
    }

  return (
    <div className="mx-auto mt-10 w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerControlsForDeveloper}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}
