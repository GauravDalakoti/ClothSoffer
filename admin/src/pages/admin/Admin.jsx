import React from 'react'
import Header from '../../components/header/Header'
import SideBar from '../../components/sidebar/SideBar'
import { Outlet } from 'react-router-dom'

function Admin() {
    return (
        <>
            <Header />

            <div className='flex gap-4 max-md:flex-col '>
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}

export default Admin