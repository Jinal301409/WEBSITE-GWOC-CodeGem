import React from 'react'
import { aboutfeature } from '../../assets/dummydata'
import { FaInfoCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AboutImage from '../../assets/AboutImage.png'
import FloatingParticle from '../FloatingParticle/FloatingParticle'
import './AboutHome.css'
const AboutHome = () => {
  return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af]


py-10 sm:py-20 relative overflow-hidden">

  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
    <div className="absolute top-1/4 left-20 w-96 h-96 bg-blue-500/50 rounded-full
    blur-3xl mix-blend-soft-light" />
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/50
    blur-3xl mix-blend-soft-light" />
  </div>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:gap-8 xl:gap-16 relative">
  <div className="w-full order-1 lg:order-2 space-y-8 sm:space-y-12 relative">
    <div className="space-y-4 sm:space-y-8 px-4 sm:px-0">
      <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
        <span className="font-cursive text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Chill. Recover. Thrive.
        </span>
        <br />
        <span className="inline-block mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl opacity-90 font-light text-white">
          Where cold and heat therapy unlock peak physical recovery and mental resilience.
        </span>
      </h2>
      <p className="text-base sm:text-lg md:text-xl opacity-90 leading-relaxed max-w-3xl font-serif
italic border-l-4 border-blue-400 bg-blue-500/15 pl-4 sm:pl-6 py-2
bg-gradient-to-r from-white/10 to-transparent text-white">
  "At Chill Thrive, recovery is a ritual. Through the power of ice, steam, and heat therapy,
  we restore balance, build resilience, and help you unlock peak physical and mental performance."
</p>

    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-0">
  {aboutfeature.map((item, i) => (
    <div key={i} className="flex flex-col items-center justify-center gap-3 sm:gap-4 transition-transform
      duration-300 p-4 sm:p-5 hover:translate-x-2">
      <div className={`p-3 sm:p-4 rounded-full bg-gradient-to-br ${item.color}
        transition-transform duration-300 group-hover:scale-110`}>
        <item.icon className="text-2xl sm:text-3xl text-white" />
      </div>
 <div className="text-center text-white">
        <h3 className="text-xl sm:text-2xl font-bold font-cursive">
          {item.title}
        </h3>
        <p className="opacity-80 text-sm sm:text-base">
          {item.text}
        </p>
      </div>
    </div>
  ))}
</div>
<div className="flex flex-wrap gap-4 items-center mt-6 sm:mt-8 px-4 sm:px-0">
  <Link
    to="/about"
    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold 
      hover:scale-[1.02] transition-transform duration-300 
      flex items-center gap-2 sm:gap-3 shadow-xl hover:shadow-blue-500/30 group relative overflow-hidden" >
    <span className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 
        transition-opacity duration-300" ></span>

    <FaInfoCircle className="text-lg sm:text-xl animate-pulse text-white" />
    <span className="font-cursive text-lg sm:text-xl text-white">
      Unveil the Science of Recovery
    </span>
  </Link>
</div>

  </div>
  <div className="w-full order-2 lg:order-1 md:max-w-md lg:max-w-none lg:w-7/12 mt-12 mb-10 lg:mb-0 relative group 
  transform hover:scale-[1.01] transition-all duration-500">
  <div className="relative rounded-[4rem] overflow-hidden border-4 border-blue-900/30 hover:border-blue-500 duration-500 shadow-2xl shadow-black/50">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 via-transparent to-blue-600/10"></div>
 <img src={AboutImage} alt="Restaurant" className="w-full h-auto object-cover aspect-[3/4] transform -rotate-1 hover:rotate-0 
      transition-all duration-500"/>
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-blue-900/30 blur-3xl z-0"/>
  </div>
  <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"/>
</div>
</div>
<FloatingParticle />
    </div>
  )
}

export default AboutHome
