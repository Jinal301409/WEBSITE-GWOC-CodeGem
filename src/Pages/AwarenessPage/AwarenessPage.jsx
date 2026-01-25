import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Aware from '../../Components/Aware/Aware'

const AwarenessPage = () => {
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <Aware />
      <Footer/>
    </div>
  )
}

export default AwarenessPage
