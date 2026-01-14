import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Navbar from '../../Components/Navbar/Navbar';
import AboutHome from '../../Components/AboutHome/AboutHome';
import OurHomeMenu from '../../Components/OurHomeMenu/OurHomeMenu';
import Testimonial from '../../Components/Testimonial/Testimonial';
import RateSection from '../../Components/RateSection/RateSection';
import Footer from '../../Components/Footer/Footer';
const Home = () => {
  return (
    <div>
    <Navbar />
    <Banner />
    <AboutHome />
    <OurHomeMenu />
    <Testimonial />
    <RateSection />
    <Footer />
    </div>
  );
};

export default Home;
