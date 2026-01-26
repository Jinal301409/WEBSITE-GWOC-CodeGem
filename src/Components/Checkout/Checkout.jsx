import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../CartContext/CartContext.jsx";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
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

  const [selectedDate, setSelectedDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

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
          "https://website-gwoc-codegem-backend.onrender.com/api/orders/confirm",
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

  // generate 45-min time slots from 07:00 to 21:00 (last slot starts at 20:15)
  const generateSlots = () => {
    const slots = [];
    let start = 7 * 60; // minutes
    const end = 21 * 60; // 21:00
    while (start + 45 <= end) {
      const hh = String(Math.floor(start / 60)).padStart(2, "0");
      const mm = String(start % 60).padStart(2, "0");
      const endMin = start + 45;
      const eh = String(Math.floor(endMin / 60)).padStart(2, "0");
      const em = String(endMin % 60).padStart(2, "0");
      slots.push(`${hh}:${mm}-${eh}:${em}`);
      start += 45;
    }
    return slots;
  };

  const allSlots = generateSlots();

  useEffect(() => {
    if (!selectedDate) return;
    let mounted = true;
    const fetch = async () => {
      try {
        const resp = await axios.get(
          "https://website-gwoc-codegem-backend.onrender.com/api/orders/slots",
          { params: { date: selectedDate } }
        );
        if (!mounted) return;
        setBookedSlots(resp.data.slots || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
    const id = setInterval(fetch, 10000); // refresh every 10s
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot)
      return setError("Please select date and time slot");

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
      bookingDate: selectedDate,
      timeSlot: selectedSlot,
      paymentMethod: formData.paymentMethod,
    };

    try {
      const { data } = await axios.post(
        "https://website-gwoc-codegem-backend.onrender.com/api/orders",
        payload,
        { headers: authHeaders }
      );

      if (formData.paymentMethod === "online") {
        window.location.href = data.checkoutUrl;
      } else {
        // mark slot as booked locally so UI updates immediately
        setBookedSlots((prev) =>
          Array.from(new Set([...(prev || []), selectedSlot]))
        );
        clearCart();
        navigate("/myorder", { state: { order: data.order } });
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409)
        setError("Selected time slot is already booked. Choose another.");
      else setError("Failed to submit order");
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

            <div>
              <label className="block mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
                className="w-full px-4 py-3 rounded-xl bg-[#2a1e1e]"
              />
            </div>

            <div>
              <label className="block mb-2">Select Time Slot</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto">
                {allSlots.map((s) => {
                  const disabled = bookedSlots.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      disabled={disabled}
                      onClick={() => setSelectedSlot(s)}
                      className={`px-3 py-2 rounded-lg ${
                        disabled
                          ? "bg-gray-600/40"
                          : selectedSlot === s
                          ? "bg-blue-600"
                          : "bg-[#2a1e1e]"
                      }`}
                    >
                      {s}
                      {disabled && " (Booked)"}
                    </button>
                  );
                })}
              </div>
            </div>
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
