import { useState, useEffect } from 'react'
import Loading from './Loading.jsx'

function Sismos() {
  const [dataApi, setDataAPi] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const req = await fetch('https://api.xor.cl/sismo/recent')
    const res = await req.json()
    setDataAPi(res.events)
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(dataApi)
  }, [dataApi])

  if (isLoading) {
    return (
      <div className='grid place-items-center mt-52'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 m-auto pt-5 pb-5'>
      {dataApi.map((item) => {
        return (
          <div key={item.id} className='border p-5 flex justify-between items-center h-full shadow'>
            <div className='h-full'>
              <p className='text-slate-500'>{item.local_date}</p>
              <p className='font-medium'>{item.geo_reference}</p>
            </div>
            <div className='h-full grid place-items-center'>
              <p className={item.magnitude.value > 4.0 ? 'border border-red-600 rounded p-2 bg-red-600 text-white font-semibold' : 'border border-slate-600 p-2 rounded bg-slate-600 text-white font-semibold'}>{item.magnitude.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Sismos