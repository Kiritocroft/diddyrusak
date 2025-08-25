"use client"
import React, { useState, useEffect } from 'react'
import { getKelas,createKelas,hapusData,updateKelas } from "@/app/action/kelas"

function Page() {
  const [rows, setRows] = useState<any[]>([])
  const[status,setStatus]=useState<boolean>(false)
  const[cekid,setCekid]=useState<any>()
  const[form,setForm]=useState<any>({
    id:"",
    kode_ruangan:"",
    kelas:""
  })
  const simpanData=async(form:FormData)=>{
      if (cekid) {
        await updateKelas(form)
        setStatus(false)
        setCekid("")
        ambilKelas()
      } else {
        await createKelas(form)
        setStatus(false)
        ambilKelas()
      }
  }
  const ambilKelas = async () => {
    const data = await getKelas()
    setRows(data)
    console.log(data)
  }
  const deleteData=async(id:number)=>{
    await hapusData(id)
    ambilKelas()
  }
  const edit=async(data:any)=>{
    setStatus(true)
    setForm({
      id:data.id,
      kode_ruangan:data.kode_ruangan,
      kelas:data.nama
    })
  }

  useEffect(() => {
    ambilKelas()
  }, [])
  return (
    <>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-black'>Data Kelas</h1>
          {
            !form.id && (
              <button 
                className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 flex items-center' 
                onClick={() => setStatus(true)}
              >
                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
                Tambah Kelas
              </button>
            )
          }
        </div>
      </div>
      {/* FORM */}
      {
        status &&
         <div className='flex justify-center'>
          <form action={simpanData} className='max-w-md mx-auto mb-5 bg-white shadow-lg rounded-xl p-8'>
            <input type='hidden' name='id' value={form.id} onChange={(e:any)=>setForm({...form,id:e.target.value})}/>
              <div className='mb-5'>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>Kode Ruangan</label>
                  <input 
                    value={form.kode_ruangan} 
                    onChange={(e:any)=>setForm({...form,kode_ruangan:e.target.value})} 
                    type="text" 
                    name="kode_ruangan" 
                    required
                    className='shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200' 
                    placeholder='Masukkan kode ruangan'/>
              </div>
              <div className='mb-5'>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>Kelas</label>
                  <input 
                    value={form.kelas} 
                    onChange={(e:any)=>setForm({...form,kelas:e.target.value})} 
                    type="text" 
                    name="kelas" 
                    required
                    className='shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200' 
                    placeholder='Masukkan nama kelas'/>
              </div>
              <div className='flex justify-end space-x-2 mt-6'>
                <button 
                  type="submit" 
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-200'>
                  {form.id == "" ? "Simpan" : "Update"}
                </button>
                <button 
                  type="button"
                  onClick={()=>setStatus(false)} 
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-200'>
                  Batal
                </button>
              </div>
          </form>
      </div>

      }
     
      <div className='flex justify-center p-4'>
        <div className='w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden'>
          <table className='w-full'>
            <thead className='text-sm text-white uppercase bg-gray-600'>
              <tr>
                <th className='px-6 py-3'>KODE RUANGAN</th>
                <th className='px-6 py-3'>NAMA KELAS</th>
                <th className='px-6 py-3'>AKSI</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {
                rows.map((item) => (
                  <tr key={item.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 text-black text-center'>{item.kode_ruangan}</td>
                    <td className='px-6 py-4 text-black text-center'>{item.nama}</td>
                    <td className='px-6 py-4 text-center'>
                      <div className='flex justify-center space-x-2'>
                        <button 
                          onClick={()=>edit(item)} 
                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200'>
                          Edit
                        </button>
                        <button 
                          onClick={()=>deleteData(item.id)} 
                          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200'>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>

  )
}

export default Page