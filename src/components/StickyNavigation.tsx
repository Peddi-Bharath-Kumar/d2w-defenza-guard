import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Variants", href: "#variants" },
  { label: "Warranty", href: "#warranty-lookup" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
];

const StickyNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-primary/95 backdrop-blur-md shadow-lg border-b border-brand-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(255,193,7,0.5)] transition-all duration-300">
              <Shield className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold text-white font-outfit">
                <span className="text-brand-gold">D2W</span>defenza
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="nav-link text-white hover:text-brand-gold"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link text-white hover:text-brand-gold"
                >
                  {link.label}
                </button>
              )
            )}
            <Button
              onClick={() => handleNavClick("#warranty-lookup")}
              className="ml-4 bg-brand-gold hover:bg-brand-gold/90 text-brand-primary font-semibold btn-shine"
            >
              Check Warranty
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-brand-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-white hover:text-brand-gold hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-left text-white hover:text-brand-gold hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              )
            )}
            <Button
              onClick={() => handleNavClick("#warranty-lookup")}
              className="mt-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-primary font-semibold"
            >
              Check Warranty
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default StickyNavigation;
