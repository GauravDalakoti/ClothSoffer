import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from "./components/home/Home.jsx"
import Men from "./components/men/Men.jsx"
import Women from "./components/woman/Women.jsx"
import Kids from './components/kids/Kids.jsx'
import SignUp from './components/signUp/SignUp.jsx'
import Login from './components/login/Login.jsx'
import Cart from './components/cart/Cart.jsx'
import CurrentItem from './components/currentItem/CurrentItem.jsx'
import AllProduct from './components/allProducts/AllProduct.jsx'
import Order from './components/order/Order.jsx'
import Profile from './components/profile/Profile.jsx'
import YourOrders from './components/yourOrders/YourOrders.jsx'

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path='' element={<App />}>

      <Route path='/' element={<Home />} />
      <Route path='men' element={<Men />} />
      <Route path='women' element={<Women />} />
      <Route path='kids' element={<Kids />} />
      <Route path='signUp' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      <Route path='cart' element={<Cart />} />
      <Route path='all-products' element={<AllProduct />} />
      <Route path='currentItem/:_id' element={<CurrentItem />} />
      <Route path='order/:totalPrice' element={<Order />} />
      <Route path='profile' element={<Profile />} />
      <Route path='yourOrders' element={<YourOrders />} />


    </Route>
  )

)

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}>

  </RouterProvider>
)
