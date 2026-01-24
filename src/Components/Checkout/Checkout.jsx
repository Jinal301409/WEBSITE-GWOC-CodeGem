import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../CartContext/CartContext.jsx";

const Checkout = () => {
  const { cartItems, clearCart } = useCart(); // ✅ removed totalAmount usage
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("payment_status");
    const sessionId = params.get("session_id");

    if (!paymentStatus) return;

    setLoading(true);

    if (paymentStatus === "success" && sessionId) {
      axios
        .post(
          "http://localhost:4000/api/orders/confirm",
          { sessionId },
          { headers: authHeaders }
        )
        .then(({ data }) => {
          clearCart();
          navigate("/myorder", { state: { order: data.order } });
        })
        .catch(() => setError("Payment confirmation failed."))
        .finally(() => setLoading(false));
    } else {
      setError("Payment was cancelled or failed.");
      setLoading(false);
    }
  }, [location.search, navigate, clearCart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const subtotal = cartItems.reduce((sum, { item, quantity }) => {
      const price = Number(String(item.price).replace(/[^\d]/g, ""));
      return sum + price * quantity;
    }, 0);

    const tax = Number((subtotal * 0.05).toFixed(2));

    const payload = {
      ...formData,
      subtotal,
      tax,
      total: subtotal + tax,
      items: cartItems.map(({ item, quantity }) => ({
        name: item.title || item.name,
        price: Number(String(item.price).replace(/[^\d]/g, "")),
        quantity,
        imageUrl: item.image || item.imageUrl || "",
        itemId: item._id || item.id,
      })),
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/orders",
        payload,
        { headers: authHeaders }
      );

      if (formData.paymentMethod === "online") {
        window.location.href = data.checkoutUrl;
      } else {
        clearCart();
        navigate("/myorder", { state: { order: data.order } });
      }
    } catch {
      setError("Failed to submit order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <Link to="/cart" className="flex items-center gap-2 text-blue-400 mb-8">
          <FaArrowLeft /> Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="bg-[#4b3b3b]/60 p-6 rounded-3xl space-y-4">
            {["firstName", "lastName", "phone", "email", "address", "city", "zipCode"].map(
              (field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#2a1e1e]"
                />
              )
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-[#4b3b3b]/60 p-6 rounded-3xl space-y-5">
            {cartItems.map(({ item, quantity }) => {
              const price = Number(String(item.price).replace(/[^\d]/g, ""));
              return (
                <div key={item._id || item.id} className="flex justify-between text-sm">
                  <span>{item.title || item.name} × {quantity}</span>
                  <span>₹{price * quantity}</span>
                </div>
              );
            })}

            {/* ✅ FIXED SUMMARY */}
            <PaymentSummary cartItems={cartItems} />

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
              className="w-full bg-[#3a2b2b]/50 rounded-xl px-4 py-3"
            >
              <option value="">Select Payment</option>
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>

            {error && <p className="text-blue-600">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-blue-600 py-4 rounded-xl font-bold flex justify-center items-center"
            >
              <FaLock className="mr-2" />
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PaymentSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce((sum, { item, quantity }) => {
    const price = Number(String(item.price).replace(/[^\d]/g, ""));
    return sum + price * quantity;
  }, 0);

  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between">
        <span>Tax (5%)</span>
        <span>₹{tax}</span>
      </div>

      <div className="flex justify-between font-bold border-t pt-2">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default Checkout;
