import { useEffect } from "react";
import "./IceLoader.css";

const IceLoader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    <div className="ice-loader">
        <div className="ice-horizon" />
<div className="ice-vignette" />
<div className="rotation-field" />

<div className="ice-halo" />

<div className="cold-beams">
  {Array.from({ length: 10 }).map((_, i) => (
    <span key={i} style={{ left: `${i * 10}%` }} />
  ))}
</div>


      {/* Background waves */}
      <div className="ice-wave" />
      <div className="ice-wave wave-2" />

      {/* Ice rings */}
      <div className="ice-rings">
        <span />
        <span />
        <span />
      </div>

      {/* Floating shards */}
      <div className="ice-shards">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            style={{
              "--x": Math.random(),
              "--y": Math.random(),
              "--d": Math.random(),
            }}
          />
        ))}
      </div>

      {/* Snow dust */}
      <div className="snow-dust">
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            style={{
              "--x": Math.random(),
              "--y": Math.random(),
              "--d": Math.random(),
            }}
          />
        ))}
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

      {/* Frost corners */}
      <div className="frost-corner tl" />
      <div className="frost-corner tr" />
      <div className="frost-corner bl" />
      <div className="frost-corner br" />
    </div>
  );
};

export default IceLoader;

