import { cookies } from "next/headers";
const COOKIE_NAME="auth-token";

export async function setAuthCookie(token:any) {
    const cookieStore = await cookies();
    cookieStore.set(
        COOKIE_NAME,token,{
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24  ,
            path: "/",


        }

    )
    
}
export async function getAuthCookie() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME);
    return token ? token.value : null;
}
export async function deleteAuthCookie() {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)
}