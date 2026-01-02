import React from "react";
import { testimonialStyles as styles } from "../../assets/dummyStyles";
import testimonials from "../../assets/Testimonialdata";
import { FaBook, FaQuoteLeft, FaStar } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
const Testimonial = () => {
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
      className={`${
        i < t.rating ? styles.accentText : "text-blue-300"
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
      </div>
    </div>
  );
};

export default Testimonial;
