import { useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import benzBefore from "@/assets/benz-before.jpg";
import benzAfter from "@/assets/benz-after.jpg";

const BeforeAfterSlider = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  const containerRef = useRef<HTMLDivElement>(null);

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
          <div 
            ref={containerRef}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/20"
          >
            {/* Before Image (Full width, underneath) */}
            <div className="absolute inset-0">
              <img 
                src={benzBefore} 
                alt="Black Mercedes-Benz without PPF protection showing vulnerable paint" 
                className="w-full h-full object-cover"
              />
              {/* Red overlay for damage emphasis */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-red-800/20 to-transparent" />
              
              {/* Damage indicators */}
              <div className="absolute top-1/4 left-1/4 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-red-500/60 border-2 border-red-400 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-[10px] font-bold">CHIP</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/3 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <div className="w-16 h-6 bg-orange-500/60 border-2 border-orange-400 rounded flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-[10px] font-bold">SCRATCH</span>
                </div>
              </div>
              <div className="absolute bottom-1/3 left-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 rounded-full bg-yellow-500/60 border-2 border-yellow-400 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-[10px] font-bold">FADE</span>
                </div>
              </div>
            </div>

            {/* After Image (Clipped based on slider) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)` }}
            >
              <img 
                src={benzAfter} 
                alt="Black Mercedes-Benz with D2W PPF protection showing pristine glossy finish" 
                className="w-full h-full object-cover"
              />
              {/* Golden/emerald overlay for protection emphasis */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-emerald-800/10 to-transparent" />
              
              {/* Protection indicators */}
              <div className="absolute top-1/4 right-1/4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/60 border-2 border-brand-gold flex items-center justify-center backdrop-blur-sm animate-pulse">
                  <span className="text-background text-[10px] font-bold">HEAL</span>
                </div>
              </div>
              <div className="absolute top-1/2 right-1/3" style={{ animationDelay: '0.5s' }}>
                <div className="w-16 h-6 bg-emerald-500/60 border-2 border-emerald-400 rounded flex items-center justify-center backdrop-blur-sm animate-pulse">
                  <span className="text-white text-[10px] font-bold">PROTECT</span>
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/4" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 rounded-full bg-teal-500/60 border-2 border-teal-400 flex items-center justify-center backdrop-blur-sm animate-pulse">
                  <span className="text-white text-[10px] font-bold">SHINE</span>
                </div>
              </div>
            </div>

            {/* Slider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-brand-gold shadow-lg shadow-brand-gold/50 z-10"
              style={{ left: `${sliderValue[0]}%`, transform: 'translateX(-50%)' }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-background rounded-full" />
                  <div className="w-0.5 h-4 bg-background rounded-full" />
                  <div className="w-0.5 h-4 bg-background rounded-full" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-red-500/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-white">BEFORE</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-brand-gold/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-background">AFTER</span>
            </div>
          </div>

          {/* Slider Control */}
          <div className="mt-8 px-4">
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              min={0}
              step={1}
              className="cursor-pointer"
            />
            <p className="text-center text-muted-foreground mt-4 text-sm">
              ← Drag the slider to compare →
            </p>
          </div>

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
