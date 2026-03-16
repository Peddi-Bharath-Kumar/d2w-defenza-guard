import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Calendar, MapPin, User, Package, CheckCircle2 } from "lucide-react";

interface WarrantyInfo {
  warrantyNumber: string;
  rollId: string;
  customerName: string;
  vehicleInfo: string;
  installationDate: string;
  expiryDate: string;
  coverageType: string;
  installerName: string;
  productType: string;
  status: "Active" | "Expired" | "Invalid";
}

interface StoredWarranty {
  id: string;
  warrantyNumber: string;
  rollId: string;
  customerName: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  installationDate: string;
  expiryDate: string;
  installerName: string;
  productType: string;
}

const WarrantyLookup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [warrantyInfo, setWarrantyInfo] = useState<WarrantyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [warranties, setWarranties] = useState<StoredWarranty[]>([]);

  useEffect(() => {
    // Load warranties from localStorage
    const saved = localStorage.getItem("warrantyRecords");
    if (saved) {
      setWarranties(JSON.parse(saved));
    }
  }, []);

  const getProductLabel = (type: string) => {
    const labels: Record<string, string> = {
      "ppf-full": "Full Body PPF",
      "ppf-front": "Front End PPF",
      "ppf-partial": "Partial PPF",
      "ceramic": "Ceramic Coating",
      "combo": "PPF + Ceramic Combo",
    };
    return labels[type] || type;
  };

  const handleLookup = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a warranty number");
      return;
    }

    setIsLoading(true);
    setError("");
    
    // Simulate API call delay
    setTimeout(() => {
      const searchValue = searchTerm.trim().toUpperCase();
      
      // Search in localStorage warranties
      const found = warranties.find(w => 
        w.warrantyNumber.toUpperCase() === searchValue
      );

      if (found) {
        const isExpired = new Date(found.expiryDate) < new Date();
        const warrantyYears = Math.ceil(
          (new Date(found.expiryDate).getTime() - new Date(found.installationDate).getTime()) / 
          (1000 * 60 * 60 * 24 * 365)
        );

        setWarrantyInfo({
          warrantyNumber: found.warrantyNumber,
          rollId: found.rollId,
          customerName: found.customerName,
          vehicleInfo: `${found.vehicleYear} ${found.vehicleMake} ${found.vehicleModel}`,
          installationDate: found.installationDate,
          expiryDate: found.expiryDate,
          coverageType: `${getProductLabel(found.productType)} - ${warrantyYears} Years`,
          installerName: found.installerName,
          productType: found.productType,
          status: isExpired ? "Expired" : "Active"
        });
        setError("");
        
        // Track warranty lookup with Meta Pixel
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('trackCustom', 'WarrantyLookup', {
            warranty_number: found.warrantyNumber,
            roll_id: found.rollId,
            status: isExpired ? "Expired" : "Active"
          });
        }
      } else {
        setWarrantyInfo(null);
        setError(
          searchType === "warranty"
            ? "Warranty number not found. Please check your warranty card and try again."
            : "Roll ID not found. This may not be a genuine D2W Defenza product."
        );
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Lookup Form */}
      <Card className="shadow-lg border-brand-royal-blue/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-brand-royal-blue rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(28,79,156,0.4)]">
            <Search className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-brand-primary">
            <span className="text-brand-gold">D2W</span> Defenza Warranty Lookup
          </CardTitle>
          <CardDescription className="text-lg">
            Enter your warranty number or PPF Roll ID to verify authenticity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Type Toggle */}
          <div className="flex justify-center gap-2 mb-4">
            <Button
              type="button"
              variant={searchType === "warranty" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSearchType("warranty");
                setSearchTerm("");
                setWarrantyInfo(null);
                setError("");
              }}
            >
              <Shield className="w-4 h-4 mr-2" />
              Warranty Number
            </Button>
            <Button
              type="button"
              variant={searchType === "roll" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSearchType("roll");
                setSearchTerm("");
                setWarrantyInfo(null);
                setError("");
              }}
            >
              <Package className="w-4 h-4 mr-2" />
              Roll ID
            </Button>
          </div>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="search-term" className="block text-sm font-medium text-brand-primary mb-2">
                {searchType === "warranty" ? "Warranty Number" : "PPF Roll ID"}
              </label>
              <Input
                id="search-term"
                placeholder={searchType === "warranty" ? "e.g., D2W-ABC123-XYZ" : "e.g., D2W-ROLL-ABC123"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                className="text-lg h-12 border-brand-royal-blue/30 focus:border-brand-royal-blue focus:ring-brand-royal-blue font-mono"
                onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
              />
            </div>
            <Button 
              onClick={handleLookup} 
              disabled={isLoading}
              className="h-12 px-8 bg-brand-royal-blue hover:bg-brand-royal-blue/90 shadow-[0_4px_14px_rgba(28,79,156,0.4)]"
            >
              {isLoading ? "Searching..." : "Verify"}
            </Button>
          </div>
          {error && (
            <div className="text-red-600 text-sm mt-2 p-3 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warranty Details */}
      {warrantyInfo && (
        <Card className="shadow-xl border-brand-royal-blue/30">
          <CardHeader className="bg-gradient-to-r from-brand-primary via-brand-royal-blue to-brand-primary text-white rounded-t-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-brand-gold" />
                <div>
                  <CardTitle className="text-2xl">
                    <span className="text-brand-gold">D2W</span> Defenza PPF Warranty
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    Digital Warranty Certificate
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(warrantyInfo.status)}`}>
                  {warrantyInfo.status}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {/* Authenticity Badge */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">✓ Genuine D2W Defenza Product</p>
                <p className="text-sm text-green-700">This PPF roll has been verified as authentic</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-brand-royal-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-primary">Customer Information</h3>
                    <p className="text-lg">{warrantyInfo.customerName}</p>
                    <p className="text-muted-foreground">{warrantyInfo.vehicleInfo}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-royal-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-primary">Installation Details</h3>
                    <p className="text-lg">{warrantyInfo.installerName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-brand-royal-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-primary">PPF Roll ID</h3>
                    <Badge variant="outline" className="font-mono text-sm">
                      {warrantyInfo.rollId}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-brand-royal-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-primary">Coverage Period</h3>
                    <p className="text-lg">{warrantyInfo.coverageType}</p>
                    <div className="text-muted-foreground">
                      <p>Installed: {new Date(warrantyInfo.installationDate).toLocaleDateString()}</p>
                      <p>Expires: {new Date(warrantyInfo.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-brand-gold mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-primary">Warranty Number</h3>
                    <p className="text-lg font-mono text-brand-royal-blue">{warrantyInfo.warrantyNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-brand-royal-blue/10 to-brand-gold/10 rounded-lg border border-brand-royal-blue/20">
              <p className="text-sm text-brand-primary">
                <strong className="text-brand-royal-blue">Note:</strong> This digital warranty certificate is valid for all warranty claims. 
                Please contact your installer or <span className="text-brand-gold font-semibold">D2W</span> Defenza authorized dealer for any warranty services.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WarrantyLookup;
