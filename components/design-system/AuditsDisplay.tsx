import { useState, useEffect } from 'react';
import { Eye, Copy, CheckCircle, AlertCircle, Play, Loader2, Download } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface AuditLog {
  id: string;
  date: string;
  version: string;
  compliance: number;
  discrepancies: {
    component: string;
    issues: string[];
    severity: string;
  }[];
  summary?: {
    totalComponents: number;
    componentsWithIssues: number;
    totalIssues: number;
  };
  metadata?: {
    issuesBySeverity: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    protocolVersion: string;
    designTokensCount: number;
    timestamp: string;
  };
  fileName?: string;
  createdAt?: string;
}

export function AuditsDisplay() {
  const [selectedAudit, setSelectedAudit] = useState<AuditLog | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningAudit, setRunningAudit] = useState(false);
  const [auditProgress, setAuditProgress] = useState<string>('');

  // Fetch audit logs from Supabase
  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8d8d3c7a/audits`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setAuditLogs(result.audits);
      } else {
        console.error('Failed to fetch audit logs:', result.error);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunNewAudit = async () => {
    try {
      setRunningAudit(true);
      setAuditProgress('📋 Fetching audit protocol...');

      // Step 1: Fetch the audit protocol from storage
      const protocolResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8d8d3c7a/audits/protocol`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const protocolResult = await protocolResponse.json();
      const protocol = protocolResult.success ? protocolResult.protocol : null;

      setAuditProgress('📂 Reading globals.css...');

      // Step 2: Read globals.css to get authoritative design system tokens
      const globalsResponse = await fetch('/styles/globals.css');
      const globalsContent = await globalsResponse.text();
      
      // Extract all CSS variables from globals.css
      const cssVarPattern = /--([\w-]+):\s*([^;]+);/g;
      const designTokens: Record<string, string> = {};
      let match;
      while ((match = cssVarPattern.exec(globalsContent)) !== null) {
        designTokens[match[1]] = match[2].trim();
      }

      setAuditProgress(`✅ Found ${Object.keys(designTokens).length} design tokens in globals.css`);

      setAuditProgress('🔍 Auto-discovering components...');

      // Step 3: Auto-discover components from /components/library
      const componentFiles: Record<string, string> = {};
      const componentNames = [
        'Button', 'InputField', 'Checkbox', 'Radio', 'Toggle', 'Select',
        'Card', 'Badge', 'Avatar', 'Alert',
        'Tabs', 'Breadcrumb', 'Pagination',
        'Toast', 'Modal', 'Loading',
        'Container', 'Grid', 'Stack'
      ];

      setAuditProgress(`📖 Reading ${componentNames.length} component files...`);
      
      // Read each component file
      for (const component of componentNames) {
        try {
          const response = await fetch(`/components/library/${component}.tsx`);
          if (response.ok) {
            componentFiles[`/components/library/${component}.tsx`] = await response.text();
          }
        } catch (err) {
          console.log(`Component ${component} not found, skipping...`);
        }
      }

      setAuditProgress('🔬 Analyzing components for violations...');

      // Step 4: Run comprehensive audit based on protocol
      const audit = await runProtocolBasedAudit(componentFiles, designTokens, protocol);

      setAuditProgress('💾 Storing audit results...');

      // Step 5: Store the audit in Supabase
      const storeResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8d8d3c7a/audits`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(audit),
        }
      );

      const storeResult = await storeResponse.json();

      if (storeResult.success) {
        setAuditProgress('✅ Audit complete!');
        // Refresh the audit logs
        await fetchAuditLogs();
        setTimeout(() => {
          setRunningAudit(false);
          setAuditProgress('');
        }, 1500);
      } else {
        throw new Error(storeResult.error);
      }
    } catch (error) {
      console.error('Error running audit:', error);
      setAuditProgress(`❌ Error: ${error.message}`);
      setTimeout(() => {
        setRunningAudit(false);
        setAuditProgress('');
      }, 3000);
    }
  };

  const runProtocolBasedAudit = async (
    files: Record<string, string>, 
    designTokens: Record<string, string>,
    protocol: any
  ): Promise<AuditLog> => {
    const discrepancies: {
      component: string; 
      issues: string[];
      severity: string;
    }[] = [];

    // Detection patterns from protocol
    const detectionPatterns = [
      { 
        pattern: /(:|=)\s*["']?(\d+px)["']?/g, 
        name: 'pixelValues',
        severity: 'critical',
        description: 'Hardcoded pixel value'
      },
      { 
        pattern: /size={(\d+)}/g, 
        name: 'iconSizes',
        severity: 'high',
        description: 'Hardcoded icon size'
      },
      { 
        pattern: /opacity:\s*(0?\.\d+|1)(?!\))/g, 
        name: 'opacityValues',
        severity: 'medium',
        description: 'Hardcoded opacity'
      },
      { 
        pattern: /zIndex:\s*(\d{2,})/g, 
        name: 'zIndexValues',
        severity: 'medium',
        description: 'Hardcoded z-index'
      },
      { 
        pattern: /#[0-9A-Fa-f]{3,6}|rgb\(|rgba\(/g, 
        name: 'colorValues',
        severity: 'critical',
        description: 'Hardcoded color value'
      },
    ];

    let totalIssues = 0;
    const issuesBySeverity = { critical: 0, high: 0, medium: 0, low: 0 };

    Object.entries(files).forEach(([path, content]) => {
      const componentName = path.split('/').pop()?.replace('.tsx', '') || '';
      const lines = content.split('\n');
      const issues: string[] = [];

      lines.forEach((line, index) => {
        // Skip lines that already use CSS variables
        if (line.includes('var(--')) return;
        
        // Skip comments
        if (line.trim().startsWith('//') || line.trim().startsWith('/*')) return;

        // Apply each detection pattern
        detectionPatterns.forEach(({ pattern, name, severity, description }) => {
          const regex = new RegExp(pattern);
          const matches = line.match(regex);
          
          if (matches) {
            matches.forEach(matchedValue => {
              // Find suggested replacement from design tokens
              const suggestion = findDesignTokenSuggestion(matchedValue, designTokens, name);
              
              issues.push(
                `[${severity.toUpperCase()}] Line ${index + 1}: ${matchedValue} - ${description} (suggested: ${suggestion})`
              );
              
              totalIssues++;
              issuesBySeverity[severity as keyof typeof issuesBySeverity]++;
            });
          }
        });
      });

      if (issues.length > 0) {
        discrepancies.push({ 
          component: componentName, 
          issues,
          severity: determineSeverity(issues)
        });
      }
    });

    const totalComponents = Object.keys(files).length;
    const componentsWithIssues = discrepancies.length;
    const componentsFixed = totalComponents - componentsWithIssues;
    const compliance = Math.round(((componentsFixed) / totalComponents) * 100);

    return {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      version: protocol?.protocol?.version || 'v1.1.0',
      compliance,
      discrepancies,
      summary: {
        totalComponents,
        componentsWithIssues,
        totalIssues,
      },
      metadata: {
        issuesBySeverity,
        protocolVersion: protocol?.protocol?.version || 'v1.1.0',
        designTokensCount: Object.keys(designTokens).length,
        timestamp: new Date().toISOString(),
      }
    };
  };

  const findDesignTokenSuggestion = (
    value: string, 
    designTokens: Record<string, string>,
    patternName: string
  ): string => {
    // Map common hardcoded values to design tokens
    const commonMappings: Record<string, string> = {
      '16px': 'var(--spacing-md) or var(--icon-size-md)',
      '24px': 'var(--spacing-lg) or var(--icon-size-lg)',
      '32px': 'var(--spacing-2xl) or var(--icon-size-xl)',
      '8px': 'var(--spacing-sm)',
      '12px': 'var(--spacing-md)',
      '0.5': 'var(--opacity-disabled)',
      '0.6': 'var(--opacity-disabled)',
      '1000': 'var(--z-index-modal)',
      '999': 'var(--z-index-modal)',
      '100': 'var(--z-index-dropdown)',
    };

    // Check common mappings first
    if (commonMappings[value]) {
      return commonMappings[value];
    }

    // Try to find matching token in design system
    for (const [tokenName, tokenValue] of Object.entries(designTokens)) {
      if (tokenValue === value) {
        return `var(--${tokenName})`;
      }
    }

    // Return generic suggestion based on pattern type
    const patternSuggestions: Record<string, string> = {
      'pixelValues': 'use spacing or size variable',
      'iconSizes': 'var(--icon-size-*)',
      'opacityValues': 'var(--opacity-*)',
      'zIndexValues': 'var(--z-index-*)',
      'colorValues': 'var(--color-*)',
    };

    return patternSuggestions[patternName] || 'check globals.css';
  };

  const determineSeverity = (issues: string[]): string => {
    if (issues.some(i => i.includes('[CRITICAL]'))) return 'critical';
    if (issues.some(i => i.includes('[HIGH]'))) return 'high';
    if (issues.some(i => i.includes('[MEDIUM]'))) return 'medium';
    return 'low';
  };

  const handleCopyDiscrepancies = (audit: AuditLog) => {
    const report = `
