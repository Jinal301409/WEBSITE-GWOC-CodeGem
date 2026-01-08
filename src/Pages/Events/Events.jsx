import { useState } from "react";
import { motion } from "framer-motion";

const eventsData = [
  {
    id: 1,
    title: "Black Bunny",
    description:
      "Black Bunny is a high-energy themed event focused on immersive fun, creative experiences, and vibrant social engagement.",
    images: [
      "/images/blackbunny1.jpg",
      "/images/blackbunny2.jpg",
      "/images/blackbunny3.jpg",
      "/images/blackbunny4.jpg",
      "/images/blackbunny5.jpg",
      "/images/blackbunny6.jpg",
    ],
  },
  {
    id: 2,
    title: "Funstreet",
    description:
      "Funstreet is all about joy, games, and interactive entertainment that creates unforgettable shared memories.",
    images: [
      "/images/funstreet1.jpg",
      "/images/funstreet2.jpg",
      "/images/funstreet3.jpg",
      "/images/funstreet4.jpg",
      "/images/funstreet5.jpg",
      "/images/funstreet6.jpg",
    ],
  },
  {
    id: 3,
    title: "Thee Flea",
    description:
      "Thee Flea is a creative flea-market-style event celebrating local brands, art, culture, and discovery.",
    images: [
      "/images/theeflea1.jpg",
      "/images/theeflea2.jpg",
      "/images/theeflea3.jpg",
      "/images/theeflea4.jpg",
      "/images/theeflea5.jpg",
      "/images/theeflea6.jpg",
    ],
  },
  {
    id: 4,
    title: "Special Showcase",
    description:
      "A premium curated showcase highlighting unique experiences, performances, and signature moments.",
    images: [
      "/images/special1.jpg",
      "/images/special2.jpg",
      "/images/special3.jpg",
      "/images/special4.jpg",
      "/images/special5.jpg",
      "/images/special6.jpg",
    ],
  },
];

const Events = () => {
  const [activeEvent, setActiveEvent] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#07172a] to-[#0b2a4a] text-white py-20 px-6">
      {!activeEvent ? (
        <>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Photo Gallery{" "}
              <span className="text-blue-400">/ Events</span>
            </h1>
            <p className="text-blue-200 text-lg">
              Explore our signature events and relive the experiences
            </p>
          </motion.div>

          {/* Event Pills */}
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {eventsData.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveEvent(event)}
                className="cursor-pointer rounded-full px-8 py-4 text-lg font-medium
                  bg-gradient-to-r from-blue-600 to-cyan-400
                  hover:scale-105 transition
                  shadow-lg shadow-blue-900/40"
              >
                {event.title}
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        /* Event Detail View */
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setActiveEvent(null)}
            className="mb-8 inline-flex items-center gap-2 text-blue-300 hover:text-blue-400 transition"
          >
            ← Back to Events
          </button>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 text-blue-400"
          >
            {activeEvent.title}
          </motion.h2>

          <p className="text-blue-200 text-lg max-w-3xl mb-10 leading-relaxed">
            {activeEvent.description}
          </p>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {activeEvent.images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={activeEvent.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                className="w-full h-52 object-cover rounded-2xl
                  shadow-xl shadow-black/40 hover:scale-105 transition"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;