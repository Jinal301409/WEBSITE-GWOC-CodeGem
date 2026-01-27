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

  useEffect(() => {
    if (verifyStarted.current) return;
    verifyStarted.current = true;

    const params = new URLSearchParams(search);
    // accept multiple param names that different payment providers / redirects might use
    const paymentStatus = params.get("success") || params.get("payment_status") || params.get("status");
    const sessionId =
      params.get("session_id") || params.get("sessionId") || params.get("session");

    // If there's no session id but a code or token, still attempt to use it as sessionId
    if (!sessionId) {
      setStatusMsg("Missing session identifier from payment provider.");
      // navigate back to checkout after a short delay
      setTimeout(() => navigate("/checkout", { replace: true }), 2000);
      return;
    }

    // If paymentStatus explicitly indicates failure, go back to checkout
    if (paymentStatus && (paymentStatus === "false" || paymentStatus === "cancelled" || paymentStatus === "failed")) {
      setStatusMsg("Payment was cancelled or failed. Returning to checkout...");
      setTimeout(() => navigate("/checkout", { replace: true }), 1600);
      return;
    }

    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    // Use POST to match backend confirm endpoint which expects sessionId in body
    axios
      .post(
        "https://website-gwoc-codegem-backend.onrender.com/api/orders/confirm",
        { sessionId },
        { headers: authHeaders }
      )
      .then((res) => {
        // backend confirmed the payment and updated order
        clearCart();
        setStatusMsg("Payment confirmed. Redirecting to orders...");
        navigate("/myorder", { replace: true });
      })
      .catch((err) => {
        console.error("Confirmation error:", err);
        const msg = err.response?.data?.message || "There was an error verifying payment";
        setStatusMsg(msg);
        // keep user on page so they can retry or contact support
      });
  }, [search, clearCart, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <p>{statusMsg}</p>
    </div>
  );
};

export default VerifyPaymentPage;
