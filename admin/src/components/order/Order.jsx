import React, { useEffect, useState } from 'react'

function Order() {

    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/get-all-orders`, {

            method: "GET",
            credentials: "include",
            headers: {

                "Content-type": "application/json"
            }
        })

        const res = await response.json()
        console.log(res);

        if (response.ok) {

            setOrders(res.data)
        }
    }

    useEffect(() => {

        fetchOrders()

    }, [])

    const orderConfirm = async (_id) => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/order-confirm`, {

            method: "POST",
            credentials: "include",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id })
        })

        const res = await response.json()
        console.log(res);

        if (response.ok) {

            fetchOrders()
        }
    }

    return (
        <div>
            <h1 className='text-center text-3xl font-semibold py-6'>All Orders</h1>
            <div className='flex flex-col gap-4 h-[89vh] overflow-y-auto'>
                <div className='flex flex-col gap-4 px-6 overflow-y-auto '>
                    {
                        orders.map((curitem) => (

                            curitem.isCanceled ?

                                <div className=' bg-gray-400 flex flex-col gap-4 items-center'>
                                    <div key={curitem._id} className='flex justify-center items-center mx-auto gap-6 rounded-lg p-2 border-2 border-gray-400 w-[75vw] max-lg:flex-col max-lg:gap-2'>
                                        <img className='h-24 object-contain max-lg:h-[80vw]' src={curitem.image} alt="" />

                                        <div className='flex  gap-2 justify-center max-lg:flex-col max-lg:items-center'>
                                            <span className='text-xl font-serif w-56 max-lg:w-full'>{curitem.name}</span>

                                            <div className='flex gap-1 flex-col max-lg:flex-row'>
                                                <span className='text-xl font-bold'>price:</span>
                                                <p className='text-xl'> ₹ {curitem.price}</p>
                                            </div>

                                        </div>

                                        <div className='flex gap-1'>
                                            <p className='text-xl font-bold'>Quantity:</p>
                                            <p className='text-xl'>{curitem.productQuantity}</p>
                                        </div>

                                        <div className='flex gap-1'>
                                            <p>Size:</p>
                                            <p>{curitem.size}</p>
                                        </div>
                                        {
                                            curitem.confirmOrder ? (<div>

                                                <button className=' text-white rounded-lg px-3 py-2 text-xl font-semibold bg-cyan-500 max-sm:text-xs'>ordered shipped</button>

                                            </div>
                                            ) :
                                                (
                                                    <div>
                                                        <button className=' text-white rounded-lg px-3 py-2 text-xl font-semibold  bg-red-500 max-sm:text-xs'>order canceled</button>
                                                    </div>
                                                )

                                        }
                                    </div>

                                    <div className='flex items-center max-sm:text-sm gap-4 max-lg:flex-col'>

                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>Name:</span>
                                            <p className='text-xl'>  {curitem.userDetails.name}</p>
                                        </div>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>Phone:</span>
                                            <p className='text-xl'>  {curitem.userDetails.phone}</p>
                                        </div>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>State:</span>
                                            <p className='text-xl'>  {curitem.userDetails.state}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center max-sm:text-sm py-2 gap-4 max-lg:flex-col'>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>City:</span>
                                            <p className='text-xl'>  {curitem.userDetails.city}</p>
                                        </div>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>Pincode:</span>
                                            <p className='text-xl'>  {curitem.userDetails.pincode}</p>
                                        </div>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>Address:</span>
                                            <p className='text-xl'>  {curitem.userDetails.address}</p>
                                        </div>

                                    </div>
                                </div>

                                :
                                <div className=' flex flex-col gap-4 items-center border-2 border-gray-400'>
                                    <div key={curitem._id} className='flex justify-center items-center mx-auto gap-6 rounded-lg p-2  w-[75vw] max-lg:flex-col max-lg:gap-2'>

                                        <img className='h-24 object-contain max-lg:h-[80vw]' src={curitem.image} alt="" />
                                        <div className='flex  gap-2 justify-center max-lg:flex-col max-lg:items-center'>
                                            <span className='text-xl font-serif w-56 max-lg:w-full'>{curitem.name}</span>

                                            <div className='flex gap-1 flex-col max-lg:flex-row'>
                                                <span className='text-xl font-bold'>price:</span>
                                                <p className='text-xl'> ₹ {curitem.price}</p>
                                            </div>

                                        </div>

                                        <div className='flex gap-1'>
                                            <p className='text-xl font-bold'>Quantity:</p>
                                            <p className='text-xl'>{curitem.productQuantity}</p>
                                        </div>

                                        <div className='flex gap-1'>
                                            <p>Size:</p>
                                            <p>{curitem.size}</p>
                                        </div>
                                        {
                                            curitem.confirmOrder ? (<div>

                                                <button className=' text-white rounded-lg px-3 py-2 text-xl font-semibold  bg-cyan-500 max-sm:text-xs'>ordered shipped</button>

                                            </div>
                                            ) :
                                                (
                                                    <div>
                                                        <button onClick={() => orderConfirm(curitem._id)} className=' text-white rounded-lg px-3 py-2 text-xl font-semibold hover:scale-105 bg-red-500 hover:bg-green-500 max-sm:text-xs'>order confirm</button>
                                                    </div>
                                                )

                                        }
                                    </div>

                                    <div className='flex items-center max-sm:text-sm gap-4 max-lg:flex-col'>

                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>Name:</span>
                                            <p className='text-xl'>  {curitem.userDetails.name}</p>
                                        </div>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>Phone:</span>
                                            <p className='text-xl'>  {curitem.userDetails.phone}</p>
                                        </div>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>State:</span>
                                            <p className='text-xl'>  {curitem.userDetails.state}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center max-sm:text-sm py-2 gap-4 max-lg:flex-col'>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>City:</span>
                                            <p className='text-xl'>  {curitem.userDetails.city}</p>
                                        </div>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>Pincode:</span>
                                            <p className='text-xl'>  {curitem.userDetails.pincode}</p>
                                        </div>
                                        <div className='flex gap-1 max-lg:flex-row'>
                                            <span className='text-xl font-semibold'>Address:</span>
                                            <p className='text-xl'>  {curitem.userDetails.address}</p>
                                        </div>

                                    </div>
                                </div>

                        ))
                    }

                </div>
            </div>
        </div >
    )
}

export default Order