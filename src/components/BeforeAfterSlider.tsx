import { useState } from "react";
import benzBefore from "@/assets/benz-before.jpg";
import benzAfter from "@/assets/benz-after.jpg";

const BeforeAfterSlider = () => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-brand-gold font-medium tracking-wider uppercase text-sm">
            See The Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Before & After <span className="text-brand-gold">PPF Protection</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to see the dramatic difference D2W PPF makes in protecting your vehicle's paint
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Comparison Container */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/20">
            {/* Before Image - Full width background */}
            <div className="absolute inset-0">
              <img 
                src={benzBefore} 
                alt="Black Mercedes-Benz without PPF protection" 
                className="w-full h-full object-cover"
              />
              {/* Red overlay for damage emphasis */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-transparent" />
            </div>

            {/* After Image - Clipped from right based on slider */}
            <div 
              className="absolute inset-0"
              style={{ 
                clipPath: `polygon(${sliderValue}% 0, 100% 0, 100% 100%, ${sliderValue}% 100%)` 
              }}
            >
              <img 
                src={benzAfter} 
                alt="Black Mercedes-Benz with D2W PPF protection" 
                className="w-full h-full object-cover"
              />
              {/* Golden overlay for protection emphasis */}
              <div className="absolute inset-0 bg-gradient-to-bl from-brand-gold/15 via-transparent to-transparent" />
            </div>

            {/* Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-brand-gold">
                <div className="flex gap-1">
                  <svg className="w-3 h-3 text-brand-gold rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  <svg className="w-3 h-3 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Hidden Range Input for interaction */}
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Before and after comparison slider"
            />

            {/* Labels */}
            <div 
              className="absolute bottom-4 left-4 bg-red-600 backdrop-blur-sm px-4 py-2 rounded-full z-10 transition-opacity duration-300"
              style={{ opacity: sliderValue > 15 ? 1 : 0 }}
            >
              <span className="text-sm font-bold text-white tracking-wide">BEFORE</span>
            </div>
            <div 
              className="absolute bottom-4 right-4 bg-brand-gold backdrop-blur-sm px-4 py-2 rounded-full z-10 transition-opacity duration-300"
              style={{ opacity: sliderValue < 85 ? 1 : 0 }}
            >
              <span className="text-sm font-bold text-background tracking-wide">AFTER</span>
            </div>

            {/* Corner indicators */}
            <div 
              className="absolute top-4 left-4 text-white/80 text-xs font-medium z-10 transition-opacity duration-300"
              style={{ opacity: sliderValue > 20 ? 1 : 0 }}
            >
              Without PPF Protection
            </div>
            <div 
              className="absolute top-4 right-4 text-white/80 text-xs font-medium z-10 transition-opacity duration-300"
              style={{ opacity: sliderValue < 80 ? 1 : 0 }}
            >
              With D2W PPF Protection
            </div>
          </div>

          {/* Instruction */}
          <p className="text-center text-muted-foreground mt-6 text-sm">
            ← Drag left or right to compare →
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: "Self-Healing", desc: "Minor scratches disappear" },
              { label: "UV Protection", desc: "Prevents paint fading" },
              { label: "Stone Chip Guard", desc: "Impact resistance" },
              { label: "Chemical Resistant", desc: "Bird droppings & more" },
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-brand-gold/30 transition-colors"
              >
                <h4 className="font-semibold text-foreground mb-1">{feature.label}</h4>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
