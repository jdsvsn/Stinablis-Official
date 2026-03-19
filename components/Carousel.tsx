"use client";

import { useState, useEffect, useCallback } from "react";

const services = [
  {
    title: "Rapid Prototyping",
    image: "/rapid.jpg",
    description: "Any Idea or Solution that needs a prototype, we are here for you",
  },
  {
    title: "Sustainable Composites",
    image: "/fibre.jpg",
    description: "Sustainable materials made from pineapple fibres",
  },
  {
    title: "3D Printing",
    image: "/3dprint.jpg",
    description: "3D printed solutions catered to your requirements",
  },
  {
    title: "Automotive Parts",
    image: "/bumper.png",
    description: "Customised parts based on your specifications",
  },
  {
    title: "Reverse Engineering",
    image: "/scanning.png",
    description: "Reverse engineered solutions for your needs",
  },
  {
    title: "Software Solutions",
    image: "/web.png",
    description: "Customised software solutions, websites and databases",
  },
];

function getCardClass(index: number, active: number, total: number): string {
  const diff = ((index - active) % total + total) % total;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === total - 1) return "left";
  if (diff === 2) return "hidden-right";
  return "hidden-left";
}

export default function Carousel() {
  const [active, setActive] = useState(0);
  const [containerHeight, setContainerHeight] = useState("450px");
  const total = services.length;

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerWidth < 768 ? "350px" : "450px");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Carousel */}
      <div
        className="carousel-container relative w-full"
        style={{ height: containerHeight }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {services.map((service, i) => {
            const cardClass = getCardClass(i, active, total);
            return (
              <div
                key={i}
                className={`carousel-card rounded-lg overflow-hidden ${cardClass}`}
                onClick={() => {
                  if (cardClass === "right") next();
                  else if (cardClass === "left") prev();
                }}
                style={{ cursor: cardClass !== "center" ? "pointer" : "default" }}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="font-michroma text-white text-xl md:text-3xl tracking-wider leading-snug">
                    {service.title}
                  </h3>
                  <p className="font-ar-one text-white/70 text-sm md:text-lg mt-2 md:mt-3 tracking-wide max-w-lg">
                    {service.description}
                  </p>
                </div>

                {/* Border glow on active */}
                {cardClass === "center" && (
                  <div className="absolute inset-0 rounded-lg border border-white/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-[4px] rounded-full transition-all duration-500"
            style={{
              width: i === active ? "32px" : "6px",
              background: i === active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <div className="flex gap-6">
        <button
          onClick={prev}
          className="w-14 h-14 rounded-full border-2 border-[#dff122]/40 flex items-center justify-center text-[#dff122] hover:bg-[#dff122] hover:text-black hover:border-[#dff122] transition-all duration-300 font-michroma text-xl"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={next}
          className="w-14 h-14 rounded-full border-2 border-[#dff122]/40 flex items-center justify-center text-[#dff122] hover:bg-[#dff122] hover:text-black hover:border-[#dff122] transition-all duration-300 font-michroma text-xl"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>
  );
}
