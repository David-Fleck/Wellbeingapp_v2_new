# 🔍 DESIGN SYSTEM COMPLIANCE AUDIT PROTOCOL

**Trigger Command:** "Run Design System Audit"

**Last Updated:** 2025-11-21  
**Version:** 1.0.0  
**Audit Type:** Full Compliance Check

---

## 📋 AUDIT OBJECTIVES

Verify complete synchronization and compliance across all design system touchpoints:

1. **Source of Truth**: `/styles/globals.css` (all CSS variables/tokens)
2. **Visual Documentation**: Design System & Component Library page (`/App.tsx`)
3. **Implementation**: All application screens and components
4. **Code Examples**: Code preview pop-ups (</> View Code features)

**Goal:** Ensure 100% synchronization - no discrepancies between token definitions, documentation, and implementation.

---

## 🎯 AUDIT SCOPE

### 1. TOKEN VERIFICATION

**Objective:** Verify ALL tokens from `globals.css` are properly documented and used consistently.

#### Token Categories to Audit:

**Colors** (`--color-*`)
- Primary, secondary, tertiary colors
- Neutral/gray scales
- Semantic colors (success, warning, error, info)
- State colors (hover, active, disabled)
- Background colors
- Surface colors
- Text colors
- Border colors

**Spacing** (`--spacing-*`)
- All spacing scale values (xs, sm, md, lg, xl, 2xl, 3xl, etc.)
- Padding patterns
- Margin patterns
- Gap patterns

**Typography** (`--font-*`, `--text-*`, `--line-height-*`)
- Font families
- Font sizes
- Font weights
- Line heights
- Letter spacing
- Text transforms

**Shadows** (`--shadow-*`)
- Elevation levels (sm, md, lg, xl)
- Component-specific shadows
- Colored shadows

**Border Radius** (`--radius-*`)
- All radius scales
- Component-specific radius values

**Z-Index** (`--z-*`)
- Layer hierarchy
- Modal/overlay levels
- Dropdown/tooltip levels

**Transitions** (`--transition-*`)
- Duration values
- Easing functions
- Complete transition patterns

**Icon Sizes** (`--icon-size-*`)
- All icon size scales

**Container Widths** (`--container-*`)
- Breakpoint-specific widths
- Max-width values

**Other Variables**
- Opacity values
- Border widths
- Custom properties

#### Verification Checklist per Token:
- ✅ Defined in `globals.css`
- ✅ Documented on Design System page with visual example
- ✅ Used consistently in components (no hardcoded alternatives)
- ✅ Shown in code examples where applicable

---

### 2. HARDCODED VALUES DETECTION

**Objective:** Identify all hardcoded values that violate the design system.

#### Scan ALL Files For:

**❌ CRITICAL VIOLATIONS:**
- **Hardcoded Colors:** `#FF0000`, `rgb(255, 0, 0)`, `hsl(0, 100%, 50%)`
- **Hardcoded Pixels:** `16px`, `24px`, `32px` (should use `--spacing-*`)
- **Hardcoded Timing:** `0.3s`, `300ms`, `ease-in-out` (should use `--transition-*`)
- **Hardcoded Opacity:** `0.5`, `0.8` (should use opacity variables)
- **Hardcoded Shadows:** Box-shadow values not using variables
- **Hardcoded Borders:** Border values not using variables
- **Hardcoded Z-Index:** Raw numbers like `999`, `1000`

**✅ ALLOWED EXCEPTIONS:**
- `0`, `0px` (zero values are universal)
- `100%` (full width/height)
- `1` (multiplier/scale values)
- `-1` (negative multipliers)
- Values inside `/styles/globals.css` itself (definitions)
- Third-party library defaults (document as "external")
- Browser-specific resets (document as "reset")

#### Files to Scan:
- `/components/**/*.tsx` (all components)
- `/App.tsx` (main application)
- `/styles/*.css` (additional stylesheets)
- Inline `style={{}}` attributes
- `className` strings with Tailwind utilities

#### Detection Pattern Examples:
```typescript
// ❌ VIOLATIONS:
style={{ padding: "16px" }}              // Use var(--spacing-md)
style={{ color: "#6200EE" }}              // Use var(--color-primary)
style={{ transition: "all 0.3s ease" }}   // Use var(--transition-base)
className="p-4"                            // Hardcoded Tailwind
className="text-blue-600"                  // Hardcoded Tailwind

// ✅ CORRECT:
style={{ padding: "var(--spacing-md)" }}
style={{ color: "var(--color-primary)" }}
style={{ transition: "var(--transition-base)" }}
className="p-[var(--spacing-md)]"
className="text-[var(--color-primary)]"
```

---

### 3. DOCUMENTATION SYNCHRONIZATION

**Objective:** Ensure Design System page accurately represents current implementation.

