import React, { useState } from 'react';
import { FaBath } from "react-icons/fa6"; 
import { GiAbstract084 } from "react-icons/gi"; 
import { NavLink } from 'react-router-dom'; 
import { FiHome, FiBook, FiPhone, FiStar, FiShoppingCart, FiLogOut, FiKey,  } from "react-icons/fi";
import { useCart } from '../../CartContext/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Login from '../../Components/Login/Login'; // adjust path if different

const Navbar = () => { 
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const {totalItems} = useCart();
  const [showLoginModel, setShowLoginModel] = useState(false);

  //COMBINE UPDATING LOGIN MODEL AND AUTH STATUS ON LOCATION CHANGE
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('loginData'))
  )
  useEffect(() => {
    setShowLoginModel(location.pathname === '/login');
    setIsAuthenticated(Boolean(localStorage.getItem('loginData')))
  }, [location.pathname])
  const handleLoginSuccess = () => {
    localStorage.setItem('loginData', JSON.stringify({ loggedIn: true}));
    setIsAuthenticated(true);
    navigate('/');
  }
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setIsAuthenticated(false);
  }

  //EXTRACT DESKTOP AUTH BUTTON
  const renderDesktopAuthButton = () => {
    return isAuthenticated ? (
      <button onClick={handleLogout} className=' px-3 md:px-3 lg:px-6 py-1.5 md:py-2 lg:py-3 bg-gradient-to-br from-blue-600
      to-blue-700 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-600/40 transition-all
      shadow-md shadow-blue-900/20 text-xs md:text-sm lg:text-sm'>
        <FiLogOut className=' text-base md:text-lg lg:text-lg'/>
        <span className= ' text-shadow'>Logout</span>
      </button>
    ) : (
      <button onClick={() => navigate('/login')} className=' px-3 md:px-3 lg:px-6 py-1.5 md:py-2 lg:py-3 bg-gradient-to-br from-blue-600
      to-blue-700 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-600/40 transition-all
      shadow-md shadow-blue-900/20 text-xs md:text-sm lg:text-sm'>
        <FiKey className=' text-base md:text-lg lg:text-lg'/>
        <span className= ' text-shadow'>Login</span>
        </button>
    )
  }
  // EXTRACT MOBILE AUTH BTN
