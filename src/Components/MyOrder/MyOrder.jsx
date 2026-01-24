import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa6";
import { FiClock, FiTruck, FiCheckCircle, FiMapPin } from "react-icons/fi";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/orders",
          {
            params: { email: user?.email },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const formattedOrders = response.data.map((order) => ({
          ...order,
          items:
            order.items?.map((entry) => ({
              _id: entry._id,
              item: {
                ...entry.item,
                imageUrl: entry.item.imageUrl,
              },
              quantity: entry.quantity,
            })) || [],
          paymentStatus: order.paymentStatus?.toLowerCase() || "pending",
        }));

        setOrders(formattedOrders);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load orders. Please try again later"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const statusStyles = {
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
      default:
        return {
          label: "Online",
          class: "bg-blue-800/30 text-blue-300 border border-blue-500/40",
        };
    }
  };

  if (error) return null;

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

        {/* PAGE HEADING */}
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Order History
        </h2>

        {/* TABLE CARD */}
        <div className="bg-[#1e293b]/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 shadow-xl">

          {!loading && orders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">

                {/* ✅ ONLY COLUMN HEADERS (NO DATA ROW ABOVE) */}
                <thead>
                  <tr className="bg-blue-800/30">
                    <th className="p-4 text-blue-400">Customer ID</th>
                    <th className="p-4 text-blue-400">Customer</th>
                    <th className="p-4 text-blue-400">Address</th>
                    <th className="p-4 text-blue-400 text-center">Order</th>
                    <th className="p-4 text-blue-400">Price</th>
                    <th className="p-4 text-blue-400">Payment Type</th>
                    <th className="p-4 text-blue-400">Payment Status</th>
                  </tr>
                </thead>

                {/* ORDERS */}
                <tbody>
                  {orders.map((order) => {
                    const totalItems = order.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    );

                    const totalPrice =
                      order.total ??
                      order.items.reduce(
                        (sum, item) =>
                          sum + item.item.price * item.quantity,
                        0
                      );

                    const paymentMethod =
                      getPaymentMethodDetails(order.paymentMethod);
                    const paymentStatus =
                      statusStyles[order.paymentStatus] ||
                      statusStyles.pending;

                    return (
                      <tr
                        key={order._id}
                        className="border-b border-blue-500/20 hover:bg-[#3a2b2b]/40"
                      >
                        <td className="p-4 text-blue-100 font-mono">
                          {order._id?.slice(-8)}
                        </td>

                        <td className="p-4">
                          <p className="text-blue-100">
                            {order.firstName} {order.lastName}
                          </p>
                          <p className="text-sm text-blue-400/60">
                            {order.phone}
                          </p>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FiMapPin className="text-blue-400" />
                            <span className="text-blue-100/80 text-sm">
                              {order.address}, {order.city} - {order.zipCode}
                            </span>
                          </div>
                        </td>

                        <td className="p-4 text-center text-blue-100">
                          {totalItems}
                        </td>

                        <td className="p-4 text-blue-100 font-semibold">
                          ₹{totalPrice}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm border ${paymentMethod.class}`}
                          >
                            {paymentMethod.label}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${paymentStatus.bg} ${paymentStatus.color}`}
                          >
                            {paymentStatus.label}
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
