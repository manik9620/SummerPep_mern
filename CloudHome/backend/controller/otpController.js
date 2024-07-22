const nodemailer = require("nodemailer");
const OtpModel = require("../model/otpSchema");

const sendOTPMail = async (email, otp) => {
  try {
    let mailer = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.OTP_SENDER_EMAIL,
        pass: process.env.OTP_SENDER_PASSWORD,
      },
    });

    const response = await mailer.sendMail({
      from: "abcd", // likhilesh@<home.cloud.app>
      to: email,
      subject: "OTP", // OTP verification for your account
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px;">
            <div style="max-width: 600px; margin: auto; background-color: white; padding: 10px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333;">Your OTP for Cloud Home is</h2>
              <h1 style="font-size: 36px; color: #4CAF50;">${otp}</h1>
              <p style="font-size: 16px; color: #666;">Please use this OTP to complete your verification process. If you did not request this, please ignore this email.</p>
              <hr style="border: none; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #999;">This is an automated message, please do not reply to this email.</p>
            </div>
          </body>
        </html>
      `,
    });

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
    const { email, _id } = req.user;

    const otp = Math.floor(1000 + Math.random() * 9000);
    const isMailSent = await sendOTPMail(email, otp);

    const sentOTPMail = await OtpModel.findOne({
      email,
      createdAt: {
        $gte: Date.now() - 10 * 60 * 1000,
      },
    });
    console.log("sentOTPMail:", sentOTPMail);

    if (sentOTPMail) {
      res.status(200);
      res.json({
        status: "already_sent",
        message: `Otp already sent to ${email}`,
        data: {
          createdAt: sentOTPMail.createdAt,
        },
      });
      return;
    }

    if (!isMailSent) {
      res.status(500);
      res.json({
        status: "Fail",
        message: `Your Email: ${email} is not correct`,
        data: {},
      });
    }

    // create a entry in database with that OTP
    const otpEntry = new OtpModel({
      otp: otp,
      email: email,
      userId: _id,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP expires in 10 minutes
    });

    await otpEntry.save();

    res.status(201);
    res.json({
      status: "success",
      message: `Otp sent to ${email}`,
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

const verifyOtp = async (req, res) => {
  try {
    const { email } = req.user;
    const { otp } = req.body;
    console.log("email------------", email);
    console.log("otp------------", otp);

    // Finding the OTP entry in the database
    const otpEntry = await OtpModel.findOne({ email }).sort({ createdAt: -1 });

    if (!otpEntry) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid OTP or email",
      });
    }

    // Check if the OTP has expired
    if (otpEntry.expiresAt < Date.now()) {
      return res.status(400).json({
        status: "fail",
        message: "OTP has expired",
      });
    }

    // Verify the OTP
    const isMatch = await otpEntry.verifyOtp(otp.toString(), otpEntry.otp);

    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid OTP",
      });
    }

    // Mark the OTP as verified
    otpEntry.isVerified = true;
    await otpEntry.save();

    res.status(200).json({
      status: "success",
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.log("----------------------------");
    console.log(err);
    console.log("----------------------------");
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      data: err.message,
    });
  }
};

module.exports = { generateOtp, verifyOtp };
