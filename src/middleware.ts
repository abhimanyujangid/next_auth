import { NextResponse } from "next/server";
import  type { NextRequest } from "next/server";



export function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;
   const isPublicPath = path === "/login" || path === "/signup";

   const token = req.cookies.get('token')?.value || '';

   if(isPublicPath && token){
       return NextResponse.redirect(new URL("/profile", req.nextUrl).toString());
   }

   if(!isPublicPath && !token){
       return NextResponse.redirect(new URL("/login", req.nextUrl).toString());
   }

}


// see 'Matching Paths' in the documentation for more information
export const config = {
    matcher: ["/", "/profile", "/login", "/signup"],
};