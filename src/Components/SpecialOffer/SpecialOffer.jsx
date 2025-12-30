import { cardData, additionalData } from '../../assets/dummydata';
import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext'; // adjust path if needed
import { FaStar } from 'react-icons/fa6';
import { FaFire, FaHeart, FaPlus } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi';
import FloatingParticle from '../FloatingParticle/FloatingParticle';
const SpecialOffer = () => {
    const [showAll, setShowAll] = useState(false);
    const initialData = [...cardData, ...additionalData];
const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
const addButtonBase =
  "relative flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold";

const addButtonHover =
  "hover:bg-blue-700 hover:scale-105";

const commonTransition =
  "transition-all duration-300";

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16 px-4 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading Section */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4 transform transition-all 
            bg-gradient-to-r from-blue-400 to-blue-600 
            bg-clip-text text-transparent font-[Playfair_Display] italic">
            Today&apos;s <span className="text-white">Special</span> Offers
          </h1>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto tracking-wide leading-relaxed">
            Limited-time recovery experiences crafted to help you reset, recharge,
and perform at your best—available today at Chill Thrive.

          </p>
        </div>
        {/*PRODUCT CART */}
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
  {(showAll ? initialData : initialData.slice(0, 4)).map((item, index) => {
    const cartItem = cartItems.find(ci => ci.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <div
        key={`${item.id}-${index}`}
        className="relative group bg-blue-900 rounded-3xl overflow-hidden shadow-2xl
        transform hover:-translate-y-4 transition-all duration-500
        hover:shadow-blue-900/40 border-2 border-transparent hover:border-blue-400/30
        before:absolute before:inset-0 before:bg-blue-400/20 before:opacity-0
        hover:before:opacity-20" >
        <div className="relative h-72 overflow-hidden">
          <img src={item.image} alt={item.title}
            className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500"/>
            <div className="absolute inset-0 bg-gradient-to-b 
from-transparent via-blue-900/40 to-blue-950/90" />
<div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-blue-950/50 backdrop-blur-sm px-4 py-2 rounded-full">
  <span className="flex items-center gap-2 text-blue-400">
    <FaStar className="text-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" />
    <span className="font-bold">{item.rating}</span>
  </span>

<span className=' flex items-center gap-2 text-blue-700'>
<FaHeart className=' text-x1 animate-heartbeat' />
<span className=' font-bold'> {item.hearts}</span>
</span>
</div>

        </div>
        <div className='p-6 relative z-10'>
  <h3 className='text-2xl font-bold mb-2 
    bg-gradient-to-r from-blue-300 to-blue-600
    bg-clip-text text-transparent font-[Playfair_Display] italic'>
      {item.title}
  </h3>
  <p className="text-blue-200 mb-5 text-sm leading-relaxed tracking-wide">
  {item.description}
</p>

<div className="flex items-center justify-between gap-4">
  <span className="text-blue-400 flex-1 text-2xl font-bold">
   ₹{item.price}
  </span>
  {cartItem ? (
  <div className="flex items-center gap-3">
    <button
      onClick={() => {
        quantity > 1
          ? updateQuantity(item.id, quantity - 1)
          : removeFromCart(item.id);
      }}
      className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center
      justify-center hover:bg-blue-800/50 transition-all duration-200 active:scale-95"
    >
      <HiMinus className="w-4 h-4 text-white" />
    </button>

    <span className="w-8 text-center text-white font-medium">
      {quantity}
    </span>

    <button
      onClick={() => updateQuantity(item.id, quantity + 1)}
      className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center
      justify-center hover:bg-blue-800/50 transition-all duration-200 active:scale-95"
    >
      <HiPlus className="w-4 h-4 text-white" />
    </button>
  </div>
) : (
<button onClick={() => addToCart({...item, name: item.title, price: parseFloat(item.price.replace('₹', '')) }, 1)}
className={`${addButtonBase} ${addButtonHover} ${commonTransition}`}>
  <div className=' absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent
opacity-0 hover:opacity-100 transition-opacity duration-300'/>
<FaPlus className=' text-lg transition-transform' />
<span className=' relative z-10'>Add</span>
</button>
)}
</div>
</div>
<div className=' absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent
group-hover:border-blue-500/30 transition-all duration-500'/>
<div className=' opacity-0 group-hover:opacity-100'>
<FloatingParticle />
</div>

      </div>
    );
  })}
</div>
<div className="mt-12 flex justify-center">
  <button
    onClick={() => setShowAll(!showAll)}
    className="relative flex items-center gap-3 
    bg-gradient-to-r from-blue-700 to-blue-600
    text-white px-8 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider
    hover:gap-4 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20
    transition-all duration-300 group border-2 border-blue-400 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/10
      opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
    <FaFire className="text-xl animate-pulse" />
  </button>
</div>


        </div>
      </div>
  );
};

export default SpecialOffer;
