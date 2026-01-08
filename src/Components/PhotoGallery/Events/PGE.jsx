import React from "react";

const photos = [
  "/assets/events/event1.jpg",
  "/assets/events/event2.jpg",
  "/assets/events/event3.jpg",
  "/assets/events/event4.jpg",
  "/assets/events/event5.jpg",
  "/assets/events/event6.jpg",
  "/assets/events/event7.jpg",
  "/assets/events/event8.jpg",
  "/assets/events/event9.jpg",
  "/assets/events/event10.jpg",
  "/assets/events/event11.jpg",
  "/assets/events/event12.jpg",
  "/assets/events/event13.jpg",
  "/assets/events/event14.jpg",
  "/assets/events/event15.jpg",
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