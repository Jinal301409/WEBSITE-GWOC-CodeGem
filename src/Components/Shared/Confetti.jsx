import React, { useEffect, useRef } from 'react';

const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ef4444','#f59e0b','#34d399','#60a5fa','#7c3aed'];

    for (let i=0;i<120;i++) particles.push({
      x: Math.random()*w, y: Math.random()*-h, size: 6+Math.random()*8, vx: -2+Math.random()*4, vy: 2+Math.random()*6, color: colors[Math.floor(Math.random()*colors.length)]
    });

    let raf;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      particles.forEach(p=>{
        p.x += p.vx; p.y += p.vy; p.vy += 0.05;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size/2);
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const t = setTimeout(()=>{ cancelAnimationFrame(raf); ctx.clearRect(0,0,w,h); }, 1500);
    return ()=>{ clearTimeout(t); cancelAnimationFrame(raf); }
  },[]);

  return <canvas className="confetti-canvas" ref={canvasRef} />
}

export default Confetti;