"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setVisible(true);
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animId: number;
    let dotX = 0;
    let dotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Direct follow for dot, batched in animation frame
      dotX = mouseX;
      dotY = mouseY;

      // Spring interpolation for ring
      const spring = 0.12;
      ringX += (mouseX - ringX) * spring;
      ringY += (mouseY - ringY) * spring;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9000] will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out ${
            isHovering ? "bg-coral/30 scale-[3]" : "bg-coral scale-100"
          }`}
          style={{
            width: "8px",
            height: "8px",
          }}
        />
      </div>

      {/* Ring follower */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[8999] will-change-transform"
      >
        <div
          className={`rounded-full border border-coral/50 transition-all duration-300 ease-out ${
            isHovering ? "scale-[1.6] opacity-30" : "scale-100 opacity-100"
          }`}
          style={{
            width: "32px",
            height: "32px",
          }}
        />
      </div>
    </>
  );
}
