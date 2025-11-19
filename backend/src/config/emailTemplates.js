export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>

<head>
  <title>Email Verification</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #F4F6F8;
    }
    .container {
      max-width: 500px;
      margin: 50px auto;
      background: #ffffff;
      padding: 40px 30px;
      border-radius: 10px;
    }
    .title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .msg {
      font-size: 15px;
      margin-bottom: 15px;
      line-height: 1.5;
    }
    .otp-box {
      background: #22D172;
      color: #fff;
      text-align: center;
      padding: 12px 0;
      font-size: 18px;
      border-radius: 6px;
      font-weight: bold;
      width: 150px;
      margin: 20px auto;
    }
    .footer {
      margin-top: 20px;
      font-size: 13px;
      color: #555;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="title">Verify Your Email</div>

    <div class="msg">
      Hi,<br><br>
      We received a request to verify the email: 
      <strong style="color:#4C83EE;">{{email}}</strong>.
    </div>

    <div class="msg">
      Use the OTP below to complete your email verification.
    </div>

    <div class="otp-box">{{otp}}</div>

    <div class="msg">
      This OTP will expire in <strong>{{expiresIn}} minutes</strong>.
    </div>

    <div class="footer">
      If you did not request this, please ignore the message.
    </div>

  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>

<head>
  <title>Password Reset</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #F4F6F8;
    }
    .container {
      max-width: 500px;
      margin: 50px auto;
      background: #ffffff;
      padding: 40px 30px;
      border-radius: 10px;
    }
    .title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .msg {
      font-size: 15px;
      margin-bottom: 15px;
      line-height: 1.5;
    }
    .otp-box {
      background: #22D172;
      color: #fff;
      text-align: center;
      padding: 12px 0;
      font-size: 18px;
      border-radius: 6px;
      font-weight: bold;
      width: 150px;
      margin: 20px auto;
    }
    .footer {
      margin-top: 20px;
      font-size: 13px;
      color: #555;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="title">Reset Your Password</div>

    <div class="msg">
      A password reset was requested for the email:
      <strong style="color:#4C83EE;">{{email}}</strong>.
    </div>

    <div class="msg">
      Enter the OTP below to continue with resetting your password:
    </div>

    <div class="otp-box">{{otp}}</div>

    <div class="msg">
      This OTP is valid for <strong>{{expiresIn}} minutes</strong>.
    </div>

    <div class="footer">
      If you did not request this, please ignore the message.
    </div>

  </div>
</body>
</html>
`;
