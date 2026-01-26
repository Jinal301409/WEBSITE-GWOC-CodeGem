import { motion } from "framer-motion";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

// Black Bunny
import bb1 from "../../assets/bb1.png";
import bb2 from "../../assets/bb2.png";
import bb3 from "../../assets/bb3.png";
import bb4 from "../../assets/bb4.png";
import bb5 from "../../assets/bb5.png";
import bb6 from "../../assets/bb6.png";

// Customers
import fs1 from "../../assets/fs1.png";
import fs2 from "../../assets/fs2.png";
import fs3 from "../../assets/fs3.png";
import fs4 from "../../assets/fs4.png";
import fs5 from "../../assets/fs5.png";
import fs6 from "../../assets/fs6.png";

// Thee Flea
import tf1 from "../../assets/tf6.png";
import tf2 from "../../assets/tf1.png";
import tf3 from "../../assets/tf2.png";
import tf4 from "../../assets/tf3.png";
import tf5 from "../../assets/tf4.png";
import tf6 from "../../assets/tf5.png";

// Special Showcase
import sp1 from "../../assets/sp1.png";
import sp2 from "../../assets/sp2.png";
import sp3 from "../../assets/sp3.png";
import sp4 from "../../assets/sp4.png";
import sp5 from "../../assets/sp5.png";
import sp6 from "../../assets/sp6.png";
import Footer from "../../Components/Footer/Footer";

const eventsData = [
  {
    title: "Black Bunny",
    description:
      "Black Bunny is a high-energy themed event focused on immersive fun, creative experiences, and vibrant social engagement.",
    images: [bb1, bb2, bb3, bb4, bb5, bb6],
  },
  {
    title: "Customers",
    description:
      "Real moments captured with our customers enjoying unforgettable Chill Thrive experiences.",
    images: [fs1, fs2, fs3, fs4, fs5, fs6],
  },
  {
    title: "Thee Flea",
    description:
      "Thee Flea is a creative flea-market-style event celebrating local brands, art, culture, and discovery.",
    images: [tf1, tf2, tf3, tf4, tf5, tf6],
  },
  {
    title: "Special Showcase",
    description:
      "A premium curated showcase highlighting unique experiences, performances, and signature moments.",
    images: [sp1, sp2, sp3, sp4, sp5, sp6],
  },
];

const Events = () => {
  return (
    <>
      {/* ✅ NAVBAR ADDED HERE */}
      <Navbar />
      

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#07172a] to-[#0b2a4a] text-white pt-32 px-6">
        
        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Photo Gallery <span className="text-blue-400">/ Events</span>
          </h1>
          <p className="text-blue-200 text-lg">
            Explore our signature events and relive the experiences
          </p>
        </motion.div>

        {/* ALL EVENTS */}
        {eventsData.map((event, eIndex) => (
          <div key={eIndex} className="max-w-6xl mx-auto mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 text-blue-400">
              {event.title}
            </motion.h2>

            <p className="text-blue-200 text-lg max-w-3xl mb-10 leading-relaxed">
              {event.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {event.images.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={event.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="w-full h-56 object-cover rounded-2xl
                    shadow-xl shadow-black/40 hover:scale-105 transition"
                  
                />
                
              
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Events;
