import React from "react";
import bb1 from "../assets/blackbunny1.png";
import bb2 from "../assets/blackbunny2.png";
import bb3 from "../assets/blackbunny3.png";
import bb4 from "../assets/blackbunny4.png";
import bb5 from "../assets/blackbunny5.png";
import bb6 from "../assets/blackbunny6.png";

/*import fs1 from "../assets/events/funstreet1.jpg";
import fs2 from "../assets/events/funstreet2.jpg";
import fs3 from "../assets/events/funstreet3.jpg";
import fs4 from "../assets/events/funstreet4.jpg";
import fs5 from "../assets/events/funstreet5.jpg";
import fs6 from "../assets/events/funstreet6.jpg";

import tf1 from "../assets/events/theeflea1.jpg";
import tf2 from "../assets/events/theeflea2.jpg";
import tf3 from "../assets/events/theeflea3.jpg";
import tf4 from "../assets/events/theeflea4.jpg";
import tf5 from "../assets/events/theeflea5.jpg";
import tf6 from "../assets/events/theeflea6.jpg";

import sp1 from "../assets/events/special1.jpg";
import sp2 from "../assets/events/special2.jpg";
import sp3 from "../assets/events/special3.jpg";
import sp4 from "../assets/events/special4.jpg";
import sp5 from "../assets/events/special5.jpg";
import sp6 from "../assets/events/special6.jpg"; */

const photos = [
 bb1, bb2, bb3, bb4, bb5, bb6,
  fs1, fs2, fs3, fs4, fs5, fs6,
  tf1, tf2, tf3, tf4, tf5, tf6,
  sp1, sp2, sp3, sp4, sp5, sp6,
  


  // you can add more up to 20+
];

const PGE = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Event Highlights</h1>
      <p style={styles.subHeading}>
        Capturing moments, memories, and milestones 💙
      </p>

      <div style={styles.grid}>
        {photos.map((photo, index) => (
          <div key={index} style={styles.card}>
            <img src={photo} alt={`Event ${index + 1}`} style={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f9ff",
    padding: "40px 20px",
  },
  heading: {
    textAlign: "center",
    color: "#0b3c5d",
    fontSize: "36px",
    marginBottom: "10px",
  },
  subHeading: {
    textAlign: "center",
    color: "#3178c6",
    marginBottom: "40px",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    cursor: "pointer",
  },
};

export default PGE;