export function BorderDisplay() {
  const borderWidths = [
    { name: 'Thin', cssVar: '--border-width-thin', value: '1px' },
    { name: 'Default', cssVar: '--border-width-default', value: '2px', isDefault: true },
    { name: 'Medium', cssVar: '--border-width-medium', value: '3px' },
    { name: 'Thick', cssVar: '--border-width-thick', value: '4px' },
  ];

  const borderStyles = [
    { name: 'Solid', cssVar: '--border-style-solid', value: 'solid', isDefault: true },
    { name: 'Dashed', cssVar: '--border-style-dashed', value: 'dashed' },
    { name: 'Dotted', cssVar: '--border-style-dotted', value: 'dotted' },
  ];

  const borderColors = [
    { name: 'Default', cssVar: '--border-color-default', value: 'var(--color-dark-20)', hex: '#B6C2CB' },
    { name: 'Light', cssVar: '--border-color-light', value: 'var(--color-light-100)', hex: '#CED7DE' },
    { name: 'Dark', cssVar: '--border-color-dark', value: 'var(--color-dark-40)', hex: '#8B99A4' },
    { name: 'Primary', cssVar: '--border-color-primary', value: 'var(--color-primary)', hex: '#003CFF' },
    { name: 'Success', cssVar: '--border-color-success', value: 'var(--color-success-100)', hex: '#00F88B' },
    { name: 'Warning', cssVar: '--border-color-warning', value: 'var(--color-warning-100)', hex: '#FF8C3A' },
    { name: 'Error', cssVar: '--border-color-error', value: 'var(--color-error-100)', hex: '#FF5E9B' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Border Widths */}
      <div>
        <h3 className="mb-4">Border Widths</h3>
        <p className="text-gray-600 mb-6">2px is the default border width across the system</p>
        
        <div className="space-y-4">
          {borderWidths.map((border) => (
            <div key={border.name} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium w-24">{border.name}</span>
                <span className="text-sm text-gray-600">{border.value}</span>
                <code className="text-xs bg-white px-2 py-1 rounded">{border.cssVar}</code>
                {border.isDefault && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Default</span>
                )}
              </div>
              <div className="flex gap-4">
                <div 
                  className="bg-white p-6 rounded"
                  style={{ 
                    border: `${border.value} solid var(--color-dark-40)`,
                    minWidth: '150px'
                  }}
                >
                  <p className="text-sm text-center">Example</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Border Styles */}
      <div>
        <h3 className="mb-4">Border Styles</h3>
        <p className="text-gray-600 mb-6">Solid is the default style, with dashed and dotted for special cases</p>
        
        <div className="space-y-4">
          {borderStyles.map((border) => (
            <div key={border.name} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium w-24">{border.name}</span>
                <span className="text-sm text-gray-600">{border.value}</span>
                <code className="text-xs bg-white px-2 py-1 rounded">{border.cssVar}</code>
                {border.isDefault && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Default</span>
                )}
              </div>
              <div className="flex gap-4">
                <div 
                  className="bg-white p-6 rounded"
                  style={{ 
                    border: `2px ${border.value} var(--color-dark-40)`,
                    minWidth: '150px'
                  }}
                >
                  <p className="text-sm text-center">Example</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Border Colors */}
      <div>
        <h3 className="mb-4">Border Colors</h3>
        <p className="text-gray-600 mb-6">Semantic border colors mapped to the color system</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {borderColors.map((border) => (
            <div key={border.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">{border.name}</p>
                <code className="text-xs bg-white px-2 py-1 rounded block mb-1">{border.cssVar}</code>
                <p className="text-xs text-gray-600">Value: {border.value}</p>
                <p className="text-xs text-gray-600">HEX: {border.hex}</p>
              </div>
              <div 
                className="bg-white p-4 rounded"
                style={{ 
                  border: `2px solid ${border.hex}`
                }}
              >
                <p className="text-xs text-center text-gray-700">Border Example</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Combined Examples */}
      <div>
        <h3 className="mb-4">Combined Border Examples</h3>
        <p className="text-gray-600 mb-6">Common border combinations used in components</p>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-sm font-medium mb-4">Default Component Border</p>
            <div 
              className="bg-white p-6 rounded-lg"
              style={{ 
                border: '2px solid var(--color-dark-20)'
              }}
            >
              <p className="text-sm">2px solid border with default color (#B6C2CB)</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                border: var(--border-width-default) var(--border-style-solid) var(--border-color-default);
              </code>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-sm font-medium mb-4">Input Field States</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-2">Default</p>
                <div 
                  className="bg-white p-4 rounded-lg"
                  style={{ border: '2px solid var(--color-dark-20)' }}
                >
                  <p className="text-xs">Normal state</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Success</p>
                <div 
                  className="bg-white p-4 rounded-lg"
                  style={{ border: '2px solid var(--color-success-100)' }}
                >
                  <p className="text-xs">Valid input</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Error</p>
                <div 
                  className="bg-white p-4 rounded-lg"
                  style={{ border: '2px solid var(--color-error-100)' }}
                >
                  <p className="text-xs">Invalid input</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-sm font-medium mb-4">Dashed Borders (Dropzones, Placeholders)</p>
            <div 
              className="bg-white p-8 rounded-lg"
              style={{ 
                border: '2px dashed var(--color-dark-40)'
              }}
            >
              <p className="text-sm text-center text-gray-600">Drag & Drop Zone</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block text-center">
                border: var(--border-width-default) var(--border-style-dashed) var(--border-color-dark);
              </code>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Usage Guidelines */}
      <div>
        <h3 className="mb-4">Usage Guidelines</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
          <p className="text-sm"><strong>Default (2px solid):</strong> Standard borders for cards, inputs, buttons, containers</p>
          <p className="text-sm"><strong>Thin (1px solid):</strong> Subtle dividers, table borders, secondary elements</p>
          <p className="text-sm"><strong>Medium (3px solid):</strong> Emphasized borders, focus states, selected items</p>
          <p className="text-sm"><strong>Thick (4px solid):</strong> Strong emphasis, indicators, highlighted sections</p>
          <p className="text-sm"><strong>Dashed (2px dashed):</strong> Drag zones, placeholder areas, optional sections</p>
          <p className="text-sm"><strong>Dotted (2px dotted):</strong> Temporary states, guides, hints</p>
        </div>
      </div>

      {/* CSS Variables Reference */}
      <div>
        <h3 className="mb-4">CSS Variables Reference</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg border border-gray-700 text-xs font-mono space-y-1">
          <p className="text-gray-400">/* Border Widths */</p>
          {borderWidths.map((border) => (
            <p key={border.cssVar}>{border.cssVar}: {border.value};</p>
          ))}
          <p className="text-gray-400 mt-4">/* Border Styles */</p>
          {borderStyles.map((border) => (
            <p key={border.cssVar}>{border.cssVar}: {border.value};</p>
          ))}
          <p className="text-gray-400 mt-4">/* Border Colors */</p>
          {borderColors.map((border) => (
            <p key={border.cssVar}>{border.cssVar}: {border.value};</p>
          ))}
        </div>
      </div>
    </div>
  );
}
