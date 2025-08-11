'use client'
import { useState } from 'react'
import { uploadFile } from '../action/upload'
function Page() {
  const [hasil, setHasil] = useState<any>(null)
  const [loading, setLoading] = useState<any>(false)
  const handleSubmit=async(form:FormData)=>{
    try {
      setLoading(true)
      const response= await uploadFile(form)
      setHasil({gambar:response.gambar, judul:response.judul})
    } catch (error) {
      throw error
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='mx-auto'>
      <div className='flex justify-center'>
        <h1 className='text-5xl'>UPLOAD GAMBAR</h1>
      </div>
      <div className='flex justify-center'>
        <form action={handleSubmit} className='flex flex-col space-y-4 w-full max-w-md'>
          <input type='text' name='judul' placeholder='Judul Gambar' className='border p-2 rounded' />
          <input type='file' name='gambar' accept='image/*' className='border p-2 rounded' />
          <button type='submit' disabled={loading} className='bg-amber-600
           text-white p-2'>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
      <div>
        {
          hasil && (
            <div>
              <h2 className='text-2xl'>Hasil Upload</h2>
              <p>Judul: {hasil.judul}</p>
              <img src={hasil.gambar} alt={hasil.judul} className='w-full max-w-md' />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Page