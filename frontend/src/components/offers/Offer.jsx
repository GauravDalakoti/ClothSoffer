import React from 'react'
import { assets } from '../../assets/assets'

function Offer() {
    return (
        <div className='flex justify-around mt-2 px-5 py-3 max-lg:flex-col max-lg:items-center max-lg:gap-8 '>

            <div className='font-bold text-6xl  font-sans w-[35vw] mt-8 max-lg:w-[90vw] max-lg:mt-3 max-md:mt-1 max-lg:text-5xl max-md:text-4xl max-sm:text-[1.7em] items-center '>
                <h1 className='my-2 '>Exclusive Offer only for You</h1>
                <h1 className='my-2 '>Dont miss it</h1>
                <h1 className='font-thin text-4x max-sm:text-3xl max-lg:mb-3'>check the latest trends</h1>
                <a className='max-lg:my-4' href="/all-products">
                    <button className='bg-blue-500 rounded-full max-md:py-1 text-lg py-2 px-3 text-white hover:bg-rose-500'>check now</button>
                </a>
            </div>

            <div className='w-[56vw] max-lg:w-[95vw]'>
                <img className='rounded-lg max-lg:w-[90vw] max-lg:mx-auto ' src={assets.homeimg} alt="" width={720}/>
            </div>
        </div>
    )
}

export default Offer