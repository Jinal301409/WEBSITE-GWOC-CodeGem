import { useEffect } from "react";
import "./IceLoader.css";

const IceLoader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4200); // slightly longer for premium feel

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="ice-loader">
      {/* Fog wave */}
      <div className="ice-fog" />

      {/* Ice particles */}
      <div className="ice-particles">
        {Array.from({ length: 60 }).map((_, i) => {
          const style = {
            "--x": Math.random(),
            "--y": Math.random(),
            "--d": Math.random(),
            "--s": Math.random() * 2 + 1,
          };
          return (
            <span
              key={i}
              className="ice-particle"
              style={style}
            />
          );
        })}
      </div>

      {/* Logo */}
      <div className="ice-logo-wrapper">
        <div className="ice-glow" />
        <div className="ice-logo">
          <span className="chill">Chill</span>
          <span className="thrive">Thrive</span>
        </div>
      </div>

      <div className="ice-sub">Cold • Calm • Recovery</div>

      {/* Progress */}
      <div className="ice-progress">
        <span />
      </div>
    </div>
  );
};

export default IceLoader;
