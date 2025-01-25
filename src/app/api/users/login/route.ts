import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// Connect to the database
connect();

// POST /api/users/login
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // Check if the password is correct 
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // create user Token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '8h' });

        const response = NextResponse.json({ message: "Login successful", success: true});
        response.cookies.set('token', token, { 
            httpOnly: true,
         });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}