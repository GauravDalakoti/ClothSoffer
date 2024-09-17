import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import CartContext from '../../context/cartContext/cartContext.js'
import { useNavigate } from 'react-router-dom'

function Header() {

    const { cartItems, login, setLogin } = useContext(CartContext)
    const [displayMenu, setDisplayMenu] = useState(false)
    const cartItemsLength = cartItems.length
    const navigate = useNavigate()

    const handleLogout = async () => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {

            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response.ok) {

            localStorage.removeItem("token")
            setLogin(false)
            navigate("/")
        }
    }

    const handleDisplayMenu = () => {

        setDisplayMenu(prev => prev = !prev)
    }

    return (

        <header className='flex justify-around p-4 sticky top-0 z-20 bg-white border-b-4 max-lg:justify-between max-md:px-8'>

            <div className='flex gap-1 items-center'>
                <img src={assets.logo} alt="" width={55} />
                <span className='text-2xl font-bold'>ClothSoffer</span>
            </div>
            <ul className='flex max-lg:hidden justify-center items-center gap-8 text-xl font-semibold'>

                <a href="/">
                    <li className='hover:underline'>home</li>
                </a>
                <a href="/men">
                    <li className='hover:underline'>Men</li>
                </a>
                <a href="/women">
                    <li className='hover:underline'>Women</li>
                </a>
                <a href="/kids">
                    <li className='hover:underline'>Kids</li>
                </a>

            </ul>

            {
                login ? <div>
                    <div className='flex max-lg:hidden items-center justify-center gap-6'>

                        <div>
                            <button onClick={handleLogout} className='font-semibold hover:scale-105 border-2 border-black text-lg rounded-xl px-3 py-1 hover:bg-rose-500 hover:text-white hover:border-white'>logout</button>
                        </div>

                        <a href="/cart"> <div className='flex gap-1 cursor-pointer border-2 border-black rounded-xl px-3 py-1'>
                            <img className='hover:scale-105' src={assets.addtocart} alt="" width={30} />
                            <p className='text-xl font-bold'>{cartItemsLength}</p>
                        </div>
                        </a>

                        <div className='flex gap-1 items-center'>
                            <div>
                                <a href="/profile"><img src={assets.user} alt="" width={45} /></a>
                            </div>

                        </div>
                    </div>

                    {
                        displayMenu ? (

                            <div className='flex flex-col gap-8 items-center absolute top-0 right-0 w-[80vw] bg-gray-300  h-[100vh]'>

                                <div className='flex justify-end px-6 py-2 '>
                                    <img className='' onClick={handleDisplayMenu} src={assets.close} alt="" width={45} />
                                </div>

                                <ul className='flex flex-col items-center gap-8 text-xl font-semibold'>

                                    <a href="/">
                                        <li className='hover:underline'>home</li>
                                    </a>
                                    <a href="/men">
                                        <li className='hover:underline'>Men</li>
                                    </a>
                                    <a href="/women">
                                        <li className='hover:underline'>Women</li>
                                    </a>
                                    <a href="/kids">
                                        <li className='hover:underline'>Kids</li>
                                    </a>

                                </ul>

                                <div>
                                    <button onClick={handleLogout} className='font-semibold hover:scale-105 border-2 border-black text-lg rounded-xl px-3 py-1 hover:bg-rose-500 hover:text-white hover:border-white'>logout</button>
                                </div>

                                <a href="/cart"> <div className='flex gap-1 cursor-pointer border-2 border-black rounded-xl px-3 py-1'>
                                    <img className='hover:scale-105' src={assets.addtocart} alt="" width={30} />
                                    <p className='text-xl font-bold'>{cartItemsLength}</p>
                                </div>
                                </a>

                                <div className='flex gap-1 items-center relative'>
                                    <div className='flex gap-1'>
                                        <a href="/profile"><img src={assets.user} alt="" width={45} /></a>
                                    </div>

                                </div>

                            </div>
                        ) : (
                            <div className='lg:hidden my-auto '>
                                <img onClick={handleDisplayMenu} src={assets.menu} alt="" width={30} />
                            </div>
                        )
                    }

                </div> :

                    <>
                        <div className='flex items-center justify-center gap-4 max-lg:hidden '>

                            <div>
                                <a href="/login"><button className='font-semibold hover:scale-105 border-2 border-black text-lg rounded-xl px-3 py-1 hover:bg-rose-500 hover:text-white hover:border-white'>login</button></a>
                            </div>

                            <div>
                                <a href="/signUp"><button className='font-semibold hover:scale-105 border-2 border-black text-lg rounded-xl px-3 py-1 hover:bg-rose-500 hover:text-white hover:border-white'>signUp</button></a>
                            </div>

                        </div>

                        {
                            displayMenu ? (

                                <div className=' absolute top-0 right-0 w-[80vw] bg-gray-300  h-[100vh]'>

                                    <div className='flex justify-end px-6 py-2'>
                                        <img className='' onClick={handleDisplayMenu} src={assets.close} alt="" width={45} />
                                    </div>

                                    <ul className='flex flex-col items-center gap-8 text-xl font-semibold'>

                                        <a href="/">
                                            <li className='hover:underline'>home</li>
                                        </a>
                                        <a href="/men">
                                            <li className='hover:underline'>Men</li>
                                        </a>
                                        <a href="/women">
                                            <li className='hover:underline'>Women</li>
                                        </a>
                                        <a href="/kids">
                                            <li className='hover:underline'>Kids</li>
                                        </a>

                                    </ul>
                                    <div className='flex flex-col items-center gap-8  my-6'>

                                        <div>
                                            <a href="/login"><button className='font-semibold hover:scale-105 border-2 border-black text-lg rounded-xl px-3 py-1 hover:bg-rose-500 hover:text-white hover:border-white'>login</button></a>
                                        </div>

                                        <div>
                                            <a href="/signUp"><button className='font-semibold hover:scale-105 border-2 border-black text-lg rounded-xl px-3 py-1 hover:bg-rose-500 hover:text-white hover:border-white'>signUp</button></a>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div className='lg:hidden my-auto'>
                                    <img className='my-auto' onClick={handleDisplayMenu} src={assets.menu} alt="" width={30} />
                                </div>
                            )
                        }
                    </>
            }

        </header>
    )
}

export default Header