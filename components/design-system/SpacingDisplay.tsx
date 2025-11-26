export function SpacingDisplay() {
  const horizontalSpacing = [
    { name: 'XS', cssVar: '--spacing-xs', value: '4px' },
    { name: 'SM', cssVar: '--spacing-sm', value: '8px' },
    { name: 'MD', cssVar: '--spacing-md', value: '16px' },
    { name: 'LG', cssVar: '--spacing-lg', value: '24px' },
    { name: 'XL', cssVar: '--spacing-xl', value: '32px' },
    { name: '2XL', cssVar: '--spacing-2xl', value: '48px' },
    { name: '3XL', cssVar: '--spacing-3xl', value: '64px' },
  ];

  const horizontalFluidSpacing = [
    { 
      name: 'H-XS', 
      cssVar: '--spacing-h-xs', 
      clampValue: 'clamp(4px, 1vw, 8px)',
      description: 'Min: 4px, Max: 8px'
    },
    { 
      name: 'H-SM', 
      cssVar: '--spacing-h-sm', 
      clampValue: 'clamp(8px, 2vw, 16px)',
      description: 'Min: 8px, Max: 16px'
    },
    { 
      name: 'H-MD', 
      cssVar: '--spacing-h-md', 
      clampValue: 'clamp(16px, 3vw, 32px)',
      description: 'Min: 16px, Max: 32px'
    },
    { 
      name: 'H-LG', 
      cssVar: '--spacing-h-lg', 
      clampValue: 'clamp(24px, 4vw, 48px)',
      description: 'Min: 24px, Max: 48px'
    },
    { 
      name: 'H-XL', 
      cssVar: '--spacing-h-xl', 
      clampValue: 'clamp(32px, 5vw, 64px)',
      description: 'Min: 32px, Max: 64px'
    },
    { 
      name: 'H-2XL', 
      cssVar: '--spacing-h-2xl', 
      clampValue: 'clamp(48px, 7vw, 96px)',
      description: 'Min: 48px, Max: 96px'
    },
    { 
      name: 'H-3XL', 
      cssVar: '--spacing-h-3xl', 
      clampValue: 'clamp(64px, 10vw, 128px)',
      description: 'Min: 64px, Max: 128px'
    },
  ];

  const verticalSpacing = [
    { 
      name: 'V-XS', 
      cssVar: '--spacing-v-xs', 
      clampValue: 'clamp(4px, 0.5vh, 8px)',
      description: 'Min: 4px, Max: 8px'
    },
    { 
      name: 'V-SM', 
      cssVar: '--spacing-v-sm', 
      clampValue: 'clamp(8px, 1vh, 12px)',
      description: 'Min: 8px, Max: 12px'
    },
    { 
      name: 'V-MD', 
      cssVar: '--spacing-v-md', 
      clampValue: 'clamp(16px, 2vh, 24px)',
      description: 'Min: 16px, Max: 24px'
    },
    { 
      name: 'V-LG', 
      cssVar: '--spacing-v-lg', 
      clampValue: 'clamp(24px, 3vh, 40px)',
      description: 'Min: 24px, Max: 40px'
    },
    { 
      name: 'V-XL', 
      cssVar: '--spacing-v-xl', 
      clampValue: 'clamp(32px, 4vh, 56px)',
      description: 'Min: 32px, Max: 56px'
    },
    { 
      name: 'V-2XL', 
      cssVar: '--spacing-v-2xl', 
      clampValue: 'clamp(48px, 6vh, 80px)',
      description: 'Min: 48px, Max: 80px'
    },
    { 
      name: 'V-3XL', 
      cssVar: '--spacing-v-3xl', 
      clampValue: 'clamp(64px, 8vh, 120px)',
      description: 'Min: 64px, Max: 120px'
    },
  ];

  const combinedFluidSpacing = [
    { 
      name: 'VH-XS', 
      cssVarV: '--spacing-vh-xs-v',
      cssVarH: '--spacing-vh-xs-h',
      clampValueV: 'clamp(4px, calc(4px + 4 * ((100vh - 560px) / 240)), 8px)',
      clampValueH: 'clamp(4px, calc(4px + 4 * ((100vw - 375px) / 649)), 8px)',
      description: 'V: 4-8px (560-800px), H: 4-8px (375-1024px)',
      minV: '4px',
      maxV: '8px',
      minH: '4px',
      maxH: '8px',
      minScreenV: '560px',
      maxScreenV: '800px',
      minScreenH: '375px',
      maxScreenH: '1024px'
    },
    { 
      name: 'VH-SM', 
      cssVarV: '--spacing-vh-sm-v',
      cssVarH: '--spacing-vh-sm-h',
      clampValueV: 'clamp(8px, calc(8px + 4 * ((100vh - 560px) / 240)), 12px)',
      clampValueH: 'clamp(8px, calc(8px + 8 * ((100vw - 375px) / 649)), 16px)',
      description: 'V: 8-12px (560-800px), H: 8-16px (375-1024px)',
      minV: '8px',
      maxV: '12px',
      minH: '8px',
      maxH: '16px',
      minScreenV: '560px',
      maxScreenV: '800px',
      minScreenH: '375px',
      maxScreenH: '1024px'
    },
    { 
      name: 'VH-MD', 
      cssVarV: '--spacing-vh-md-v',
      cssVarH: '--spacing-vh-md-h',
      clampValueV: 'clamp(16px, calc(16px + 8 * ((100vh - 560px) / 240)), 24px)',
      clampValueH: 'clamp(16px, calc(16px + 16 * ((100vw - 375px) / 649)), 32px)',
      description: 'V: 16-24px (560-800px), H: 16-32px (375-1024px)',
      minV: '16px',
      maxV: '24px',
      minH: '16px',
      maxH: '32px',
      minScreenV: '560px',
      maxScreenV: '800px',
      minScreenH: '375px',
      maxScreenH: '1024px'
    },
    { 
      name: 'VH-LG', 
      cssVarV: '--spacing-vh-lg-v',
      cssVarH: '--spacing-vh-lg-h',
      clampValueV: 'clamp(24px, calc(24px + 16 * ((100vh - 560px) / 240)), 40px)',
      clampValueH: 'clamp(24px, calc(24px + 24 * ((100vw - 375px) / 649)), 48px)',
      description: 'V: 24-40px (560-800px), H: 24-48px (375-1024px)',
      minV: '24px',
      maxV: '40px',
      minH: '24px',
      maxH: '48px',
      minScreenV: '560px',
      maxScreenV: '800px',
      minScreenH: '375px',
      maxScreenH: '1024px'
    },
    { 
      name: 'VH-XL', 
      cssVarV: '--spacing-vh-xl-v',
      cssVarH: '--spacing-vh-xl-h',
      clampValueV: 'clamp(32px, calc(32px + 24 * ((100vh - 560px) / 240)), 56px)',
      clampValueH: 'clamp(32px, calc(32px + 32 * ((100vw - 375px) / 649)), 64px)',
      description: 'V: 32-56px (560-800px), H: 32-64px (375-1024px)',
      minV: '32px',
      maxV: '56px',
      minH: '32px',
      maxH: '64px',
      minScreenV: '560px',
      maxScreenV: '800px',
      minScreenH: '375px',
      maxScreenH: '1024px'
    },
    { 
      name: 'VH-2XL', 
      cssVarV: '--spacing-vh-2xl-v',
      cssVarH: '--spacing-vh-2xl-h',
      clampValueV: 'clamp(48px, calc(48px + 32 * ((100vh - 560px) / 240)), 80px)',
      clampValueH: 'clamp(48px, calc(48px + 48 * ((100vw - 375px) / 649)), 96px)',
      description: 'V: 48-80px (560-800px), H: 48-96px (375-1024px)',
      minV: '48px',
      maxV: '80px',
      minH: '48px',
      maxH: '96px',
      minScreenV: '560px',
      maxScreenV: '800px',
      minScreenH: '375px',
      maxScreenH: '1024px'
    },
    { 
      name: 'VH-3XL', 
      cssVarV: '--spacing-vh-3xl-v',
      cssVarH: '--spacing-vh-3xl-h',
      clampValueV: 'clamp(64px, calc(64px + 56 * ((100vh - 560px) / 240)), 120px)',
      clampValueH: 'clamp(64px, calc(64px + 64 * ((100vw - 375px) / 649)), 128px)',
      description: 'V: 64-120px (560-800px), H: 64-128px (375-1024px)',
      minV: '64px',
      maxV: '120px',
      minH: '64px',
      maxH: '128px',
      minScreenV: '560px',
      maxScreenV: '800px',
      minScreenH: '375px',
      maxScreenH: '1024px'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Horizontal Spacing */}
      <div>
        <h3 className="mb-4">Horizontal Spacing (Fixed)</h3>
        <p className="text-gray-600 mb-6">Material Design 8dp grid - Fixed spacing for horizontal layouts</p>
        
        <div className="space-y-4">
          {horizontalSpacing.map((spacing) => (
            <div key={spacing.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm font-medium w-16">{spacing.name}</span>
                <span className="text-sm text-gray-600">{spacing.value}</span>
                <code className="text-xs bg-white px-2 py-1 rounded">{spacing.cssVar}</code>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-300 h-8" style={{ width: spacing.value }}></div>
                <div className="bg-blue-500 h-8 w-24 flex items-center justify-center text-white text-xs">
                  Element
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Horizontal Fluid Spacing */}
      <div>
        <h3 className="mb-4">Horizontal Spacing (Fluid)</h3>
        <p className="text-gray-600 mb-6">Responsive horizontal spacing that adapts to screen width using clamp()</p>
        
        <div className="space-y-4">
          {horizontalFluidSpacing.map((spacing) => (
            <div key={spacing.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium w-16">{spacing.name}</span>
                  <code className="text-xs bg-white px-2 py-1 rounded">{spacing.cssVar}</code>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-600">{spacing.clampValue}</span>
                </div>
                <span className="text-xs text-gray-500">{spacing.description}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-300 h-8" style={{ width: spacing.clampValue }}></div>
                <div className="bg-green-600 h-8 w-24 flex items-center justify-center text-white text-xs">
                  Element
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Vertical Spacing */}
      <div>
        <h3 className="mb-4">Vertical Spacing (Fluid)</h3>
        <p className="text-gray-600 mb-6">Responsive vertical spacing that adapts to screen height using clamp()</p>
        
        <div className="space-y-4">
          {verticalSpacing.map((spacing) => (
            <div key={spacing.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium w-16">{spacing.name}</span>
                  <code className="text-xs bg-white px-2 py-1 rounded">{spacing.cssVar}</code>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-600">{spacing.clampValue}</span>
                </div>
                <span className="text-xs text-gray-500">{spacing.description}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-blue-500 h-8 w-full flex items-center justify-center text-white text-xs">
                  Element 1
                </div>
                <div className="bg-blue-300 w-full" style={{ height: spacing.clampValue }}></div>
                <div className="bg-blue-500 h-8 w-full flex items-center justify-center text-white text-xs">
                  Element 2
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Combined Fluid Spacing */}
      <div>
        <h3 className="mb-4">Combined Fluid Spacing (Vertical + Horizontal)</h3>
        <p className="text-gray-600 mb-6">Bidirectional responsive spacing - adapts to both screen height and width</p>
        
        <div className="space-y-4">
          {combinedFluidSpacing.map((spacing) => (
            <div key={spacing.name} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium w-20">{spacing.name}</span>
                  <div className="flex gap-2 flex-wrap">
                    <code className="text-xs bg-white px-2 py-1 rounded">{spacing.cssVarV}</code>
                    <code className="text-xs bg-white px-2 py-1 rounded">{spacing.cssVarH}</code>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Vertical: {spacing.clampValueV}</span>
                  <span className="text-xs text-gray-600">Horizontal: {spacing.clampValueH}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-blue-100 px-3 py-2 rounded border border-blue-300">
                    <p className="text-xs text-blue-900 font-medium">Vertical Range</p>
                    <p className="text-xs text-blue-700">Min: {spacing.minV} → Max: {spacing.maxV}</p>
                    <p className="text-xs text-blue-600 mt-1">Screen: {spacing.minScreenV} - {spacing.maxScreenV}</p>
                  </div>
                  <div className="bg-green-100 px-3 py-2 rounded border border-green-300">
                    <p className="text-xs text-green-900 font-medium">Horizontal Range</p>
                    <p className="text-xs text-green-700">Min: {spacing.minH} → Max: {spacing.maxH}</p>
                    <p className="text-xs text-green-600 mt-1">Screen: {spacing.minScreenH} - {spacing.maxScreenH}</p>
                  </div>
                </div>
              </div>
              <div 
                className="bg-purple-100 border-2 border-dashed border-purple-400 rounded flex items-center justify-center text-purple-900 text-xs font-medium transition-all duration-300" 
                style={{ 
                  padding: `${spacing.clampValueV} ${spacing.clampValueH}`
                }}>
                Content with fluid padding (resize screen to see scaling)
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Usage Guidelines */}
      <div>
        <h3 className="mb-4">Horizontal Spacing Guidelines (Fixed)</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
          <p className="text-sm"><strong>XS (4px):</strong> Tight spacing within components (icon-to-text gaps)</p>
          <p className="text-sm"><strong>SM (8px):</strong> Small gaps between related elements</p>
          <p className="text-sm"><strong>MD (16px):</strong> Default spacing, padding inside cards</p>
          <p className="text-sm"><strong>LG (24px):</strong> Section spacing, between form groups</p>
          <p className="text-sm"><strong>XL (32px):</strong> Large section breaks</p>
          <p className="text-sm"><strong>2XL (48px):</strong> Major section divisions</p>
          <p className="text-sm"><strong>3XL (64px):</strong> Page-level spacing</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Horizontal Spacing Guidelines (Fluid)</h3>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200 space-y-3">
          <p className="text-sm"><strong>H-XS:</strong> Minimal horizontal gaps between tight elements</p>
          <p className="text-sm"><strong>H-SM:</strong> Small horizontal spacing in navigation, buttons</p>
          <p className="text-sm"><strong>H-MD:</strong> Default horizontal margins for content sections</p>
          <p className="text-sm"><strong>H-LG:</strong> Comfortable side margins for cards and panels</p>
          <p className="text-sm"><strong>H-XL:</strong> Large horizontal spacing for layout columns</p>
          <p className="text-sm"><strong>H-2XL:</strong> Major horizontal section divisions</p>
          <p className="text-sm"><strong>H-3XL:</strong> Page-level horizontal spacing, container margins</p>
          <p className="text-sm text-green-900 mt-4"><strong>Note:</strong> Horizontal fluid spacing automatically adjusts based on viewport width for optimal responsiveness from iPhone SE to desktop.</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Vertical Spacing Guidelines (Fluid)</h3>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 space-y-3">
          <p className="text-sm"><strong>V-XS:</strong> Minimal vertical gaps (tight stacking)</p>
          <p className="text-sm"><strong>V-SM:</strong> Small vertical spacing between list items</p>
          <p className="text-sm"><strong>V-MD:</strong> Default vertical spacing between sections</p>
          <p className="text-sm"><strong>V-LG:</strong> Comfortable spacing for form sections</p>
          <p className="text-sm"><strong>V-XL:</strong> Large gaps between major content blocks</p>
          <p className="text-sm"><strong>V-2XL:</strong> Major vertical section divisions</p>
          <p className="text-sm"><strong>V-3XL:</strong> Page-level vertical spacing</p>
          <p className="text-sm text-blue-900 mt-4"><strong>Note:</strong> Vertical spacing automatically adjusts based on viewport height for optimal responsiveness across iPhone SE, iPad, and desktop screens.</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Combined Fluid Spacing Guidelines</h3>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 space-y-3">
          <p className="text-sm"><strong>VH-XS:</strong> Minimal padding for compact UI elements</p>
          <p className="text-sm"><strong>VH-SM:</strong> Small padding for buttons, chips, badges</p>
          <p className="text-sm"><strong>VH-MD:</strong> Default padding for cards, panels, containers</p>
          <p className="text-sm"><strong>VH-LG:</strong> Comfortable padding for main content areas</p>
          <p className="text-sm"><strong>VH-XL:</strong> Large padding for hero sections</p>
          <p className="text-sm"><strong>VH-2XL:</strong> Major padding for featured content blocks</p>
          <p className="text-sm"><strong>VH-3XL:</strong> Maximum padding for full-page sections</p>
          <p className="text-sm text-purple-900 mt-4"><strong>Use Case:</strong> Perfect for padding, margins, and gaps that need to scale proportionally in both dimensions. Ideal for containers, cards, and sections that should feel balanced across all screen sizes.</p>
          <p className="text-sm text-purple-900"><strong>Example:</strong> <code className="bg-white px-2 py-1 rounded text-xs">padding: var(--spacing-vh-md-v) var(--spacing-vh-md-h);</code></p>
        </div>
      </div>

      {/* CSS Variables Reference */}
      <div>
        <h3 className="mb-4">CSS Variables Reference</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg border border-gray-700 text-xs font-mono space-y-1">
          <p className="text-gray-400">/* Horizontal Spacing (Fixed) */</p>
          {horizontalSpacing.map((spacing) => (
            <p key={spacing.cssVar}>{spacing.cssVar}: {spacing.value};</p>
          ))}
          <p className="text-gray-400 mt-4">/* Horizontal Spacing (Fluid) */</p>
          {horizontalFluidSpacing.map((spacing) => (
            <p key={spacing.cssVar}>{spacing.cssVar}: {spacing.clampValue};</p>
          ))}
          <p className="text-gray-400 mt-4">/* Vertical Spacing (Fluid) */</p>
          {verticalSpacing.map((spacing) => (
            <p key={spacing.cssVar}>{spacing.cssVar}: {spacing.clampValue};</p>
          ))}
          <p className="text-gray-400 mt-4">/* Combined Fluid Spacing */</p>
          {combinedFluidSpacing.map((spacing) => (
            <div key={spacing.name}>
              <p>{spacing.cssVarV}: {spacing.clampValueV};</p>
              <p>{spacing.cssVarH}: {spacing.clampValueH};</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}