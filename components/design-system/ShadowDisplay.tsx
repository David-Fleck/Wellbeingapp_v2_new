export function ShadowDisplay() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4">Shadow System</h3>
        <p className="text-gray-600 mb-6">Drop shadows for elevation and depth</p>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="mb-4 text-sm text-gray-600">Drop Shadow 1</p>
            <div className="flex flex-col gap-4">
              <div 
                className="bg-white p-6 rounded-lg w-full max-w-xs"
                style={{ boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.2)' }}
              >
                <p className="text-gray-800">Card with DropShadow1</p>
              </div>
              <div className="text-sm space-y-1 text-gray-700">
                <p>• Position: x: 0, y: 0</p>
                <p>• Blur: 8.0px</p>
                <p>• Spread: 0px</p>
                <p>• Color: #000000 (20% opacity)</p>
                <p className="mt-2">• CSS Variable: <code className="bg-white px-2 py-1 rounded text-xs">--shadow-1</code></p>
                <p>• CSS Value: <code className="bg-white px-2 py-1 rounded text-xs">0px 0px 8px 0px rgba(0, 0, 0, 0.2)</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Usage Examples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            className="bg-white p-6 rounded-lg"
            style={{ boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.2)' }}
          >
            <h4 className="mb-2">Card Component</h4>
            <p className="text-sm text-gray-600">Using DropShadow1 for subtle elevation</p>
          </div>
          <div 
            className="bg-white p-6 rounded-lg"
            style={{ boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.2)' }}
          >
            <h4 className="mb-2">Modal Dialog</h4>
            <p className="text-sm text-gray-600">Using DropShadow1 for depth</p>
          </div>
        </div>
      </div>
    </div>
  );
}
