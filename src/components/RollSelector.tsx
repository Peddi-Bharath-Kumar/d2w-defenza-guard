import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, AlertCircle, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import { PPFRoll } from "@/components/RollInventory";
import { cn } from "@/lib/utils";

interface RollSelectorProps {
  rolls: PPFRoll[];
  value: string;
  onChange: (rollId: string) => void;
  validation: { valid: boolean; message: string } | null;
}

const RollSelector = ({ rolls, value, onChange, validation }: RollSelectorProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const availableRolls = rolls.filter(r => r.status === "available");
  const matchedRoll = availableRolls.find(r => r.rollId === value.trim());
  const notInInventory = value.trim() !== "" && !rolls.some(r => r.rollId === value.trim());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
        {/* Manual Entry */}
        <div className="space-y-1">
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

        {/* Quick Select Dropdown */}
        <div className="space-y-1 relative" ref={dropdownRef}>
          <Label className="text-xs text-muted-foreground">Quick Select</Label>
          <button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "hover:bg-accent/50 transition-colors",
              matchedRoll && "border-primary/50"
            )}
          >
            <span className={cn("truncate", matchedRoll ? "text-foreground font-mono" : "text-muted-foreground")}>
              {matchedRoll ? `${matchedRoll.rollId} (${matchedRoll.batchNumber})` : "Select a roll…"}
            </span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
          </button>

          {open && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
              <div className="max-h-[160px] overflow-y-auto p-1">
                {availableRolls.length === 0 ? (
                  <p className="text-xs text-muted-foreground p-3 text-center">No rolls available</p>
                ) : (
                  availableRolls.map(roll => (
                    <button
                      key={roll.id}
                      type="button"
                      onClick={() => { onChange(roll.rollId); setOpen(false); }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded-sm transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
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
          )}
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
