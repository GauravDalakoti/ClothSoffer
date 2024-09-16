import React, { useContext } from 'react'
import { assets } from '../../../assets/assets'
import { useState } from 'react'
import CartContext from '../../../context/cartContext/cartContext'

function cartProduct({ curitem }) {

    const [quantity, setQuantity] = useState(curitem.productQuantity)
    const { size, setSize } = useState('m')

    const { cartItems, setCartItems, setTotalPrice } = useContext(CartContext)

    let initialValue = 0
    const totalprice = cartItems.reduce((accum, curElem) => {

        let productPrice = parseInt(curElem.price * curElem.productQuantity) || 0
        return accum + productPrice

    }, initialValue)

    setTotalPrice(totalprice)

    const increaseQuantity = () => {

        if (quantity <= 100) {

            setQuantity(quantity + 1)
            curitem.productQuantity += 1
        }
    }

    const decreseQuantity = () => {

        if (!(quantity == 1)) {

            setQuantity(quantity - 1)
            curitem.productQuantity -= 1
        }
    }

    const handleSize = (e) => {

        setSize(e.target.value)
    }

    const removeToCart = async (name) => {

        const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/v1/carts/remove-to-cart`, {

            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        })

        const res = await response.json()
       
        if (response.ok) {

            const upadatedCartProducts = cartItems.filter((curitem) => curitem.name !== name)
            setCartItems(upadatedCartProducts)
        }
    }

    return (

        <div className='flex justify-center items-center mx-auto gap-6 rounded-lg p-4 border-2 border-gray-400 w-[75vw] max-md:flex-col max-md:w-[85vw] max-md:gap-2'>

            <img className='h-44 object-contain max-md:h-[52vh]' src={curitem.image} alt="" />
            <div className='flex flex-col gap-2 justify-center '>
                <span className='text-xl font-serif w-64'>{curitem.name}</span>

                <div className='flex gap-1'>
                    <p className='text-xl font-bold'>rating:</p>
                    <p className='text-xl'>{curitem.rating}</p>
                    <img src={assets.rating} alt="" width={27} />
                </div>
                <div className='flex gap-1'>
                    <span className='text-xl font-bold'>price</span>
                    <p> ₹ {curitem.price}</p>
                </div>

                <div className='flex gap-1'>
                    <div className='text-xl font-bold'>Size:</div>
                    <select value={size} onChange={handleSize}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                        <option value="3XL">3XL</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-col justify-center '>
                <div className='flex flex-col gap-2 items-center '>
                    <div className='text-xl font-semibold'>
                        Quantity(Pieces)
                    </div>
                    <div className='flex gap-6 items-center border-2 border-gray-200  px-1'>
                        <button className='font-bold text-xl' onClick={decreseQuantity}>-</button>
                        <p className='font-bold'>{quantity}</p>
                        <button className='font-bold text-xl' onClick={increaseQuantity}>+</button>
                    </div>
                </div>
            </div>

            <div>
                <button onClick={() => removeToCart(curitem.name)} className=' text-white rounded-lg px-4 py-3 text-xl font-semibold hover:scale-105 bg-red-500 hover:bg-green-500 max-md:my-2'>remove item</button>
            </div>
        </div>
    )
}

export default cartProduct