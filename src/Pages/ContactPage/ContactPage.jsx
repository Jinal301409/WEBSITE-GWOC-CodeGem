import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Contact from '../../Components/Contact/Contact'
const ContactPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
      <>
      <Navbar/>
      <Contact />
      <Footer/>
    </>
  )
}

export default ContactPage
