import { Shield, Award, Users, Zap, Sun, Sparkles, Droplets, FlaskConical, Eye, ArrowRight, X, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import WarrantyLookup from "@/components/WarrantyLookup";
import ContactForm from "@/components/ContactForm";
import FloatingButtons from "@/components/FloatingButtons";
import StatsCounter from "@/components/StatsCounter";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import TrustBadges from "@/components/TrustBadges";
import StickyNavigation from "@/components/StickyNavigation";
import ParticleBackground from "@/components/ParticleBackground";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import boxImage from "@/assets/d2w-defenza-box.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <StickyNavigation />

      {/* Floating Contact Buttons */}
      <FloatingButtons />

      {/* Hero Banner with Particles */}
      <main>
        <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient pt-20" aria-label="Hero banner">
          {/* Particle Background */}
          <ParticleBackground />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(28,79,156,0.4),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,193,7,0.15),transparent_40%)]"></div>
          
          <div className="relative container mx-auto px-4 py-12 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white z-10">
                <div className="inline-flex items-center gap-2 bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/40 px-5 py-2.5 rounded-full mb-8 animate-fade-in-down">
                  <Sparkles className="h-4 w-4 text-brand-gold animate-bounce-subtle" />
                  <span className="text-brand-gold font-semibold text-sm">Premium Quality Guaranteed</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-outfit">
                  <span className="text-gradient-gold">D2W</span> Defenza
                  <span className="block text-white mt-3 text-4xl md:text-5xl">Paint Protection Film</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed max-w-xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  India's most trusted PPF brand. Self-healing technology with 10-year warranty protection.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                  <Button 
                    size="lg" 
                    className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary px-8 py-7 text-lg font-bold shadow-[0_0_30px_rgba(255,193,7,0.4)] hover:shadow-[0_0_50px_rgba(255,193,7,0.6)] transition-all btn-shine group"
                    onClick={() => document.getElementById('warranty-lookup')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Check Your Warranty
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-brand-gold px-8 py-7 text-lg font-semibold transition-all"
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore Features
                  </Button>
                </div>
              </div>
              
              {/* Right - Product Image */}
              <div className="relative hidden md:flex justify-center items-center">
                <div className="absolute w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-10 group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-gold/30 to-brand-royal-blue/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-gold/40 group-hover:border-brand-gold/60 transition-all duration-500 group-hover:scale-[1.02]">
                    <img 
                      src={boxImage} 
                      alt="D2W Defenza Paint Protection Film Product Box - Premium TPU PPF with 10 Year Warranty" 
                      className="w-full h-auto max-w-md transform transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-brand-gold rounded-full animate-bounce"></div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Stats Counter */}
        <StatsCounter />

        {/* Features Section */}
        <section id="features" className="py-24 bg-background" aria-labelledby="features-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-royal-blue font-semibold text-sm uppercase tracking-wider mb-4">Why Choose Us</span>
              <h2 id="features-heading" className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 font-outfit">
                Why Choose <span className="text-gradient-gold">D2W</span> Defenza PPF?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Premium protection with comprehensive digital warranty coverage
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-children">
              <Card className="card-premium group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-royal-blue/20 to-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-brand-royal-blue group-hover:text-brand-gold transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary mb-4 font-outfit">Premium TPU Protection</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Top-grade thermoplastic polyurethane in 215 & 190 micron options providing superior car paint protection.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-premium group border-brand-gold/30 bg-gradient-to-br from-white to-brand-gold/5">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="h-10 w-10 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary mb-4 font-outfit">10-Year Warranty</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Industry-leading 10-year warranty coverage for both 215 and 190 micron variants with easy digital verification.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-premium group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-royal-blue/20 to-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-10 w-10 text-brand-royal-blue group-hover:text-brand-gold transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary mb-4 font-outfit">Authorized Dealer Network</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Professional PPF installation by certified technicians through our nationwide network of authorized dealers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Variants Section */}
        <section id="variants" className="py-24 bg-gradient-to-br from-brand-muted/30 via-white to-brand-gold/5" aria-labelledby="variants-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-royal-blue font-semibold text-sm uppercase tracking-wider mb-4">Product Range</span>
              <h2 id="variants-heading" className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 font-outfit">
                <span className="text-gradient-gold">D2W</span> PPF Collection
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect paint protection for your vehicle
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto stagger-children">
              {/* D2W Defenza - Flagship */}
              <Card className="card-premium overflow-hidden relative border-2 border-brand-gold/40 bg-gradient-to-br from-white via-brand-gold/5 to-brand-gold/10">
                <div className="absolute top-4 right-4 bg-brand-gold text-brand-primary text-xs font-bold px-3 py-1 rounded-full">FLAGSHIP</div>
                <CardContent className="p-8 relative">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-royal-blue to-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-primary mb-2 font-outfit">D2W Defenza</h3>
                    <div className="inline-flex items-center gap-2 bg-brand-gold/20 px-4 py-2 rounded-full">
                      <Award className="h-4 w-4 text-brand-gold" />
                      <span className="text-brand-gold font-bold">10 Years Warranty</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    {["Premium TPU 190/215 micron", "Crystal clear glossy finish", "Self-healing technology", "Maximum protection"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-brand-gold flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* D2W Radiant - Glossy */}
              <Card className="card-premium overflow-hidden relative">
                <CardContent className="p-8 relative">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-royal-blue/80 to-brand-royal-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-primary mb-2 font-outfit">D2W Radiant</h3>
                    <div className="inline-flex items-center gap-2 bg-brand-royal-blue/10 px-4 py-2 rounded-full">
                      <Award className="h-4 w-4 text-brand-royal-blue" />
                      <span className="text-brand-royal-blue font-bold">5 Years Warranty</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    {["High-gloss finish", "Brilliant shine enhancement", "Self-healing properties", "Excellent protection"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-brand-royal-blue flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* D2W Matte */}
              <Card className="card-premium overflow-hidden relative">
                <CardContent className="p-8 relative">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Eye className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-primary mb-2 font-outfit">D2W Matte</h3>
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                      <Award className="h-4 w-4 text-slate-700" />
                      <span className="text-slate-700 font-bold">5 Years Warranty</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    {["Elegant matte finish", "Satin-smooth texture", "Self-healing properties", "Luxury appearance"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-slate-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Protection Features Section */}
        <section className="py-24 bg-background" aria-labelledby="protection-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-royal-blue font-semibold text-sm uppercase tracking-wider mb-4">Advanced Technology</span>
              <h2 id="protection-heading" className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 font-outfit">
                Complete PPF <span className="text-gradient-gold">Protection</span> Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Advanced technology protecting your vehicle in every way
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto stagger-children">
              {[
                { icon: Shield, title: "Stone Chip Protection", desc: "Shields against stone chips, minor scratches, and road debris." },
                { icon: Sun, title: "UV & Oxidation Resistance", desc: "Blocks harmful UV rays, preventing paint fading and oxidation over time." },
                { icon: Sparkles, title: "Self-Healing Properties", desc: "Minor scratches and swirl marks disappear with heat, keeping your paint pristine." },
                { icon: Droplets, title: "Easy Cleaning & Maintenance", desc: "Hydrophobic surface repels water and dirt, making washing effortless." },
                { icon: FlaskConical, title: "Chemical & Stain Resistance", desc: "Protects against bird droppings, tree sap, acid rain, and harsh chemicals." },
                { icon: Eye, title: "Invisible Protection", desc: "Crystal clear finish maintains your vehicle's original appearance." },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-premium group">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-royal-blue/10 to-brand-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-brand-royal-blue group-hover:text-brand-gold transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-brand-primary mb-3 font-outfit">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why PPF is Essential Section */}
        <section className="py-24 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-royal-blue overflow-hidden" aria-labelledby="why-ppf-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">Protection Matters</span>
              <h2 id="why-ppf-heading" className="text-4xl md:text-5xl font-bold text-white mb-6 font-outfit">
                Why <span className="text-gradient-gold">PPF</span> is Essential
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Protect your ₹5-50 Lakh+ vehicle investment with premium paint protection
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Without PPF */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-outfit">Without PPF</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Stone chips & scratches damage paint",
                    "UV rays cause paint fading",
                    "Bird droppings etch into clear coat",
                    "Acid rain & chemicals stain paint",
                    "Expensive repainting costs",
                    "Decreased resale value"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-red-200">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <X className="h-4 w-4 text-red-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* With D2W PPF */}
              <div className="bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 backdrop-blur-sm border border-brand-gold/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/20 rounded-bl-full"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-brand-gold/30 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-brand-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-outfit">With D2W PPF</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Invisible shield against stone chips",
                    "UV protection prevents fading",
                    "Self-healing removes minor scratches",
                    "Chemical & stain resistant surface",
                    "Up to 10-year warranty protection",
                    "Maintains vehicle resale value"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-green-200">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-green-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                size="lg"
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary px-8 py-6 text-lg font-bold shadow-[0_0_30px_rgba(255,193,7,0.4)] hover:shadow-[0_0_50px_rgba(255,193,7,0.6)] transition-all"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Protect Your Car Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Before/After Slider */}
        <BeforeAfterSlider />

        {/* Testimonials */}
        <TestimonialsCarousel />

        {/* Warranty Lookup Section */}
        <section id="warranty-lookup" className="py-24 bg-gradient-to-br from-brand-muted/30 via-white to-brand-gold/5" aria-labelledby="warranty-lookup-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-royal-blue font-semibold text-sm uppercase tracking-wider mb-4">Digital Verification</span>
              <h2 id="warranty-lookup-heading" className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 font-outfit">
                Check Your <span className="text-gradient-gold">PPF Warranty</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Enter your warranty number to instantly access your digital warranty certificate
              </p>
            </div>
            
            <WarrantyLookup />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-background" aria-labelledby="how-it-works-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-royal-blue font-semibold text-sm uppercase tracking-wider mb-4">Simple Process</span>
              <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 font-outfit">
                How Our PPF <span className="text-gradient-gold">Warranty</span> Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple, digital, and secure warranty verification process
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { step: "1", title: "PPF Installation", description: "Get D2W Defenza PPF installed by authorized dealers" },
                { step: "2", title: "Warranty Registration", description: "Your warranty is automatically registered in our system" },
                { step: "3", title: "Digital Certificate", description: "Receive your unique warranty number and digital certificate" },
                { step: "4", title: "Easy Verification", description: "Check warranty status anytime through our website" }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-royal-blue to-brand-gold rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300 font-outfit">
                      {item.step}
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-brand-gold to-brand-royal-blue/30 -translate-y-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary mb-3 font-outfit">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="py-24 bg-gradient-to-br from-brand-muted/30 via-white to-brand-gold/5" aria-labelledby="contact-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-royal-blue font-semibold text-sm uppercase tracking-wider mb-4">Get In Touch</span>
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 font-outfit">
                Contact <span className="text-gradient-gold">Us</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get in touch with us for inquiries, quotes, or to become a dealer
              </p>
            </div>
            
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary text-white py-16 border-t-4 border-brand-gold" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="h-7 w-7 text-brand-primary" />
                </div>
                <span className="text-2xl font-bold font-outfit">
                  <span className="text-brand-gold">D2W</span> Defenza PPF
                </span>
              </div>
              <p className="text-blue-200 leading-relaxed max-w-md">
                Premium paint protection film with comprehensive digital warranty coverage. Trusted by thousands of car owners across India.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg font-outfit">Contact</h4>
              <div className="space-y-3 text-blue-200">
                <p className="hover:text-brand-gold transition-colors cursor-pointer">support@d2wdefenza.com</p>
                <p className="hover:text-brand-gold transition-colors cursor-pointer">1800-XXX-XXXX</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg font-outfit">Support</h4>
              <div className="space-y-3">
                <Link to="/warranty-claims" className="block text-blue-200 hover:text-brand-gold transition-colors">
                  Warranty Claims
                </Link>
                <Link to="/terms-conditions" className="block text-blue-200 hover:text-brand-gold transition-colors">
                  Terms & Conditions
                </Link>
                <Link to="/blog" className="block text-blue-200 hover:text-brand-gold transition-colors">
                  Blog
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-blue-200">
            <p>&copy; 2024 D2W Defenza PPF. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
