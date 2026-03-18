import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { PPFRoll } from "@/components/RollInventory";
import { cn } from "@/lib/utils";

interface RollSelectorProps {
  rolls: PPFRoll[];
  value: string;
  onChange: (rollId: string) => void;
  validation: { valid: boolean; message: string } | null;
}

const RollSelector = ({ rolls, value, onChange, validation }: RollSelectorProps) => {
  const availableRolls = rolls.filter(r => r.status === "available");
  const matchedRoll = availableRolls.find(r => r.rollId === value.trim());
  const notInInventory = value.trim() !== "" && !rolls.some(r => r.rollId === value.trim());

  return (
    <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Package className="w-4 h-4 text-primary" />
          PPF Roll ID *
        </Label>
        <Badge variant="outline" className="text-xs">
          Available Rolls: {availableRolls.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Manual Entry - Primary */}
        <div className="space-y-2">
          <Label htmlFor="rollId-manual" className="text-xs text-muted-foreground">Enter Roll ID</Label>
          <Input
            id="rollId-manual"
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            placeholder="Enter Roll ID"
            required
            className={cn(
              validation
                ? validation.valid ? "border-green-500" : "border-destructive"
                : ""
            )}
          />
        </div>

        {/* Quick Select - Secondary */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Quick Select Available Roll</Label>
          <div className="border rounded-md max-h-[120px] overflow-y-auto bg-background">
            {availableRolls.length === 0 ? (
              <p className="text-xs text-muted-foreground p-3 text-center">No rolls available. Add rolls in inventory first.</p>
            ) : (
              availableRolls.map(roll => (
                <button
                  key={roll.id}
                  type="button"
                  onClick={() => onChange(roll.rollId)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm transition-colors hover:bg-accent",
                    matchedRoll?.id === roll.id && "bg-primary/10 font-medium text-primary"
                  )}
                >
                  <span className="font-mono">{roll.rollId}</span>
                  <span className="text-muted-foreground ml-2 text-xs">({roll.batchNumber})</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {validation && (
        <div className={cn("flex items-center gap-2 text-sm", validation.valid ? "text-green-600" : "text-destructive")}>
          {validation.valid ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {validation.message}
        </div>
      )}

      {notInInventory && !validation && (
        <div className="flex items-center gap-2 text-sm text-amber-600">
          <AlertTriangle className="w-4 h-4" />
          This Roll ID is not in available inventory
        </div>
      )}

      {matchedRoll && !validation && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle2 className="w-4 h-4" />
          Roll ID matched with available inventory
        </div>
      )}
    </div>
  );
};

export default RollSelector;
