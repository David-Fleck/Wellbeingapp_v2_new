/**
 * Design System Audit Runner
 * Executes comprehensive compliance audits following the audit protocol
 */

interface AuditIssue {
  line: number;
  property: string;
  value: string;
  suggestedVariable: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

interface ComponentAudit {
  component: string;
  path: string;
  issues: string[];
  issuesCount: number;
  rawIssues: AuditIssue[];
}

interface AuditResult {
  id: string;
  date: string;
  version: string;
  compliance: number;
  discrepancies: ComponentAudit[];
  summary: {
    totalComponents: number;
    componentsWithIssues: number;
    totalIssues: number;
    issuesBySeverity: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
  };
}

// Design System Variable Patterns
const VARIABLE_PATTERNS = {
  // Spacing
  '4px': 'var(--spacing-xs)',
  '8px': 'var(--spacing-sm)',
  '16px': 'var(--spacing-md)',
  '24px': 'var(--spacing-lg)',
  '32px': 'var(--spacing-xl)',
  '48px': 'var(--spacing-2xl)',
  '64px': 'var(--spacing-3xl)',
  
  // Icon sizes
  '12px': 'var(--icon-size-xs)',
  '16px': 'var(--icon-size-sm)',
  '20px': 'var(--icon-size-md)',
  '24px': 'var(--icon-size-lg)',
  '32px': 'var(--icon-size-xl)',
  
  // Border widths
  '1px': 'var(--border-width-thin)',
  '2px': 'var(--border-width-default)',
  '3px': 'var(--border-width-medium)',
  '4px': 'var(--border-width-thick)',
  
  // Opacity
  '0.5': 'var(--opacity-disabled)',
  
  // Z-index
  '1000': 'var(--z-index-modal)',
  '9999': 'var(--z-index-toast)',
  
  // Position
  '0': 'var(--position-0)',
  
  // Negative margins
  '-1px': 'var(--margin-negative-thin)',
  
  // Min widths
  '40px': 'var(--min-width-button)',
};

// Components to audit
const COMPONENTS_TO_AUDIT = [
  // Input Components
  { name: 'Button', path: '/components/library/Button.tsx' },
  { name: 'InputField', path: '/components/library/InputField.tsx' },
  { name: 'Checkbox', path: '/components/library/Checkbox.tsx' },
  { name: 'Radio', path: '/components/library/Radio.tsx' },
  { name: 'Toggle', path: '/components/library/Toggle.tsx' },
  { name: 'Select', path: '/components/library/Select.tsx' },
  
  // Display Components
  { name: 'Card', path: '/components/library/Card.tsx' },
  { name: 'Badge', path: '/components/library/Badge.tsx' },
  { name: 'Avatar', path: '/components/library/Avatar.tsx' },
  { name: 'Alert', path: '/components/library/Alert.tsx' },
  
  // Navigation Components
  { name: 'Tabs', path: '/components/library/Tabs.tsx' },
  { name: 'Breadcrumb', path: '/components/library/Breadcrumb.tsx' },
  { name: 'Pagination', path: '/components/library/Pagination.tsx' },
  
  // Feedback Components
  { name: 'Toast', path: '/components/library/Toast.tsx' },
  { name: 'Modal', path: '/components/library/Modal.tsx' },
  { name: 'Loading', path: '/components/library/Loading.tsx' },
  
  // Layout Components
  { name: 'Container', path: '/components/library/Container.tsx' },
  { name: 'Grid', path: '/components/library/Grid.tsx' },
  { name: 'Stack', path: '/components/library/Stack.tsx' },
];

/**
 * Scans a component file for hardcoded values
 */
function scanComponentForIssues(componentName: string, fileContent: string): ComponentAudit {
  const lines = fileContent.split('\n');
  const rawIssues: AuditIssue[] = [];
  const formattedIssues: string[] = [];
  
  // Patterns to detect hardcoded values
  const patterns = [
    // Numeric values with units
    { regex: /:\s*["'](-?\d+\.?\d*)(px|rem|em|vh|vw|%)["']/g, type: 'size' },
    { regex: /size={(\d+)}/g, type: 'icon-size' },
    { regex: /opacity:\s*(0\.\d+|1\.0|1)/g, type: 'opacity' },
    { regex: /zIndex:\s*(\d+)/g, type: 'z-index' },
    
    // Size maps with hardcoded values
    { regex: /(sm|md|lg|xl):\s*["'](\d+px)["']/g, type: 'size-map' },
    
    // Widths and heights
    { regex: /(width|height|minWidth|maxWidth|minHeight|maxHeight):\s*["'](\d+px)["']/g, type: 'dimension' },
    
    // Positioning
    { regex: /(top|left|right|bottom):\s*["']?(-?\d+)["']?(?=,|\s*})/g, type: 'position' },
    
    // Animation timing
    { regex: /(transition|animation):\s*["'][\w\s-]*(\d+\.?\d*)(s|ms)/g, type: 'timing' },
  ];
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Skip lines that already use CSS variables
    if (line.includes('var(--')) {
      return;
    }
    
    // Check for common hardcoded values
    Object.entries(VARIABLE_PATTERNS).forEach(([hardcodedValue, variable]) => {
      if (line.includes(`"${hardcodedValue}"`) || line.includes(`'${hardcodedValue}'`) || 
          (hardcodedValue === '0' && line.match(/:\s*0[,\s}]/))) {
        
        let severity: 'critical' | 'high' | 'medium' | 'low' = 'medium';
        
        // Determine severity
        if (hardcodedValue.includes('px') && ['4px', '8px', '16px', '24px'].includes(hardcodedValue)) {
          severity = 'critical'; // Spacing is critical
        } else if (hardcodedValue === '0.5') {
          severity = 'high'; // Opacity
        } else if (['1000', '9999'].includes(hardcodedValue)) {
          severity = 'medium'; // Z-index
        }
        
        const issue = `Line ${lineNumber}: ${hardcodedValue} - HARDCODED (should use ${variable})`;
        
        if (!formattedIssues.includes(issue)) {
          formattedIssues.push(issue);
          rawIssues.push({
            line: lineNumber,
            property: 'unknown',
            value: hardcodedValue,
            suggestedVariable: variable,
            severity
          });
        }
      }
    });
    
    // Check for icon size props
    const iconSizeMatch = line.match(/size={(\d+)}/);
    if (iconSizeMatch) {
      const size = iconSizeMatch[1];
      let variable = '';
      
      if (size === '12') variable = 'var(--icon-size-xs)';
      else if (size === '16') variable = 'var(--icon-size-sm)';
      else if (size === '20') variable = 'var(--icon-size-md)';
      else if (size === '24') variable = 'var(--icon-size-lg)';
      else if (size === '32') variable = 'var(--icon-size-xl)';
      
      if (variable) {
        const issue = `Line ${lineNumber}: size={${size}} - HARDCODED (should use ${variable})`;
        if (!formattedIssues.includes(issue)) {
          formattedIssues.push(issue);
          rawIssues.push({
            line: lineNumber,
            property: 'size',
            value: size,
            suggestedVariable: variable,
            severity: 'high'
          });
        }
      }
    }
  });
  
  return {
    component: componentName,
    path: `components/library/${componentName}.tsx`,
    issues: formattedIssues,
    issuesCount: formattedIssues.length,
    rawIssues
  };
}

/**
 * Generates a unique audit ID
 */
function generateAuditId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `audit-${timestamp}-${random}`;
}

/**
 * Main audit execution function
 */
export async function runAudit(readFileFn: (path: string) => Promise<string | null>): Promise<AuditResult> {
  console.log('🔍 Starting Design System Audit...');
  
  const discrepancies: ComponentAudit[] = [];
  let totalIssues = 0;
  const issuesBySeverity = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  };
  
  // Audit each component
  for (const component of COMPONENTS_TO_AUDIT) {
    try {
      console.log(`Auditing ${component.name}...`);
      const fileContent = await readFileFn(component.path);
      
      if (!fileContent) {
        console.log(`⚠️  ${component.name} not found, skipping...`);
        continue;
      }
      
      const audit = scanComponentForIssues(component.name, fileContent);
      
      if (audit.issuesCount > 0) {
        discrepancies.push(audit);
        totalIssues += audit.issuesCount;
        
        // Count issues by severity
        audit.rawIssues.forEach(issue => {
          issuesBySeverity[issue.severity]++;
        });
      }
    } catch (error) {
      console.error(`Error auditing ${component.name}:`, error);
    }
  }
  
  // Calculate compliance percentage
  const totalComponents = COMPONENTS_TO_AUDIT.length;
  const componentsWithIssues = discrepancies.length;
  const componentsCompliant = totalComponents - componentsWithIssues;
  const compliance = Math.round((componentsCompliant / totalComponents) * 100);
  
  const auditResult: AuditResult = {
    id: generateAuditId(),
    date: new Date().toISOString().split('T')[0],
    version: 'v1.0.0',
    compliance,
    discrepancies,
    summary: {
      totalComponents,
      componentsWithIssues,
      totalIssues,
      issuesBySeverity
    }
  };
  
  console.log(`✅ Audit complete! Compliance: ${compliance}%`);
  console.log(`📊 Total issues: ${totalIssues} across ${componentsWithIssues} components`);
  
  return auditResult;
}

/**
 * Mock file reader for testing (returns null for non-existent files)
 */
export function createMockFileReader(files: Record<string, string>) {
  return async (path: string): Promise<string | null> => {
    return files[path] || null;
  };
}
