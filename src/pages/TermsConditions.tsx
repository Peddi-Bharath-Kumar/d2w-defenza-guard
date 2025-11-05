import { Shield, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TermsConditions = () => {
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
              Terms & <span className="text-brand-gold">Conditions</span>
            </h2>
            <p className="text-xl text-blue-100">
              Please read these terms and conditions carefully before using our products
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-brand-royal-blue/30 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">1. Warranty Terms</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  D2W Defenza provides a 10-year limited warranty for both 190 and 215 micron variants of our Paint Protection Film. This warranty covers manufacturing defects including yellowing, cracking, bubbling, and delamination under normal use conditions.
                </p>
                <p>
                  The warranty is valid only when the film is installed by an authorized D2W Defenza installer and properly maintained according to our care guidelines.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-royal-blue/30 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">2. Installation Requirements</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Installation must be performed by authorized D2W Defenza dealers who have received proper training and certification. Installations performed by non-authorized installers will void the warranty.
                </p>
                <p>
                  The installer is responsible for ensuring proper surface preparation, application techniques, and post-installation inspection.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-royal-blue/30 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">3. Maintenance Requirements</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To maintain warranty coverage, the film must be cleaned and maintained according to our guidelines:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use pH-neutral automotive shampoos only</li>
                  <li>Avoid high-pressure washing within 48 hours of installation</li>
                  <li>Do not apply wax or sealants for at least 7 days after installation</li>
                  <li>Remove contaminants (bird droppings, tree sap, etc.) promptly</li>
                  <li>Avoid automated car washes with harsh brushes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-royal-blue/30 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">4. Warranty Exclusions</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The warranty does not cover:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Damage from accidents, collisions, or impact</li>
                  <li>Improper installation or maintenance</li>
                  <li>Intentional damage or misuse</li>
                  <li>Normal wear and tear from regular use</li>
                  <li>Damage from chemical cleaners or solvents</li>
                  <li>Edge lifting due to improper installation</li>
                  <li>Damage from modifications to the vehicle</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-royal-blue/30 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">5. Claim Process</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To file a warranty claim:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact your authorized installer first</li>
                  <li>Provide your warranty number and installation details</li>
                  <li>Allow inspection of the affected area</li>
                  <li>Submit any required documentation or photos</li>
                </ul>
                <p>
                  Claims will be reviewed within 5-7 business days. Approved claims will be resolved by repair or replacement at D2W Defenza's discretion.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-royal-blue/30 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">6. Limitation of Liability</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  D2W Defenza's liability under this warranty is limited to the repair or replacement of defective film. We are not responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Installation costs beyond the original installation</li>
                  <li>Vehicle downtime or loss of use</li>
                  <li>Consequential or incidental damages</li>
                  <li>Damage to the underlying paint surface</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-royal-blue/30 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">7. Transferability</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The warranty is transferable to subsequent owners of the vehicle, provided that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>D2W Defenza is notified of the transfer within 30 days</li>
                  <li>The film has been properly maintained</li>
                  <li>All original documentation is provided</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-royal-blue/30 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">8. Contact Information</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For questions about these terms and conditions or warranty coverage:
                </p>
                <p className="font-semibold text-brand-primary">
                  Email: support@d2wdefenza.com<br />
                  Phone: 1800-XXX-XXXX
                </p>
                <p className="text-sm">
                  Last updated: January 2024
                </p>
              </div>
            </CardContent>
          </Card>
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

export default TermsConditions;
