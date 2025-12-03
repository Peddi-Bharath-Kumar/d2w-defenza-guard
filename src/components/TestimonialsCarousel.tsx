import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  car: string;
  rating: number;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai",
    car: "BMW 5 Series",
    rating: 5,
    text: "Absolutely stunning protection! My BMW looks brand new even after 2 years. The self-healing feature is magical - minor scratches just disappear!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi",
    car: "Mercedes GLC",
    rating: 5,
    text: "Best investment for my car! The D2W Defenza PPF has protected my Mercedes from countless stone chips. The warranty process is super easy.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Ahmedabad",
    car: "Audi A6",
    rating: 5,
    text: "Professional installation and premium quality film. My Audi's paint looks flawless. Highly recommend D2W Defenza to all car enthusiasts!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    location: "Bangalore",
    car: "Porsche Cayenne",
    rating: 5,
    text: "The 10-year warranty gave me complete peace of mind. The PPF is virtually invisible and protects against everything - bird droppings, tree sap, you name it!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  const goToNext = () => goToSlide((activeIndex + 1) % testimonials.length);

  return (
    <section className="py-20 bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-outfit mb-4">
            What Our <span className="text-gradient-gold">Customers</span> Say
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Join thousands of satisfied car owners who trust D2W Defenza
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-brand-gold/30" />
            
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute inset-0 translate-x-8"
                  }`}
                >
                  {index === activeIndex && (
                    <>
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-6 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-brand-gold fill-brand-gold" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-xl md:text-2xl text-white text-center mb-8 leading-relaxed font-light">
                        "{testimonial.text}"
                      </p>

                      {/* Customer Info */}
                      <div className="flex flex-col items-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-4 border-brand-gold mb-4 object-cover"
                        />
                        <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-blue-200">{testimonial.location}</p>
                        <p className="text-brand-gold text-sm font-medium mt-1">{testimonial.car}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-brand-gold"
                    : "w-3 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