#### For Each Component on Design System Page:

**Visual Preview Verification:**
- ✅ Preview component renders correctly
- ✅ All variants are shown (default, hover, active, disabled, etc.)
- ✅ All sizes are shown (sm, md, lg, xl)
- ✅ All color schemes are shown (primary, secondary, etc.)
- ✅ Interactive states are functional
- ✅ Visual appearance matches actual component

**Code Example Verification:**
- ✅ Code example is syntactically correct
- ✅ Code example runs without errors
- ✅ Code example uses current API
- ✅ Code example uses design tokens (not hardcoded)
- ✅ Code example shows best practices
- ✅ Code example is copy-paste ready

**Props/API Documentation:**
- ✅ All props are documented
- ✅ Prop types are accurate
- ✅ Default values are correct
- ✅ Required vs optional is clear
- ✅ Examples for each prop

**Component Metadata:**
- ✅ Component description is clear
- ✅ Use cases are explained
- ✅ Accessibility notes included
- ✅ Related components linked

---

### 4. CROSS-FILE CONSISTENCY

**Objective:** Ensure consistent patterns across all components.

#### Consistency Checks:

**Spacing Patterns:**
- ✅ Buttons use consistent padding
- ✅ Cards use consistent spacing
- ✅ Forms use consistent gaps
- ✅ Layouts use consistent margins

**Color Usage:**
- ✅ Primary color used consistently for primary actions
- ✅ Semantic colors (error, success) used correctly
- ✅ Text colors follow hierarchy (primary, secondary, disabled)
- ✅ Background colors follow elevation system

**Typography:**
- ✅ Headings use correct font scale
- ✅ Body text uses correct size
- ✅ Line heights are consistent
- ✅ Font weights follow hierarchy

**Interaction Patterns:**
- ✅ Hover states consistent across components
- ✅ Focus states visible and consistent
- ✅ Active states follow same pattern
- ✅ Disabled states look similar
- ✅ Transitions use same timing

---

## 📊 AUDIT OUTPUT FORMAT

### SECTION 1: GLOBALS.CSS TOKEN INVENTORY

**Format:**
```
TOTAL TOKENS DEFINED: XX

COLORS (XX tokens):
  --color-primary: #6200EE
  --color-secondary: #03DAC6
  [... all color tokens ...]

SPACING (XX tokens):
  --spacing-xs: 4px
  --spacing-sm: 8px
  [... all spacing tokens ...]

TYPOGRAPHY (XX tokens):
  [... all typography tokens ...]

[... all other categories ...]
```

---

### SECTION 2: CRITICAL DISCREPANCIES

**Priority: 🚨 CRITICAL**

These issues break design system compliance and must be fixed immediately.

**Format per Issue:**
```
❌ [Category] File:Line
   Current: [hardcoded value]
   Expected: [design token]
   Impact: [explanation]
   Fix: [specific code change]
```

**Examples:**
```
❌ [COLOR] /components/library/Button.tsx:45
   Current: color: "#6200EE"
   Expected: color: "var(--color-primary)"
   Impact: Button color not following theme system
   Fix: Replace "#6200EE" with "var(--color-primary)"

❌ [SPACING] /components/library/Card.tsx:78
   Current: padding: "16px 24px"
   Expected: padding: "var(--spacing-md) var(--spacing-lg)"
   Impact: Card padding not responsive to spacing scale
   Fix: Replace with design tokens
```

---

### SECTION 3: HIGH PRIORITY DISCREPANCIES

**Priority: ⚠️ HIGH**

These issues affect consistency and should be fixed soon.

**Categories:**
- Inconsistent token usage patterns
- Missing component variants in documentation
- Outdated code examples
- Incomplete prop documentation

---

### SECTION 4: MEDIUM PRIORITY DISCREPANCIES

**Priority: ℹ️ MEDIUM**

These issues are minor but should be addressed for completeness.

**Categories:**
- Documentation gaps
- Unclear naming conventions
- Minor visual inconsistencies
- Missing usage examples

---

### SECTION 5: LOW PRIORITY OBSERVATIONS

**Priority: 💡 LOW**

Optional improvements and suggestions.

**Categories:**
- Potential token additions
- Alternative naming suggestions
- Enhancement opportunities

---

### SECTION 6: RECOMMENDATIONS

**Token System:**
- Suggest new tokens to add
- Suggest tokens to rename
- Suggest token consolidation

**Documentation:**
- Suggest missing examples
- Suggest clearer descriptions
- Suggest component relationships

**Implementation:**
- Suggest refactoring opportunities
- Suggest consistency improvements
- Suggest accessibility enhancements

---

### SECTION 7: COMPLIANCE SCORE

