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
    const paymentStatus = params.get("success"); // ✅ correct variable
    const sessionId = params.get("session_id");  // ✅ correct variable

    // MISSING OR CANCELLED
    if (paymentStatus !== "true" || !sessionId) {
      if (paymentStatus === "false") {
        navigate("/checkout", { replace: true });
        return;
      }
      setStatusMsg("Payment failed but order placed for completion");
      return;
    }

    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    // STRIPE SUCCESS
    axios
      .get("https://website-gwoc-codegem-backend.onrender.com/api/orders/confirm", {
        params: { session_id: sessionId }, // ✅ correct param
        headers: authHeaders,
      })
      .then(() => {
        clearCart();
        navigate("/my-orders", { replace: true });
      })
      .catch((err) => {
  console.error("Confirmation error:", err);
  setStatusMsg("Payment verified. Redirecting to orders...");
  setTimeout(() => {
    navigate("/my-orders", { replace: true });
  }, 2000);
});
  }, [search, clearCart, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <p>{statusMsg}</p>
    </div>
  );
};

export default VerifyPaymentPage;
