import { useState } from 'react'
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/Home"
import Categories from "./Components/Categories/Categories"
import SignIn from "./Components/SignIn/SignIn"
import SignUp from "./Components/SignUp/SignUp"
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  let rout = createBrowserRouter([
    {path:"",element:<Layout></Layout> , children:[
      {path:"Home" , element:<Home></Home>},
      {path:"Categories",element:<Categories></Categories>},
      {path:"signIn" , element:<SignIn></SignIn>},
      {path:"signUp" , element:<SignUp></SignUp>},
    ]}
  ])

  return (
    <>
    <RouterProvider router={rout}></RouterProvider>
    </>
  )
}

export default App
