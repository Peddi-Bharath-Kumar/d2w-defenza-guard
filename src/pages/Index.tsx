import { Shield, Award, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WarrantyLookup from "@/components/WarrantyLookup";
import heroImage from "@/assets/ppf-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-brand-muted">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-brand-primary">D2W Defenza PPF</h1>
                <p className="text-sm text-muted-foreground">Digital Warranty System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Paint Protection
              <span className="block text-brand-accent">Film Warranty</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Check your D2W Defenza PPF warranty status instantly with our digital warranty system
            </p>
            <Button 
              size="lg" 
              className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 text-lg"
              onClick={() => document.getElementById('warranty-lookup')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Check Your Warranty
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              Why Choose D2W Defenza PPF?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium protection with comprehensive digital warranty coverage
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-brand-muted shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-brand-accent" />
                </div>
                <h4 className="text-xl font-semibold text-brand-primary mb-4">Premium Protection</h4>
                <p className="text-muted-foreground">
                  Advanced PPF technology providing superior protection against scratches, chips, and environmental damage.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-muted shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-brand-accent" />
                </div>
                <h4 className="text-xl font-semibold text-brand-primary mb-4">5-Year Warranty</h4>
                <p className="text-muted-foreground">
                  Comprehensive warranty coverage with easy digital verification and claim process.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-muted shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-brand-accent" />
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
                <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
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
      <footer className="bg-brand-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">D2W Defenza PPF</span>
              </div>
              <p className="text-gray-300">
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