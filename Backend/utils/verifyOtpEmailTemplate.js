const verifyOtpEmailTemplate = ({name, otp, description, organization}) => {
    return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #000000; color: #ffffff;">
      <tr>
        <td style="padding: 30px 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 28px;">Hello ${name},</h2>
          <p style="margin: 10px 0 20px; font-size: 16px;">
            ${description}
          </p>
          <p style="margin-bottom: 30px; font-size: 14px; opacity: 0.8;">From ${organization}</p>

          <a href="/" style="
            display: inline-block;
            background-color: #ffffff;
            color: #000000;
            text-decoration: none;
            padding: 14px 24px;
            font-size: 22px;
            font-weight: bold;
            border-radius: 6px;
            letter-spacing: 4px;
          ">
            ${otp}
          </a>

          <p style="margin-top: 40px; font-size: 12px; color: #bbbbbb;">
            If you didn’t request this OTP, please ignore this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
    `
}

export { verifyOtpEmailTemplate }