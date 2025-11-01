import { Shield, Award, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WarrantyLookup from "@/components/WarrantyLookup";
import boxImage from "@/assets/d2w-defenza-box.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-brand-primary via-brand-royal-blue to-brand-primary border-b-4 border-brand-gold shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.5)]">
                <Shield className="h-7 w-7 text-brand-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  <span className="text-brand-gold">D2W</span>defenza
                </h1>
                <p className="text-sm text-blue-200 font-medium">PAINT PROTECTION FILM</p>
              </div>
            </div>
            <div className="hidden md:block">
              <p className="text-white text-sm font-semibold">Digital Warranty System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner with Box Image */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-royal-blue via-brand-primary to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(28,79,156,0.3),transparent_50%)]"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${boxImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white z-10">
              <div className="inline-block bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/40 px-4 py-2 rounded-full mb-6">
                <span className="text-brand-gold font-semibold">Premium Quality Guaranteed</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-brand-gold">D2W</span> Defenza
                <span className="block text-white mt-2">Paint Protection Film</span>
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Top Premium Protection with 10-Year Warranty
              </p>
              <Button 
                size="lg" 
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary px-8 py-6 text-lg font-bold shadow-[0_0_30px_rgba(255,193,7,0.4)] hover:shadow-[0_0_40px_rgba(255,193,7,0.6)] transition-all"
                onClick={() => document.getElementById('warranty-lookup')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Check Your Warranty
              </Button>
            </div>
            <div className="relative hidden md:block">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(28,79,156,0.5)] border-4 border-brand-gold/30">
                <img 
                  src={boxImage} 
                  alt="D2W Defenza PPF Box" 
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-brand-royal-blue/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              Why Choose <span className="text-brand-gold">D2W</span> Defenza PPF?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium protection with comprehensive digital warranty coverage
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-brand-royal-blue/30 shadow-lg hover:shadow-xl transition-all hover:border-brand-gold/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-royal-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(28,79,156,0.2)]">
                  <Shield className="h-8 w-8 text-brand-royal-blue" />
                </div>
                <h4 className="text-xl font-semibold text-brand-primary mb-4">Premium TPU Protection</h4>
                <p className="text-muted-foreground">
                  Top-grade thermoplastic polyurethane in 215 & 190 micron options providing superior protection.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-gold/50 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-brand-gold/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,193,7,0.3)]">
                  <Award className="h-8 w-8 text-brand-gold" />
                </div>
                <h4 className="text-xl font-semibold text-brand-primary mb-4">10-Year Warranty</h4>
                <p className="text-muted-foreground">
                  Industry-leading 10-year coverage for both 215 and 190 micron variants with easy digital verification.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-royal-blue/30 shadow-lg hover:shadow-xl transition-all hover:border-brand-gold/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-royal-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(28,79,156,0.2)]">
                  <Users className="h-8 w-8 text-brand-royal-blue" />
                </div>
                <h4 className="text-xl font-semibold text-brand-primary mb-4">Authorized Network</h4>
                <p className="text-muted-foreground">
                  Installed by certified professionals through our nationwide network of authorized dealers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Variants Section */}
      <section className="py-20 bg-gradient-to-br from-brand-royal-blue/5 to-brand-gold/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              D2W Defenza <span className="text-brand-gold">Variants</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect protection for your vehicle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Transparent 215 Microns */}
            <Card className="border-brand-gold/50 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-brand-gold/5 hover:scale-105 transform duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-royal-blue to-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(28,79,156,0.4)]">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-brand-primary mb-2">Transparent</h4>
                  <p className="text-brand-gold font-semibold text-lg">215 Microns</p>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <span>Premium TPU material</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <span>Maximum protection thickness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <span>10-year warranty coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <span>Crystal clear finish</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Transparent 190 Microns */}
            <Card className="border-brand-royal-blue/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 transform duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-royal-blue to-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(28,79,156,0.3)]">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-brand-primary mb-2">Transparent</h4>
                  <p className="text-brand-royal-blue font-semibold text-lg">190 Microns</p>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-royal-blue mt-0.5 flex-shrink-0" />
                    <span>Premium TPU material</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-royal-blue mt-0.5 flex-shrink-0" />
                    <span>Optimal protection balance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-royal-blue mt-0.5 flex-shrink-0" />
                    <span>10-year warranty coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-royal-blue mt-0.5 flex-shrink-0" />
                    <span>Crystal clear finish</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Warranty Lookup Section */}
      <section id="warranty-lookup" className="py-20 bg-brand-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              Check Your Warranty
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your warranty number to instantly access your digital warranty certificate
            </p>
          </div>
          
          <WarrantyLookup />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              How Our Warranty Works
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, digital, and secure warranty verification process
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "PPF Installation",
                description: "Get D2W Defenza PPF installed by authorized dealers"
              },
              {
                step: "2", 
                title: "Warranty Registration",
                description: "Your warranty is automatically registered in our system"
              },
              {
                step: "3",
                title: "Digital Certificate",
                description: "Receive your unique warranty number and digital certificate"
              },
              {
                step: "4",
                title: "Easy Verification",
                description: "Check warranty status anytime through our website"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-royal-blue to-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-[0_0_20px_rgba(28,79,156,0.4)]">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-brand-primary mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-brand-primary via-brand-royal-blue to-brand-primary text-white py-12 border-t-4 border-brand-gold">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,193,7,0.4)]">
                  <Shield className="h-5 w-5 text-brand-primary" />
                </div>
                <span className="text-xl font-bold">
                  <span className="text-brand-gold">D2W</span> Defenza PPF
                </span>
              </div>
              <p className="text-blue-200">
                Premium paint protection film with comprehensive digital warranty coverage.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>support@d2wdefenza.com</p>
                <p>1800-XXX-XXXX</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-300">
                <p>Warranty Claims</p>
                <p>Technical Support</p>
                <p>Dealer Network</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-brand-secondary mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 D2W Defenza PPF. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;