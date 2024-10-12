import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import CardItem from '../cardItem/CardItem'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CurrentItem() {

    const { _id } = useParams()

    const [relatedItems, setRelatedItems] = useState([])

    const [images, setimages] = useState([])
    const [imageIndex, setImageIndex] = useState(0)

    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState('m')

    const [loading, setLoading] = useState(true)
    const [currentItem, setCurrentItem] = useState({ id: "", name: "", price: "", productQuantity: "", rating: "", size: "", image: "" })

    useEffect(() => {

        (async () => {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/items/get-current-item`, {

                method: "POST",
                headers: {

                    "Content-Type": "application/json"

                },
                body: JSON.stringify({ _id })
            })

            const res = await response.json()

            if (response.ok) {

                setCurrentItem({ id: res.data._id, name: res.data.name, price: res.data.price, productQuantity: quantity, rating: res.data.rating, size: size, image: res.data.images[0] })
                setimages(res.data.images)
                setImageIndex(0)
            }

            const response1 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/items/get-related-items`, {

                method: "POST",
                credentials: "include",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id })
            })

            const res1 = await response1.json()

            if (response1.ok) {

                setRelatedItems(res1.data)
                setLoading(false)
            }

        })()

    }, [])

    const handleSize = (e) => {

        setSize(e.target.value)
    }

    const increaseQuantity = () => {

        if (quantity <= 100) {

            setQuantity(quantity + 1)
        }
    }

    const decreseQuantity = () => {

        if (!(quantity == 1)) {

            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/carts/add-to-cart`, {

                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(currentItem)
            })

            const res = await response.json()

            if (response.ok) {

                toast('Item added successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            }
            else {

                toast('Item already exists', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {

            console.log("Error while adding the product to the database", error)
        }
    }

    return (
        <div className='p-3 min-h-[86vh]'>

            <ToastContainer />
            {

                loading ? (<div className='text-center font-semibold text-3xl'>loading...</div>) :

                    <div className=''>
                        <div div className='flex gap-10 border-4 rounded-lg p-6 max-md:flex-col max-md:items-center max-md:gap-5'>

                            <div className='flex gap-8'>
                                <section className='flex flex-col gap-2 max-sm:gap-1'>

                                    {
                                        images.map((curimg, index) => (<img onClick={() => setImageIndex(index)} key={index} className='rounded-md max-md:w-[14vw]' src={curimg} alt="" width={75} />))
                                    }

                                </section>
                                <section className='relative transition-all ease-in-out  duration-200 '>
                                    <img className='rounded-lg max-md:w-[75vw]' src={images[imageIndex]} alt="" width={400} />

                                </section>
                            </div>

                            <section className='flex flex-col gap-8 max-md:gap-4'>
                                <div className='text-4xl text-gray-700 font-semibold max-sm:text-2xl'>{currentItem.name}</div>

                                <div className='flex gap-2 items-center'>
                                    <p className='text-2xl font-semibold text-gray-700'>Price:</p>
                                    <p className='text-2xl'>₹ {currentItem.price}</p>
                                </div>

                                <div className='flex gap-2'>

                                    <p className='text-2xl font-semibold text-gray-700'>rating:</p>
                                    <p className='text-2xl'>{currentItem.rating}</p>
                                    <img src={assets.rating} alt="" width={27} />
                                </div>

                                <div className='flex items-center'>
                                    <div className='text-2xl font-semibold text-gray-700'>Size:</div>
                                    <select value={size} onChange={handleSize} className='text-xl'>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="XL">XL</option>
                                        <option value="2XL">2XL</option>
                                        <option value="3XL">3XL</option>
                                    </select>
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <p className='text-2xl font-semibold text-gray-700'>Quantity(Pieces):</p>
                                    <div className='flex gap-6 items-center border-2 border-gray-400  px-3 py-1'>
                                        <button className='font-bold text-2xl ' onClick={decreseQuantity}>-</button>
                                        <p className='font-bold'>{quantity}</p>
                                        <button className='font-bold text-2xl' onClick={increaseQuantity}>+</button>
                                    </div>
                                </div>

                                <div>
                                    <button onClick={handleAddToCart} className=' bg-green-600 text-xl text-white font-semibold rounded-full px-5 py-2 hover:bg-blue-500 hover:scale-105'>add to cart</button>
                                </div>

                            </section>

                        </div>
                        <h1 className='text-3xl font-semibold py-6'>related products</h1>

                        <section className='grid px-3 grid-cols-4 mb-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 justify-items-center justify-center'>

                            {
                                relatedItems.map((curitem) => (

                                    <CardItem key={curitem._id} curitem={curitem} />
                                ))
                            }

                        </section>
                    </div>
            }

        </div >


    )

}


export default CurrentItem