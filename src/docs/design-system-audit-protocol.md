# Design System Audit Protocol v1.0.0

## Overview
This document provides comprehensive instructions for conducting automated compliance audits of the Design System & Component Library. The audit ensures all components use design system variables from `globals.css` instead of hardcoded values.

**Last Updated:** November 20, 2024  
**Protocol Version:** 1.0.0  
**Target Compliance:** 100% across all 19 production components

---

## Audit Objectives

1. **Identify Hardcoded Values**: Find all instances where components use literal values instead of CSS variables
2. **Measure Compliance**: Calculate percentage of design system variable usage
3. **Generate Remediation Guide**: Provide specific line-by-line fixes for each issue
4. **Track Progress**: Maintain historical audit logs to measure improvement over time

---

## Audit Scope

### Components to Audit (19 Total)

**Input Components (6):**
- Button (`/components/library/Button.tsx`)
- Input Field (`/components/library/InputField.tsx`)
- Checkbox (`/components/library/Checkbox.tsx`)
- Radio (`/components/library/Radio.tsx`)
- Toggle (`/components/library/Toggle.tsx`)
- Select (`/components/library/Select.tsx`)

**Display Components (4):**
- Card (`/components/library/Card.tsx`)
- Badge (`/components/library/Badge.tsx`)
- Avatar (`/components/library/Avatar.tsx`)
- Alert (`/components/library/Alert.tsx`)

**Navigation Components (3):**
- Tabs (`/components/library/Tabs.tsx`)
- Breadcrumb (`/components/library/Breadcrumb.tsx`)
- Pagination (`/components/library/Pagination.tsx`)

**Feedback Components (3):**
- Toast (`/components/library/Toast.tsx`)
- Modal (`/components/library/Modal.tsx`)
- Loading (`/components/library/Loading.tsx`)

**Layout Components (3):**
- Container (`/components/library/Container.tsx`)
- Grid (`/components/library/Grid.tsx`)
- Stack (`/components/library/Stack.tsx`)

---

## Design System Variables Reference

### Typography
```css
--font-family-primary: 'Geologica', sans-serif
--font-size-p1-xs: 10px
--font-size-p1-sm: 12px
--font-size-p1-md: 14px
--font-size-p1-base: 16px
--font-size-p1-lg: 18px
--font-size-p1-xl: 24px
```

### Colors
```css
--color-primary, --color-secondary
--color-dark-100, --color-dark-80, --color-dark-60, --color-dark-40, --color-dark-20
--color-light-100, --color-light-80, --color-light-60, --color-light-40, --color-light-20
--color-white
--color-success-100, --color-success-10
--color-warning-100, --color-warning-10
--color-error-100, --color-error-10
--color-info-100, --color-info-10
```

