// domain.com/verify/:token/asdkjfasdhajgf
// domain.com/verifytoken?token=asdk

import nodemailer from "nodemailer";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    // create hashed token
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    if(emailType == 'verify'){
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashToken,
            verifyTokenExpires: Date.now() + 3600000, // 1 hour
        });
    }else if(emailType == 'reset'){
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashToken,
            forgotPasswordTokenExpires: Date.now() + 3600000, // 1 hour
        });
    }


   const transporter = nodemailer.createTransport({
    // Looking to send emails in production? Check out our Email API/SMTP product!
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT!, 10),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
   });

   const mailOptions = {
    from: "abhimanyubansur@gmail.com",
    to: email,
    subject: emailType == 'verify' ? "Verify your email" : "Reset your password",
    html: emailType == 'verify' ? `<a href="${process.env.domain}/${hashToken}">Click here to verify your email</a>` : `<a href="${process.env.domain}/${hashToken}">Click here to reset your password</a>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailResponse));

  } catch (error: any) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};
