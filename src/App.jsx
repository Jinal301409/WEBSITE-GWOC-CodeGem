import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ContactPage from './Pages/ContactPage/ContactPage';
import AboutPage from './Pages/AboutPage/AboutPage';
import Cart from './Pages/Cart/Cart';
import Services from './Pages/Services/Services';
import SignUp from './Components/SignUp/SignUp';
import AwarenessPage from './Pages/AwarenessPage/AwarenessPage';
import Events from './Pages/Events/Events';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import MyOrderPage from './Pages/MyOrderPage/MyOrderPage';
import VerifyPaymentPage from './Pages/VerifyPaymentPage/VerifyPaymentPage';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';
import IceLoader from './Components/IceLoader';
import IceTransition from './Components/IceTransition';

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {/* LOADER */}
      {loading && <IceLoader onFinish={() => setLoading(false)} />}

      {/* MAIN APP */}
      {!loading && (
        <>
          <IceTransition />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/services' element={<Services />} />
            <Route path='/login' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />

            {/* PAYMENT VERIFICATION */}
            <Route path='/myorder/verify' element={<VerifyPaymentPage />} />

            <Route path='/aware' element={<AwarenessPage />} />
            <Route path='/photo' element={<Events />} />
            <Route path='/cart' element={<Cart />} />

            <Route
              path='/checkout'
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />

            <Route
              path='/myorder'
              element={
                <PrivateRoute>
                  <MyOrderPage />
                </PrivateRoute>
              }
            />

            <Route
              path='/my-orders'
              element={
                <PrivateRoute>
                  <MyOrderPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
