import React, { useState } from 'react'
import { useCart } from '../../CartContext/CartContext'
import { dummyMenuData } from '../../assets/OmhDD'
const categories = ['Ice Bath Therapy', 'Jacuzzi Therapy', 'Steam Therapy', 'Cold & Heat Recovery', 'Mental Resilience', 'Premium Wellness Experiences']
const OurHomeMenu = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const displayItems = (dummyMenuData[activeCategory] || []).slice(0, 4);
  const { cartItems, addToCart, removeFromCart } = useCart()
  const getQuantity = id => (cartItems.find(i=> i.id === id) ?.quantity || 0)
  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent
          bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
          <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2">
            Our Exquisite Therapy Menu
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-blue-100/80">
  A Symphony of Cold, Heat, and Recovery
</span>

        </h2>
        <div className='flex flex-wrap justify-center gap-4 mb-16'>
  {categories.map(cat => (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
      className={`
        px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform
        font-cinzel text-sm sm:text-1g tracking-widest backdrop-blur-sm
        ${activeCategory === cat
          ? 'bg-gradient-to-r from-blue-700/80 to-blue-500/80 border-blue-600 scale-105 shadow-lg text-white/80 hover:bg-blue-600/40'
          : 'border-blue-300 text-amber-100/80 hover:bg-blue-100/40'}`} >
      {cat}
    </button>
  ))}
</div>
<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
  {displayItems.map((item, i) => {
    const quantity = getQuantity(item.id);
    return (
      <div
        key={item.id}
        className='relative bg-blue-900/20 rounded-2xl overflow-hidden border border-blue-800/30 backdrop-blur-sm flex flex-col transition-all duration-500'
        style={{ '--index': i }}
      >
        <div className='relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-white/10'>
          <img src={item.image} alt={item.name} />
        </div>
      </div>
    );
  })}
</div>
      </div>
    </div>
  )
}

export default OurHomeMenu
