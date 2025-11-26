export function BorderRadiusDisplay() {
  const radiusValues = [
    { name: 'Small', cssVar: '--radius-sm', value: '4px' },
    { name: 'Medium', cssVar: '--radius-md', value: '8px' },
    { name: 'Large', cssVar: '--radius-lg', value: '14px' },
    { name: 'X-Large', cssVar: '--radius-xl', value: '16px' },
    { name: '2X-Large', cssVar: '--radius-2xl', value: '24px' },
    { name: 'Full', cssVar: '--radius-full', value: '9999px' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4">Border Radius</h3>
        <p className="text-gray-600 mb-6">Following Material Design principles with custom values</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {radiusValues.map((radius) => (
            <div key={radius.name} className="space-y-3">
              <div 
                className="bg-blue-500 h-24 w-full flex items-center justify-center text-white"
                style={{ borderRadius: radius.value }}
              >
                {radius.name}
              </div>
              <div className="text-sm space-y-1">
                <p className="text-gray-600">Value: <span className="font-mono">{radius.value}</span></p>
                <p className="text-gray-600">CSS: <code className="text-xs bg-gray-100 px-1 rounded">{radius.cssVar}</code></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
