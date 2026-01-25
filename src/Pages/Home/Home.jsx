import React, { useEffect } from 'react';
import Banner from '../../Components/Banner/Banner';
import Navbar from '../../Components/Navbar/Navbar';
import AboutHome from '../../Components/AboutHome/AboutHome';
import OurMenu from '../../Components/OurMenu/OurMenu';
import Testimonial from '../../Components/Testimonial/Testimonial';
import RateSection from '../../Components/RateSection/RateSection';
import Footer from '../../Components/Footer/Footer';
const Home = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
    <Navbar />
    <Banner />
    <AboutHome />
    <OurMenu />
    <Testimonial />
    <RateSection />
    <Footer />
    </div>
  );
};

export default Home;
