import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
import { getDataFromToken } from "@/helper/getDataFromToken";   

// Connect to the database
connect();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;

        const user = await User.findOne({ verifyToken: token,verifyTokenExpire: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
      const savedUser =  await user.save();

        // Send verify email

        await sendEmail({
            email: user.email,
            emailType: "verify",
            userId: savedUser._id,
        });

        const response = NextResponse.json({ message: "Email verified successfully", success: true });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response; 
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

