"use server"
import {db} from "@/lib/db"
import { revalidatePath } from "next/cache"

// CREATE
export async function createKelas(form:FormData){
    const connection=await db()
    const kode_ruangan=form.get("kode_ruangan") as string
    const kelas=form.get("kelas") as string
    await connection.query(
        "INSERT INTO tb_kelas(kode_ruangan,nama) VALUES(?,?)",[kode_ruangan,kelas]
    )
    connection.release()
    revalidatePath("/kelas")
}

// READ
export async function getKelas(){
    const connection=await db()
    const[rows]=await connection.query(
        "SELECT * FROM tb_kelas"
    )
    connection.release()
    return rows as any[]

}
// UPDATE
export async function updateKelas(form:FormData){
    const connection=await db()
    const id=form.get("id") as string
    const kode_ruangan=form.get("kode_ruangan") as string
    const kelas=form.get("kelas") as string
    await connection.query(
        "UPDATE tb_kelas SET kode_ruangan=?,nama=? WHERE id=?",[kode_ruangan,kelas,id]
    )
    connection.release()
    revalidatePath("/kelas")
}

// DELETE
export async function hapusData(id:number){
    const con=await db()
    await con.query("DELETE FROM tb_kelas WHERE id=?",[id])
    con.release()
    revalidatePath("/kelas")
}