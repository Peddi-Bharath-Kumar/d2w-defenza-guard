import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addRole, getAllRoles, markDamage, restoreRole } from "@/api/roleApi";

export interface PPFRoll {
  rollId: string;
  batch: string;
  status: "available" | "used" | "damaged";
  quantity?: number;
}

interface RollInventoryProps {
  rolls: PPFRoll[];
  onRollsChange: (rolls: PPFRoll[]) => void;
}

const RollInventory = ({ rolls, onRollsChange }: RollInventoryProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [newRollData, setNewRollData] = useState({
    rollId: "",
    batch: "",
    quantity: "1",
  });

  const refreshRoles = async () => {
    try {
      const res = await getAllRoles();

      const formatted: PPFRoll[] = res.data.map((r: any) => ({
        rollId: r.roleid,
        batch: r.batch,
        status: r.status?.toLowerCase(),
        quantity: r.quantity,
      }));

      onRollsChange(formatted);
    } catch (error) {
      console.error("Error refreshing roles:", error);
      toast({
        title: "Error",
        description: "Failed to refresh inventory data",
        variant: "destructive",
      });
    }
  };

  const handleAddRoll = async () => {
    if (!newRollData.rollId.trim()) {
      toast({
        title: "Role ID is required",
        description: "Please enter a Role ID before adding inventory.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);

      await addRole({
        roleid: newRollData.rollId.trim(),
        batch: newRollData.batch.trim(),
        quantity: Number(newRollData.quantity),
      });

      await refreshRoles();

      toast({
        title: "Inventory Added",
        description: `Role ${newRollData.rollId} added successfully.`,
      });

      setNewRollData({
        rollId: "",
        batch: "",
        quantity: "1",
      });

      setShowAddForm(false);
    } catch (error: any) {
      console.error("Add role error:", error);
      toast({
        title: "Failed",
        description: error?.response?.data?.message || error?.response?.data || "Unable to add role",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (roleId: string, newStatus: "available" | "damaged") => {
    try {
      if (newStatus === "damaged") {
        await markDamage(roleId);
      } else {
        await restoreRole(roleId);
      }

      await refreshRoles();

      toast({
        title: "Status Updated",
        description: `Role ${roleId} changed to ${newStatus}.`,
      });
    } catch (error: any) {
      console.error("Status update error:", error);
      toast({
        title: "Failed",
        description: error?.response?.data?.message || error?.response?.data || "Unable to update status",
        variant: "destructive",
      });
    }
  };

  const filteredRolls = rolls.filter((roll) => {
    const matchesSearch =
      roll.rollId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (roll.batch || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || roll.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: PPFRoll["status"]) => {
    const variants: Record<PPFRoll["status"], "default" | "secondary" | "destructive" | "outline"> = {
      available: "default",
      used: "outline",
      damaged: "destructive",
    };

    const labels: Record<PPFRoll["status"], string> = {
      available: "Available",
      used: "Used",
      damaged: "Damaged",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const stats = {
    total: rolls.length,
    available: rolls.filter((r) => r.status === "available").length,
    used: rolls.filter((r) => r.status === "used").length,
    damaged: rolls.filter((r) => r.status === "damaged").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Roles</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.used}</p>
              <p className="text-xs text-muted-foreground">Used</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.damaged}</p>
              <p className="text-xs text-muted-foreground">Damaged</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Role Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                PPF Roll Inventory
              </CardTitle>
              <CardDescription>Manage your PPF role stock</CardDescription>
            </div>

            <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </Button>
          </div>
        </CardHeader>

        {showAddForm && (
          <CardContent className="border-t">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="rollId">Role ID *</Label>
                <Input
                  id="rollId"
                  value={newRollData.rollId}
                  onChange={(e) => setNewRollData((prev) => ({ ...prev, rollId: e.target.value }))}
                  placeholder="Enter Role ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch">Batch</Label>
                <Input
                  id="batch"
                  value={newRollData.batch}
                  onChange={(e) => setNewRollData((prev) => ({ ...prev, batch: e.target.value }))}
                  placeholder="e.g., Batch-001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newRollData.quantity}
                  onChange={(e) => setNewRollData((prev) => ({ ...prev, quantity: e.target.value }))}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={handleAddRoll} className="w-full" disabled={isSaving}>
                  {isSaving ? "Adding..." : "Add to Inventory"}
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Role ID or Batch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="damaged">Damaged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Roles Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Batch</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRolls.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      {rolls.length === 0 ? "No roles in inventory. Add one to get started." : "No roles match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredRolls.map((roll) => (
                    <tr key={roll.rollId} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4 font-mono text-xs font-medium">{roll.rollId}</td>
                      <td className="py-3 px-4 text-muted-foreground">{roll.batch}</td>
                      <td className="py-3 px-4">{getStatusBadge(roll.status)}</td>
                      <td className="py-3 px-4 text-muted-foreground">{roll.quantity ?? "-"}</td>
                      <td className="py-3 px-4">
                        {roll.status === "available" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(roll.rollId, "damaged")}
                            className="text-destructive hover:text-destructive"
                          >
                            Mark Damaged
                          </Button>
                        )}

                        {roll.status === "damaged" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(roll.rollId, "available")}
                          >
                            Restore
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RollInventory;