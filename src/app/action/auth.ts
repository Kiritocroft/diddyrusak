"use server"
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/jwt';
import { setAuthCookie } from '@/lib/cookies';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RowDataPacket } from 'mysql2';
import { deleteAuthCookie } from '@/lib/cookies';
import { error } from 'console';

// REGISTER

export async function register(form: FormData) {
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    if (!name || !email || !password) {
        revalidatePath("/register");
        return {
            error: "Semua field harus diisi",
        }

    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await db();
    const [existingUser] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    if ((existingUser as RowDataPacket[])[0]) {
        connection.release();
        revalidatePath("/register");
        return {
            error: "Email sudah terdaftar",
        }

    }
    const [result] = await connection.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, "user"]
    )
    connection.release()
    const token = await createToken({ email })
    await setAuthCookie(token);
    revalidatePath("/register");

}

// LOGIN
export async function login(form: FormData) {
    const email=form.get('email') as string
    const password=form.get('password') as string
    if(!email || !password){
        revalidatePath("/login");
        return {
            error: "Semua field harus diisi",
        }
    }
    const connection = await db();
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email])
    connection.release()
    if(rows.length === 0){
        revalidatePath("/login");
        return {
            error: "Username tidak ditemukan",
        }
    }
    const user=rows[0] as {email: string, password: string}
    const isPasswordValid=await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return {
            error: "Password salah",
        }
    }
    const token = await createToken({ email: user.email });
    await setAuthCookie(token);
    revalidatePath("/dashboard");
}
// LOGOUT