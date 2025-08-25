'use client'
import { useState, useEffect } from 'react'
import { uploadFile, getUpload } from '../action/upload'
function Page() {
  const [hasil, setHasil] = useState<any>(null)
  const [loading, setLoading] = useState<any>(false)
  const [uploads, setUploads] = useState<any[]>([])
  useEffect(() => {
    loadUploads()
  }, [])

  const loadUploads = async () => {
    try {
      const data = await getUpload()
      setUploads(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading uploads:', error)
    }
  }

  const handleSubmit=async(form:FormData)=>{
    try {
      setLoading(true)
      const response= await uploadFile(form)
      setHasil({gambar:response.gambar, judul:response.judul})
      loadUploads()
    } catch (error) {
      throw error
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='max-w-7xl mx-auto px-4'>
      <div className='text-center py-8'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Upload Gambar</h1>
        <p className='text-gray-600'>Unggah dan bagikan gambar Anda dengan mudah</p>
      </div>
      <div className='max-w-xl mx-auto'>
        <form action={handleSubmit} className='bg-white rounded-xl shadow-lg p-8'>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Judul Gambar</label>
            <input 
              type='text' 
              name='judul' 
              placeholder='Masukkan judul gambar' 
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200' 
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>File Gambar</label>
            <input 
              type='file' 
              name='gambar' 
              accept='image/*' 
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200' 
              required
            />
          </div>
          <button 
            type='submit' 
            disabled={loading} 
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center'>
            {loading ? (
              <>
                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Uploading...
              </>
            ) : 'Upload Gambar'}
          </button>
        </form>
      </div>
      {/* Hasil Upload Terbaru */}
      {hasil && (
        <div className='max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold mb-4'>Upload Berhasil</h2>
          <div className='flex items-center space-x-4'>
            <img src={hasil.gambar} alt={hasil.judul} className='w-32 h-32 object-cover rounded-lg' />
            <div>
              <p className='text-lg font-semibold'>Judul: {hasil.judul}</p>
            </div>
          </div>
        </div>
      )}

      {/* Galeri Upload */}
      <div className='max-w-7xl mx-auto mt-12 p-4'>
        <h2 className='text-3xl font-bold mb-6'>Galeri Upload</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {uploads.map((item: any) => (
            <div key={item.id} className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
              <div className='aspect-w-16 aspect-h-9'>
                <img src={item.gambar} alt={item.judul} className='w-full h-64 object-cover' />
              </div>
              <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2'>{item.judul}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page