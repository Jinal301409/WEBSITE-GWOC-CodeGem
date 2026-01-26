import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaTimes, FaDownload, FaPlay } from "react-icons/fa";
import { bannerAssets } from '../../assets/dummydata';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const containerRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hoveredPlay, setHoveredPlay] = useState(false);

  const _banner = bannerAssets || {};
  const bannerImage = _banner.bannerImage || '/src/assets/BannerImage.jpeg';
  const orbitImages = Array.isArray(_banner.orbitImages) && _banner.orbitImages.length ? _banner.orbitImages : [bannerImage];
  const video = _banner.video || '/src/assets/Video.mp4';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
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

  const orbitTransform = (index) => {
    const depth = 12 + index * 6;
    const tx = pointer.x * depth * (index % 2 === 0 ? -1 : 1);
    const ty = pointer.y * depth * (index % 3 === 0 ? -1 : 1);
    const rotate = pointer.x * (index + 1) * 3;
    return { transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg)` };
  };

  const mainImgStyle = {
    transform: `perspective(1000px) rotateY(${pointer.x * 6}deg) rotateX(${-pointer.y * 6}deg)`,
    transition: 'transform 120ms linear'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative" ref={containerRef}>

      {/* Cursor Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(600px at ${(pointer.x + 1) * 50}% ${(pointer.y + 1) * 50}%, rgba(56,189,248,0.18), transparent 60%)`,
          transition: 'background 120ms linear',
        }}
      />

      <style>{`
        @keyframes floaty {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .orbit { animation: floaty 6s ease-in-out infinite; }
        .orbit-delay-5 { animation-delay: 0.2s }
        .orbit-delay-10 { animation-delay: 0.4s }
        .orbit-delay-15 { animation-delay: 0.6s }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeSlideUp 0.9s ease forwards;
        }
      `}</style>

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/10" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">

          {/* LEFT CONTENT */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight">
              Welcome to Chill Thrive <br />
              <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Where Recovery <br /> Meets Resilience.
              </span>
            </h1>

            <p className="animate-fade-up text-lg lg:text-xl italic text-blue-100 max-w-xl mx-auto md:mx-0">
              Elevating mind and body through the power of cold & heat therapy.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto md:mx-0">
              <div className="flex items-center bg-blue-900/20 rounded-xl border border-blue-500/40 shadow-xl">
                <div className="pl-6 pr-3 py-4">
                  <FaSearch className="text-blue-400 text-xl" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wellness experiences..."
                  className="w-full bg-transparent text-white placeholder-blue-200 outline-none py-4"
                />
                <button
                  type="submit"
                  className="mr-4 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="flex items-center gap-3 px-6 py-3 bg-blue-800/20 border border-blue-600/40 rounded-xl hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all">
                <FaDownload />
                Download App
              </button>

              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all"
              >
                <FaPlay />
                Watch Video
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 relative min-h-[350px]">

            {/* Trust Badge */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 text-sm shadow-xl">
              ⭐ Trusted by <span className="font-semibold">10,000+</span> Athletes
            </div>

            <div className="relative rounded-full p-1 bg-gradient-to-br from-blue-700 to-blue-500 shadow-2xl w-[300px] h-[300px] mx-auto" style={mainImgStyle}>
              <img
                src={bannerImage}
                alt="Banner"
                className="rounded-full w-full h-full object-cover border-4 border-blue-900/50"
              />
            </div>

            {orbitImages.map((img, i) => (
              <div
                key={i}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 orbit`}
                style={orbitTransform(i)}
              >
                <img src={img} className="w-28 h-28 rounded-full object-cover shadow-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-blue-300 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[2px] h-10 bg-gradient-to-b from-blue-400 to-transparent mt-2 rounded-full" />
        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-3xl text-blue-400"
          >
            <FaTimes />
          </button>
          <video controls autoPlay className="w-full max-w-4xl rounded-lg shadow-2xl">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Banner;
