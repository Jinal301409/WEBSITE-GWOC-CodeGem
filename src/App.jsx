import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ContactPage from './Pages/ContactPage/ContactPage';
import AboutPage from './Pages/AboutPage/AboutPage';
import Cart from './Pages/Cart/Cart';
import Services from './Pages/Services/Services';

const App = () => {
  return (
    <Routes>
      <Route path= '/' element={<Home />} />
      <Route path= '/contact' element={<ContactPage />} />
      <Route path= '/about' element={<AboutPage />} />
      <Route path= '/cart' element={<Cart />} />
      <Route path= '/services' element={<Services />} />
    </Routes>
  );
};

export default App;


