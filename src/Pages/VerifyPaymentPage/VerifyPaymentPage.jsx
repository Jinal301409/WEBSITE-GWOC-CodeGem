import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCart } from "../../CartContext/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyPaymentPage = () => {
  const { clearCart } = useCart();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("Verifying payment...");
  const verifyStarted = useRef(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (verifyStarted.current) return;
    verifyStarted.current = true;

    const params = new URLSearchParams(search);
    const sessionId = params.get("session_id") || params.get("sessionId") || params.get("session") || params.get("sid");
    const successFlag = params.get("success") || params.get("payment_status") || params.get("status");

    if (!sessionId) {
      // if no session id present, show message and redirect to orders after short delay
      setStatusMsg("No session id found in redirect. If payment completed, contact support.");
      setTimeout(() => navigate('/my-orders', { replace: true }), 2500);
      return;
    }

    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    setStatusMsg('Confirming payment, please wait...');

    axios.post(
      "https://website-gwoc-codegem-backend.onrender.com/api/orders/confirm",
      { sessionId },
      { headers: authHeaders }
    )
    .then((res) => {
      setStatusMsg('Payment verified. Redirecting to your orders...');
      clearCart();
      // navigate to the orders page (ensure route exists)
      navigate('/my-orders', { replace: true });
    })
    .catch((err) => {
      console.error('Confirmation error:', err);
      // show helpful message
      const msg = err?.response?.data?.message || 'There was an error verifying payment.';
      setStatusMsg(msg);
      // still clear cart if backend indicates order exists
      // do not redirect automatically
    });
  }, [search, clearCart, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <p>{statusMsg}</p>
    </div>
  );
};

export default VerifyPaymentPage;
