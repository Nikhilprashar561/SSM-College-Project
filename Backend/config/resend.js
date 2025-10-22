import { Resend } from "resend"
import dotenv from "dotenv"
import { ApiErrors } from "../utils/ApiError.js"

dotenv.config()

const Resend_Api = process.env.RESEND_API

if(!Resend_Api){
    throw new ApiErrors(400, "Resend Api Key not found")
}
const resend = new Resend(Resend_Api)

const SendEmail = async ({sendTO, subject, html}) => {
    try {
        
      const { data, error } = await resend.emails.send({
            from : `SSM College Dinanagar <onboarding@resend.dev>`,
            to : sendTO,
            subject : subject,
            html : html
        })

        if(error){
            throw new ApiErrors(400, "error While send a Email")
        }
        return data
    } catch (error) {
        throw new ApiErrors(400, "Error While Sending a Email Address to user")
    }
}

export { SendEmail }