### Spacing
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-2xl: 48px
--spacing-3xl: 64px
```

### Borders
```css
--border-width-thin: 1px
--border-width-default: 2px
--border-width-medium: 3px
--border-width-thick: 4px
--border-style-solid, --border-style-dashed, --border-style-dotted
--border-color-default, --border-color-light, --border-color-dark
--border-color-primary, --border-color-success, --border-color-warning, --border-color-error
```

### Border Radius
```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 14px
--radius-xl: 16px
--radius-2xl: 24px
--radius-full: 9999px
```

### Shadows
```css
--shadow-1: 0px 0px 8px 0px rgba(0, 0, 0, 0.2)
--shadow-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.05)
--shadow-md: 0px 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0px 10px 15px -3px rgba(0, 0, 0, 0.1)
```

### Transitions
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Icon Sizes
```css
--icon-size-xs: 12px
--icon-size-sm: 16px
--icon-size-md: 20px
--icon-size-lg: 24px
--icon-size-xl: 32px
```

### Component-Specific Sizes
```css
--size-xs: 8px, --size-sm: 20px, --size-md: 32px, --size-lg: 40px, --size-xl: 48px, --size-2xl: 64px
--avatar-size-sm: 32px, --avatar-size-md: 40px, --avatar-size-lg: 48px, --avatar-size-xl: 64px
--avatar-status-sm: 8px, --avatar-status-md: 10px, --avatar-status-lg: 12px, --avatar-status-xl: 14px
--toggle-track-width: 44px, --toggle-track-height: 24px, --toggle-thumb-size: 20px, --toggle-thumb-offset: 2px
--modal-size-sm: 400px, --modal-size-md: 500px, --modal-size-lg: 700px, --modal-size-xl: 900px
--loading-size-sm: 16px, --loading-size-md: 32px, --loading-size-lg: 48px
--loading-dot-sm: 6px, --loading-dot-md: 10px, --loading-dot-lg: 14px
```

### Opacity & Overlays
```css
--opacity-disabled: 0.5
--opacity-overlay: 0.5
--opacity-overlay-light: 0.9
--overlay-dark: rgba(0, 0, 0, 0.5)
--overlay-light: rgba(255, 255, 255, 0.9)
```

### Z-Index
```css
--z-index-modal: 1000
--z-index-toast: 9999
```

### Positioning
```css
--position-0: 0
```

### Special Values
```css
--margin-negative-thin: -1px
--min-width-button: 40px
```

---

## Audit Process (Step-by-Step)

### Phase 1: File Analysis

For each component file:

1. **Read the entire file** using the read tool
2. **Identify all style definitions**:
   - Inline style objects (e.g., `const buttonStyles = {...}`)
   - Style props (e.g., `style={{...}}`)
   - StyleSheet definitions
   - Tailwind classes (if applicable)

3. **Scan for hardcoded values** in these categories:
   - **Numeric values with units**: `"16px"`, `"2px"`, `"0.5"`, `"1000"`
   - **Color values**: `"#003CFF"`, `"rgb()"`, `"rgba()"`, hex codes
   - **String literals**: `"solid"`, `"center"`, `"pointer"`
   - **Animation timings**: `"0.8s"`, `"150ms"`
   - **Font properties**: `"16px"`, `"Geologica"`, `500`, `400`

### Phase 2: Violation Detection

For each hardcoded value found:

1. **Determine the line number** where it appears
2. **Identify the property** being set (e.g., `width`, `color`, `padding`)
3. **Match to design system variable**:
   - Consult the reference table above
   - Find the exact CSS variable that should be used
4. **Categorize the severity**:
   - **Critical**: Core design tokens (colors, spacing, typography)
   - **High**: Component-specific sizes, borders, shadows
   - **Medium**: Opacity, transitions, z-index
   - **Low**: Edge cases, special calculations

### Phase 3: Special Cases

**Icon Sizes (Lucide React):**
```typescript
// ❌ WRONG
<Icon size={20} />

// ✅ CORRECT
const iconSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--icon-size-md').trim());
<Icon size={iconSize} />
```

**Size Maps:**
```typescript
// ❌ WRONG
const sizeMap = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

// ✅ CORRECT
const sizeMap = {
  sm: 'var(--avatar-size-sm)',
  md: 'var(--avatar-size-md)',
  lg: 'var(--avatar-size-lg)',
};
```

**Calculated Values:**
```typescript
// ❌ WRONG
left: checked ? '22px' : '2px'

// ✅ CORRECT
left: checked ? 'calc(var(--toggle-track-width) - var(--toggle-thumb-size) - var(--toggle-thumb-offset))' : 'var(--toggle-thumb-offset)'
```

**Position Values:**
```typescript
// ❌ WRONG
top: 0, left: 0, right: 0, bottom: 0

// ✅ CORRECT
top: 'var(--position-0)', left: 'var(--position-0)', right: 'var(--position-0)', bottom: 'var(--position-0)'
```

### Phase 4: Documentation

For each violation, create a structured record:

```typescript
{
  component: "ComponentName",
  issues: [
    "Line X: property: value - HARDCODED (should use var(--variable-name))",
    "Lines X-Y: property - ALL HARDCODED (should use --variable-* pattern)",
  ]
}
```

### Phase 5: Compliance Calculation

```typescript
totalVariablesNeeded = count of all style properties across all components
variablesUsed = count of properties using var(--*) syntax
hardcodedValues = totalVariablesNeeded - variablesUsed

