import React, { useState } from 'react'
import { useCart } from '../../CartContext/CartContext'
import { dummyMenuData } from '../../assets/OmhDD'
import { FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './OurHomeMenu.css'
const categories = ['Ice Bath Therapy', 'Jacuzzi Therapy', 'Steam Therapy', 'Combo Packages']
const OurHomeMenu = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const displayItems = (dummyMenuData[activeCategory] || []).slice(0, 4);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart()
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
          <img src={item.image} alt={item.name}
          className=' max-h-full max-w-full object-contain transition-all duration-700' />
        </div>
<div className='p-4 sm:p-6 flex flex-col flex-grow'>
  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 transition-all duration-300' />
  
  <h3 className='text-xl sm:text-2xl mb-2 font-dancingscript text-blue-100 transition-colors'>
    {item.title}
  </h3>

  <p className='text-blue-100/80'>
    {item.description}
  </p>
  <div className=' mt-auto flex items-center gap-4 justify-between'>
  <div className=' bg-blue-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg'>
    <span className=' text-xl font-bold text-cyan-300 font-dancingscript'>
      {(item.price)}
    </span>
  </div>
  <div className=' flex items-center gap-2'>
    {quantity > 0 ?  (
      <>
      <button className=' w-8 h-8 rounded-full bg-blue-900/40 flex items-center
      justify-center hover:bg-blue-800/50 transition-colors' onClick={() => quantity > 1 ? updateQuantity(item.id, quantity - 1) : removeFromCart(item.id)}>
        <FaMinus className = ' text-white' />
      </button>
      <span className=' w-8 text-center text-white'>
        {quantity}
      </span>
      <button className=' w-8 h-8 rounded-full bg-blue-900/40 flex items-center
      justify-center hover:bg-blue-800/50 transition-colors' 
      onClick={() => addToCart(item, 1)}>
        <FaPlus className=' text-white'/>
      </button>
      </>
    ) : (
      <button
      onClick={() => addToCart(item, 1)} 
      className=' bg-blue-900/80 px-4 py-1.5 rounded-full 
      font-cinzel text-xs uppercase sm:text-sm tracking-wider transition-transform duration-300
      hover:scale-110 hover:shadow-lg hover:shadow-blue-900/20 relative overflow-hidden
      border-blue-800/50'>
        <span className=' relative font-bold text-white font-dancingscript'>
          Book Now →
        </span>
      </button>
    )}
</div>
</div>

      </div>
      </div>
    );
  })}
</div>
<div className='flex justify-center mt-16'>
  <Link 
    className='bg-blue-900/30 border-2 [border-blue-800/30] sm:px-10 py-3 rounded-full font-cinzel uppercase tracking-widest transition-all duration-300
    hover:bg-blue-800/40 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-900/20 backdrop-blur-sm px-8 text-white' 
    to='/menu'
  >
    Explore Full Menu
  </Link>
</div>

      </div>
    </div>
  )
}

export default OurHomeMenu
