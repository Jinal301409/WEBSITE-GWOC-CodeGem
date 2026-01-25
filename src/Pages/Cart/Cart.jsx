import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import CartPage from '../../Components/CartPage/CartPage'
const Cart = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
      <div>
       <Navbar />
       <CartPage />
       <Footer />
    </div>
  )
}

export default Cart
