import React, { useState, useEffect } from 'react'

function Profile() {

    const [currentUserDetals, setCurrentUserDetails] = useState({ name: "", phone: "", state: "", city: "", address: "", pincode: "" })

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
                setCurrentUserDetails({ name: res.data.name, phone: res.data.phone, state: res.data.phone, city: res.data.city, address: res.data.address, pincode: res.data.pincode })
            }

        })()

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/user-profile`, {

            method: "POST",
            credentials: "include",
            headers: {

                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(currentUserDetals)
        })

        const res = await response.json()
    }

    const handleChange = async (e) => {

        setCurrentUserDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    return (
        <div>

            <h1 className='text-3xl font-bold text-center'>Mange your Profile</h1>

            <form onSubmit={handleSubmit} className='my-8 flex flex-col gap-6 border-2 border-black rounded-xl w-fit mx-auto p-6' >

                <div className="flex flex-col gap-2 ">
                    <label htmlFor="name" className='text-xl'>Name</label>
                    <input className='border-2 border-gray-500 w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[60vw] max-sm:w-[70vw]' id='name' type="text" value={currentUserDetals.name} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="phone" className='text-xl'>Phone Number</label>
                    <input className='border-2 border-gray-500  w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[60vw] max-sm:w-[70vw]' id='phone' type="text" value={currentUserDetals.phone} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="state" className='text-xl'>State</label>

                    <select className='border-2 border-gray-500 ' id='state' type="text" value={currentUserDetals.state} onChange={handleChange} >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Goa">Goa</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="KeralaL">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="city" className='text-xl'>City</label>
                    <input className='border-2 border-gray-500  w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[60vw] max-sm:w-[70vw]' id='city' type="text" value={currentUserDetals.city} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2 " >
                    <label htmlFor="pincode" className='text-xl'>Pincode</label>
                    <input className='border-2 border-gray-500  w-[40vw] outline-none rounded-lg py-2 px-4 max-lg:w-[60vw] max-sm:w-[70vw]' id='pincode' type="text" value={currentUserDetals.pincode} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="address" className='text-xl'>Address</label>
                    <input className='border-2 border-gray-500  w-[40vw]  outline-none rounded-lg py-2 px-4 max-lg:w-[60vw] max-sm:w-[70vw]' id='address' type="text" value={currentUserDetals.address} onChange={handleChange} />
                </div>

                <div className='text-center'>
                    <button type='submit' className='text-lg hover:scale-105  font-semibold px-3 py-2 rounded-lg bg-blue-500 text-white'>Save Changes</button>
                </div>
            </form>

        </div>
    )
}

export default Profile