import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminContext from '../../context/adminContext/adminContext.js'

function Login() {

    const [userData, setUserData] = useState({ email: "", password: "", secretKey: "" })
    const navigate = useNavigate()
    const { login, setLogin } = useContext(AdminContext)

    const handleChange = (e) => {

        const data = e.target.value
        const id = e.target.id

        setUserData((prev) => ({ ...prev, [id]: data }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(userData)

        const response = await fetch("http://localhost:8000/api/v1/admin/admin-login", {

            method: "POST",
            credentials: "include",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const res = await response.json()
        console.log(res)

        if (response.ok) {

            localStorage.setItem("accesstoken", res.data.accessToken)
            setLogin(prev => prev = !prev)
            setUserData({ email: "", password: "", secretKey: "" })
            navigate('/admin')
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit} className='border-2 flex flex-col items-center gap-5 rounded-lg border-gray-400 w-[35vw] max-lg:w-[80vw] mx-auto p-4 py-6 my-20'>
                <h1 className='font-bold text-2xl font-serif text-center'>Admin login</h1>
                <div className='flex flex-col gap-3'>
                    <label className='text-2xl font-serif' htmlFor="email">Email</label>
                    <input className='rounded-xl px-2 py-2 text-xl border-2 outline-none w-[30vw] max-lg:w-[70vw]' id='email' type="email" placeholder='enter your email' value={userData.email} onChange={handleChange} required />
                </div>
                <div className='flex flex-col gap-3 '>
                    <label className='text-2xl font-serif' htmlFor="password">Password</label>
                    <input className='rounded-xl px-2 py-2 text-xl border-2 w-[30vw] outline-none  max-lg:w-[70vw]' id='password' type="password" placeholder='enter your password' value={userData.password} onChange={handleChange} autoComplete='off' required />
                </div>
                <div className='flex flex-col gap-3 '>
                    <label className='text-2xl font-serif' htmlFor="secretKey">Secret Key</label>
                    <input className='rounded-xl px-2 py-2 text-xl border-2 w-[30vw] outline-none  max-lg:w-[70vw]' id='secretKey' type="password" placeholder='enter your Secret Key' value={userData.secretKey} onChange={handleChange} autoComplete='off' required />
                </div>
                <button type='submit' className='text-xl font-bold w-[30vw]  max-lg:w-[70vw] text-center py-2 px-4 rounded-2xl bg-blue-500 text-white hover:scale-x-105'>login</button>

            </form>
        </div>
    )
}

export default Login