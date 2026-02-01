import { useEffect } from "react";
import "./IceLoader.css";

const IceLoader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // tell parent to remove loader
    }, 3500); // match animation duration

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="ice-loader">
      {/* particles */}
      <div className="ice-particles">
        {Array.from({ length: 50 }).map((_, i) => {
          const style = {
            "--x": Math.random(),
            "--y": Math.random(),
            "--d": Math.random(),
          };
          return <span key={i} className="ice-particle" style={style} />;
        })}
      </div>

      {/* logo */}
      <div className="ice-logo">
        <span className="chill">Chill</span>
        <span className="thrive">Thrive</span>
      </div>

      <div className="ice-sub">Cold • Calm • Recovery</div>
      <div className="ice-sub">WELLNESS STUDIO</div>
    </div>
  );
};

export default IceLoader;

