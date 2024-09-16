import React from 'react'

function SideBar() {
    return (

        <nav className='w-[15vw] max-lg:w-[25vw] min-h-[87vh] bg-gray-100 max-md:w-[100vw] max-md:min-h-[8vh]'>
            <ul className='flex flex-col justify-center items-center gap-4 p-2 max-md:flex-row'>
                <a href="/admin">
                    <li className='text-xl hover:scale-x-105 hover:bg-gray-200 px-2 py-1 font-bold'>Add Product</li>
                </a>
                <a href="/admin/all-products">
                    <li className='text-xl hover:scale-x-105 hover:bg-gray-200  px-2 py-1 font-bold'>All Products</li>
                </a>
                <a href="/admin/orders">
                    <li className='text-xl hover:scale-x-105 hover:bg-gray-200  px-2 py-1 font-bold'>All Orders</li>
                </a>
            </ul>
        </nav>
    )
}

export default SideBar