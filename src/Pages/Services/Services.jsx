import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import OurMenu from '../../Components/OurMenu/OurMenu'
const Services = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
      <>
      <Navbar/>
      <OurMenu/>
      <Footer/>

    </>
  )
}

export default Services
