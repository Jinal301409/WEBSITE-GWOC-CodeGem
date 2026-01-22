import React from "react";
import bb1 from "../../assets/bb1.png";
import bb2 from "../../assets/bb2.png";
import bb3 from "../../assets/bb3.png";
import bb4 from "../../assets/bb4.png";
import bb5 from "../../assets/bb5.png";
import bb6 from "../../assets/bb6.png";

import fs1 from "../../assets/fs1.png";
import fs2 from "../../assets/fs2.png";
import fs3 from "../../assets/fs3.png";
import fs4 from "../../assets/fs4.png";
import fs5 from "../../assets/fs5.png";
import fs6 from "../../assets/fs6.png";

import tf2 from "../../assets/tf1.png";
import tf3 from "../../assets/tf2.png";
import tf4 from "../../assets/tf3.png";
import tf5 from "../../assets/tf4.png";
import tf6 from "../../assets/tf5.png";
import tf1 from "../../assets/tf6.png";

import sp1 from "../../assets/sp1.png";
import sp2 from "../../assets/sp2.png";
import sp3 from "../../assets/sp3.png";
import sp4 from "../../assets/sp4.png";
import sp5 from "../../assets/sp5.png";
import sp6 from "../../assets/sp6.png";

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