import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../context/cartContext/cartContext'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'

function Order() {

    const [currentUserDetals, setCurrentUserDetails] = useState({ name: "", phone: "", state: "", city: "", address: "", pincode: "" })
    const { discount, cartItems, setOrders } = useContext(CartContext)

    const { totalPrice } = useParams()

    const navigate = useNavigate()

    useEffect(() => {

        (async () => {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/get-current-user`, {

                method: "GET",
                credentials: "include",
                headers: {

                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.ok) {

                const res = await response.json()
                setCurrentUserDetails({ name: res.data.name, phone: res.data.phone, state: res.data.state, city: res.data.city, address: res.data.address, pincode: res.data.pincode })
            }

        })()

    }, [])

    const orderProducts = async () => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/order-product`, {

            method: "POST",
            credentials: "include",
            headers: {

                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ cartItems, totalPrice, currentUserDetals })
        })

        const res = await response.json()

        if (response.ok) {

            setOrders(res.data.allOrderedProducts)
            navigate("/yourOrders")
        }
    }

    return (
        <div className='min-h-[85vh]'>

            <h1 className='text-center text-3xl font-semibold my-2'>Order Details</h1>
            <form className='my-8 flex flex-col gap-6 border-2 border-black rounded-xl w-fit mx-auto p-6' >

                <a href="/profile" className='flex w-fit hover:scale-105 gap-2 text-lg text-end font-semibold px-3 py-1 rounded-xl bg-blue-500 text-white '>
                    <img src={assets.edit} alt="" width={18} />
                    <p>edit Profile</p>
                </a>

                <div className="flex flex-col gap-2 ">
                    <label htmlFor="name" className='text-xl'>Name</label>
                    <input className='border-2 border-black w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[75vw]' id='name' type="text" value={currentUserDetals.name} readOnly />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="phone" className='text-xl'>Phone Number</label>
                    <input className='border-2 border-black w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[75vw]' id='phone' type="text" value={currentUserDetals.phone} readOnly />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="state" className='text-xl'>State</label>
                    <input className='border-2 border-black w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[75vw]' id='state' type="text" value={currentUserDetals.state} readOnly />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="city" className='text-xl'>City</label>
                    <input className='border-2 border-black w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[75vw]' id='city' type="text" value={currentUserDetals.city} readOnly />
                </div>
                <div className="flex flex-col gap-2 " >
                    <label htmlFor="pincode" className='text-xl'>Pincode</label>
                    <input className='border-2 border-black  w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[75vw]' id='pincode' type="text" value={currentUserDetals.pincode} readOnly />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="address" className='text-xl'>Address</label>
                    <input className='border-2 w-[40vw] border-black outline-none rounded-lg py-2 px-4 max-lg:w-[75vw]' id='address' type="text" value={currentUserDetals.address} readOnly />
                </div>
            </form>

            <section className='flex flex-col gap-8 my-5 '>

                <div className='flex gap-1 w-[20vw] mx-auto p-2 justify-center border-2 border-black rounded-lg max-xl:w-[30vw] max-md:w-[50vw] max-sm:w-[70vw]'>
                    <p className='text-2xl font-semibold'>Total Price:</p>
                    <p className='text-2xl '>₹ {totalPrice - discount}</p>
                </div>
                <button onClick={orderProducts} className='text-xl w-40 text-center mx-auto bg-orange-500 text-white px-4 font-semibold py-2 rounded-lg hover:bg-orange-600'>confirm order</button>
            </section>

        </div>
    )
}

export default Order