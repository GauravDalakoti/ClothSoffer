import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../context/cartContext/cartContext'
import CartProduct from "./cartProduct/CartProduct"

function Cart() {

    const { cartItems, setCartItems, discount } = useContext(CartContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        ; (async () => {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/carts/get-cart-products`, {

                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                credentials: "include"
            })
            const res = await response.json()
            setCartItems(res.data)
            setLoading(false)

        })()

    }, [])

    const { totalPrice } = useContext(CartContext)

    if (cartItems.length < 1) return (<div className='min-h-[85vh] p-6 text-3xl font-bold text-center'>No Item found</div>)

    return (

        <div className='min-h-[85vh] p-6'>

            <a className='flex justify-end' href="/yourOrders"><h1 className='font-semibold border-2 border-black w-fit bg-green-500 px-2 py-1 rounded-xl text-xl mb-2 hover:bg-blue-500 text-white '>My Orders</h1></a>
            <h1 className='text-center font-bold text-3xl mb-2'>Cart Items</h1>
            <div className='bg-black w-[90vw] h-0.5 mx-auto my-6'></div>
            <div className='flex flex-col gap-6'>
                {
                    cartItems.map((curitem) => (

                        <CartProduct key={curitem._id} curitem={curitem} />
                    ))
                }

            </div>

            <div className='flex flex-col gap-4 border-2 border-black w-fit p-4 mx-auto my-8'>

                <h1 className='text-center text-2xl font-serif font-bold'>Item Total</h1>
                <div className='flex gap-4 items-center'>
                    <p className='font-semibold text-xl'>price:</p>
                    <p className='text-xl'>₹ {totalPrice}</p>
                </div>
                <div className='flex gap-4 items-center'>
                    <p className='font-semibold text-xl'>discount</p>
                    <p className='text-xl'>₹ {discount}</p>
                </div>
                <div className='flex gap-4 items-center'>
                    <p className='font-semibold text-xl'>total price:</p>
                    <p className='text-xl'>₹ {totalPrice - discount}</p>
                </div>

            </div>

            <div className='text-center'>
                <a href={`/order/${totalPrice}`}><button className='bg-orange-500 hover:scale-105 text-white px-4 py-2 rounded-xl text-lg font-semibold '>place order</button></a>
            </div>

        </div>
    )

}

export default Cart