import React, { useState, useEffect, useRef } from "react"; // ✅ useEffect added
import axios from "axios"; // ✅ axios added
import { useCart } from "../../CartContext/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyPaymentPage = () => {
  const { clearCart } = useCart();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("Verifying Payment...");
  const verifyStarted = useRef(false);

  // GRAB TOKEN
  const token = localStorage.getItem("authToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    if (verifyStarted.current) return;
    verifyStarted.current = true;

    const params = new URLSearchParams(search);
    const paymentStatus = params.get("success");
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatusMsg("Missing session id. Redirecting...");
      setTimeout(() => navigate('/checkout', { replace: true }), 1500);
      return;
    }

    let attempts = 0;
    const maxAttempts = 12; // poll for up to ~24s (interval 2s)

    const poll = async () => {
      attempts++;
      try {
        const resp = await axios.get('https://website-gwoc-codegem-backend.onrender.com/api/orders/confirm', { params: { session_id: sessionId }, headers });
        if (resp.data && resp.data.order) {
          clearCart();
          navigate('/my-orders', { replace: true });
          return;
        }
      } catch (err) {
        // if 404 or payment not ready, continue polling
        if (attempts >= maxAttempts) {
          setStatusMsg('Could not confirm payment. Please check your orders page.');
          // still redirect after short delay so user sees orders
          setTimeout(() => navigate('/my-orders', { replace: true }), 1500);
          return;
        }
      }
      setTimeout(poll, 2000);
    };

    poll();
  }, [search, clearCart, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <p>{statusMsg}</p>
    </div>
  );
};

export default VerifyPaymentPage;