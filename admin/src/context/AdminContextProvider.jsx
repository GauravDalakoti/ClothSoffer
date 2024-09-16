import { useEffect, useState } from "react";
import AdminContext from "./adminContext/adminContext";

const AdminContextProvider = ({ children }) => {

    const [login, setLogin] = useState(false)

    const isAuthenticate = () => {

        const token = localStorage.getItem("accesstoken")

        if (token) {

            setLogin(prev => prev = !prev)
        }
    }

    useEffect(() => {

        isAuthenticate()

    }, [])

    return (
        <AdminContext.Provider value={{ login, setLogin }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider