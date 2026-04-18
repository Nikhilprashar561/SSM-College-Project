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
    <>
    <h5 className="text-4xl md:text-[52px]/[65px] font-semibold text-center max-w-3xl mt-16 bg-gradient-to-r from-slate-900 to-[#6D8FE4] text-transparent bg-clip-text">
      Swami Swatantranand Memorial College, Dinanagar
    </h5>
    <div className="mx-auto w-full mb-16 max-w-md space-y-6">
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
    </>
  )
}
