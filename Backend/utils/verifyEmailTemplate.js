const verifyEmailTemplate = ({ name, url }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
    <style>
      body {
        background-color: #f4f4f7;
        font-family: Arial, sans-serif;
        padding: 20px;
        color: #333;
      }
      .email-container {
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        max-width: 600px;
        margin: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .btn {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        background-color: #007BFF;
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #777777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2>Welcome to <span style="color: #ffffff;">SSM College Dinanagar</span>!</h2>
      <p><strong>Your One-Line Description:</strong> We provide modern solutions to connect your business digitally.</p>
      <hr style="margin: 20px 0;">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for registering. To complete your sign-up, please verify your email address by clicking the button below:</p>
      <a href="${url}" class="btn">Verify Email</a>
      <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
      <p><a href="${url}">${url}</a></p>
      <div class="footer">
        &copy; ${new Date().getFullYear()} YourOrgName. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

export { verifyEmailTemplate };
