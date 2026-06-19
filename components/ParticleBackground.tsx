"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number, pts: any[];
    let animId: number;
    let mouse = { x: -1000, y: -1000, active: false };

    // Colorful palette matching Google Antigravity Confetti particles
    const colors = [
      "#fc673f", // Coral
      "#dff122", // Lime
      "#38bdf8", // Sky Blue
      "#c084fc", // Light Purple
      "#f472b6", // Pink
      "#4ade80", // Vibrant Green
    ];

    const resize = () => {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      
      pts = Array.from({ length: 80 }, () => {
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: vx,
          vy: vy,
          originalVx: vx,
          originalVy: vy,
          length: Math.random() * 8 + 6, // dash length (6px to 14px)
          width: Math.random() * 1.5 + 1.8, // dash width
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2, // rotation angle
          va: (Math.random() - 0.5) * 0.015, // angular velocity
          friction: 0.94, // friction for mouse push deceleration
        };
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    
    resize();

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      pts.forEach((p) => {
        // Physics update
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            // Calculate push force
            const force = (180 - dist) / 180;
            const dirX = dx / (dist || 1);
            const dirY = dy / (dist || 1);
            
            // Push particle away (Antigravity repulsion force)
            p.vx += dirX * force * 0.8;
            p.vy += dirY * force * 0.8;
          }
        }

        // Apply friction to slow down repulsion over time
        p.vx *= p.friction;
        p.vy *= p.friction;

        // Bring velocity back to original drift velocity gently
        p.vx += (p.originalVx - p.vx) * 0.04;
        p.vy += (p.originalVy - p.vy) * 0.04;

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Update rotation angle
        p.angle += p.va;

        // Screen boundary wraps
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        // Draw dash particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-p.length / 2, 0);
        ctx.lineTo(p.length / 2, 0);
        ctx.stroke();
        ctx.restore();
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
