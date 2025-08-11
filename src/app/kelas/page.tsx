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
      <div className='flex justify-center'>
        <h1 className='text-7xl'>welcome to kelas</h1>
      </div>
      <div className='my-3 flex justify-center'>
        {
        !form.id &&
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setStatus(true)}>Tambah Kelas</button>
        }
      </div>
      {/* FORM */}
      {
        status &&
         <div className='flex justify-center'>
          <form action={simpanData} className='max-w-md mx-auto mb-5 bg-amber-100 p-5 rounded-xl'>
            <input type='text' name='id' value={form.id} onChange={(e:any)=>setForm({...form,id:e.target.value})}/>
              <div className='mb-5'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>KODE RUANGAN</label>
                  <input value={form.kode_ruangan} onChange={(e:any)=>setForm({...form,kode_ruangan:e.target.value})} type="text" name="kode_ruangan" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100' placeholder='Kode Ruangan'/>
              </div>
              <div className='mb-5'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>KELAS</label>
                  <input value={form.kelas} onChange={(e:any)=>setForm({...form,kelas:e.target.value})} type="text" name="kelas" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100' placeholder='Kode Ruangan'/>
              </div>
              <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                {
                  form.id == "" ? "Simpan" : "Update"
                }
              </button>
              <button onClick={()=>setStatus(false)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2'>Batal</button>
          </form>
      </div>

      }
     
      <div className='flex justify-center'>
        <table className='w-4xl'>
          <thead className='text-sm text-white uppercase bg-gray-400'>
            <tr>
              <th>KODE RUANGAN</th>
              <th>NAMA KELAS</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {
              rows.map((item) => (
                <tr key={item.id} className='text-center'>
                  <td className='col px-6 py-3 border-b border-amber-500'>{item.kode_ruangan}</td>
                  <td className='col px-6 py-3 border-b border-amber-500'>{item.nama}</td>
                  <td className='col px-6 py-3 border-b border-amber-500'>
                    <div className='gap-2'>
                      <button onClick={()=>edit(item)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>edit</button>
                      <button onClick={()=>deleteData(item.id)} className='bg-red-500 ml-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>

  )
}

export default Page