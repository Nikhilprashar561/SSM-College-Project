import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transport = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user: process.env.NODEMAILER_GMAIL,
        pass : process.env.NODEMAILER_GMAIL_PASS
    }
})

const SendTransPort = async ({sendTom, Subject, html}) => {
    
        const info = await transport.sendMail({
            from: `SSM College <${process.env.NODEMAILER_GMAIL}>`,
            to : sendTom,
            subject : Subject,
            html : html
        })
        if(!info){
            console.log("Email Was Not send")
        }
        //return info
    }


export { SendTransPort }