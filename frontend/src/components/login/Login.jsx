import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartContext from '../../context/cartContext/cartContext.js'

function Login() {

    const [userData, setUserData] = useState({ email: "", password: "" })

    const { cartItems, setCartItems, setLogin } = useContext(CartContext)

    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/v1/users/login`, {

                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)

            })

            if (response.ok) {

                const res = await response.json()
                setCartItems(res.data.user.products)
                localStorage.setItem("token", res.data.accessToken)
                setLogin(prev => prev = !prev)
                setUserData({ email: "", password: "" })
                navigate("/")
            }
            else {

                setError(true)
            }
        } catch (error) {
            console.log("Error while uploading data on the  database", error)
        }
    }

    const handleChange = (e) => {

        const id = e.target.id
        const value = e.target.value
        setUserData(prev => ({ ...prev, [id]: value }))
        setError(false)
    }

    return (
        <div className='p-4 bg-zinc-200 min-h-[85vh] flex items-center'>

            <form onSubmit={handleSubmit} className='flex bg-white flex-col w-fit min-h-[60vh] mx-auto justify-center items-center gap-3 border-2 border-black rounded-lg px-5 py-5 max-md:min-h-[40vh]'>

                <div>
                    <h1 className='text-2xl font-bold text-center'>Sign In</h1>
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-2xl font-mono' htmlFor="email">Email</label>
                    <input className='border-2 border-gray-600 p-3 rounded-lg w-[30vw] outline-none max-lg:w-[38vw] max-md:w-[60vw] max-sm:w-[80vw]' id='email' type="email" value={userData.email} autoComplete='off' onChange={handleChange} placeholder='Enter your email' required />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-2xl font-mono' htmlFor='password'>Password</label>
                    <input className='border-2 border-gray-600 p-3 rounded-lg outline-none w-[30vw] max-lg:w-[38vw] max-md:w-[60vw] max-sm:w-[80vw]' id='password' type="password" value={userData.password} autoComplete='off' onChange={handleChange} placeholder='Enter your password' required />
                </div>

                {
                    error && <div className='text-red-500'>invalid email or password</div>
                }

                <div>
                    <button className='bg-blue-500 hover:scale-105 w-[30vw] text-white rounded-lg px-4 py-3 font-semibold max-lg:w-[38vw] max-md:w-[60vw] max-sm:w-[80vw]' type='submit'>Sign Up</button>
                </div>

                <div className='flex text-[0.9em] max-lg:text-[0.75em]'>

                    <p className='mx-1'>I agree to the </p>
                    <a href="/terms-and-conditions" className='text-green-600 hover:text-orange-600 cursor-pointer'>terms and conditions

                    </a>
                    <p className='mx-1'>and</p>
                    <a href="/privacy-policy" className='text-green-600 hover:text-orange-600 cursor-pointer'> Privacy Policy.</a>

                </div>

                <div className='flex gap-1 items-center'>

                    <p>Don't have an account?</p>
                    <a href='/signUp' className='text-blue-600 hover:underline font-sans cursor-pointer'>Sign Up</a>
                </div>

            </form>

        </div>
    )
}

export default Login