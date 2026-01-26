import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../CartContext/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./OurHomeMenu.css";

// helper placeholder and URL builder
const PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%2310283a'/><text x='50%' y='50%' fill='%23cbd5e1' font-size='18' font-family='Arial' text-anchor='middle' dy='.3em'>Image not available</text></svg>`;

const buildImageUrl = (raw) => {
  if (!raw) return PLACEHOLDER;
  try {
    const s = String(raw).trim();
    if (!s || s === "null") return PLACEHOLDER;
    if (/^https?:\/\//i.test(s)) return s;
    const normalized = s.replace(/\\/g, "/");
    const uploadsIndex = normalized.indexOf("/uploads/");
    if (uploadsIndex !== -1) {
      const filename = normalized.slice(uploadsIndex + "/uploads/".length);
      return `https://website-gwoc-codegem-backend.onrender.com/uploads/${filename}`;
    }
    if (normalized.startsWith("uploads/"))
      return `https://website-gwoc-codegem-backend.onrender.com/${normalized}`;
    if (!normalized.includes("/"))
      return `https://website-gwoc-codegem-backend.onrender.com/uploads/${normalized}`;
    return normalized;
  } catch {
    return PLACEHOLDER;
  }
};

const categories = [
  "Ice Bath Therapy",
  "Jacuzzi Therapy",
  "Steam Therapy",
  "Combo Packages",
];

const OurHomeMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    axios
      .get("https://website-gwoc-codegem-backend.onrender.com/api/items")
      .then((res) => {
        // support responses where data is array or { data: [...] }
        const raw = Array.isArray(res.data)
          ? res.data
          : res.data && Array.isArray(res.data.data)
          ? res.data.data
          : [];

        // normalize item fields and build full image URL for uploads
        const normalized = raw.map((item) => ({
          _id: item._id || item.id,
          title: item.title || item.name || "",
          name: item.name || item.title || "",
          description: item.description || "",
          duration: item.duration || item.time || "",
          benefits: item.benefits || item.tags || [],
          price:
            item.price != null
              ? item.price
              : item.cost != null
              ? item.cost
              : "",
          // store raw image reference (filename or full URL)
          image: item.imageUrl || item.image || '',
          category: item.category || "",
        }));

        const grouped = normalized.reduce((acc, it) => {
          acc[it.category] = acc[it.category] || [];
          acc[it.category].push(it);
          return acc;
        }, {});
        setMenuData(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // CART HELPERS
  const getCartEntry = (id) =>
    cartItems.find((ci) => {
      const iid = ci?.item?._id || ci?.item?.id;
      return iid === id;
    });

  const getQuantity = (id) => getCartEntry(id)?.quantity || 0;

  const displayItems = menuData?.[activeCategory]?.slice(0, 4) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading menu...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
          <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2">
            Our Exquisite Therapy Menu
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-blue-100/80">
            A Symphony of Cold, Heat, and Recovery
          </span>
        </h2>

        {/* CATEGORY BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 font-cinzel tracking-widest
                ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-700/80 to-blue-500/80 border-blue-600 scale-105 text-white"
                    : "border-blue-300 text-amber-100/80 hover:bg-blue-100/40"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ITEMS GRID */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {displayItems.map((item, i) => {
            const qty = getQuantity(item._id);
            const cartEntry = getCartEntry(item._id);

            return (
              <div
                key={item._id}
                className="relative bg-blue-900/20 rounded-2xl overflow-hidden border border-blue-800/30 backdrop-blur-sm flex flex-col transition-all duration-500"
              >
                <div className="h-48 flex items-center justify-center bg-white/10">
                  <img
                    loading="lazy"
                    src={buildImageUrl(item.imageUrl || item.image)}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow reveal card-tilt">
                  <h3 className="text-2xl mb-2 font-dancingscript text-blue-100">
                    {item.title}
                  </h3>

                  <p className="text-blue-100/80">{item.description}</p>

                  <p className="text-blue-200/70 mt-2 text-sm font-cinzel">
                    ⏱ Duration: {item.duration}
                  </p>

                  <ul className="mt-3 space-y-1 text-blue-100/80 text-sm">
                    {item.benefits?.map((b, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-cyan-400">✔</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-4">
                    <span className="text-xl font-bold text-cyan-300 font-dancingscript">
                      {item.price}
                    </span>

                    {qty > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            qty > 1
                              ? updateQuantity(item._id, qty - 1)
                              : removeFromCart(item._id)
                          }
                          className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center justify-center"
                        >
                          <FaMinus className="text-white" />
                        </button>

                        <span className="text-white w-6 text-center">{qty}</span>

                        <button
                          onClick={() => addToCart(item, 1)}
                          className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center justify-center"
                        >
                          <FaPlus className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="bg-blue-900/80 px-4 py-1.5 rounded-full text-white font-dancingscript"
                      >
                        Book Now →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER LINK */}
        <div className="flex justify-center mt-16">
          <Link
            to="/menu"
            className="bg-blue-900/30 border-2 border-blue-800/30 px-8 py-3 rounded-full font-cinzel tracking-widest text-white hover:scale-105 transition-all"
          >
            Explore Full Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurHomeMenu;
