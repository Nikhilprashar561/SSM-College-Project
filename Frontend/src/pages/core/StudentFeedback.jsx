import React from 'react'

import CommonForm from "@/components/common/form";
import { Feedback } from "../../config/index";

export const StudentFeedback = () => {
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
          Teacher Feedback
        </h1>
      </div>
      <CommonForm
        formControls={Feedback}
        buttonText={"Upload"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}
