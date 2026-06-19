"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [prog, setProg] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const loaderInt = setInterval(() => {
      setProg((prev) => {
        const next = prev + Math.random() * 18;
        if (next >= 100) {
          clearInterval(loaderInt);
          setTimeout(() => {
            setHidden(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(loaderInt);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-carbon z-[9999] flex flex-col items-center justify-center gap-6 transition-all duration-800 ${
        hidden ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      <div className="font-anton text-[40px] tracking-[0.1em] text-frost mb-4 opacity-50">
        STINABLIS
      </div>
      <div className="w-[200px] h-[1px] bg-frost/10 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-coral transition-all duration-50"
          style={{ width: `${prog}%` }}
        />
      </div>
      <div className="text-[12px] tracking-[0.15em] text-mauve font-roboto">
        {Math.floor(prog)}%
      </div>
    </div>
  );
}
