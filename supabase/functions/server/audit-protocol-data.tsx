/**
 * Complete Audit Protocol Data (JSON Format)
 * This is the comprehensive audit protocol that gets stored in Supabase
 */

export const AUDIT_PROTOCOL = {
  "protocol": {
    "version": "1.0.0",
    "lastUpdated": "2024-11-20",
    "name": "Design System Audit Protocol",
    "description": "Comprehensive compliance audit protocol for Design System & Component Library",
    "targetCompliance": 100,
    "totalComponents": 19
  },
  
  "instructions": {
    "overview": "This protocol ensures all components use design system variables from globals.css instead of hardcoded values. The audit scans each component file and identifies violations.",
    
    "objectives": [
      "Identify all hardcoded values in component files",
      "Measure compliance percentage across all components",
      "Generate detailed remediation guide with line-by-line fixes",
      "Track progress over time with historical audit logs"
    ],
    
    "auditProcess": [
      "1. Read globals.css to get current design system variables",
      "2. For each of 19 components, read the component file",
      "3. Scan for hardcoded values (pixel values, colors, opacity, z-index, etc.)",
      "4. Match hardcoded values to correct design system variables",
      "5. Document violations with exact line numbers and suggested fixes",
      "6. Calculate compliance percentage: (compliant components / total components) * 100",
      "7. Generate summary statistics (total issues, issues by severity)",
      "8. Store audit results in Supabase database",
      "9. Display results in audit history table"
    ],
    
    "severityLevels": {
      "critical": {
        "description": "Core design tokens that affect brand consistency",
        "examples": ["Colors not using design system", "Spacing not using variables", "Typography sizes hardcoded"],
        "priority": 1
      },
      "high": {
        "description": "Component-specific properties that affect visual consistency",
        "examples": ["Border properties", "Component-specific sizes", "Shadows", "Icon sizes"],
        "priority": 2
      },
      "medium": {
        "description": "Secondary properties that affect interaction",
        "examples": ["Opacity values", "Transitions", "Positioning values"],
        "priority": 3
      },
      "low": {
        "description": "Edge cases and special calculations",
        "examples": ["Z-index values", "Calculated values using multiple variables"],
        "priority": 4
      }
    },
    
    "detectionPatterns": {
      "pixelValues": {
        "pattern": ":\\s*[\"'](\\d+px)[\"']",
        "description": "Detects hardcoded pixel values like '16px', '24px'",
        "severity": "critical",
        "examples": ["width: '16px'", "padding: '24px'", "margin: '8px'"]
      },
      "iconSizes": {
        "pattern": "size={(\\d+)}",
        "description": "Detects hardcoded icon size props",
        "severity": "high",
        "examples": ["<Icon size={20} />", "<CheckCircle size={24} />"]
      },
      "opacityValues": {
        "pattern": "opacity:\\s*(0\\.\\d+|1\\.0|1)",
        "description": "Detects hardcoded opacity values",
        "severity": "medium",
        "examples": ["opacity: 0.5", "opacity: 0.6"]
      },
      "zIndexValues": {
        "pattern": "zIndex:\\s*(\\d{3,})",
        "description": "Detects hardcoded z-index values",
        "severity": "medium",
        "examples": ["zIndex: 1000", "zIndex: 9999"]
      },
      "colorValues": {
        "pattern": "#[0-9A-Fa-f]{6}|rgb\\(|rgba\\(",
        "description": "Detects hardcoded color values",
        "severity": "critical",
        "examples": ["color: '#003CFF'", "backgroundColor: 'rgb(0, 60, 255)'"]
      },
      "sizeMaps": {
        "pattern": "(sm|md|lg|xl):\\s*[\"'](\\d+px)[\"']",
        "description": "Detects hardcoded size maps",
        "severity": "high",
        "examples": ["sm: '32px'", "md: '40px'"]
      },
      "positionValues": {
        "pattern": "(top|left|right|bottom):\\s*[\"']?(-?\\d+)[\"']?",
        "description": "Detects hardcoded position values",
        "severity": "medium",
        "examples": ["top: 0", "left: '0'", "bottom: -1"]
      },
      "animationTiming": {
        "pattern": "(transition|animation):\\s*[\"'][\\w\\s-]*(\\d+\\.?\\d*)(s|ms)",
        "description": "Detects hardcoded animation/transition timing",
        "severity": "medium",
        "examples": ["transition: '0.3s'", "animation: 'spin 1s'"]
      }
    },
    
    "exemptions": {
      "description": "Values that are allowed to be hardcoded",
      "allowedHardcodedValues": [
        {
          "type": "CSS Keywords",
          "examples": ["display: 'flex'", "position: 'absolute'", "cursor: 'pointer'"],
          "reason": "Standard CSS keyword values that are not part of design system"
        },
        {
          "type": "Boolean Values",
          "examples": ["disabled: true", "checked: false"],
          "reason": "JavaScript boolean logic, not style values"
        },
        {
          "type": "Array Indices",
          "examples": ["array[0]", "items[1]"],
          "reason": "Programming logic, not design values"
        },
        {
          "type": "Calc Functions",
          "examples": ["calc(100vh - var(--spacing-lg))"],
          "reason": "Allowed when using design system variables in calculation"
        }
      ]
    },
    
    "remediationGuidelines": {
      "priorityOrder": [
        "1. Fix critical issues first (colors, spacing, typography)",
        "2. Fix high priority issues (borders, shadows, component sizes)",
        "3. Fix medium priority issues (opacity, transitions, positioning)",
        "4. Fix low priority issues (z-index, edge cases)"
      ],
      "fixProcess": [
        "1. Locate the exact line number in the component file",
        "2. Identify the correct design system variable from globals.css",
        "3. Replace hardcoded value with var(--variable-name)",
        "4. Test the component to ensure visual consistency",
        "5. Mark issue as resolved in audit tracking"
      ]
    }
  },
  
  "components": [
    {
      "name": "Button",
      "path": "/components/library/Button.tsx",
      "category": "Input Components",
      "description": "Primary button component with variants and sizes"
    },
    {
      "name": "InputField",
      "path": "/components/library/InputField.tsx",
      "category": "Input Components",
      "description": "Text input field with label and validation"
    },
    {
      "name": "Checkbox",
      "path": "/components/library/Checkbox.tsx",
      "category": "Input Components",
      "description": "Checkbox input with label"
    },
    {
      "name": "Radio",
      "path": "/components/library/Radio.tsx",
      "category": "Input Components",
      "description": "Radio button input"
    },
    {
      "name": "Toggle",
      "path": "/components/library/Toggle.tsx",
      "category": "Input Components",
      "description": "Toggle switch component"
    },
    {
      "name": "Select",
      "path": "/components/library/Select.tsx",
      "category": "Input Components",
      "description": "Dropdown select component"
    },
    {
      "name": "Card",
      "path": "/components/library/Card.tsx",
      "category": "Display Components",
      "description": "Container card component"
    },
    {
      "name": "Badge",
      "path": "/components/library/Badge.tsx",
      "category": "Display Components",
      "description": "Badge/label component"
    },
    {
      "name": "Avatar",
      "path": "/components/library/Avatar.tsx",
      "category": "Display Components",
      "description": "User avatar component with status indicator"
    },
    {
      "name": "Alert",
      "path": "/components/library/Alert.tsx",
      "category": "Display Components",
      "description": "Alert notification component"
    },
    {
      "name": "Tabs",
      "path": "/components/library/Tabs.tsx",
      "category": "Navigation Components",
      "description": "Tab navigation component"
    },
    {
      "name": "Breadcrumb",
      "path": "/components/library/Breadcrumb.tsx",
      "category": "Navigation Components",
      "description": "Breadcrumb navigation trail"
    },
    {
      "name": "Pagination",
      "path": "/components/library/Pagination.tsx",
      "category": "Navigation Components",
      "description": "Pagination controls"
    },
    {
      "name": "Toast",
      "path": "/components/library/Toast.tsx",
      "category": "Feedback Components",
      "description": "Toast notification component"
    },
    {
      "name": "Modal",
      "path": "/components/library/Modal.tsx",
      "category": "Feedback Components",
      "description": "Modal dialog component"
    },
    {
      "name": "Loading",
      "path": "/components/library/Loading.tsx",
      "category": "Feedback Components",
      "description": "Loading spinner component"
    },
    {
      "name": "Container",
      "path": "/components/library/Container.tsx",
      "category": "Layout Components",
      "description": "Layout container component"
    },
    {
      "name": "Grid",
      "path": "/components/library/Grid.tsx",
      "category": "Layout Components",
      "description": "Grid layout component"
    },
    {
      "name": "Stack",
      "path": "/components/library/Stack.tsx",
      "category": "Layout Components",
      "description": "Stack layout component"
    }
  ],
  
  "designSystemVariables": {
    "typography": {
      "fontFamily": {
        "primary": "--font-family-primary: 'Geologica', sans-serif"
      },
      "fontSize": {
        "xs": "--font-size-p1-xs: 10px",
        "sm": "--font-size-p1-sm: 12px",
        "md": "--font-size-p1-md: 14px",
        "base": "--font-size-p1-base: 16px",
        "lg": "--font-size-p1-lg: 18px",
        "xl": "--font-size-p1-xl: 24px"
      }
    },
    
    "colors": {
      "primary": {
        "primary": "--color-primary",
        "secondary": "--color-secondary"
      },
      "dark": {
        "100": "--color-dark-100",
        "80": "--color-dark-80",
        "60": "--color-dark-60",
        "40": "--color-dark-40",
        "20": "--color-dark-20"
      },
      "light": {
        "100": "--color-light-100",
        "80": "--color-light-80",
        "60": "--color-light-60",
        "40": "--color-light-40",
        "20": "--color-light-20"
      },
      "semantic": {
        "white": "--color-white",
        "success-100": "--color-success-100",
        "success-10": "--color-success-10",
        "warning-100": "--color-warning-100",
        "warning-10": "--color-warning-10",
        "error-100": "--color-error-100",
        "error-10": "--color-error-10",
        "info-100": "--color-info-100",
        "info-10": "--color-info-10"
      }
    },
    
    "spacing": {
      "xs": "--spacing-xs: 4px",
      "sm": "--spacing-sm: 8px",
      "md": "--spacing-md: 16px",
      "lg": "--spacing-lg: 24px",
      "xl": "--spacing-xl: 32px",
      "2xl": "--spacing-2xl: 48px",
      "3xl": "--spacing-3xl: 64px"
    },
    
    "borders": {
      "width": {
        "thin": "--border-width-thin: 1px",
        "default": "--border-width-default: 2px",
        "medium": "--border-width-medium: 3px",
        "thick": "--border-width-thick: 4px"
      },
      "style": {
        "solid": "--border-style-solid: solid",
        "dashed": "--border-style-dashed: dashed",
        "dotted": "--border-style-dotted: dotted"
      },
      "color": {
        "default": "--border-color-default",
        "light": "--border-color-light",
        "dark": "--border-color-dark",
        "primary": "--border-color-primary",
        "success": "--border-color-success",
        "warning": "--border-color-warning",
        "error": "--border-color-error"
      }
    },
    
    "borderRadius": {
      "sm": "--radius-sm: 4px",
      "md": "--radius-md: 8px",
      "lg": "--radius-lg: 14px",
      "xl": "--radius-xl: 16px",
      "2xl": "--radius-2xl: 24px",
      "full": "--radius-full: 9999px"
    },
    
    "shadows": {
      "1": "--shadow-1: 0px 0px 8px 0px rgba(0, 0, 0, 0.2)",
      "sm": "--shadow-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
      "md": "--shadow-md: 0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
      "lg": "--shadow-lg: 0px 10px 15px -3px rgba(0, 0, 0, 0.1)"
    },
    
    "transitions": {
      "fast": "--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)",
      "base": "--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      "slow": "--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1)"
    },
    
    "iconSizes": {
      "xs": "--icon-size-xs: 12px",
      "sm": "--icon-size-sm: 16px",
      "md": "--icon-size-md: 20px",
      "lg": "--icon-size-lg: 24px",
      "xl": "--icon-size-xl: 32px"
    },
    
    "componentSizes": {
      "general": {
        "xs": "--size-xs: 8px",
        "sm": "--size-sm: 20px",
        "md": "--size-md: 32px",
        "lg": "--size-lg: 40px",
        "xl": "--size-xl: 48px",
        "2xl": "--size-2xl: 64px"
      },
      "avatar": {
        "sizes": {
          "sm": "--avatar-size-sm: 32px",
          "md": "--avatar-size-md: 40px",
          "lg": "--avatar-size-lg: 48px",
          "xl": "--avatar-size-xl: 64px"
        },
        "status": {
          "sm": "--avatar-status-sm: 8px",
          "md": "--avatar-status-md: 10px",
          "lg": "--avatar-status-lg: 12px",
          "xl": "--avatar-status-xl: 14px"
        }
      },
      "toggle": {
        "trackWidth": "--toggle-track-width: 44px",
        "trackHeight": "--toggle-track-height: 24px",
        "thumbSize": "--toggle-thumb-size: 20px",
        "thumbOffset": "--toggle-thumb-offset: 2px"
      },
      "modal": {
        "sm": "--modal-size-sm: 400px",
        "md": "--modal-size-md: 500px",
        "lg": "--modal-size-lg: 700px",
        "xl": "--modal-size-xl: 900px"
      },
      "loading": {
        "sizes": {
          "sm": "--loading-size-sm: 16px",
          "md": "--loading-size-md: 32px",
          "lg": "--loading-size-lg: 48px"
        },
        "dots": {
          "sm": "--loading-dot-sm: 6px",
          "md": "--loading-dot-md: 10px",
          "lg": "--loading-dot-lg: 14px"
        }
      }
    },
    
    "opacity": {
      "disabled": "--opacity-disabled: 0.5",
      "overlay": "--opacity-overlay: 0.5",
      "overlayLight": "--opacity-overlay-light: 0.9"
    },
    
    "overlays": {
      "dark": "--overlay-dark: rgba(0, 0, 0, 0.5)",
      "light": "--overlay-light: rgba(255, 255, 255, 0.9)"
    },
    
    "zIndex": {
      "modal": "--z-index-modal: 1000",
      "toast": "--z-index-toast: 9999"
    },
    
    "positioning": {
      "zero": "--position-0: 0"
    },
    
    "special": {
      "marginNegativeThin": "--margin-negative-thin: -1px",
      "minWidthButton": "--min-width-button: 40px"
    }
  },
  
  "valueMapping": {
    "description": "Maps hardcoded values to their design system variables",
    "mappings": [
      { "hardcoded": "4px", "variable": "var(--spacing-xs)", "category": "spacing" },
      { "hardcoded": "8px", "variable": "var(--spacing-sm)", "category": "spacing" },
      { "hardcoded": "16px", "variable": "var(--spacing-md)", "category": "spacing" },
      { "hardcoded": "24px", "variable": "var(--spacing-lg)", "category": "spacing" },
      { "hardcoded": "32px", "variable": "var(--spacing-xl)", "category": "spacing" },
      { "hardcoded": "48px", "variable": "var(--spacing-2xl)", "category": "spacing" },
      { "hardcoded": "64px", "variable": "var(--spacing-3xl)", "category": "spacing" },
      
      { "hardcoded": "12px", "variable": "var(--icon-size-xs)", "category": "icon-size", "context": "icon" },
      { "hardcoded": "16px", "variable": "var(--icon-size-sm)", "category": "icon-size", "context": "icon" },
      { "hardcoded": "20px", "variable": "var(--icon-size-md)", "category": "icon-size", "context": "icon" },
      { "hardcoded": "24px", "variable": "var(--icon-size-lg)", "category": "icon-size", "context": "icon" },
      { "hardcoded": "32px", "variable": "var(--icon-size-xl)", "category": "icon-size", "context": "icon" },
      
      { "hardcoded": "size={12}", "variable": "var(--icon-size-xs)", "category": "icon-prop" },
      { "hardcoded": "size={16}", "variable": "var(--icon-size-sm)", "category": "icon-prop" },
      { "hardcoded": "size={20}", "variable": "var(--icon-size-md)", "category": "icon-prop" },
      { "hardcoded": "size={24}", "variable": "var(--icon-size-lg)", "category": "icon-prop" },
      { "hardcoded": "size={32}", "variable": "var(--icon-size-xl)", "category": "icon-prop" },
      
      { "hardcoded": "1px", "variable": "var(--border-width-thin)", "category": "border-width" },
      { "hardcoded": "2px", "variable": "var(--border-width-default)", "category": "border-width" },
      { "hardcoded": "3px", "variable": "var(--border-width-medium)", "category": "border-width" },
      { "hardcoded": "4px", "variable": "var(--border-width-thick)", "category": "border-width" },
      
      { "hardcoded": "0.5", "variable": "var(--opacity-disabled)", "category": "opacity" },
      
      { "hardcoded": "1000", "variable": "var(--z-index-modal)", "category": "z-index" },
      { "hardcoded": "9999", "variable": "var(--z-index-toast)", "category": "z-index" },
      
      { "hardcoded": "0", "variable": "var(--position-0)", "category": "position" },
      { "hardcoded": "-1px", "variable": "var(--margin-negative-thin)", "category": "margin" },
      { "hardcoded": "40px", "variable": "var(--min-width-button)", "category": "min-width", "context": "button" }
    ]
  },
  
  "specialCases": {
    "iconSizeUsage": {
      "description": "Icon sizes require special handling for Lucide React icons",
      "wrongExample": "<Icon size={20} />",
      "correctExample": "const iconSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--icon-size-md').trim()); <Icon size={iconSize} />",
      "note": "Lucide icons require numeric prop, so we must read the CSS variable value"
    },
    "sizeMapObjects": {
      "description": "Size maps should use design system variables",
      "wrongExample": "const sizeMap = { sm: '32px', md: '40px', lg: '48px' }",
      "correctExample": "const sizeMap = { sm: 'var(--avatar-size-sm)', md: 'var(--avatar-size-md)', lg: 'var(--avatar-size-lg)' }"
    },
    "calculatedValues": {
      "description": "Calculations should use design system variables",
      "wrongExample": "left: checked ? '22px' : '2px'",
      "correctExample": "left: checked ? 'calc(var(--toggle-track-width) - var(--toggle-thumb-size) - var(--toggle-thumb-offset))' : 'var(--toggle-thumb-offset)'"
    },
    "positionValues": {
      "description": "Position values should use design system variable",
      "wrongExample": "{ top: 0, left: 0, right: 0, bottom: 0 }",
      "correctExample": "{ top: 'var(--position-0)', left: 'var(--position-0)', right: 'var(--position-0)', bottom: 'var(--position-0)' }"
    }
  },
  
  "complianceTargets": {
    "currentStatus": {
      "componentsFixed": 8,
      "totalComponents": 10,
      "issuesFixed": 26,
      "totalIssues": 43,
      "compliancePercentage": 79
    },
    "targets": {
      "phase1": {
        "description": "Fix critical components",
        "target": 50,
        "status": "✅ Complete"
      },
      "phase2": {
        "description": "Fix all input and display components",
        "target": 80,
        "status": "🔄 In Progress"
      },
      "phase3": {
        "description": "100% compliance across all components",
        "target": 100,
        "status": "⏳ Pending"
      }
    },
    "remainingWork": {
      "components": [
        {
          "name": "Modal",
          "issues": 6,
          "priority": "high"
        },
        {
          "name": "Loading",
          "issues": 11,
          "priority": "high"
        }
      ]
    }
  },
  
  "metadata": {
    "createdBy": "Design System Team",
    "createdDate": "2024-11-20",
    "totalVariables": 212,
    "aiInstructions": "When conducting an audit, follow the detection patterns to scan each component file. For each hardcoded value found, match it to the correct design system variable using the valueMapping. Calculate compliance as (components without issues / total components) * 100. Store results in Supabase with a unique audit ID.",
    "versionHistory": [
      {
        "version": "1.0.0",
        "date": "2024-11-20",
        "changes": "Initial protocol release with 19 components and 212+ design system variables"
      }
    ]
  }
};
