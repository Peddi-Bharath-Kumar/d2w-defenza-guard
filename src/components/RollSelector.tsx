import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { PPFRoll } from "@/components/RollInventory";

interface RollSelectorProps {
  rolls: PPFRoll[];
  value: string;
  onChange: (rollId: string) => void;
  validation: { valid: boolean; message: string } | null;
}

const RollSelector = ({ rolls, value, onChange, validation }: RollSelectorProps) => {
  const [mode, setMode] = useState<"quick" | "manual">("quick");
  const availableRolls = rolls.filter(r => r.status === "available");

  const manualMatchesAvailable = value.trim() !== "" && availableRolls.some(r => r.rollId === value.trim());
  const manualNotInInventory = value.trim() !== "" && !rolls.some(r => r.rollId === value.trim());

  return (
    <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Package className="w-4 h-4 text-primary" />
          PPF Roll Identification (Anti-Fraud)
        </h3>
        <Badge variant="outline" className="text-xs">
          Available Rolls: {availableRolls.length}
        </Badge>
      </div>

      {/* Mode Toggle */}
      <RadioGroup
        value={mode}
        onValueChange={(v) => setMode(v as "quick" | "manual")}
        className="flex gap-6"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="quick" id="mode-quick" />
          <Label htmlFor="mode-quick" className="cursor-pointer text-sm font-medium">
            Select from Available Rolls
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="manual" id="mode-manual" />
          <Label htmlFor="mode-manual" className="cursor-pointer text-sm font-medium">
            Enter Manually
          </Label>
        </div>
      </RadioGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Select */}
        <div className="space-y-2">
          <Label>Quick Select Available Roll</Label>
          <Select
            value={availableRolls.some(r => r.rollId === value) ? value : ""}
            onValueChange={(v) => {
              onChange(v);
              setMode("quick");
            }}
            disabled={mode === "manual" && !manualMatchesAvailable}
          >
            <SelectTrigger className={value && manualMatchesAvailable ? "border-green-500" : ""}>
              <SelectValue placeholder={`${availableRolls.length} rolls available`} />
            </SelectTrigger>
            <SelectContent>
              {availableRolls.length === 0 ? (
                <SelectItem value="none" disabled>No rolls available</SelectItem>
              ) : (
                availableRolls.map(roll => (
                  <SelectItem key={roll.id} value={roll.rollId}>
                    {roll.rollId} ({roll.batchNumber})
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {mode === "quick" && availableRolls.length === 0 && (
            <p className="text-xs text-muted-foreground">Add rolls in the Roll Inventory tab first.</p>
          )}
        </div>

        {/* Manual Entry */}
        <div className="space-y-2">
          <Label htmlFor="rollId-manual">PPF Roll ID * (Manual Entry)</Label>
          <Input
            id="rollId-manual"
            value={value}
            onChange={(e) => {
              onChange(e.target.value.toUpperCase());
              setMode("manual");
            }}
            placeholder="Enter Roll ID manually"
            required
            className={
              validation
                ? validation.valid
                  ? "border-green-500"
                  : "border-destructive"
                : ""
            }
          />
        </div>
      </div>

      {/* Feedback Messages */}
      {validation && (
        <div className={`flex items-center gap-2 text-sm ${validation.valid ? "text-green-600" : "text-destructive"}`}>
          {validation.valid ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {validation.message}
        </div>
      )}

      {mode === "manual" && manualNotInInventory && value.trim() !== "" && (
        <div className="flex items-center gap-2 text-sm text-amber-600">
          <AlertTriangle className="w-4 h-4" />
          This Roll ID is not in available inventory
        </div>
      )}

      {mode === "manual" && manualMatchesAvailable && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle2 className="w-4 h-4" />
          Roll ID matched with available inventory — auto-selected
        </div>
      )}
    </div>
  );
};

export default RollSelector;