compliancePercentage = (variablesUsed / totalVariablesNeeded) * 100
```

Round to nearest integer for reporting.

---

## Audit Report Format

### Report Structure

```typescript
{
  id: "audit-XXX",
  date: "YYYY-MM-DD",
  version: "v1.0.0",
  compliance: 79, // percentage
  discrepancies: [
    {
      component: "ComponentName",
      issues: [
        "Line 32: width: \"20px\" - HARDCODED (should use var(--size-sm))",
        // ... more issues
      ]
    },
    // ... more components
  ]
}
```

### Summary Metrics

Include in every report:
- **Total Components Audited**: 19
- **Components with Issues**: X
- **Total Issues Found**: Y
- **Compliance Percentage**: Z%
- **Issues by Severity**:
  - Critical: X
  - High: Y
  - Medium: Z
  - Low: W

---

## Exemptions & Edge Cases

### Allowed Hardcoded Values

1. **TypeScript/JavaScript Logic**:
   - Array indices: `[0]`, `[1]`
   - Boolean values: `true`, `false`
   - Numeric calculations in logic (not styles)

2. **React-Specific**:
   - Component props that aren't styles
   - Event handlers
   - Conditional logic

3. **CSS Calc Functions**:
   - Using multiple variables in calc() is allowed
   - Example: `calc(100vh - var(--spacing-lg))`

4. **External Library Requirements**:
   - If a library specifically requires numeric prop (document why)

### Variables Not Required

- `display`, `position`, `flexDirection` (CSS keywords)
- `cursor` values when using keywords (`pointer`, `not-allowed`)
- `textDecoration` keywords (`none`, `underline`)
- `overflow` keywords (`auto`, `hidden`, `scroll`)

---

## Remediation Guidelines

### Priority Order for Fixes

1. **Critical Issues First**:
   - Colors not using design system
   - Spacing not using variables
   - Typography sizes hardcoded

2. **High Priority**:
   - Border properties
   - Component-specific sizes
   - Shadows

3. **Medium Priority**:
   - Opacity values
   - Transitions
   - Icon sizes

4. **Low Priority**:
   - Z-index values
   - Positioning values
   - Edge cases

### Fix Process

For each issue:
1. **Locate the exact line** in the component file
2. **Identify the correct variable** from globals.css
3. **Replace the hardcoded value** with `var(--variable-name)`
4. **Test the component** to ensure visual consistency
5. **Mark as resolved** in the audit tracking system

---

## Audit Execution Checklist

- [ ] Read globals.css to get current variable list
- [ ] For each of 19 components:
  - [ ] Read the component file
  - [ ] Scan for hardcoded values
  - [ ] Document all violations with line numbers
  - [ ] Suggest correct variable for each violation
- [ ] Calculate compliance percentage
- [ ] Generate discrepancies report
- [ ] Create summary statistics
- [ ] Store audit results in Supabase
- [ ] Update audit history table

---

## Version History

### v1.0.0 (November 20, 2024)
- Initial protocol release
- Defined 19 components to audit
- Established 210+ design system variables
- Set 100% compliance target
- Created comprehensive violation detection rules

---

## AI Assistant Instructions

When conducting an audit, follow these steps exactly:

1. **Initialize Audit**:
   ```
   Create new audit object with current date and v1.0.0
   Read /styles/globals.css to get variable reference
   Initialize empty discrepancies array
   ```

2. **For Each Component**:
   ```
   Read component file
   Parse all style definitions
   Compare against design system variables
   Record violations with exact line numbers
   Add to discrepancies array
   ```

3. **Calculate Metrics**:
   ```
   Count total components audited
   Count components with issues
   Sum total issues
   Calculate compliance percentage
   ```

4. **Generate Report**:
   ```
   Format as JSON structure
   Include all discrepancies
   Add summary metrics
   Store in Supabase database
   ```

5. **Display Results**:
   ```
   Show in Audits tab table
   Enable view/copy functionality
   Update compliance badge colors
   ```

---

## Contact & Support

For questions about the audit protocol or to report issues with the auditing process, refer to the Design System & Component Library documentation or consult the globals.css file for the latest variable definitions.

**Remember:** The goal is 100% compliance to ensure perfect synchronization between the design system and all components!
