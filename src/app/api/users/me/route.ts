import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();


export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findById({_id: userId}).select("-password");
        return NextResponse.json({messsage: "User data", data: user});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}