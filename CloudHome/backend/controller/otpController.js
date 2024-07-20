const nodemailer = require("nodemailer");
const OtpModel = require("../model/otpSchema"); // Assuming this is your OTP schema model
const sendOTPMail = async (email, otp) => {
  try {
    let mailer = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "coffeecoders2125@gmail.com",
        pass: "xhaafbpzzujdlqog", // Use environment variables for sensitive information
      },
    });

    const response = await mailer.sendMail({
      from: "abcd", // likhilesh@<home.cloud.app>
      to: email,
      subject: "OTP", // OTP verification for your account
      html: `
                <html>
                    <body>
                        <h1> Your OTP for Cloud Home APP is </h1>
                        <h1> ${otp} </h1>
                    </body>
                </html>
            `,
    });

    // console.log(response);

    return true;
  } catch (err) {
    console.log("--------------------------------");
    console.log(err);
    console.log("--------------------------------");

    return false;
  }
};

const generateOtp = async (req, res) => {
  try {
    const email  = "manikproch9858@gmail.com";
    console.log("Email-------------", email);
    console.log("Body-------", req.body);

    // Generate Random OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("Generated OTP:", otp);

    const isMailSent = await sendOTPMail(email, otp);
    if (!isMailSent) {
      return res.status(500).json({
        status: "Fail",
        message: `OTP NOT sent to ${email}`,
        data: {},
      });
    }

    // const otpEntry = new OtpModel({
    //     otp: otp,
    //     email: email,
    //     userId: 123,
    //     expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    // });
    // await otpEntry.save();

    res.status(201).json({
      status: "success",
      message: `OTP sent to ${email}`,
      data: {},
    });
  } catch (err) {
    console.log("----------------------------");
    console.log(err);
    console.log("----------------------------");
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      data: err,
    });
  }
};

module.exports = { generateOtp };
