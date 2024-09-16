// import React, { useState } from 'react'
import { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'

function AllProducts() {

  const [allProducts, setAllProducts] = useState([])
  useEffect(() => {

    (async () => {

      const response = await fetch("http://localhost:8000/api/v1/items/get-all-items", {

        method: "GET",
        headers: {

          "Content-Type": "application/json"
        }

      })

      if (response.ok) {

        const res = await response.json()
        console.log(res);

        setAllProducts(res.data)
      }

    })()


  }, [])


  const removeItem = async (_id) => {

    const response = await fetch("http://localhost:8000/api/v1/items/remove-item", {

      method: "POST",
      headers: {

        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id })

    })

    if (response.ok) {

      const res = await response.json()
      console.log(res);

      setAllProducts(res.data)
    }
  }

  return (

    <div>
      <h1 className='text-center text-3xl font-semibold py-6'>All Products</h1>
      <div className='flex flex-col gap-4 h-[87vh] overflow-y-auto '>

        {
          allProducts.map((curitem) => (

            <div key={curitem._id} className='flex justify-center items-center mx-auto gap-6 rounded-lg p-2 border-2 border-gray-400 w-[75vw] max-lg:flex-col max-lg:w-[70vw]'>

              <img className='h-24 object-contain max-lg:h-[90vh] max-md:h-[70vh] max-sm:h-[40vh]' src={curitem.images[0]} alt="" />
              <div className='flex gap-8 justify-center max-lg:flex-col max-lg:items-center max-lg:gap-2'>
                <span className='text-xl font-serif w-64 max-md:text-lg max-lg:text-center'>{curitem.name}</span>

                <div className='flex flex-col gap-1 justify-center items-center'>
                  <div className='text-xl font-bold'>rating:</div>
                  <div className='flex'>
                    <div className='text-xl'>{curitem.rating}</div>
                    <img src={assets.rating} alt="" width={25} />
                  </div>
                </div>

                <div className='flex gap-1 '>
                  <span className='text-xl font-bold'>price</span>
                  <p className='text-xl'> ₹ {curitem.price}</p>
                </div>


              </div>

              <div>

                <button onClick={() => removeItem(curitem.name)} className=' text-white rounded-lg px-3 py-2 text-xl font-semibold hover:scale-105 bg-red-500 hover:bg-green-500'>remove item</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllProducts