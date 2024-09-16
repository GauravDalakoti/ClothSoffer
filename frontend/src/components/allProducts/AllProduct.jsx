import React, { useState, useEffect } from 'react'
import CardItem from '../cardItem/CardItem'
import Toast from '../Toast/Toast'

function AllProduct() {

    const [products, setProducts] = useState([])

    useEffect(() => {

        ; (async () => {

            const response = await fetch("http://localhost:8000/api/v1/items/get-all-items")

            const res = await response.json()
            setProducts(res.data)

        })()

    }, [])

    return (
        <div className='w-[95vw] mx-auto p-2'>
            <Toast />

            <div className='text-3xl font-semibold pb-6 text-center'>Latest Trending Clothes</div>
            <div className='grid grid-cols-4 gap-8 mb-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 justify-items-center justify-center'>
                {
                    products.map((curitem) => (
                        <CardItem curitem={curitem} />
                    ))
                }
            </div>
        </div>
    )
}

export default AllProduct