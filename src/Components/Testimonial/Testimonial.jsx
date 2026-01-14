import React, { useState, useRef } from "react";
import { testimonialStyles as styles } from "../../assets/dummyStyles";
import { testimonials, videoTestimonials } from "../../assets/Testimonialdata";
import { FaBook, FaQuoteLeft, FaStar } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
const Testimonial = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>

        {/* HEADER */}
        <div className={styles.headerContainer}>
          <div className={styles.badge}>
            <FaBook className="text-blue-500 mr-2" />
            <span className={styles.badgeText}>
              Customer Experiences
            </span>
          </div>
          <h1 className={`${styles.title} text-white`}>
            Premium <span className={styles.accentText}>Recovery</span> Experiences
          </h1>

          <div className={styles.dividerContainer}>
            <div className={styles.dividerLine} />
            <MdMessage
              className={`${styles.accentText} mx-4`}
              size={24}
            />
            <div className={styles.dividerLine} />
          </div>
          <p className={`${styles.subtitle} text-blue-100`}>
            Hear from our valued customers about their experience
          </p>
        </div>
        {/* TESTIMONIALS CARD */}
        <div className={styles.grid}>
          {testimonials.map((t, index) => {
            const shape = styles.cardShapes[index % styles.cardShapes.length];
            const IconComponent = styles.icons[index % styles.icons.length];

            return (
              <div
                key={t.id}
                className={styles.card}
                style={{
                  clipPath:
                    "polygon(0% 10%, 10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)",
                  background:
                    "linear-gradient(145deg, rgba(135,206,250,0.8), rgba(173,216,230,0.8))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(100,150,255,0.4)",
                  boxShadow: "0 10px 30px rgba(0,0,50,0.3)",
                }}
              >
                <div className={styles.cardContent}>
                  <div className="flex justify-between items-start mb-6">
                    <FaQuoteLeft className={styles.quoteIcon} size={28} />
                    {/* RATING */}
                    <div className={styles.ratingContainer}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${i < t.rating ? styles.accentText : "text-blue-300"
                            } ${styles.star}`}
                          size={18}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={styles.comment}>"{t.comment}"</p>

                  <div className={styles.carInfo}>
                    <MdMessage
                      className={`${styles.carIcon} text-blue-400`}
                      size={20}
                    />
                    <span className={`${styles.carText} text-white`}>{t.car}</span>
                  </div>
                  <div className={styles.authorContainer}>
                    <div className={styles.avatar}>{t.name.charAt(0)}</div>

                    <div className={styles.authorInfo}>
                      <h3 className={styles.authorName}>{t.name}</h3>
                      <p className={styles.authorRole}>{t.role}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.decorativeCorner} />

                <div className={styles.patternIcon}>
                  <IconComponent size={36} />
                </div>
              </div>
            );
          })}
        </div>
        {/* VIDEO TESTIMONIALS */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center text-white mb-6">
            Real <span className="text-blue-400">Video</span> Experiences
          </h2>

          <p className="text-center text-blue-200 mb-12">
            Watch how Chill Thrive transformed their recovery journey
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {videoTestimonials.map((v) => (
              <div
                key={v.id}
                className="relative bg-white/10 backdrop-blur-xl border border-blue-400/30 
                   rounded-3xl overflow-hidden shadow-xl group"
              >
                {/* VIDEO */}
                <video
                  src={v.video}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-64 object-cover"
                  onPlay={() => setPlayingVideoId(v.id)}
                  onPause={() => setPlayingVideoId(null)}
                  onEnded={() => setPlayingVideoId(null)}
                />

                {/* Overlay Play Effect */}
                {playingVideoId !== v.id && (
                  <div className="absolute inset-0 flex items-center justify-center 
                        bg-black/20 opacity-0 group-hover:opacity-100 
                        transition duration-300 pointer-events-none">
                    <FaPlayCircle className="text-white text-6xl" />
                  </div>
                )}

                {/* INFO */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    {v.name}
                  </h3>
                  <p className="text-blue-300">{v.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Testimonial;