**Calculation Method:**
```
Token Documentation Score = (Documented Tokens / Total Tokens) × 100%
Token Usage Score = (Correctly Used / Total Token References) × 100%
Code Example Score = (Accurate Examples / Total Examples) × 100%

OVERALL COMPLIANCE = Average of above three scores
```

**Score Ranges:**
- 🟢 **90-100%**: Excellent - Minor issues only
- 🟡 **70-89%**: Good - Some improvements needed
- 🟠 **50-69%**: Fair - Significant issues
- 🔴 **0-49%**: Poor - Major overhaul needed

**Report Format:**
```
COMPLIANCE METRICS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Token Documentation:    XX% (YY/ZZ tokens)
📊 Token Usage:            XX% (YY/ZZ references)
📊 Code Examples:          XX% (YY/ZZ examples)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 OVERALL COMPLIANCE:     XX%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: [Excellent/Good/Fair/Poor]
Grade: [A+/A/B/C/D/F]
```

---

## 🔍 AUDIT EXECUTION STEPS

### Step 1: Read globals.css
- Extract ALL CSS variables
- Categorize by type
- Create token inventory

### Step 2: Analyze Design System Page
- Identify all documented components
- Extract code examples
- List all visual previews

### Step 3: Scan All Components
- Read all files in `/components/`
- Detect hardcoded values
- Identify token usage
- Flag inconsistencies

### Step 4: Cross-Reference
- Match token definitions to usage
- Compare documentation to implementation
- Verify code examples against actual components

### Step 5: Generate Report
- Compile all findings
- Calculate compliance scores
- Prioritize issues
- Generate fix suggestions

---

## 📂 FILES TO AUDIT

**Required Files (Core):**
```
/styles/globals.css                    # Source of truth
/App.tsx                               # Design System page
```

**Component Library:**
```
/components/library/Button.tsx
/components/library/InputField.tsx
/components/library/Checkbox.tsx
/components/library/Radio.tsx
/components/library/Toggle.tsx
/components/library/Select.tsx
/components/library/Card.tsx
/components/library/Badge.tsx
/components/library/Avatar.tsx
/components/library/Alert.tsx
/components/library/Tabs.tsx
/components/library/Breadcrumb.tsx
/components/library/Pagination.tsx
/components/library/Toast.tsx
/components/library/Modal.tsx
/components/library/Loading.tsx
/components/library/Container.tsx
/components/library/Grid.tsx
/components/library/Stack.tsx
[... all other library components ...]
```

**Application Components:**
```
/components/**/*.tsx                   # All other components
```

**Additional Files:**
```
/components/DesignSystemAudit.tsx      # Audit UI (if exists)
/components/BackupManager.tsx          # Other screens
[... all application screens ...]
```

---

## ⚙️ EXECUTION PARAMETERS

**Scan Depth:** Full recursive scan  
**File Extensions:** `.tsx`, `.ts`, `.jsx`, `.js`, `.css`  
**Ignore Patterns:**
- `/node_modules/**`
- `/.git/**`
- `/build/**`
- `/dist/**`
- `*.test.*`
- `*.spec.*`

**Performance:**
- Read files sequentially to avoid overwhelming system
- Use line-by-line analysis for large files
- Cache parsed results to avoid re-reading

**Error Handling:**
- If file not found, log and continue
- If parse error, log and continue
- Never fail silently - report all issues

---

## 🎯 SUCCESS CRITERIA

**Audit is Complete When:**
- ✅ All tokens inventoried
- ✅ All components scanned
- ✅ All discrepancies documented
- ✅ All scores calculated
- ✅ All recommendations provided

**Audit is Successful When:**
- ✅ Compliance score is calculated
- ✅ All critical issues identified
- ✅ Fix suggestions provided for every issue
- ✅ Report is actionable

---

## 📝 IMPORTANT NOTES

**For the Auditor (AI Assistant):**

1. **Be Thorough:** Check every file, every line where applicable
2. **Be Specific:** Include exact file paths and line numbers
3. **Be Helpful:** Provide specific fix code, not just descriptions
4. **Be Honest:** Report actual compliance, don't sugarcoat
5. **Be Organized:** Use clear sections and formatting
6. **Be Actionable:** Every finding should have a clear fix

**Prioritization:**
- Critical: Hardcoded values in production code
- High: Missing documentation, inconsistent patterns
- Medium: Minor inconsistencies, unclear naming
- Low: Suggestions for improvement

**Tone:**
- Professional but friendly
- Direct and clear
- Solution-oriented
- Encouraging (frame as opportunities to improve)

---

## 🚀 TRIGGER COMMAND

When the user says:

**"Run Design System Audit"**

Execute this complete audit protocol and generate a comprehensive report following all sections above.

**Alternative Triggers:**
- "Audit the design system"
- "Check design system compliance"
- "Run audit"
- "Design system report"

---

**END OF AUDIT PROTOCOL**
