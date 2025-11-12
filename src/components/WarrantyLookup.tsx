import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Shield, Calendar, MapPin, User } from "lucide-react";

interface WarrantyInfo {
  warrantyNumber: string;
  customerName: string;
  vehicleInfo: string;
  installationDate: string;
  expiryDate: string;
  coverageType: string;
  installerName: string;
  location: string;
  status: "Active" | "Expired" | "Invalid";
}

const WarrantyLookup = () => {
  const [warrantyNumber, setWarrantyNumber] = useState("");
  const [warrantyInfo, setWarrantyInfo] = useState<WarrantyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock warranty data for demonstration
  const mockWarrantyData: Record<string, WarrantyInfo> = {
    "D2W123456": {
      warrantyNumber: "D2W123456",
      customerName: "John Smith",
      vehicleInfo: "2023 BMW X5 - Black",
      installationDate: "2024-03-15",
      expiryDate: "2029-03-15",
      coverageType: "Full Coverage - 5 Years",
      installerName: "Premium Auto Detailing",
      location: "Mumbai, Maharashtra",
      status: "Active"
    },
    "D2W789012": {
      warrantyNumber: "D2W789012",
      customerName: "Sarah Johnson",
      vehicleInfo: "2022 Audi A4 - White",
      installationDate: "2024-01-20",
      expiryDate: "2029-01-20",
      coverageType: "Full Coverage - 5 Years",
      installerName: "Elite Car Care",
      location: "Delhi, India",
      status: "Active"
    }
  };

  const handleLookup = async () => {
    if (!warrantyNumber.trim()) {
      setError("Please enter a warranty number");
      return;
    }

    setIsLoading(true);
    setError("");
    
    // Simulate API call delay
    setTimeout(() => {
      const warranty = mockWarrantyData[warrantyNumber.toUpperCase()];
      if (warranty) {
        setWarrantyInfo(warranty);
        setError("");
        
        // Track warranty lookup with Meta Pixel
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('trackCustom', 'WarrantyLookup', {
            warranty_number: warrantyNumber,
            status: warranty.status
          });
        }
      } else {
        setWarrantyInfo(null);
        setError("Warranty number not found. Please check your warranty card and try again.");
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
            Enter your warranty number to check your PPF coverage details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="warranty-number" className="block text-sm font-medium text-brand-primary mb-2">
                Warranty Number
              </label>
              <Input
                id="warranty-number"
                placeholder="Enter warranty number (e.g., D2W123456)"
                value={warrantyNumber}
                onChange={(e) => setWarrantyNumber(e.target.value)}
                className="text-lg h-12 border-brand-royal-blue/30 focus:border-brand-royal-blue focus:ring-brand-royal-blue"
                onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
              />
            </div>
            <Button 
              onClick={handleLookup} 
              disabled={isLoading}
              className="h-12 px-8 bg-brand-royal-blue hover:bg-brand-royal-blue/90 shadow-[0_4px_14px_rgba(28,79,156,0.4)]"
            >
              {isLoading ? "Searching..." : "Search"}
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
            <div className="flex items-center justify-between">
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
              <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(warrantyInfo.status)}`}>
                {warrantyInfo.status}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
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
                    <p className="text-muted-foreground">{warrantyInfo.location}</p>
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