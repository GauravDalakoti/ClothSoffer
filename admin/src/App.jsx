import { Outlet } from 'react-router-dom'
import AdminContextProvider from "./context/AdminContextProvider.jsx"

function App() {

  return (
    <AdminContextProvider>
      <Outlet />
    </AdminContextProvider>
  )
}

export default App
