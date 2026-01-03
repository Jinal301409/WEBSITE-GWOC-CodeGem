import React, { useState } from 'react'
import { motion } from 'framer-motion';
import stats from '../../assets/dummydata'
const RateSection = () => {
    const [hoveredStat, setHoveredStat] = useState(null);
  return (
    <div>
      <section className=' py-16 px-4 md:px-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af] '>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  {stats.map((s, i) => {
    const Icon = s.icon;
    return (
      <motion.div
        key={s.label}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2, type: "spring" }}
        className="relative group h-48 bg-white/10 backdrop-blur-md border border-blue-300/30 rounded-2xl shadow-lg shadow-blue-500/10"
        onHoverStart={() => setHoveredStat(i)}
        onHoverEnd={() => setHoveredStat(null)}
        animate={{
          scale: hoveredStat === i ? 1.05 : 1,
          zIndex: hoveredStat === i ? 10 : 1,
        }}>
        <motion.div
  className="absolute inset-0"
  animate={{
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.3,
    }
  }}>
  <div
    className="relative h-full bg-blue-500/30 backdrop-blur-lg
    rounded-xl border-2 border-blue-400/30 p-6 overflow-hidden transition-all duration-300">
         <motion.div
  className="absolute inset-0 rounded-xl"
  animate={{
    background: [
      "linear-gradient(45deg, #1e3a8a 0%, #0f172a 50%, #1e3a8a 100%)",
      "linear-gradient(45deg, #1e3a8a 0%, #0f172a 80%, #1e3a8a 100%)",
      "linear-gradient(45deg, #1e3a8a 0%, #0f172a 50%, #1e3a8a 100%)",
    ],
  }}
  transition={{ duration: 6, repeat: Infinity }}
/>

<div className="absolute inset-0 rounded-xl shadow-lg shadow-blue-900/20" />

<div className="relative z-10 h-full flex flex-col items-center justify-center">
  <motion.div
    className="mb-4 p-3 rounded-full bg-blue-900/30 border border-blue-400/30"
    whileHover={{ scale: 1.1, rotate: 10 }}
  >
    <Icon className="w-8 h-8 text-blue-400" />
  </motion.div>
  <div
  className="text-4xl font-bold mb-1 bg-clip-text bg-gradient-to-r
  from-blue-200 to-blue-400 text-transparent"
>
  {s.value}
</div>

<motion.div
  className="text-sm uppercase tracking-widest font-medium text-blue-100/80"
  animate={{
    letterSpacing: hoveredStat === i ? "0.15em" : "0.1em",
    textShadow:
      hoveredStat === i
        ? "0 0 8px rgba(59,130,246,0.4)"
        : "none",
  }}
>
  {s.label}
</motion.div>

</div>

  </div>
</motion.div>
      </motion.div>
    );
  })}
</div>

</section>
    </div>
  )
}

export default RateSection