const renderMobileAuthButton = () => {
  return isAuthenticated ? (
    <button
      onClick={handleLogout}
      className="w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700
                 text-[#2D1B0E] rounded-xl font-semibold flex items-center
                 justify-center space-x-2 text-sm"
    >
      <FiLogOut />
      <span>Logout</span>
    </button>
  ) : (
    <button
      onClick={() => {
        navigate('/login');
        setIsOpen(false);
      }}
      className="w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700
                 text-[#2D1B0E] rounded-xl font-semibold flex items-center
                 justify-center space-x-2 text-sm"
    >
      <FiKey />
      <span>Login</span>
    </button>
  );
};

  const navLinks = [
    {name: 'Home', to: '/', icon: <FiHome />},
    {name: 'Services', to: '/services', icon: <FiBook />},
    {name: 'About', to: '/about', icon: <FiStar />},
    {name: 'Contact', to: '/contact', icon: <FiPhone />},
];
  return ( 
  <nav className='bg-blue-900 border-b-4 border-blue-700 shadow-blue-900/30 sticky 
  top-0 z-50 shadow-[0_25px_50px_-12px] shadow-blue-900/40 font-vibes group/nav overflow-x-hidden'> 
  <div className=' absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4'> 
  <div className=' h-[6px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent 
  shadow-[0_0_20px] shadow-blue-500/30' /> 
  <div className=' flex justify-between px-6'> 
    <FaBath className= ' text-blue-400/40 -mt-4 -ml-2 rotate-45' size={32}/> 
    <FaBath className= ' text-blue-400/40 -mt-4 -mr-2 rotate-45' size={32}/> 
    </div> 
    </div> 
    {/* MAIN NAVIGATION CONTAINER */} 
    <div className=' max-w-7xl mx-auto px-4 relative'> 
      <div className=' flex justify-between items-center h-16 md:h-20 lg:h-24'> 
        {/* LOGO SECTION */} 
        <div className=' flex-shrink-0 flex items-center space-x-2 group relative md:-translate-x-4 
        lg:-translate-x-6 ml-0 md:ml-2' > 
        <div className=' absolute -inset-4 bg-blue-500/10 rounded-full blur-xl 
        opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300'/> 
        <GiAbstract084 className=' text-3xl md:text-4xl lg:text-5xl text-blue-400 transition-all 
        group-hover:rotate-12 group-hover:text-blue-300 hover:drop-shadow-[0_0_15px] hover:drop-shadow-blue-500/50'/> 
        <div className=' flex flex-col relative ml-2 max-w-[140px] md:max-w-[160px] lg:max-w-none'> 
            <NavLink to='/' className=' text-xl md:text-4xl font-semibold text-white
              hover:text-blue-300 transition flex items-center'> 
              <span className='mr-2'>❄️</span>
              Chill Thrive
              <span className='ml-2'>❄️</span>
            </NavLink> 
          <div className=' h-[3px] bg-gradient-to-r from-blue-600/30 via-blue-400/50 to-blue-600/30 w-full
          mt-1 ml-1 shadow-[0_2px_5px] shadow-blue-500/20'/>
          </div> 
          </div> 
          {/* DESKTOP NAVIGATION */}
          <div className=' hidden md:flex items-center space-x-2 md:space-x-1 lg:space-x-4 flex-1 justify-end'>
            {navLinks.map((link) => (
              <NavLink key={link.name}
              to={link.to}
              className={({ isActive }) =>
                ` group px-3 md:px-3 lg:px-4 py-2 md:py-2 lg:py-3 text-sm md:text-[15px] lg:text-base relative
              transition-all duration-300 flex items-center hover:bg-blue-800/30 rounded-3xl border-2
              ${isActive ? 'border-blue-500/50 bg-blue-800/30 shadow-[inset_0_0_15px] shadow-blue-500/20'
                : ' border-blue-900/30 hover:border-blue-500/50'
              } shadow-md shadow-blue-900/20`}>
                <span className=' mr-2 text-sm md:text-[15px] lg:text-base
                text-blue-400 group-hover:text-blue-300 transition-all'>
                  {link.icon}
                </span>
                <span className=' text-white group-hover:text-blue-300 relative'>
                  {link.name}
                  <span className=' absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all
                  group-hover:w-full'/>
                </span>

              </NavLink>
            ))}
            <div className=' flex items-center space-x-2 md:space-x-3 lg:space-x-4 ml-3 md:ml-3 lg:ml-6 mr-2 md:mr-3 lg:mr-4'>
              <NavLink to='/cart' className=' p-2 md:p-2.0 lg:p-3 text-white rounded-xl trabsition-all relative 
              border-2 border-blue-900/30 hover:border-blue-500/50 group hover:bg-blue-800/30
              hover:shadow-lg hover:shadow-blue-500/30 shadow-md shadow-blue-900/20'>
                <FiShoppingCart className=' text-base md:text-lg lg:text-lg'/>
                {totalItems > 0 && (
                  <span className=' absolute -top-2 -right-2 bg-blue-600
                  text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderDesktopAuthButton()}
            </div>

          </div>
          {/* Mobile Menu */}
          <div className=' md:hidden flex items-center mr-2'>
            <button className=' text-blue-400 hover:text-blue-300 focus:outline-none transition-all
            p-2 rounded-xl border-2 border-blue-900/30 hover:border-blue-500/50 relative shadow-md shadow-blue-900/20
            hover:shadow-lg hover:shadow-blue-500/30 hover:bg-blue-800/30' onClick={() => setIsOpen(!isOpen)}>
              <div className=' space-y-2 relative'> 
                <span className={` block w-6 h-[2px] bg-current transition-all
                ${isOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}/>
              <span className={`block w-6 h-[2px] bg-current ${isOpen ? 'opacity-0' : ''}` }/>
               <span className={` block w-6 h-[2px] bg-current transition-all
                ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}/>
              </div>
            </button>
          </div>
          </div> 
          </div> 
          {/* MOBILE NAVIGATION */}
          {isOpen && (
            <div className=' md:hidden bg-[#38BDF8] border-t-4 border-blue-900/40 relative shadow-lg
            shadow-blue-900/30 w-full'> 
            <div className=' px-4 py-4 space-y-2'>
              {navLinks.map((link) => (
                <NavLink
  key={link.name}
  to={link.to}
  onClick={() => setIsOpen(false)}
  className={({ isActive }) =>
    `flex items-center px-4 py-3 text-sm rounded-xl transition-all border-2
     ${isActive
       ? 'bg-blue-600/30 text-amber-400 border-blue-600/50'
       : 'text-white hover:bg-blue-600/20 border-blue-900/30'
     }`
  }
>
  <span className="mr-3 text-blue-500 text-lg">
    {link.icon}
  </span>
  <span>{link.name}</span>
</NavLink>
              ))}
              <div className=' pt-4 border-t-2 border-blue-900/30 space-y-2'>
              <NavLink to='/cart' onClick={() => setIsOpen(false)}
              className='w-full px-4 py-3 text-center text-white rounded-xl border-2 border-blue-900/30 hover:border-blue-500/50  flex
              items-center justify-center space-x-2 text-sm'>
                <FiShoppingCart className=' text-lg'/>
                {totalItems > 0 && (
                  <span className='top-2 right-2 bg-blue-600
                  text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderMobileAuthButton()}
              </div>

            </div>

            </div>
          )}
          {/* LOGIN MODEL */}
          {showLoginModel && (
            <div className=' fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
              <div className=' bg-gradient-to-br from-white to-blue-50 rounded-xl p-6
              w-full max-w-[480px] relative border-4 border-blue-500/40 shadow-[0_0_30px] shadow-blue-500/30'>
                <button onClick={() => navigate('/')}
                  className=' absolute top-2 right-2 text-blue-400 hover:text-blue-600 text-2xl'>
                    &times;
                </button>
                <h2 className=' text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600
                bg-clip-text text-transparent mb-4 text-center'>
                  Chill Thrive
                </h2>
                <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')}/>
              </div>

            </div>
          )
          }

          </nav> 
          ); 
        }; 
        export default Navbar;
