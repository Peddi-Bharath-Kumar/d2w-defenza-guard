import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, LogOut, Plus, FileText, Users, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RollInventory, { PPFRoll } from "@/components/RollInventory";
import RollSelector from "@/components/RollSelector";
import { getAllRoles } from "@/api/roleApi";
import { getAllWarranties, createWarranty } from "@/api/warrantyApi";

interface WarrantyRecord {
  id: string;
  warrantyNumber: string;
  rollId: string;
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

  const loggedInAdminData = localStorage.getItem("loggedInAdmin");
  const loggedInAdmin = loggedInAdminData ? JSON.parse(loggedInAdminData) : null;
  const userRole = loggedInAdmin?.desgination?.toUpperCase();
  const isOwner = userRole === "OWNER";

  const [warranties, setWarranties] = useState<WarrantyRecord[]>([]);
  const [rolls, setRolls] = useState<PPFRoll[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rollValidation, setRollValidation] = useState<{ valid: boolean; message: string } | null>(null);

  const [formData, setFormData] = useState({
    rollId: "",
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

  const formatRoles = (data: any[]): PPFRoll[] => {
    return data.map((r: any) => ({
      rollId: r.roleid,
      batch: r.batch,
      status: r.status?.toLowerCase(),
      quantity: r.quantity,
    }));
  };

 const formatWarranties = (data: any[]): WarrantyRecord[] => {
  return data.map((w: any) => ({
    id: String(w.id),
    warrantyNumber: w.warrantyId || `WR-${w.id}`,
    rollId: w.roleId,
    customerName: w.customerName,
    email: w.customerEmail,
    phone: "",
    vehicleMake: w.make,
    vehicleModel: w.model,
    vehicleYear: String(w.year),
    vinNumber: w.vinNumber,
    productType: w.productType,
    installerName: w.installerName,
    installationDate: w.installationDate,
    expiryDate: w.expiryDate,
    notes: "",
    createdAt: w.installationDate,
  }));
};


  const loadRoles = async () => {
    const roleRes = await getAllRoles();
    setRolls(formatRoles(roleRes.data));
  };

  const loadWarranties = async () => {
    const warrantyRes = await getAllWarranties();
    setWarranties(formatWarranties(warrantyRes.data));
  };

  useEffect(() => {
    const checkLoginAndLoadData = async () => {
      const storedAdmin = localStorage.getItem("loggedInAdmin");

      if (!storedAdmin) {
        navigate("/admin");
        return;
      }

      try {
        await loadRoles();
        await loadWarranties();
      } catch (error) {
        console.error("Dashboard load error:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      }
    };

    checkLoginAndLoadData();
  }, [navigate, toast]);

  useEffect(() => {
    if (!formData.rollId.trim()) {
      setRollValidation(null);
      return;
    }

    const roll = rolls.find((r) => r.rollId === formData.rollId.trim());

    if (!roll) {
      setRollValidation({ valid: false, message: "Roll ID not found in inventory" });
    } else if (roll.status === "used") {
      setRollValidation({ valid: false, message: "This roll has already been used for a warranty" });
    } else if (roll.status === "damaged") {
      setRollValidation({ valid: false, message: "This roll is marked as damaged" });
    } else {
      setRollValidation({ valid: true, message: "Valid roll - ready for warranty registration" });
    }
  }, [formData.rollId, rolls]);

  const handleRollsChange = (newRolls: PPFRoll[]) => {
    setRolls(newRolls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rollValidation?.valid) {
      toast({
        title: "Invalid Roll ID",
        description: rollValidation?.message || "Please enter a valid PPF Roll ID",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await createWarranty({
        roleId: formData.rollId.trim(),
        customerName: formData.customerName,
        customerEmail: formData.email,
        make: formData.vehicleMake,
        model: formData.vehicleModel,
        year: Number(formData.vehicleYear) || new Date().getFullYear(),
        vinNumber: formData.vinNumber,
        productType: formData.productType,
        installerName: formData.installerName,
        installationDate: formData.installationDate,
        warrantyPeriod: `${formData.warrantyYears} Years`,
      });

      await loadWarranties();
      await loadRoles();

      toast({
        title: "Warranty Created",
        description: `Warranty created successfully for Roll ${formData.rollId}`,
      });

      setFormData({
        rollId: "",
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

      setRollValidation(null);
    } catch (error: any) {
      console.error("Create warranty error:", error);
      toast({
        title: "Failed",
        description: error?.response?.data?.message || error?.response?.data || "Unable to create warranty",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const availableRolls = rolls.filter((r) => r.status === "available");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-bold text-foreground">D2W Defenza Admin</h1>
              <p className="text-xs text-muted-foreground">
                {isOwner ? "OWNER - Full Access" : "ADMIN - Warranty Access Only"}
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="warranties" className="space-y-6">
          <TabsList className={`grid w-full ${isOwner ? "max-w-md grid-cols-2" : "max-w-xs grid-cols-1"}`}>
            <TabsTrigger value="warranties" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Warranties
            </TabsTrigger>

            {isOwner && (
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Roll Inventory
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="warranties" className="space-y-6">
            <div className={`grid grid-cols-1 gap-4 ${isOwner ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
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

              {isOwner && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-lg">
                        <Package className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{availableRolls.length}</p>
                        <p className="text-sm text-muted-foreground">Available Rolls</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Plus className="w-6 h-6 text-blue-500" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Register New Warranty
                </CardTitle>
                <CardDescription>Link a PPF roll to a customer warranty</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <RollSelector
                    rolls={rolls}
                    value={formData.rollId}
                    onChange={(rollId) => handleInputChange("rollId", rollId)}
                    validation={rollValidation}
                  />

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

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4">Installation Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="productType">Product Type *</Label>
                        <Select
                          value={formData.productType}
                          onValueChange={(value) => handleInputChange("productType", value)}
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

                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting || !rollValidation?.valid}>
                    {isSubmitting ? "Creating Warranty..." : "Create Warranty"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {warranties.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Warranties</CardTitle>
                  <CardDescription>Latest warranty registrations with roll tracking</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Warranty #</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Roll ID</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Vehicle</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Product</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Expires</th>
                        </tr>
                      </thead>
                      <tbody>
                        {warranties.slice().reverse().map((warranty) => (
                          <tr key={warranty.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-2 font-mono text-xs">{warranty.warrantyNumber}</td>
                            <td className="py-3 px-2">
                              <Badge variant="outline" className="font-mono text-xs">
                                {warranty.rollId}
                              </Badge>
                            </td>
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
          </TabsContent>

          {isOwner && (
            <TabsContent value="inventory">
              <RollInventory rolls={rolls} onRollsChange={handleRollsChange} />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;