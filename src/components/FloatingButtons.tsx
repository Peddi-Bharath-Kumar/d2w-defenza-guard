import { Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Options */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Call Button */}
        <a
          href="tel:1800XXXXXXX"
          className="group flex items-center gap-3 bg-brand-royal-blue text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="text-sm font-medium whitespace-nowrap">Call Now</span>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Phone className="h-5 w-5" />
          </div>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20know%20more%20about%20D2W%20Defenza%20PPF"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="text-sm font-medium whitespace-nowrap">WhatsApp</span>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="h-5 w-5" />
          </div>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isExpanded
            ? "bg-brand-primary text-white rotate-45"
            : "bg-brand-gold text-brand-primary animate-pulse-glow"
        }`}
        aria-label={isExpanded ? "Close contact options" : "Open contact options"}
      >
        <MessageCircle className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`} />
      </button>
    </div>
  );
};

export default FloatingButtons;
