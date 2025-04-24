import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
export default function Layout() {
let [varble ,setVarble] = useState(0)
useEffect(() =>{
    // Code here
    return () => {
        // Code here
    }
},[])
  return <>
    <Navbar/>
  <Outlet></Outlet>
  </>
}
