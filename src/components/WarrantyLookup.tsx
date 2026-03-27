import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Shield, Calendar, MapPin, User, CheckCircle2 } from "lucide-react";
import { findWarrantyByWarrantyId } from "@/api/WarrantyLookup";

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

const WarrantyLookup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [warrantyInfo, setWarrantyInfo] = useState<WarrantyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getProductLabel = (type: string) => {
    const labels: Record<string, string> = {
      "ppf-full": "Full Body PPF",
      "ppf-front": "Front End PPF",
      "ppf-partial": "Partial PPF",
      ceramic: "Ceramic Coating",
      combo: "PPF + Ceramic Combo",
    };
    return labels[type] || type;
  };

  const handleLookup = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a warranty number");
      setWarrantyInfo(null);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setWarrantyInfo(null);

      const res = await findWarrantyByWarrantyId(searchTerm.trim().toUpperCase());
      const data = res.data;

      const isExpired = new Date(data.expiryDate) < new Date();

      setWarrantyInfo({
        warrantyNumber: data.warrantyId,
        rollId: data.roleId,
        customerName: data.customerName,
        vehicleInfo: `${data.year} ${data.make} ${data.model}`,
        installationDate: data.installationDate,
        expiryDate: data.expiryDate,
        coverageType: `${getProductLabel(data.productType)} - ${data.warrantyPeriod}`,
        installerName: data.installerName,
        productType: data.productType,
        status: isExpired ? "Expired" : "Active",
      });
    } catch (error: any) {
      console.error("Warranty lookup error:", error);
      setWarrantyInfo(null);
      setError(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Warranty number not found. Please check your warranty card and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="shadow-lg border-brand-royal-blue/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-brand-royal-blue rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(28,79,156,0.4)]">
            <Search className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-brand-primary">
            <span className="text-brand-gold">D2W</span> Defenza E-Warranty Lookup
          </CardTitle>
          <CardDescription className="text-lg">
            Enter your warranty number to verify and view your PPF e-warranty certificate
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="search-term" className="block text-sm font-medium text-brand-primary mb-2">
                Warranty Number
              </label>
              <Input
                id="search-term"
                placeholder="e.g., D2W-00001"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                className="text-lg h-12 border-brand-royal-blue/30 focus:border-brand-royal-blue focus:ring-brand-royal-blue font-mono"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLookup();
                }}
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
                {warrantyInfo.status === "Active" ? (
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-green-500/20 text-green-300 border border-green-400/30">
                    <CheckCircle2 className="w-4 h-4" />
                    Active
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-red-500/20 text-red-300 border border-red-400/30">
                    Expired
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <div className="p-5 bg-green-50 border-2 border-green-300 rounded-xl flex items-center gap-4 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-green-800 text-lg">✓ Genuine D2W Defenza Product</p>
                <p className="text-sm text-green-700">This PPF roll has been verified as authentic</p>
              </div>
            </div>

            <div className="text-center p-5 rounded-xl bg-gradient-to-r from-brand-royal-blue/5 via-brand-gold/5 to-brand-royal-blue/5 border border-brand-royal-blue/20">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Warranty Number</p>
              <p className="text-2xl font-bold font-mono text-brand-royal-blue tracking-wide">
                {warrantyInfo.warrantyNumber}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border bg-muted/30 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-5 w-5 text-brand-royal-blue" />
                  <h3 className="font-bold text-brand-primary text-sm uppercase tracking-wide">Customer</h3>
                </div>
                <p className="text-lg font-semibold">{warrantyInfo.customerName}</p>
                <p className="text-muted-foreground">{warrantyInfo.vehicleInfo}</p>
              </div>

              <div className="p-5 rounded-xl border border-border bg-muted/30 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-brand-royal-blue" />
                  <h3 className="font-bold text-brand-primary text-sm uppercase tracking-wide">Installer</h3>
                </div>
                <p className="text-lg font-semibold">{warrantyInfo.installerName}</p>
              </div>

              <div className="p-5 rounded-xl border border-border bg-muted/30 space-y-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-brand-royal-blue" />
                  <h3 className="font-bold text-brand-primary text-sm uppercase tracking-wide">Coverage Period</h3>
                </div>
                <p className="text-lg font-semibold">{warrantyInfo.coverageType}</p>
                <div className="flex gap-6 text-muted-foreground text-sm mt-1 flex-wrap">
                  <p>
                    Installed:{" "}
                    <span className="font-medium text-foreground">
                      {new Date(warrantyInfo.installationDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Expires:{" "}
                    <span className="font-medium text-foreground">
                      {new Date(warrantyInfo.expiryDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-brand-royal-blue/10 to-brand-gold/10 rounded-lg border border-brand-royal-blue/20">
              <p className="text-sm text-brand-primary">
                <strong className="text-brand-royal-blue">Note:</strong> This digital warranty certificate is valid for
                all warranty claims. Please contact your installer or{" "}
                <span className="text-brand-gold font-semibold">D2W</span> Defenza authorized dealer for any warranty
                services.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WarrantyLookup;