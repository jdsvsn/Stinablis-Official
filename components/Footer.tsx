"use client";

import { Linkedin, Instagram, Facebook, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className="relative z-20 text-white py-12 px-6 md:px-16 mt-20"
      style={{ 
        background: "rgba(35, 35, 35, 1)",
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-8">
          <div className="font-ar-one text-2xl font-light">
            Sustainability meets Innovation
          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://www.linkedin.com/company/stinablis/posts/?feedView=all" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#dff122] hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://www.instagram.com/stinablis/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#dff122] hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61559570767870#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#dff122] hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="h-[1px] bg-white/10 w-full mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-6 text-[12px] text-white/60 font-ar-one order-2 md:order-1">
            <span>© Stinablis Sdn Bhd 2026, all rights reserved</span>
          </div>

          <button 
            onClick={scrollToTop}
            className="border border-[#dff122] p-3 text-[#dff122] hover:bg-[#dff122] hover:text-black transition-all order-1 md:order-2"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
