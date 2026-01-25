import React, { useEffect } from 'react'
import MyOrder from '../../Components/MyOrder/MyOrder'


import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
const MyOrderPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <Navbar/>
      <MyOrder/>
      <Footer/>
    </div>
  )
}

export default MyOrderPage
