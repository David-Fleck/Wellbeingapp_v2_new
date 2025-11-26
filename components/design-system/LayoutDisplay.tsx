export function LayoutDisplay() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4">Mobile Layout System</h3>
        <p className="text-gray-600 mb-6">Based on Material Design principles for mobile-first applications</p>
        
        <div className="space-y-6">
          {/* Container Widths */}
          <div>
            <h4 className="mb-3">Container Widths</h4>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm mb-2"><strong>Mobile (320px - 767px)</strong></p>
                <p className="text-xs text-gray-600">Full width with 16px horizontal padding</p>
                <div className="mt-2 bg-blue-500 h-12 rounded" style={{ width: '100%', padding: '0 16px' }}>
                  <div className="bg-blue-600 h-full rounded"></div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm mb-2"><strong>Tablet (768px - 1023px)</strong></p>
                <p className="text-xs text-gray-600">Full width with 24px horizontal padding</p>
                <div className="mt-2 bg-blue-500 h-12 rounded" style={{ width: '100%', padding: '0 24px' }}>
                  <div className="bg-blue-600 h-full rounded"></div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm mb-2"><strong>Desktop (1024px+)</strong></p>
                <p className="text-xs text-gray-600">Max-width: 1200px, centered with auto margins</p>
                <div className="mt-2 bg-blue-500 h-12 rounded mx-auto" style={{ maxWidth: '600px' }}>
                </div>
              </div>
            </div>
          </div>

          {/* Grid System */}
          <div>
            <h4 className="mb-3">Grid System</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm mb-3"><strong>12-Column Grid</strong></p>
              <div className="grid grid-cols-12 gap-2 mb-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-blue-500 h-8 rounded"></div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mb-2">• Column gap: 8px (mobile), 16px (tablet+)</p>
              <p className="text-xs text-gray-600">• Responsive: Stack on mobile, flexible on tablet/desktop</p>
            </div>
          </div>

          {/* Breakpoints */}
          <div>
            <h4 className="mb-3">Breakpoints</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Mobile (XS)</span>
                <span className="text-xs text-gray-600">0px - 639px</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Mobile (SM)</span>
                <span className="text-xs text-gray-600">640px - 767px</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tablet (MD)</span>
                <span className="text-xs text-gray-600">768px - 1023px</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Desktop (LG)</span>
                <span className="text-xs text-gray-600">1024px - 1279px</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Desktop (XL)</span>
                <span className="text-xs text-gray-600">1280px+</span>
              </div>
            </div>
          </div>

          {/* Safe Areas */}
          <div>
            <h4 className="mb-3">Safe Areas (iOS)</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-3">Account for notches and home indicators on modern devices</p>
              <code className="text-xs bg-white px-2 py-1 rounded block">padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
