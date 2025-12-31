import React from 'react';
import Banner from '../../Components/Banner/Banner';
import SpecialOffer from '../../Components/SpecialOffer/SpecialOffer';
import Navbar from '../../Components/Navbar/Navbar';
import AboutHome from '../../Components/AboutHome/AboutHome';
import OurHomeMenu from '../../Components/OurHomeMenu/OurHomeMenu';
const Home = () => {
  return (
    <div>
    <Navbar />
    <Banner />
    <SpecialOffer />
    <AboutHome />
    <OurHomeMenu />
    </div>
  );
};

export default Home;
