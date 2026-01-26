import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../../CartContext/CartContext'
import { dummyMenuData } from '../../assets/OmhDD'
import { FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa'
import './OurMenu.css'

// helper to build a safe image URL from backend values
const PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%2310283a'/><text x='50%' y='50%' fill='%23cbd5e1' font-size='18' font-family='Arial' text-anchor='middle' dy='.3em'>Image not available</text></svg>`;

const buildImageUrl = (raw) => {
  if (!raw) return PLACEHOLDER;
  try {
    const s = String(raw).trim();
    if (!s) return PLACEHOLDER;
    if (/^https?:\/\//i.test(s)) return s;
    // normalize backslashes to forward slashes
    const normalized = s.replace(/\\/g, '/');
    // if it already contains /uploads/ extract filename
    const uploadsIndex = normalized.indexOf('/uploads/');
    if (uploadsIndex !== -1) {
      const filename = normalized.slice(uploadsIndex + '/uploads/'.length);
      return `https://website-gwoc-codegem-backend.onrender.com/uploads/${filename}`;
    }
    // if it starts with uploads/
    if (normalized.startsWith('uploads/')) return `https://website-gwoc-codegem-backend.onrender.com/${normalized}`;
    // if seems like a filename (no slash) assume uploads
    if (!normalized.includes('/')) return `https://website-gwoc-codegem-backend.onrender.com/uploads/${normalized}`;
    // otherwise try to return as-is
    return normalized;
  } catch {
    return PLACEHOLDER;
  }
}

const categories = ['Ice Bath Therapy', 'Jacuzzi Therapy', 'Steam Therapy', 'Combo Packages']

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [apiItems, setApiItems] = useState([]);

  // Fetch items from API and normalize fields to the component's expected shape
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://website-gwoc-codegem-backend.onrender.com/api/items');
        // Support both: response.data is an array OR response.data.data contains the array
        const raw = Array.isArray(response.data) ? response.data : (response.data && Array.isArray(response.data.data) ? response.data.data : []);

        const mapped = raw.map(it => ({
          // keep original ids
          _id: it._id || it.id,
          id: it._id || it.id,
          // component expects `title`, `description`, `price`, `image`, `category`, `duration`, `benefits`
          title: it.title || it.name || '',
          name: it.name || it.title || '',
          description: it.description || it.desc || '',
          price: (it.price != null ? Number(it.price) : (it.cost != null ? Number(it.cost) : 0)),
          duration: it.duration || it.time || '',
          benefits: it.benefits || it.tags || [],
          // store raw image reference (filename or full URL). buildImageUrl will normalize it.
          image: it.imageUrl || it.image || '',
          category: it.category || '',
        }));

        setApiItems(mapped);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // Merge dummy data with API items
  // Assuming API items have a 'category' field that matches our categories, 
  // or we just append them to the list if you want them all shown.
  // Here we filter API items that match the active category.
  const staticItems = dummyMenuData[activeCategory] || [];
  const dynamicItems = apiItems.filter(item => item.category === activeCategory);
  const displayItems = [...staticItems, ...dynamicItems];

  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart()
  
  // Fix getQuantity to check both _id and id
  const getQuantity = (itemId) => {
    const cartItem = cartItems.find(ci => (ci.item._id === itemId || ci.item.id === itemId));
    return cartItem ? cartItem.quantity : 0;
  }

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
            const itemId = item._id || item.id;
            const quantity = getQuantity(itemId);
            return (
              <div
                key={itemId}
                className='relative bg-blue-900/20 rounded-2xl overflow-hidden border border-blue-800/30 backdrop-blur-sm flex flex-col transition-all duration-500'
                style={{ '--index': i }}>
                <div className='relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-white/10'>
                  <img loading="lazy" src={buildImageUrl(item.image || item.imageUrl)} alt={item.name}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
                    className=' max-h-full max-w-full object-contain transition-all duration-700' />
                </div>
                <div className='p-4 sm:p-6 flex flex-col flex-grow card-tilt'>
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 transition-all duration-300' />

                  <h3 className='text-xl sm:text-2xl mb-2 font-dancingscript text-blue-100 transition-colors'>
                    {item.title}
                  </h3>

                  <p className='text-blue-100/80'>
                    {item.description}
                  </p>
                  <p className='text-blue-200/70 mt-2 text-sm font-cinzel'>
                    ⏱ Duration: {item.duration}
                  </p>

                  <ul className='mt-3 space-y-1 text-blue-100/80 text-sm'>
                    {item.benefits?.map((benefit, index) => (
                      <li key={index} className='flex items-center gap-2'>
                        <span className='text-cyan-400'>✔</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className=' mt-auto flex items-center gap-4 justify-between'>
                    <div className=' bg-blue-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg'>
                      <span className=' text-xl font-bold text-cyan-300 font-dancingscript'>
                        {(item.price)}
                      </span>
                    </div>
                    <div className=' flex items-center gap-2'>
                      {quantity > 0 ? (
                        <>
                          <button className=' w-8 h-8 rounded-full bg-blue-900/40 flex items-center
      justify-center hover:bg-blue-800/50 transition-colors' onClick={() => quantity > 1 ? updateQuantity(itemId, quantity - 1) : removeFromCart(itemId)}>
                            <FaMinus className=' text-white' />
                          </button>
                          <span className=' w-8 text-center text-white'>
                            {quantity}
                          </span>
                          <button className=' w-8 h-8 rounded-full bg-blue-900/40 flex items-center
      justify-center hover:bg-blue-800/50 transition-colors'
                            onClick={() => addToCart(item, 1)}>
                            <FaPlus className=' text-white' />
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
      </div>
    </div>
  )
}

export default OurMenu
