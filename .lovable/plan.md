

## Improve Warranty Certificate Display

### Changes to `src/components/WarrantyLookup.tsx`

**1. Remove PPF Roll ID section** (lines 225-233) — hide this from the customer-facing certificate since it's internal tracking info.

**2. Enhance the certificate visual design:**
- Make the authenticity badge more prominent with a larger icon, bolder styling, and a subtle animation/glow effect
- Add better spacing and visual hierarchy to the warranty details
- Make the warranty number more prominent as the key identifier
- Add a subtle card border/shadow to each info section for better readability
- Improve the status badge with an icon (checkmark for Active, X for Expired)
- Add a decorative header/watermark feel to make it look like a proper certificate

**3. Improve typography and layout:**
- Larger, bolder section headers
- Better contrast for data values
- More polished grid layout with subtle background cards for each section

### No other files need changes.

