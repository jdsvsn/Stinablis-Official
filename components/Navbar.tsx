"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, Box, Mail } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "#home", icon: Home },
  { label: "ABOUT", href: "#about", icon: Info },
  { label: "PRODUCTS", href: "#services", icon: Box },
  { label: "CONTACT", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Threshold to switch to menu icon (e.g., when heading towards About section)
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500"
        style={{
          background: "transparent",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="transition-opacity duration-300 hover:opacity-70 z-50"
          aria-label="Go to home"
        >
          <img 
            src="/logo-new.png" 
            alt="Stinablis" 
            className="w-24 h-24 object-contain brightness-0 invert" 
          />
        </button>

        {/* Navigation / Hamburger */}
        <div className="flex items-center">
          <AnimatePresence mode="wait">
            {!scrolled ? (
              <motion.div
                key="full-nav"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hidden md:flex items-center gap-8 md:gap-12"
              >
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-2 font-michroma text-[16px] tracking-[0.15em] text-[#aca7a9] hover:text-[#dff122] transition-colors duration-300 relative group"
                  >
                    <link.icon size={16} strokeWidth={3} className="text-[#dff122] transition-opacity" />
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#dff122] group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Single Unified Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`text-[#dff122] hover:text-white transition-colors z-50 ml-4 ${!scrolled ? "md:hidden" : ""}`}
            aria-label="Open menu"
          >
            <Menu size={32} strokeWidth={3} />
          </button>
        </div>
      </nav>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-[#0a0a0f] border-l border-white/10 z-[70] p-12 flex flex-col"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end text-white hover:text-white/70 transition-colors mb-16"
              >
                <X size={32} strokeWidth={3} />
              </button>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-4 font-michroma text-xl tracking-[0.2em] text-[#aca7a9] hover:text-[#dff122] text-left transition-colors"
                  >
                    <link.icon size={20} strokeWidth={3} className="text-[#dff122]" />
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto border-t border-white/5 pt-8">
                <p className="font-ar-one text-xs text-white/30 tracking-widest">
                  STINABLIS © 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
