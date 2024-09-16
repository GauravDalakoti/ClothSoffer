import React, { useState, useContext, useEffect } from 'react'
import cartContext from "../../context/cartContext/cartContext"
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardItem({ curitem }) {

    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState('m')
    // const [cart, setCart] = useState({ name: "", price: "", productQuantity: "", rating: "", size: "", image: "" })

    const data = { id: curitem._id, name: curitem.name, price: curitem.price, productQuantity: quantity, rating: curitem.rating, size: size, image: curitem.images[0] }

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

    const handleSize = (e) => {

        setSize(e.target.value)
    }

    const { cartItems, setCartItems } = useContext(cartContext)

    const handleAddToCart = async () => {

        try {
            const response = await fetch("http://localhost:8000/api/v1/carts/add-to-cart", {

                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
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

            console.log("Error while addding product to the database", error);

        }

    }

    return (
        <>
            <div className='flex flex-col items-center gap-4 border-2 border-gray-300 w-[23vw] py-3 rounded-lg hover:scale-105 max-lg:w-[29vw] max-md:w-[44vw] max-lg:px-4 max-sm:gap-2 max-md:py-2 max-md:px-2'>

                <a href={`/currentItem/${curitem._id}`}>

                    <img className='max-xl:w-[18vw]
                    max-lg:w-[24vw] max-md:w-[41vw]' src={curitem.images[0]} alt="" width={250} />
                    <div className='text-lg text-center  max-lg:my-1 max-sm:text-sm'>{curitem.name.length > 18 ? curitem.name.slice(0, 18) + "..." : curitem.name}</div>

                    <div className='flex gap-2 justify-center items-center max-lg:flex-col max-lg:items-center max-lg:gap-1 max-md:flex-row max-md:gap-4 max-sm:flex-col max-sm:gap-1'>
                        <div className='flex gap-1 items-center'>
                            <div className='font-semibold text-xl max-sm:text-sm '>rating {curitem.rating}</div>
                            <img src={assets.rating} alt="" width={27} />
                        </div>
                        <div className='flex gap-1 items-center'>
                            <div className='font-semibold text-xl max-sm:text-sm'> Price </div>
                            <div className='text-xl max-sm:text-sm'>₹ {curitem.price} </div>
                        </div>
                    </div>
                </a>

                <div className='flex gap-3 items-center max-lg:gap-2 max-sm:flex-col max-md:gap-1'>
                    <div className='max-md:text-sm'>
                        Quantity(Pieces):
                    </div>
                    <div className='flex gap-6 items-center border-2 border-gray-200 px-1 max-lg:gap-4 max-md:text-sm'>
                        <button onClick={decreseQuantity} className='font-bold text-xl'>-</button>
                        <p className='font-bold'>{quantity}</p>
                        <button onClick={increaseQuantity} className='font-bold text-xl'>+</button>
                    </div>
                </div>

                <div className='flex gap-1'>
                    <div className='text-xl font-bold max-md:text-sm'>Size:</div>
                    <select className='max-md:text-sm' value={size} onChange={handleSize}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                        <option value="3XL">3XL</option>
                    </select>
                </div>

                <button onClick={handleAddToCart} className=' bg-green-600 text-white font-semibold rounded-full px-5 py-2 hover:bg-blue-500 hover:scale-105 max-md:px-3 max-md:py-1 max-sm:text-xs'>add to cart</button>
            </div>

        </>
    )
}

export default CardItem