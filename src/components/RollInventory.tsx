import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface PPFRoll {
  id: string;
  rollId: string;
  batchNumber: string;
  status: "available" | "assigned" | "used" | "damaged";
  assignedToInstaller: string | null;
  assignedDate: string | null;
  createdAt: string;
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
  const [newRollData, setNewRollData] = useState({
    rollId: "",
    batchNumber: "",
    quantity: "1",
  });


  const handleAddRolls = () => {
    const quantity = parseInt(newRollData.quantity) || 1;
    const newRolls: PPFRoll[] = [];

    for (let i = 0; i < quantity; i++) {
      const rollId = newRollData.rollId 
        ? (quantity > 1 ? `${newRollData.rollId}-${i + 1}` : newRollData.rollId)
        : generateRollId(i);

      // Check if roll ID already exists
      if (rolls.some(r => r.rollId === rollId)) {
        toast({
          title: "Duplicate Roll ID",
          description: `Roll ID ${rollId} already exists.`,
          variant: "destructive",
        });
        return;
      }

      newRolls.push({
        id: `${Date.now()}-${i}`,
        rollId,
        batchNumber: newRollData.batchNumber || `BATCH-${new Date().toISOString().split('T')[0]}`,
        status: "available",
        assignedToInstaller: null,
        assignedDate: null,
        createdAt: new Date().toISOString(),
      });
    }

    const updatedRolls = [...rolls, ...newRolls];
    onRollsChange(updatedRolls);

    toast({
      title: "Rolls Added",
      description: `Successfully added ${quantity} roll(s) to inventory.`,
    });

    setNewRollData({ rollId: "", batchNumber: "", quantity: "1" });
    setShowAddForm(false);
  };

  const handleStatusChange = (rollId: string, newStatus: PPFRoll["status"]) => {
    const updatedRolls = rolls.map(roll => 
      roll.rollId === rollId 
        ? { ...roll, status: newStatus }
        : roll
    );
    onRollsChange(updatedRolls);
    toast({
      title: "Status Updated",
      description: `Roll ${rollId} status changed to ${newStatus}.`,
    });
  };

  const filteredRolls = rolls.filter(roll => {
    const matchesSearch = roll.rollId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roll.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || roll.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: PPFRoll["status"]) => {
    const variants: Record<PPFRoll["status"], "default" | "secondary" | "destructive" | "outline"> = {
      available: "default",
      assigned: "secondary",
      used: "outline",
      damaged: "destructive",
    };
    const labels: Record<PPFRoll["status"], string> = {
      available: "Available",
      assigned: "Assigned",
      used: "Used",
      damaged: "Damaged",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const stats = {
    total: rolls.length,
    available: rolls.filter(r => r.status === "available").length,
    assigned: rolls.filter(r => r.status === "assigned").length,
    used: rolls.filter(r => r.status === "used").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Rolls</p>
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
              <p className="text-2xl font-bold text-amber-600">{stats.assigned}</p>
              <p className="text-xs text-muted-foreground">Assigned</p>
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
      </div>

      {/* Add Roll Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                PPF Roll Inventory
              </CardTitle>
              <CardDescription>Manage your PPF roll stock</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Rolls
            </Button>
          </div>
        </CardHeader>
        
        {showAddForm && (
          <CardContent className="border-t">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="rollId">Roll ID (optional)</Label>
                <Input
                  id="rollId"
                  value={newRollData.rollId}
                  onChange={(e) => setNewRollData(prev => ({ ...prev, rollId: e.target.value }))}
                  placeholder="Auto-generated if empty"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchNumber">Batch Number</Label>
                <Input
                  id="batchNumber"
                  value={newRollData.batchNumber}
                  onChange={(e) => setNewRollData(prev => ({ ...prev, batchNumber: e.target.value }))}
                  placeholder="e.g., BATCH-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="100"
                  value={newRollData.quantity}
                  onChange={(e) => setNewRollData(prev => ({ ...prev, quantity: e.target.value }))}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddRolls} className="w-full">
                  Add to Inventory
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
            placeholder="Search by Roll ID or Batch..."
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
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="damaged">Damaged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rolls Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Roll ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Batch</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Assigned To</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Added</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRolls.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      {rolls.length === 0 ? "No rolls in inventory. Add some to get started." : "No rolls match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredRolls.map((roll) => (
                    <tr key={roll.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4 font-mono text-xs font-medium">{roll.rollId}</td>
                      <td className="py-3 px-4 text-muted-foreground">{roll.batchNumber}</td>
                      <td className="py-3 px-4">{getStatusBadge(roll.status)}</td>
                      <td className="py-3 px-4">{roll.assignedToInstaller || "-"}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(roll.createdAt).toLocaleDateString()}
                      </td>
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
