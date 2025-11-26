/**
 * Design System Configuration
 * 
 * IMPORTANT: This is the single source of truth for all text labels and configuration
 * in the Design System & Component Library showcase.
 * 
 * Any changes to labels, tabs, or categories should be made here only.
 */

export const DESIGN_SYSTEM_CONFIG = {
  // Main labels
  labels: {
    designSystemTab: 'Design System',
    componentLibraryTab: 'Components',
    variablesTab: 'Variables',
    auditsTab: 'Audits',
    comingSoon: 'This component is coming soon...',
  },

  // Design System tabs (Level 2 navigation)
  designSystemTabs: [
    'Font',
    'Color + Gradients',
    'Radius',
    'Borders',
    'Shadow',
    'Layout',
    'Logo',
    'Icons',
    'Illustration',
    'Spacing',
    'Transition'
  ],

  // Tab keys for routing (normalized versions)
  designSystemTabKeys: {
    font: 'font',
    colorGradients: 'color + gradients',
    radius: 'radius',
    borders: 'borders',
    shadow: 'shadow',
    layout: 'layout',
    logo: 'logo',
    icons: 'icons',
    illustration: 'illustration',
    spacing: 'spacing',
    transition: 'transition',
  },

  // Section titles for Design System pages
  designSystemSectionTitles: {
    font: 'Fonts & Styles',
    colorGradients: 'Color + Gradients',
    radius: 'Radius',
    borders: 'Borders',
    shadow: 'Shadow System',
    layout: 'Layout System',
    logo: 'Logo',
    icons: 'Icons',
    illustration: 'Illustration',
    spacing: 'Spacing System',
    transition: 'Transition',
  },

  // Component category tabs (Level 2 navigation)
  componentCategories: [
    'Inputs',
    'Display',
    'Navigation',
    'Feedback',
    'Layout'
  ],

  // Components by category (Level 3 navigation)
  componentsByCategory: {
    inputs: ['Button', 'Input Field', 'Checkbox', 'Radio', 'Toggle', 'Select'],
    display: ['Card', 'Badge', 'Avatar', 'Alert'],
    navigation: ['Tabs', 'Breadcrumb', 'Pagination'],
    feedback: ['Toast', 'Modal', 'Loading'],
    layout: ['Container', 'Grid', 'Stack']
  },

  // Component implementation status
  componentStatus: {
    // Implemented
    button: 'implemented',
    'input field': 'implemented',
    card: 'implemented',
    badge: 'implemented',
    
    // Coming soon
    checkbox: 'coming-soon',
    radio: 'coming-soon',
    toggle: 'coming-soon',
    select: 'coming-soon',
    avatar: 'coming-soon',
    alert: 'coming-soon',
    tabs: 'coming-soon',
    breadcrumb: 'coming-soon',
    pagination: 'coming-soon',
    toast: 'coming-soon',
    modal: 'coming-soon',
    loading: 'coming-soon',
    container: 'coming-soon',
    grid: 'coming-soon',
    stack: 'coming-soon',
  }
};

/**
 * Helper function to normalize tab names to keys
 */
export function normalizeTabName(tabName: string): string {
  return tabName.toLowerCase();
}

/**
 * Helper function to get first component of a category
 */
export function getFirstComponentOfCategory(category: string): string {
  const categoryKey = category.toLowerCase() as keyof typeof DESIGN_SYSTEM_CONFIG.componentsByCategory;
  return DESIGN_SYSTEM_CONFIG.componentsByCategory[categoryKey]?.[0] || '';
}