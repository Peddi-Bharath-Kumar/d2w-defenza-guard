import { Shield, FileText, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const WarrantyClaims = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-brand-primary via-brand-royal-blue to-brand-primary border-b-4 border-brand-gold shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.5)]">
                <Shield className="h-7 w-7 text-brand-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  <span className="text-brand-gold">D2W</span>defenza
                </h1>
                <p className="text-sm text-blue-200 font-medium">PAINT PROTECTION FILM</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-royal-blue via-brand-primary to-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <FileText className="h-16 w-16 text-brand-gold mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Warranty <span className="text-brand-gold">Claims</span>
            </h2>
            <p className="text-xl text-blue-100">
              Our comprehensive warranty process ensures your investment is protected
            </p>
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              How to File a <span className="text-brand-gold">Claim</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to file your warranty claim
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Verify Warranty",
                description: "Check your warranty status using your warranty number on the homepage",
                icon: CheckCircle
              },
              {
                step: "2",
                title: "Contact Installer",
                description: "Reach out to your authorized installer who performed the PPF installation",
                icon: Shield
              },
              {
                step: "3",
                title: "Assessment",
                description: "The installer will assess the issue and determine warranty coverage",
                icon: FileText
              },
              {
                step: "4",
                title: "Resolution",
                description: "Approved claims will be resolved according to warranty terms",
                icon: Clock
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-royal-blue to-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-[0_0_20px_rgba(28,79,156,0.4)]">
                    {item.step}
                  </div>
                  <Icon className="h-8 w-8 text-brand-gold mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-brand-primary mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warranty Coverage */}
      <section className="py-20 bg-gradient-to-br from-brand-royal-blue/5 to-brand-gold/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              What's <span className="text-brand-gold">Covered</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-brand-royal-blue/30 shadow-lg">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold text-brand-primary mb-4">Covered Items</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Yellowing or discoloration of the film</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Cracking, bubbling, or delamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Manufacturing defects in the film</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Loss of self-healing properties</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 shadow-lg">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold text-brand-primary mb-4">Not Covered</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                    <span>Improper installation or maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                    <span>Damage from accidents or collisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                    <span>Intentional damage or misuse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                    <span>Normal wear and tear</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-brand-primary mb-6">
            Need to File a Claim?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact your authorized installer or reach out to our support team
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/">
              <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary">
                Check Warranty
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => window.location.href = 'mailto:support@d2wdefenza.com'}>
              Contact Support
            </Button>
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
              <div className="space-y-2">
                <Link to="/warranty-claims" className="block text-gray-300 hover:text-brand-gold transition-colors">
                  Warranty Claims
                </Link>
                <Link to="/terms-conditions" className="block text-gray-300 hover:text-brand-gold transition-colors">
                  Terms & Conditions
                </Link>
                <Link to="/blog" className="block text-gray-300 hover:text-brand-gold transition-colors">
                  Blog
                </Link>
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

export default WarrantyClaims;
