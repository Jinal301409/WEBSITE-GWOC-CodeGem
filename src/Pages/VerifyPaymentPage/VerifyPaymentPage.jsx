import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../../CartContext/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyPaymentPage = () => {
  const { clearCart } = useCart();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("Verifying payment...");
  const verifyStarted = useRef(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (verifyStarted.current) return; // Prevent double calls
    verifyStarted.current = true;

    const params = new URLSearchParams(search);
    const paymentSuccess = params.get("success");
    const sessionId = params.get("session_id");

    // ❌ Payment failed or missing session
    if (paymentSuccess !== "true" || !sessionId) {
      if (paymentSuccess === "false") {
        setStatusMsg("Payment was cancelled. Redirecting to checkout...");
        setTimeout(() => navigate("/checkout", { replace: true }), 2000);
        return;
      }
      setStatusMsg("Payment failed, but your order is pending.");
      return;
    }

    // ✅ Payment success, confirm with backend
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(
        "https://website-gwoc-codegem-backend.onrender.com/api/orders/confirm",
        { params: { session_id: sessionId }, headers: authHeaders }
      )
      .then(() => {
        clearCart(); // Frontend-only cart clearing
        setStatusMsg("Payment verified! Redirecting to your orders...");
        setTimeout(() => navigate("/my-orders", { replace: true }), 1000);
      })
      .catch((err) => {
        console.error("Payment confirmation error:", err);
        setStatusMsg("Error verifying payment. Try again later.");
      });
  }, [search, clearCart, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
      <p className="text-center text-lg">{statusMsg}</p>
    </div>
  );
};

export default VerifyPaymentPage;
