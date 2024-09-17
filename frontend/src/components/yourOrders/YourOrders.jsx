import React, { useContext, useEffect, useState } from 'react'

function YourOrders() {

    const [orders, setOrders] = useState([])

    const fetchCurrentUserOrders = async () => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/current-user-orders`, {

            method: "GET",
            credentials: "include",
            headers: {

                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })

        const res = await response.json()

        if (response.ok) {

            setOrders(res.data)
        }
    }

    useEffect(() => {

        fetchCurrentUserOrders()

    }, [])

    const cancelOrder = async (_id, name) => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cancel-order`, {

            method: "POST",
            credentials: "include",
            headers: {

                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ _id, name })
        })

        const res = await response.json()

        if (response.ok) {

            fetchCurrentUserOrders()
        }

    }

    return (
        <div className='min-h-[87vh] py-6'>

            <h1 className='text-3xl font-semibold text-center mb-8'>Your Orders</h1>

            <div className='flex flex-col gap-4'>

                {
                    orders.map((curitem) => (

                        curitem.isCanceled ? (<div key={curitem._id} className='flex justify-center items-center mx-auto gap-6 rounded-lg p-4 border-2 bg-gray-400 border-gray-400 w-[85vw] max-lg:flex-col max-lg:w-[75vw]'>

                            <img className='h-20 object-contain max-lg:h-[80vw]' src={curitem.image} alt="" />

                            <span className='text-xl font-serif w-64 max-lg:text-center' >{curitem.name}</span>

                            <div className='flex gap-1 flex-col '>
                                <span className='text-xl font-bold'>price:</span>
                                <p className='text-lg'> ₹ {curitem.price}</p>
                            </div>

                            <div className='flex gap-1'>
                                <div className='text-xl font-bold'>Size:</div>
                                <p className='text-xl font-bold'>{curitem.size}</p>
                            </div>

                            <div className=''>

                                <div className='flex gap-2 items-center'>

                                    <p className='font-bold text-lg'>Quantity:</p>
                                    <p className='font-bold text-lg'>{curitem.productQuantity}</p>

                                </div>

                            </div>

                            <div className='flex gap-1 items-center flex-col'>
                                <span className='font-bold'>Order Cancel Date:</span>
                                <p>{curitem.updatedAt.slice(0, 10)}</p>
                            </div>
                            <div>
                                <button className=' text-white rounded-lg px-3 py-1 text-xl font-semibold  bg-red-500 '>order canceled</button>
                            </div>
                        </div>
                        )
                            :
                            (<div key={curitem._id} className='flex justify-center items-center mx-auto gap-6 rounded-lg p-4 border-2 border-gray-400 w-[85vw] max-lg:flex-col max-lg:w-[75vw]'>

                                <img className='h-20 object-contain max-lg:h-[80vw]' src={curitem.image} alt="" />

                                <span className='text-xl font-serif w-64 max-lg:text-center'>{curitem.name}</span>

                                <div className='flex gap-1 flex-col '>
                                    <span className='text-xl font-bold'>price:</span>
                                    <p className='text-lg'> ₹ {curitem.price}</p>
                                </div>

                                <div className='flex gap-1'>
                                    <div className='text-xl font-bold'>Size:</div>
                                    <p className='text-xl font-bold'>{curitem.size}</p>
                                </div>

                                <div className='flex flex-col justify-center'>
                                    <div className='flex gap-2 items-center'>

                                        <p className='font-bold text-lg'>Quantity:</p>
                                        <p className='font-bold text-lg'>{curitem.productQuantity}</p>

                                    </div>
                                </div>

                                <div className='flex gap-1 items-center flex-col '>
                                    <span className='font-bold'>Order Date:</span>
                                    <p>{curitem.createdAt.slice(0, 10)}</p>
                                </div>
                                {
                                    curitem.confirmOrder ? (<div>shipped</div>) : (<div >order placed</div >)
                                }

                                <div>
                                    <button onClick={() => cancelOrder(curitem._id, curitem.name)} className=' text-white rounded-lg px-3 py-1 text-xl font-semibold hover:scale-105 bg-red-500 hover:bg-green-500'>cancel order</button>
                                </div>
                            </div>)
                    ))
                }
            </div>

        </div>
    )
}

export default YourOrders