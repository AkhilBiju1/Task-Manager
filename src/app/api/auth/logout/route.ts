import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.delete('token')

    response.headers.set("X-User-Name", "");
    response.headers.set("X-User-id", "");

    return response;
}