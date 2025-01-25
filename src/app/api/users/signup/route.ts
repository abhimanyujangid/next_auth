import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

// Connect to the database
connect();

// POST /api/users/signup
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if(!newUser){
            return NextResponse.json({ error: "User not created" }, { status: 400 });
        }

        // Save the user to the database
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            user: savedUser,
            success: true
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
};

