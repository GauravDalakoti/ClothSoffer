import { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import CartContextProvider from './context/CartContextProvider'

function App() {

  return (
    <>
      <CartContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </CartContextProvider>
    </>
  )
}

export default App
