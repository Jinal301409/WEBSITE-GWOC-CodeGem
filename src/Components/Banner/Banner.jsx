import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { bannerAssets } from '../../assets/dummydata';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const containerRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hoveredPlay, setHoveredPlay] = useState(false);

  // defensive fallbacks in case bannerAssets is undefined or malformed
  const _banner = bannerAssets || {};
  const bannerImage = _banner.bannerImage || '/src/assets/BannerImage.jpeg';
  const orbitImages = Array.isArray(_banner.orbitImages) && _banner.orbitImages.length ? _banner.orbitImages : [bannerImage];
  const video = _banner.video || '/src/assets/Video.mp4';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1..1
      setPointer({ x, y });
    };
    const onLeave = () => setPointer({ x: 0, y: 0 });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // small helper to compute transform for orbit items
  const orbitTransform = (index) => {
    const depth = 12 + index * 6;
    const tx = pointer.x * depth * (index % 2 === 0 ? -1 : 1);
    const ty = pointer.y * depth * (index % 3 === 0 ? -1 : 1);
    const rotate = pointer.x * (index + 1) * 3;
    return { transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg)` };
  }

  const mainImgStyle = {
    transform: `perspective(1000px) rotateY(${pointer.x * 6}deg) rotateX(${ -pointer.y * 6 }deg) translateZ(0)`,
    transition: 'transform 120ms linear'
  };

  // Tooltip text for the play button
  const renderPlayTooltip = () => (
    <div className={`absolute -top-10 right-0 text-sm px-3 py-1 rounded-lg bg-black/60 text-white transition-opacity ${hoveredPlay ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      Watch our recovery tour
    </div>
  );

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  }
  return (
    <div className='relative' ref={containerRef}>
      {/* Extra styles for floating/orbit animations and morphing blob */}
      <style>{`
        @keyframes floaty { 0% { transform: translateY(0px);} 50% { transform: translateY(-8px);} 100% { transform: translateY(0px);} }
        .orbit { animation: floaty 6s ease-in-out infinite; }
        .orbit-delay-5 { animation-delay: 0.2s }
        .orbit-delay-10 { animation-delay: 0.4s }
        .orbit-delay-15 { animation-delay: 0.6s }
        .morph-blob { filter: blur(14px) opacity: 0.85; transition: opacity 300ms ease; }
      `}</style>
       <div className=' bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white
         py-16 px-4 sm:px-8 relative overflow-hidden'>

         <div className=' absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/10' />

         <div className=' max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10'>

           {/* LEFT CONTENT */}
           <div className=' flex-1 space-y-8 relative md:pr-8 lg:pr-12 text-center md:text-left'>
             <h1 className=' text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-bold leading-tight font-serif
               drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]'>
               Welcome to Chill Thrive <br />
               <span className='bg-gradient-to-r from-blue-300 to-blue-500
                 bg-clip-text text-transparent'>
                 Where Recovery <br />
                 Meets Resilience.
               </span>
             </h1>
             <p className=' text-lg md:text-lg lg:text-xl font:playfair italic sm:text-xl text-blue-100
             max-w-xl opacity-90 mx-auto md:mx-0'>
               Elevating mind and body through the power of cold & heat therapy.
             </p>

             <form
               onSubmit={handleSearch}
               className="relative max-w-2xl mx-auto md:mx-0 group">
               <div
                 className="relative flex items-center bg-blue-900/20 rounded-xl border-2 border-blue-500/40
     shadow-xl hover:bg-blue-800/30 transition-all duration-300">
                 {/* Search Icon */}
                 <div className="pl-6 pr-3 py-4">
                   <FaSearch className="text-blue-400/80 text-xl group-hover:text-blue-300 transition-colors" />
                 </div>

                 {/* Input Field */}
                 <input
                   type="text"
                   value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search wellness experiences..."
                   className="w-full bg-transparent text-white placeholder-blue-200/70
       outline-none py-4 pr-6 text-lg font-medium tracking-wide"/>
                 <button
                   type="submit"
                   className="
     mr-4 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold
     rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300
     hover:from-blue-300 hover:to-blue-500 hover:shadow-blue-400/40 active:scale-95"
                 >        Search
                 </button>

               </div>
             </form>
             <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
               <button className=" group flex items-center gap-3 px-6 py-3 bg-blue-800/20 border-2 border-blue-600/40 rounded-xl
     text-blue-100 text-lg font-medium backdrop-blur-sm transition-all duration-300 hover:bg-blue-800/40 hover:border-blue-400
     hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 ">
                 <FaDownload className="text-xl text-blue-300 group-hover:animate-bounce" />
                 <span>Download App</span>
               </button>

               <div className='relative'>
                 {renderPlayTooltip()}
                 <button onMouseEnter={() => setHoveredPlay(true)} onMouseLeave={() => setHoveredPlay(false)} onClick={() => setShowVideo(true)} className=" group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400
     rounded-xl text-white font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30
     hover:from-blue-400 hover:to-blue-300 hover:shadow-blue-400/40 active:scale-95">
     <FaPlay className="text-xl text-white group-hover:scale-110 transition-transform" />
                 <span className="text-lg tracking-wi">Watch Video</span>
               </button>
               </div>

             </div>
           </div>
           {/* RIGHT IMAGE CONTAINER WITH ORBITAL IMAGES */}
           <div className=' flex-1 relative group mt-8 md:mt-0 min-h-[300px] sm:min-h-[400px]'>
             {/* MAIN IMG */}
             {/* morphing blurred blob behind image */}
             <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-gradient-to-br from-indigo-500 via-cyan-400 to-blue-500 opacity-80 morph-blob' style={{ transform: `translate(${pointer.x*8}px, ${pointer.y*8}px) scale(${1 + Math.abs(pointer.x)*0.06})`, transition: 'transform 120ms linear' }} />

             <div className=' relative rounded-full p-1 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-600
             shadow-2xl z-20 w-[250px] xs:w-[300px] sm:w-[350px] h-[250px] xs:h-[300px] sm:h-[350px] mx-auto' style={mainImgStyle}>
               <img src={bannerImage} alt="Banner" className=' rounded-full border-4 xs:border-8 border-blue-900/50
                 w-full h-full object-cover object-top' style={{ transform: `translateZ(20px)` }} />
               <div className=' absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-blue-900/40 mix-blend-medium' />
             </div>
             {/* ORBITAL IMAGES */}
             {orbitImages.map((imgSrc, index) => (
               <div key={index} className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                 ${index === 0 ? 'orbit' : `orbit-delay-${index * 5}`}
                 w-[100px] xs:w-[150px] sm:w-[200px] h-[100px] xs:h-[150px] sm:h-[200px]`} style={orbitTransform(index)}>
                 <img src={imgSrc} alt={`Orbiting ${index + 1}`}
                   className=' w-full h-full rounded-full border border-blue-500/30 shadow-lg bg-blue-900/20 p-1
                   object-cover' /> </div>
             ))}
           </div>
         </div>
       </div>
       {/* VIDEO MODAL */}
       {showVideo && (
         <div className=' fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg p-4'>
           <button onClick={() => setShowVideo(false)}
             className=' absolute top-6 right-6 text-blue-400 hover:text-blue-300 text-3xl z-10 transition-all'>
             <FaTimes />
           </button>
           <div className=' w-full max-w-4xl mx-auto'>
             <video
               controls autoPlay className=' w-full aspect-video object-contain rounded-lg shadow-2xl'>
               <source src={video} type='video/mp4' />
             </video>
           </div>
         </div>
       )}
     </div>
   )
 }

 export default Banner

