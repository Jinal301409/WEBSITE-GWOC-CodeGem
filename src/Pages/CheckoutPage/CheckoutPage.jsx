import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Checkout from "../../Components/Checkout/Checkout";

const CheckoutPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <Navbar />
      <Checkout />
      <Footer />
    </>
  );
};

export default CheckoutPage;
