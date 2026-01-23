import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const cartTotal = cartItems.reduce((total, ci) => {
    const price = Number(
      String(ci.item?.price || '').replace(/[^\d]/g, '')
    );
    return total + price * (ci.quantity || 0);
  }, 0);

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className='min-h-screen overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af]'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 animate-fade-in-down'>
          <span className='font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent'>
            Your Cart
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <div className='text-center animate-fade-in'>
            <p className='text-blue-100/80 text-xl mb-4'>
              Your cart is empty
            </p>

            <Link
              to='/menu'
              className='transition-all duration-300 text-blue-200 inline-flex items-center gap-2 hover:gap-3 hover:bg-blue-800/50 uppercase px-4 py-2 rounded-lg'
            >
              Browse All Items
            </Link>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {cartItems.map((ci) => {
                const price = Number(
                  String(ci.item?.price || '').replace(/[^\d]/g, '')
                );

                return (
                  <div
                    key={ci._id} // ✅ FIX
                    className='group bg-blue-900/20 p-4 rounded-2xl border-4 border-dashed
                    border-blue-500 backdrop-blur-sm flex flex-col items-center gap-4'
                  >
                    <div
                      className='w-24 h-24 cursor-pointer'
                      onClick={() => setSelectedImage(ci.item.image)} // ✅ FIX
                    >
                      <img
                        src={ci.item.image}
                        alt={ci.item.title}
                        className='w-full h-full object-contain'
                      />
                    </div>

                    <div className='text-center'>
                      <h3 className='text-xl font-dancingscript text-blue-200'>
                        {ci.item.title} {/* ✅ FIX */}
                      </h3>
                      <p className='text-blue-100/80 font-cinzel mt-1'>
                        {ci.item.price} {/* ✅ FIX */}
                      </p>
                    </div>

                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() =>
                          updateQuantity(ci._id, Math.max(1, ci.quantity - 1)) // ✅ FIX
                        }
                        className='w-8 h-8 rounded-full bg-blue-900/40'
                      >
                        <FaMinus className='text-blue-100' />
                      </button>

                      <span className='text-blue-100'>
                        {ci.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(ci._id, ci.quantity + 1) // ✅ FIX
                        }
                        className='w-8 h-8 rounded-full bg-blue-900/40'
                      >
                        <FaPlus className='text-blue-100' />
                      </button>
                    </div>

                    <div className='flex justify-between w-full'>
                      <button
                        onClick={() => removeFromCart(ci._id)} // ✅ FIX
                        className='bg-blue-900/40 px-3 py-1 rounded-full'
                      >
                        <FaTrash className='text-blue-100' />
                        <span className='text-blue-100 ml-1'>Remove</span>
                      </button>

                      <p className='text-blue-300 font-dancingscript'>
                        ₹{price * ci.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='mt-12 pt-8 border-t border-blue-800/30'>
              <div className='flex justify-between items-center'>
                <Link to='/services' className='bg-blue-900/40 px-8 py-3 rounded-full'>
                  Continue Shopping
                </Link>

                <h2 className='text-3xl font-dancingscript text-blue-100'>
                  Total: ₹{cartTotal}
                </h2>
              </div>
            </div>
          </>
        )}
      </div>

      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} className='max-w-[90vw] max-h-[90vh]' />
          <FaTimes className='absolute top-6 right-6 text-white text-2xl' />
        </div>
      )}
    </div>
  );
};

export default CartPage;