DESIGN SYSTEM AUDIT REPORT
Date: ${audit.date}
Audit Version: ${audit.version}
Compliance: ${audit.compliance}%

DISCREPANCIES FOUND:
${audit.discrepancies.map(d => `
Component: ${d.component}
${d.issues.map((issue, i) => `  ${i + 1}. ${issue}`).join('\n')}
`).join('\n')}

Total Components with Issues: ${audit.discrepancies.length}
Total Issues Found: ${audit.discrepancies.reduce((acc, d) => acc + d.issues.length, 0)}
    `.trim();

    // Fallback copy method that doesn't require clipboard permissions
    const textarea = document.createElement('textarea');
    textarea.value = report;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopiedId(audit.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(textarea);
  };

  const handleDownloadProtocol = async () => {
    try {
      // Fetch the protocol from Supabase Storage via our server
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8d8d3c7a/audits/protocol`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const result = await response.json();

      if (result.success && result.protocol) {
        // Convert protocol to JSON string
        const jsonString = JSON.stringify(result.protocol, null, 2);
        
        // Create blob and download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'design_system_audit_protocol.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.error('Failed to fetch protocol:', result.error);
        alert('Failed to download protocol. Please check console for details.');
      }
    } catch (error) {
      console.error('Error downloading protocol:', error);
      alert('Failed to download protocol. Please check console for details.');
    }
  };

  const protocolStyles = {
    padding: 'var(--spacing-lg)',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    marginBottom: 'var(--spacing-2xl)',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-p1-md)',
  };

  const thStyles = {
    textAlign: 'left' as const,
    padding: 'var(--spacing-md)',
    borderBottom: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
    backgroundColor: 'var(--color-light-40)',
    color: 'var(--color-dark-100)',
    fontWeight: 500,
  };

  const tdStyles = {
    padding: 'var(--spacing-md)',
    borderBottom: `var(--border-width-thin) var(--border-style-solid) var(--border-color-light)`,
    color: 'var(--color-dark-80)',
  };

  const buttonStyles = {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-dark-80)',
    cursor: 'pointer',
    transition: 'var(--transition-base)',
    fontFamily: 'var(--font-family-primary)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
  };

  const primaryButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    borderColor: 'var(--color-primary)',
  };

  const modalOverlayStyles = {
    position: 'fixed' as const,
    top: 'var(--position-0)',
    left: 'var(--position-0)',
    right: 'var(--position-0)',
    bottom: 'var(--position-0)',
    backgroundColor: 'var(--overlay-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 'var(--z-index-modal)',
    padding: 'var(--spacing-lg)',
  };

  const modalContentStyles = {
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    maxWidth: 'var(--modal-size-lg)',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative' as const,
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'var(--color-success-100)';
    if (compliance >= 70) return 'var(--color-warning-100)';
    return 'var(--color-error-100)';
  };

  const getComplianceBadge = (compliance: number) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    backgroundColor: compliance >= 90 
      ? 'var(--color-success-10)' 
      : compliance >= 70 
      ? 'var(--color-warning-10)' 
      : 'var(--color-error-10)',
    color: getComplianceColor(compliance),
    fontWeight: 500,
  });

  return (
    <div>
      {/* Audit Protocol Header */}
      <div style={protocolStyles}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <CheckCircle size={32} />
            <div>
              <h3 style={{ margin: 0, marginBottom: 'var(--spacing-xs)' }}>Design System Audit Protocol</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>Version: 1.0.0 | Last Updated: November 20, 2024</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <button
              onClick={handleDownloadProtocol}
              style={{
                ...buttonStyles,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'var(--color-white)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <Download size={16} />
              Protocol
            </button>
            <button
              onClick={handleRunNewAudit}
              disabled={runningAudit}
              style={{
                ...buttonStyles,
                backgroundColor: runningAudit ? 'rgba(255, 255, 255, 0.5)' : 'var(--color-white)',
                color: runningAudit ? 'var(--color-dark-40)' : 'var(--color-primary)',
                borderColor: runningAudit ? 'rgba(255, 255, 255, 0.3)' : 'var(--color-white)',
                cursor: runningAudit ? 'not-allowed' : 'pointer',
                opacity: runningAudit ? 'var(--opacity-disabled)' : 1,
              }}
            >
              {runningAudit ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run New Audit
                </>
              )}
            </button>
          </div>
        </div>
        <p style={{ margin: 0, marginTop: 'var(--spacing-md)', opacity: 0.9 }}>
          Automated compliance checking ensuring all components use design system variables from globals.css. 
          Target: 100% compliance across all 19 production components.
        </p>
        {runningAudit && auditProgress && (
          <div style={{
            marginTop: 'var(--spacing-md)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-p1-sm)',
          }}>
            {auditProgress}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div style={{ 
          padding: 'var(--spacing-2xl)', 
          textAlign: 'center',
          color: 'var(--color-dark-60)',
        }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: 'var(--spacing-md)' }} />
          <p>Loading audit logs...</p>
        </div>
      ) : auditLogs.length === 0 ? (
        <div style={{
          padding: 'var(--spacing-2xl)',
          textAlign: 'center',
          backgroundColor: 'var(--color-light-60)',
          borderRadius: 'var(--radius-lg)',
          color: 'var(--color-dark-60)',
        }}>
          <AlertCircle size={48} style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-40)' }} />
          <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>No Audit Logs Found</h4>
          <p>Click "Run New Audit" to perform your first compliance check.</p>
        </div>
      ) : (
        /* Audit Logs Table */
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={{...thStyles, width: '15%'}}>Date</th>
                <th style={{...thStyles, width: '15%'}}>Version</th>
                <th style={{...thStyles, width: '20%'}}>Compliance</th>
                <th style={{...thStyles, width: '15%'}}>Status</th>
                <th style={{...thStyles, width: '35%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((audit) => (
                <tr key={audit.id}>
                  <td style={tdStyles}>{audit.date}</td>
                  <td style={tdStyles}>{audit.version}</td>
                  <td style={tdStyles}>
                    <div style={getComplianceBadge(audit.compliance)}>
                      {audit.compliance >= 90 ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                      {audit.compliance}%
                    </div>
                  </td>
                  <td style={tdStyles}>
                    <span style={{
                      color: audit.compliance === 100 
                        ? 'var(--color-success-100)' 
                        : 'var(--color-warning-100)',
                      fontWeight: 500,
                    }}>
                      {audit.compliance === 100 ? 'Complete' : 'In Progress'}
                    </span>
                  </td>
                  <td style={tdStyles}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                      <button
                        onClick={() => setSelectedAudit(audit)}
                        style={buttonStyles}
                      >
                        <Eye size={16} />
                        View Report
                      </button>
                      <button
                        onClick={() => handleCopyDiscrepancies(audit)}
                        style={{
                          ...buttonStyles,
                          backgroundColor: copiedId === audit.id ? 'var(--color-success-10)' : 'var(--color-white)',
                          borderColor: copiedId === audit.id ? 'var(--color-success-100)' : 'var(--border-color-default)',
                          color: copiedId === audit.id ? 'var(--color-success-100)' : 'var(--color-dark-80)',
                        }}
                      >
                        <Copy size={16} />
                        {copiedId === audit.id ? 'Copied!' : 'Copy Report'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Audit Details Modal */}
      {selectedAudit && (
        <div style={modalOverlayStyles} onClick={() => setSelectedAudit(null)}>
          <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              padding: 'var(--spacing-lg)',
              borderBottom: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
            }}>
              <h3 style={{ margin: 0, marginBottom: 'var(--spacing-sm)' }}>
                Audit Report - {selectedAudit.date}
              </h3>
              <p style={{ margin: 0, color: 'var(--color-dark-60)' }}>
                Version: {selectedAudit.version} | Compliance: {selectedAudit.compliance}%
              </p>
            </div>

            {/* Modal Content */}
            <div style={{ padding: 'var(--spacing-lg)' }}>
              {/* Summary */}
              <div style={{
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-light-60)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-lg)',
              }}>
                <h4 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)' }}>Summary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-p1-sm)', color: 'var(--color-dark-60)' }}>
                      Components Audited
                    </div>
                    <div style={{ fontSize: 'var(--font-size-p1-xl)', fontWeight: 500, color: 'var(--color-dark-100)' }}>
                      {selectedAudit.summary?.totalComponents || 19}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-p1-sm)', color: 'var(--color-dark-60)' }}>
                      Components with Issues
                    </div>
                    <div style={{ fontSize: 'var(--font-size-p1-xl)', fontWeight: 500, color: 'var(--color-error-100)' }}>
                      {selectedAudit.discrepancies.length}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-p1-sm)', color: 'var(--color-dark-60)' }}>
                      Total Issues Found
                    </div>
                    <div style={{ fontSize: 'var(--font-size-p1-xl)', fontWeight: 500, color: 'var(--color-warning-100)' }}>
                      {selectedAudit.discrepancies.reduce((acc, d) => acc + d.issues.length, 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discrepancies List */}
              <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Discrepancies Found</h4>
              {selectedAudit.discrepancies.map((discrepancy, index) => (
                <div 
                  key={index}
                  style={{
                    marginBottom: 'var(--spacing-lg)',
                    padding: 'var(--spacing-md)',
                    border: `var(--border-width-default) var(--border-style-solid) var(--border-color-error)`,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-error-10)',
                  }}
                >
                  <h5 style={{ 
                    margin: 0, 
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-error-100)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                  }}>
                    <AlertCircle size={20} />
                    {discrepancy.component}
                  </h5>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: 'var(--spacing-lg)',
                    color: 'var(--color-dark-80)',
                  }}>
                    {discrepancy.issues.map((issue, issueIndex) => (
                      <li key={issueIndex} style={{ marginBottom: 'var(--spacing-xs)' }}>
                        <code style={{
                          fontSize: 'var(--font-size-p1-sm)',
                          backgroundColor: 'var(--color-white)',
                          padding: 'var(--spacing-xs)',
                          borderRadius: 'var(--radius-sm)',
                        }}>
                          {issue}
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: 'var(--spacing-lg)',
              borderTop: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--spacing-sm)',
            }}>
              <button
                onClick={() => handleCopyDiscrepancies(selectedAudit)}
                style={{
                  ...buttonStyles,
                  backgroundColor: copiedId === selectedAudit.id ? 'var(--color-success-100)' : 'var(--color-primary)',
                  color: 'var(--color-white)',
                  borderColor: copiedId === selectedAudit.id ? 'var(--color-success-100)' : 'var(--color-primary)',
                }}
              >
                <Copy size={16} />
                {copiedId === selectedAudit.id ? 'Copied!' : 'Copy Full Report'}
              </button>
              <button
                onClick={() => setSelectedAudit(null)}
                style={buttonStyles}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}