import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa6";
import { FiClock, FiTruck, FiCheckCircle } from "react-icons/fi";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 👇 If user/email missing, stop loading and show UI
    if (!user?.email) {
      setLoading(false);
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/orders", {
          params: { email: user.email },
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const statusStyles = {
    processing: {
      color: "text-blue-400",
      bg: "bg-blue-900/30",
      icon: <FiClock />,
      label: "Processing",
    },
    outForDelivery: {
      color: "text-blue-300",
      bg: "bg-blue-800/30",
      icon: <FiTruck />,
      label: "Out for Delivery",
    },
    delivered: {
      color: "text-blue-500",
      bg: "bg-blue-900/40",
      icon: <FiCheckCircle />,
      label: "Delivered",
    },
    pending: {
      color: "text-blue-300",
      bg: "bg-blue-800/30",
      icon: <FiClock />,
      label: "Payment Pending",
    },
    succeeded: {
      color: "text-blue-500",
      bg: "bg-blue-900/40",
      icon: <FiCheckCircle />,
      label: "Completed",
    },
  };

  const getPaymentMethodDetails = (method) => {
    switch (method?.toLowerCase()) {
      case "cod":
        return {
          label: "COD",
          class: "bg-blue-700/30 text-blue-300 border border-blue-500/40",
        };
      case "upi":
        return {
          label: "UPI",
          class: "bg-blue-600/30 text-blue-300 border border-blue-500/40",
        };
      default:
        return {
          label: "Online",
          class: "bg-blue-800/30 text-blue-300 border border-blue-500/40",
        };
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-7xl">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <FaArrowLeft />
            <span className="font-semibold">Back to Home</span>
          </Link>

          <span className="text-blue-400 text-sm">
            {user?.email || "Not logged in"}
          </span>
        </div>

        {/* ORDER HISTORY */}
        <div className="bg-[#1e293b]/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Order History
          </h2>

          {/* LOADING INSIDE CARD */}
          {loading && (
            <p className="text-center text-blue-300">
              Loading orders...
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-center text-blue-400">
              {error}
            </p>
          )}

          {/* NO USER */}
          {!user?.email && (
            <p className="text-center text-blue-300">
              Please log in to view your orders.
            </p>
          )}

          {/* EMPTY */}
          {!loading && user?.email && orders.length === 0 && (
            <p className="text-center text-blue-300">
              No orders found.
            </p>
          )}

          {/* TABLE */}
          {!loading && orders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900/40">
                  <tr>
                    <th className="p-4 text-left text-blue-400">Order ID</th>
                    <th className="p-4 text-left text-blue-400">Customer</th>
                    <th className="p-4 text-left text-blue-400">Address</th>
                    <th className="p-4 text-left text-blue-400">Items</th>
                    <th className="p-4 text-center text-blue-400">Total</th>
                    <th className="p-4 text-left text-blue-400">Price</th>
                    <th className="p-4 text-left text-blue-400">Payment</th>
                    <th className="p-4 text-left text-blue-400">Payment Status</th>
                    <th className="p-4 text-left text-blue-400">Order Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => {
                    const items = order.items || [];
                    const totalItems = items.reduce(
                      (s, i) => s + i.quantity,
                      0
                    );

                    const paymentMethod = getPaymentMethodDetails(
                      order.paymentMethod
                    );

                    const orderStatus =
                      statusStyles[order.status] ||
                      statusStyles.processing;

                    const paymentStatus =
                      statusStyles[order.paymentStatus] ||
                      statusStyles.pending;

                    return (
                      <tr
                        key={order._id}
                        className="border-b border-blue-500/20 hover:bg-blue-900/20 transition"
                      >
                        <td className="p-4 text-blue-100 font-mono text-sm">
                          {order._id}
                        </td>

                        <td className="p-4 text-blue-100">
                          {order.firstName} {order.lastName}
                        </td>

                        <td className="p-4 text-blue-300">
                          {order.address}
                        </td>

                        <td className="p-4 text-blue-200">
                          {items.map((i) => (
                            <div key={i._id}>
                              {i.item.name} × {i.quantity}
                            </div>
                          ))}
                        </td>

                        <td className="p-4 text-center text-blue-300">
                          {totalItems}
                        </td>

                        <td className="p-4 text-blue-100">
                          ₹{order.total}
                        </td>

                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${paymentMethod.class}`}>
                            {paymentMethod.label}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className={`${paymentStatus.bg} ${paymentStatus.color} px-3 py-1 rounded-full text-xs`}>
                            {paymentStatus.label}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className={`${orderStatus.bg} ${orderStatus.color} px-3 py-1 rounded-full text-xs`}>
                            {orderStatus.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
