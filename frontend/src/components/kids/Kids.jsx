import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import CardItem from "../cardItem/CardItem"
import Toast from '../Toast/Toast'

function Kids() {

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        ; (async () => {

            const response = await fetch("http://localhost:8000/api/v1/items/get-all-items")

            const res = await response.json()

            setProducts(res.data)
            setLoading(false)

        })()

    }, [])

    return (
        <div>

            <Toast />
            <img src={assets.kids} alt="" />
            {
                loading ? (<div className='text-center font-semibold text-3xl my-6'>loading...</div>) : <div>
                    <p className='text-center font-serif font-semibold text-3xl py-8 max-md:text-2xl'>Kids Trending Clothes</p>
                    <div className='w-[98vw] mx-auto p-4'>
                        <section className='mb-8'>
                            <div className='grid grid-cols-4 gap-6 mb-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 justify-items-center justify-center'>
                                {
                                    products.map((curitem,index) => curitem.category === "kids" && <CardItem key={index} curitem={curitem} />)
                                }
                            </div>

                        </section>
                    </div>
                </div>
            }
        </div>
    )
}

export default Kids