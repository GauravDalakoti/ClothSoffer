import { useEffect, useState } from "react";
import cartContext from "./cartContext/cartContext.js";

const CartContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])

    const [totalPrice, setTotalPrice] = useState(0)

    const [login, setLogin] = useState(false)

    const [orders, setOrders] = useState([])

    const discount = 200

    useEffect(() => {

        (async () => {

            const response = await fetch("http://localhost:8000/api/v1/carts/get-cart-products", {

                method: "GET",
                credentials: "include",
                headers: {

                    "Content-Type": "application/json"
                },
            })

            const res = await response.json()

            if (response.ok) {

                setCartItems(res.data)
            }

        })()

    }, [])

    const isAuthenticate = () => {

        const token = localStorage.getItem("token")

        if (token) {

            setLogin(prev => prev = !prev)
        }
    }

    useEffect(() => {

        isAuthenticate()

    }, [])

    return (
        <cartContext.Provider value={{ cartItems, setCartItems, totalPrice, setTotalPrice, discount, login, setLogin, orders, setOrders }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider