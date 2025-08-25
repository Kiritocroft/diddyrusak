'use server'
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import path from 'path';

export async function getUpload() {
    let con = null
    try {
        con = await db()
        const [rows] = await con.query("SELECT * FROM tb_upload ORDER BY id DESC")
        return rows
    } catch (error) {
        console.error('Database error:', error)
        throw new Error('Gagal mengambil data dari database')
    } finally {
        if (con) con.release()
    }
}

export async function uploadFile(form: FormData){
    const gambar = form.get("gambar") as File
    const judul = form.get("judul") as string
    
    // Validasi input
    if(!gambar){
        throw new Error("Gambar dan judul harus diisi")
    }
    if(!judul){
        throw new Error("Judul harus diisi")
    }
    
    // Validasi tipe file
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!validImageTypes.includes(gambar.type)) {
        throw new Error(`Tipe file tidak valid. Hanya menerima: ${validImageTypes.join(', ')}`)
    }
    
    // Validasi ukuran file (maksimal 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB dalam bytes
    if (gambar.size > MAX_FILE_SIZE) {
        throw new Error(`Ukuran file terlalu besar. Maksimal 5MB.`)
    }
    
    // Persiapkan direktori upload
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await fs.mkdir(uploadDir, {recursive: true})
    
    // Bersihkan nama file dari karakter yang tidak valid
    const fileExt = gambar.name.split('.').pop() || ''
    const safeFileName = `${Date.now()}-${judul.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExt}`
    const filePath = `/uploads/${safeFileName}`
    const fullPath = path.join(process.cwd(), "public", filePath)

    try {
        // Konversi file ke buffer dan simpan
        const buffer = Buffer.from(await gambar.arrayBuffer())
        await fs.writeFile(fullPath, buffer)
    } catch (error) {
        console.error('Error saving file:', error)
        throw new Error('Gagal menyimpan file. Silakan coba lagi.')
    }

    let con = null
    try {
        con = await db()
        await con.query("INSERT INTO tb_upload(judul,gambar) VALUES(?,?)",[judul,filePath])
        
        return {
            status: "success",
            gambar: filePath,
            judul: judul
        }
    } catch (error) {
        console.error('Database error:', error)
        // Jika terjadi error database, hapus file yang sudah diupload
        try {
            await fs.unlink(fullPath)
        } catch (unlinkError) {
            console.error('Error deleting file after failed DB operation:', unlinkError)
        }
        throw new Error('Gagal menyimpan data ke database')
    } finally {
        if (con) con.release()
    }
}
