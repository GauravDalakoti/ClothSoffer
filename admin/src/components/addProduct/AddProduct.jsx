import React, { useState } from 'react'
import { assets } from '../../assets/assets'

function AddProduct() {

    const [product, setProduct] = useState({ name: "", price: "", rating: "", category: "men" })
    const [file, setFile] = useState([])
    const [isSelected, setIsSelected] = useState(false)

    const handleChange = (e) => {

        const value = e.target.value
        const id = e.target.id
        setProduct(prev => ({ ...prev, [id]: value }))
    }

    const changeHandler = (e) => {

        setFile(e.target.files)
        setIsSelected(true)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(product)
        console.log(file);

        const formData = new FormData()

        for (let i = 0; i < file.length; i++) {
            formData.append('images', file[i]);
        }

        formData.append("name", product.name)
        formData.append("price", product.price)
        formData.append("category", product.category)
        formData.append("rating", product.rating)

        const response = await fetch("http://localhost:8000/api/v1/items/add-new-item", {

            method: "POST",
            body: formData
        })

        const res = await response.json()
        console.log(res)
    }

    return (
        <div className='py-6'>

            <form onSubmit={handleSubmit} className='flex flex-col gap-5 border-2 rounded-xl p-4 max-md:w-[80vw] max-md:mx-auto'>

                <div className='flex flex-col gap-4'>
                    <label htmlFor="name" className='text-xl font-semibold'>Product Name</label>
                    <input id='name' type="text" placeholder='Enter Product Name' className='px-2 py-1 rounded-xl outline-none border-2' value={product.name} onChange={handleChange} required />
                </div>

                <div className='flex gap-4 max-md:flex-col'>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="price" className='text-xl font-semibold'>Price</label>
                        <input id='price' type="text" placeholder='Enter Product Price' className='px-2 py-1 rounded-xl outline-none border-2' value={product.price} onChange={handleChange} required />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <label htmlFor="rating" className='text-xl font-semibold'>Product Rating</label>
                        <input id='rating' type="text" placeholder='Enter Product rating' className='px-2 py-1 rounded-xl outline-none border-2' value={product.rating} onChange={handleChange} required />
                    </div>
                </div>

                <div className='flex gap-4 items-center'>

                    <label htmlFor="category" className='text-xl font-semibold'>Category</label>
                    <select className='border-2 rounded-xl p-2 outline-none' id='category' value={product.category} onChange={handleChange} required>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>

                <div className='flex flex-col gap-4'>
                    <label htmlFor="avatar" className='text-xl font-semibold'>Avatar
                        <img src={assets.upload} alt="" width={60} />
                    </label>
                    <input type="file" id='avatar' onChange={changeHandler} multiple hidden required />
                </div>

                {
                    isSelected && (<img src={URL.createObjectURL(file[0])} className="object-cover h-32 w-32 object-top" />)
                }

                <button type='submit' className='rounded-lg px-4 py-2 bg-green-500 text-white hover:bg-green-600'>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct