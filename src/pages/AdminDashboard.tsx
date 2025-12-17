import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, LogOut, Plus, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WarrantyRecord {
  id: string;
  warrantyNumber: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vinNumber: string;
  productType: string;
  installerName: string;
  installationDate: string;
  expiryDate: string;
  notes: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [warranties, setWarranties] = useState<WarrantyRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vinNumber: "",
    productType: "",
    installerName: "",
    installationDate: "",
    warrantyYears: "5",
    notes: "",
  });

  useEffect(() => {
    // Check if logged in
    if (localStorage.getItem("adminLoggedIn") !== "true") {
      navigate("/admin");
      return;
    }

    // Load existing warranties from localStorage
    const saved = localStorage.getItem("warrantyRecords");
    if (saved) {
      setWarranties(JSON.parse(saved));
    }
  }, [navigate]);

  const generateWarrantyNumber = () => {
    const prefix = "D2W";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const installDate = new Date(formData.installationDate);
    const expiryDate = new Date(installDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + parseInt(formData.warrantyYears));

    const newWarranty: WarrantyRecord = {
      id: Date.now().toString(),
      warrantyNumber: generateWarrantyNumber(),
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      vehicleMake: formData.vehicleMake,
      vehicleModel: formData.vehicleModel,
      vehicleYear: formData.vehicleYear,
      vinNumber: formData.vinNumber,
      productType: formData.productType,
      installerName: formData.installerName,
      installationDate: formData.installationDate,
      expiryDate: expiryDate.toISOString().split("T")[0],
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    const updatedWarranties = [...warranties, newWarranty];
    setWarranties(updatedWarranties);
    localStorage.setItem("warrantyRecords", JSON.stringify(updatedWarranties));

    toast({
      title: "Warranty Created",
      description: `Warranty ${newWarranty.warrantyNumber} has been created successfully.`,
    });

    // Reset form
    setFormData({
      customerName: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vinNumber: "",
      productType: "",
      installerName: "",
      installationDate: "",
      warrantyYears: "5",
      notes: "",
    });

    setIsSubmitting(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-bold text-foreground">D2W Defenza Admin</h1>
              <p className="text-xs text-muted-foreground">Warranty Management System</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{warranties.length}</p>
                  <p className="text-sm text-muted-foreground">Total Warranties</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {warranties.filter((w) => new Date(w.expiryDate) > new Date()).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Warranties</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <Plus className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {warranties.filter((w) => {
                      const created = new Date(w.createdAt);
                      const now = new Date();
                      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Warranty Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Warranty
            </CardTitle>
            <CardDescription>Fill in the details to register a new PPF warranty</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleMake">Make *</Label>
                    <Input
                      id="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                      placeholder="Mercedes-Benz"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleModel">Model *</Label>
                    <Input
                      id="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                      placeholder="S-Class"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleYear">Year *</Label>
                    <Input
                      id="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                      placeholder="2024"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vinNumber">VIN Number</Label>
                    <Input
                      id="vinNumber"
                      value={formData.vinNumber}
                      onChange={(e) => handleInputChange("vinNumber", e.target.value)}
                      placeholder="Vehicle identification"
                    />
                  </div>
                </div>
              </div>

              {/* Installation Details */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Installation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productType">Product Type *</Label>
                    <Select
                      value={formData.productType}
                      onValueChange={(value) => handleInputChange("productType", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ppf-full">Full Body PPF</SelectItem>
                        <SelectItem value="ppf-front">Front End PPF</SelectItem>
                        <SelectItem value="ppf-partial">Partial PPF</SelectItem>
                        <SelectItem value="ceramic">Ceramic Coating</SelectItem>
                        <SelectItem value="combo">PPF + Ceramic Combo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="installerName">Installer Name *</Label>
                    <Input
                      id="installerName"
                      value={formData.installerName}
                      onChange={(e) => handleInputChange("installerName", e.target.value)}
                      placeholder="Installer/Shop name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="installationDate">Installation Date *</Label>
                    <Input
                      id="installationDate"
                      type="date"
                      value={formData.installationDate}
                      onChange={(e) => handleInputChange("installationDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warrantyYears">Warranty Period</Label>
                    <Select
                      value={formData.warrantyYears}
                      onValueChange={(value) => handleInputChange("warrantyYears", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Years</SelectItem>
                        <SelectItem value="5">5 Years</SelectItem>
                        <SelectItem value="7">7 Years</SelectItem>
                        <SelectItem value="10">10 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional information..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Creating Warranty..." : "Create Warranty"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Warranties */}
        {warranties.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Warranties</CardTitle>
              <CardDescription>Latest warranty registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Warranty #</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Vehicle</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Product</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Expires</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warranties.slice(-10).reverse().map((warranty) => (
                      <tr key={warranty.id} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-3 px-2 font-mono text-xs">{warranty.warrantyNumber}</td>
                        <td className="py-3 px-2">{warranty.customerName}</td>
                        <td className="py-3 px-2">
                          {warranty.vehicleYear} {warranty.vehicleMake} {warranty.vehicleModel}
                        </td>
                        <td className="py-3 px-2 capitalize">{warranty.productType.replace("-", " ")}</td>
                        <td className="py-3 px-2">{warranty.expiryDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
