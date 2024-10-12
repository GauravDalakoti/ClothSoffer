import React, { useEffect, useState } from 'react'
import Offer from '../offers/Offer'
import CardItem from '../cardItem/CardItem'
import Toast from '../Toast/Toast'

export default function home() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    ; (async () => {

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/items/get-all-items`)

      const res = await response.json()
      setProducts(res.data)
      setLoading(false)

    })()

  }, [])

  return (
    <div className='min-h-[86vh]'>

      <Toast />
      <Offer />

      {
        loading ? (<div className='text-center font-semibold text-3xl my-6'>loading...</div>) : <div>
          <div className='w-[98vw] mx-auto p-4'>
            <div className='text-3xl font-semibold my-4'>Latest Trending Clothes</div>

            <div className='grid grid-cols-4 gap-6 py-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 justify-items-center justify-center'>

              {
                products.map((curitem) => (

                  <CardItem key={curitem._id} curitem={curitem} />
                ))
              }
            </div>

          </div>

          <div className='text-center my-8'>
            <a href="/all-products"><button className='rounded-3xl px-4 py-3 text-xl hover:scale-x-105 bg-gray-300 font-semibold '>Explore More</button></a>
          </div>

        </div>
      }

    </div>

  )
}
