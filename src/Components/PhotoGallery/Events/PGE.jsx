import React from "react";


// Black Bunny
import bb1 from "../../assets/bb1.png";
import bb2 from "../../assets/bb2.png";
import bb3 from "../../assets/bb3.png";
import bb4 from "../../assets/bb4.png";
import bb5 from "../../assets/bb5.png";
import bb6 from "../../assets/bb6.png";

// Customers
import fs1 from "../../assets/fs1.png";
import fs2 from "../../assets/fs2.png";
import fs3 from "../../assets/fs3.png";
import fs4 from "../../assets/fs4.png";
import fs5 from "../../assets/fs5.png";
import fs6 from "../../assets/fs6.png";

// Thee Flea
import tf1 from "../../assets/tf1.png";
import tf2 from "../../assets/tf2.png";
import tf3 from "../../assets/tf3.png";
import tf4 from "../../assets/tf4.png";
import tf5 from "../../assets/tf5.png";
import tf6 from "../../assets/tf6.png";

// Special Showcase
import sp1 from "../../assets/sp1.png";
import sp2 from "../../assets/sp2.png";
import sp3 from "../../assets/sp3.png";
import sp4 from "../../assets/sp4.png";
import sp5 from "../../assets/sp5.png";
import sp6 from "../../assets/sp6.png";

const events = [
  {
    name: "Black Bunny",
    description:
      "A high-energy themed event focused on immersive fun, creative experiences, and vibrant social engagement.",
    photos: [bb1, bb2, bb3, bb4, bb5, bb6],
  },
  {
    name: "Customers",
    description:
      "Real moments captured with our amazing customers enjoying Chill-Thrive experiences.",
    photos: [fs1, fs2, fs3, fs4, fs5, fs6],
  },
  {
    name: "Thee Flea",
    description:
      "A vibrant flea market celebrating creativity, local brands, and community vibes.",
    photos: [tf1, tf2, tf3, tf4, tf5, tf6],
  },
  {
    name: "Special Showcase",
    description:
      "Exclusive showcases highlighting special collaborations and premium moments.",
    photos: [sp1, sp2, sp3, sp4, sp5, sp6],
  },
];

const PhotoGallery = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Photo Gallery</h1>
      <p style={styles.subHeading}>
        Explore our signature events and relive the experiences
      </p>

      {events.map((event, index) => (
        <div key={index} style={styles.eventBlock}>
          <h2 style={styles.eventTitle}>{event.name}</h2>
          <p style={styles.eventDesc}>{event.description}</p>

          <div style={styles.grid}>
            {event.photos.map((photo, i) => (
              <div key={i} style={styles.card}>
                <img src={photo} alt={event.name} style={styles.image} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0b1e3c, #020b18)",
    padding: "60px 20px",
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "10px",
  },
  subHeading: {
    textAlign: "center",
    color: "#7db8ff",
    marginBottom: "60px",
  },
  eventBlock: {
    maxWidth: "1200px",
    margin: "0 auto 80px",
  },
  eventTitle: {
    fontSize: "30px",
    color: "#4da3ff",
    marginBottom: "8px",
  },
  eventDesc: {
    color: "#cbd5e1",
    marginBottom: "25px",
    maxWidth: "800px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
  },
  image: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
  },
};

export default PhotoGallery;
