'use server'
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(form: FormData){
    const gambar= form.get("gambar") as File
    const judul=form.get("judul") as string
    if(!gambar){
        throw new Error("Gambar dan judul harus diisi")
    }
   const uploadDir=path.join(process.cwd(),"public","uploads")
    await fs.mkdir(uploadDir,{recursive:true})
    const filePath=`/uploads/${Date.now()}-${gambar.name}`
    const fullPath=path.join(process.cwd(), "public", filePath)

    const buffer=Buffer.from(await gambar.arrayBuffer())
    await fs.writeFile(fullPath,buffer)

    const con=await db()
    await con.query("INSERT INTO tb_upload(judul,gambar) VALUES(?,?)",[judul,filePath])
    con.release()
    return {
        status: "success",
        gambar: filePath,
        judul: judul
    }
}
