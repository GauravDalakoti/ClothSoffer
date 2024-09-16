import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from 'react-router-dom'
import SignIn from './pages/login/SignIn.jsx'
import Admin from './pages/admin/Admin.jsx'
import AddProduct from './components/addProduct/AddProduct.jsx'
import AllProducts from './components/allProducts/AllProducts.jsx'
import Order from './components/order/Order.jsx'

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path='' element={<App />}>

      <Route path='/' element={<SignIn />} />

      <Route path='admin' element={<Admin />}>

        <Route path='/admin' element={<AddProduct />} />
        <Route path='/admin/all-products' element={<AllProducts />} />
        <Route path='/admin/orders' element={<Order />} />

      </Route>

    </Route >
  )

)

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}>
    {/* <StrictMode>
      <App />
    </StrictMode>, */}
  </RouterProvider>
)
