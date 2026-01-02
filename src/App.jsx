import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ContactPage from './Pages/ContactPage/ContactPage';
import AboutPage from './Pages/AboutPage/AboutPage';
import Cart from './Pages/Cart/Cart';
import Services from './Pages/Services/Services';
import SignUp from './Components/SignUp/SignUp';
import AwarenessPage from './Pages/AwarenessPage/AwarenessPage';
import Events from './Pages/Events/Events';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/services' element={<Services />} />
      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/aware' element={<AwarenessPage />} />
      <Route path='/photo' element={<Events />} />
    </Routes>
  );
};

export default App;
