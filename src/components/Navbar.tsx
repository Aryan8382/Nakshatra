import { Link } from "@tanstack/react-router";
import { Menu, Home, Building2, Info, X } from "lucide-react";
import { useState, useEffect } from "react";
import logoImg from "@/assets/logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-4 md:px-12 md:py-6 pointer-events-none">
        {/* Logo/Brand */}
        <div className="pointer-events-auto flex items-center">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <img src={logoImg} alt="Nakshatra Gravity" className="h-10 md:h-14 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={`pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 rounded-full px-8 py-3 text-sm tracking-wide text-foreground transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border border-border/30 shadow-sm" : "bg-transparent"}`}>
          <Link 
            to="/" 
            className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity [&.active]:opacity-100 [&.active]:font-medium"
          >
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link 
            to="/amenities" 
            className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity [&.active]:opacity-100 [&.active]:font-medium"
          >
            <Building2 className="h-4 w-4" /> Amenities
          </Link>
          <Link 
            to="/about" 
            className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity [&.active]:opacity-100 [&.active]:font-medium"
          >
            <Info className="h-4 w-4" /> About
          </Link>
        </nav>

        {/* Right side text (Desktop) */}
        <div className="pointer-events-auto hidden md:block text-right mix-blend-difference">
          <div className="text-xs tracking-[0.4em] uppercase text-white">Kudasan · GIFT City</div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="pointer-events-auto md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full bg-background/60 p-2 text-foreground backdrop-blur-md border border-border/20 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-300">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-2xl tracking-wide text-foreground [&.active]:font-medium"
          >
            <Home className="h-6 w-6" /> Home
          </Link>
          <Link 
            to="/amenities" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-2xl tracking-wide text-foreground [&.active]:font-medium"
          >
            <Building2 className="h-6 w-6" /> Amenities
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-2xl tracking-wide text-foreground [&.active]:font-medium"
          >
            <Info className="h-6 w-6" /> About
          </Link>
        </div>
      )}
    </>
  );
}
