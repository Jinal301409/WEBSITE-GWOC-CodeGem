import React from 'react';
import { cartData, additionalData } from '../../assets/dummydata';
const SpecialOffer = () => {
    const [showAll, setShowAll] = useState(false);
    const initialData = [...cartData, ...additionalData];
const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
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
            {/* PRODUCT CARD */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
        hover:before:opacity-20"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover brightness-90
            group-hover:brightness-110 transition-all duration-500"
          />
        </div>
      </div>
    );
  })}
</div>


        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
