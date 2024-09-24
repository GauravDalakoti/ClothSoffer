import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import AdminContext from '../../context/adminContext/adminContext'
import { useNavigate } from 'react-router-dom'

function Header() {

    const { setLogin } = useContext(AdminContext)
    const navigate = useNavigate()

    const [menu, setMenu] = useState(false)

    const handleDisplay = () => {

        setMenu(prev => prev = !prev)
    }

    const handleLogout = async () => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/admin-logout`, {

            method: "GET",
            credentials: "include",
            headers: {

                "Content-Type": "application/json"
            }
        })

        const res = await response.json()
        console.log(res);

        if (response.ok) {

            localStorage.removeItem("accesstoken")
            setLogin(false)
            navigate("/")
        }
    }

    return (
        <div>
            <nav className='px-6 border-b-4'>
                <ul className='flex justify-between p-3 max-md:px-2'>
                    <li className='flex justify-center items-center gap-1'>
                        <img className='max-md:w-[10vw]' src={assets.logo} alt="" width={50} />
                        <p className='font-semibold text-3xl'>clothsoffer</p>
                    </li>

                    <div className='md:hidden flex items-center '>
                        <img onClick={handleDisplay} src={assets.menu} alt="" width={25} />
                    </div>
                    <div className='flex gap-4 items-center max-md:hidden'>
                        <li>
                            <button onClick={handleLogout} className='bg-blue-500 text-white rounded-lg hover:scale-105 px-4 py-2 font-semibold'>logout</button>
                        </li>
                        <li>
                            <img src={assets.user} alt="" width={45} />
                        </li>
                    </div>

                    {
                        menu && <div className='flex flex-col gap-4 py-8 absolute h-[100vh] right-0 top-0 w-[50vw] items-center bg-gray-300'>

                            <div className=' flex items-center px-2'>
                                <img onClick={handleDisplay} src={assets.close} alt="" width={25} />
                            </div>
                            <li>
                                <button onClick={handleLogout} className='bg-blue-500 text-white rounded-lg hover:scale-105 px-4 py-2 font-semibold'>logout</button>
                            </li>
                            <li>
                                <img src={assets.user} alt="" width={45} />
                            </li>
                        </div>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Header