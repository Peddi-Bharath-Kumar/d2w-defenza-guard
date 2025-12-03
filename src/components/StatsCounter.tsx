import { useEffect, useState, useRef } from "react";
import { Car, Users, Award, Star } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: Car, value: 10000, suffix: "+", label: "Cars Protected" },
  { icon: Users, value: 500, suffix: "+", label: "Happy Customers" },
  { icon: Award, value: 100, suffix: "+", label: "Certified Dealers" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Customer Rating" },
];

const CounterItem = ({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  const displayValue = stat.value % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-16 h-16 mb-4 bg-brand-gold/20 rounded-full flex items-center justify-center group-hover:bg-brand-gold/30 transition-all duration-300 group-hover:scale-110">
        <Icon className="h-8 w-8 text-brand-gold" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-brand-primary font-outfit mb-2">
        {displayValue}
        <span className="text-brand-gold">{stat.suffix}</span>
      </div>
      <p className="text-muted-foreground font-medium">{stat.label}</p>
    </div>
  );
};

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-brand-muted/50 via-white to-brand-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CounterItem stat={stat} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
