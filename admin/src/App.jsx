import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import List from './Components/List'
import Order from './Components/Order'
import AddItems from './Components/AddItems'

const App = () => {
  return (
   <>
   <Navbar/>
    <Routes>
      <Route path='/' element={<AddItems />} />
      <Route path='/list' element={<List />} />
      <Route path='/orders' element={<Order />} />
    </Routes>
    </>
  )
}

export default App
