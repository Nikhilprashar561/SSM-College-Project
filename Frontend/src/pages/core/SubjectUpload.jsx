import React from 'react'

import CommonForm from "@/components/common/form";
import { subjectUpload } from "../../config/index";

export const SubjectUpload = () => {
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
          Upload Subjects
        </h1>
      </div>
      <CommonForm
        formControls={subjectUpload}
        buttonText={"Upload"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}
