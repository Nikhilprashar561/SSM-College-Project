import React from 'react'

import CommonForm from "@/components/common/form";
import { DateSheetController } from "../../config/index";

export const DateSheet = () => {
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
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create Date Sheet
        </h1>
      </div>
      <CommonForm
        formControls={DateSheetController}
        buttonText={"Upload"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}
