interface ColorCardProps {
  name: string;
  hex: string;
  cssVar: string;
  textColor?: string;
}

function ColorCard({ name, hex, cssVar, textColor = 'text-white' }: ColorCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <div 
        className={`h-24 flex items-center justify-center ${textColor}`}
        style={{ backgroundColor: hex }}
      >
        <span className="text-sm">{name}</span>
      </div>
      <div className="p-3 space-y-1">
        <p className="text-xs text-gray-600">HEX: <span className="font-mono">{hex}</span></p>
        <p className="text-xs text-gray-600">CSS: <code className="text-xs bg-white px-1 rounded">{cssVar}</code></p>
      </div>
    </div>
  );
}

export function ColorDisplay() {
  return (
    <div className="space-y-8 pb-8">
      {/* Primary Color */}
      <div>
        <h3 className="mb-4">Primary Color</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ColorCard 
            name="Primary" 
            hex="#003CFF" 
            cssVar="--color-primary"
          />
          <ColorCard 
            name="Secondary" 
            hex="#112D41" 
            cssVar="--color-secondary"
          />
        </div>
      </div>

      {/* Dark Colors */}
      <div>
        <h3 className="mb-4">Gray / Dark Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ColorCard 
            name="Dark 100" 
            hex="#1F2024" 
            cssVar="--color-dark-100"
          />
          <ColorCard 
            name="Dark 80" 
            hex="#1B3344" 
            cssVar="--color-dark-80"
          />
          <ColorCard 
            name="Dark 60" 
            hex="#4E585E" 
            cssVar="--color-dark-60"
          />
          <ColorCard 
            name="Dark 40" 
            hex="#8B99A4" 
            cssVar="--color-dark-40"
          />
          <ColorCard 
            name="Dark 20" 
            hex="#B6C2CB" 
            cssVar="--color-dark-20"
            textColor="text-gray-900"
          />
        </div>
      </div>

      {/* Light Colors */}
      <div>
        <h3 className="mb-4">Gray / Light Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ColorCard 
            name="Light 100" 
            hex="#CED7DE" 
            cssVar="--color-light-100"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Light 80" 
            hex="#D7E0E6" 
            cssVar="--color-light-80"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Light 60" 
            hex="#E9EFF3" 
            cssVar="--color-light-60"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Light 40" 
            hex="#F5F7F9" 
            cssVar="--color-light-40"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Light 20" 
            hex="#F8FCFF" 
            cssVar="--color-light-20"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="White" 
            hex="#FFFFFF" 
            cssVar="--color-white"
            textColor="text-gray-900"
          />
        </div>
      </div>

      {/* Success Colors */}
      <div>
        <h3 className="mb-4">System Colors - Success</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ColorCard 
            name="Success 100" 
            hex="#00F88B" 
            cssVar="--color-success-100"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Success 100 (5%)" 
            hex="rgba(0,248,139,0.05)" 
            cssVar="--color-success-100-5"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Success 66" 
            hex="#63F8B7" 
            cssVar="--color-success-66"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Success 33" 
            hex="#95F7CC" 
            cssVar="--color-success-33"
            textColor="text-gray-900"
          />
        </div>
      </div>

      {/* Warning Colors */}
      <div>
        <h3 className="mb-4">System Colors - Warning</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ColorCard 
            name="Warning 100" 
            hex="#FF8C3A" 
            cssVar="--color-warning-100"
          />
          <ColorCard 
            name="Warning 66" 
            hex="#FFA261" 
            cssVar="--color-warning-66"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Warning 33" 
            hex="#FFC499" 
            cssVar="--color-warning-33"
            textColor="text-gray-900"
          />
        </div>
      </div>

      {/* Error Colors */}
      <div>
        <h3 className="mb-4">System Colors - Error</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ColorCard 
            name="Error 100" 
            hex="#FF5E9B" 
            cssVar="--color-error-100"
          />
          <ColorCard 
            name="Error 66" 
            hex="#FF88B5" 
            cssVar="--color-error-66"
            textColor="text-gray-900"
          />
          <ColorCard 
            name="Error 33" 
            hex="#FFB2CE" 
            cssVar="--color-error-33"
            textColor="text-gray-900"
          />
        </div>
      </div>

      {/* Gradients Placeholder */}
      <div>
        <h3 className="mb-4">Gradients</h3>
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500">Gradients coming later</p>
        </div>
      </div>

      {/* EQ-Colors - Emotional Intelligence Color System */}
      <div>
        <h3 className="mb-6">EQ-Colors - Complete Emotional Intelligence Color System</h3>
        <div className="space-y-8">
          {/* Pleasure-Tradition-Nature */}
          <div>
            <h4 className="mb-4">Vergnügen-Tradition-Natur (Pleasure-Tradition-Nature)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#B1F0D4' }}
                >
                  <span className="text-sm text-gray-900">#B1F0D4</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#33BC80' }}
                >
                  <span className="text-sm text-white">#33BC80</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Creativity-Freedom */}
          <div>
            <h4 className="mb-4">Kreativität-Freiheit (Creativity-Freedom)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#C0FF9E' }}
                >
                  <span className="text-sm text-gray-900">#C0FF9E</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#61D125' }}
                >
                  <span className="text-sm text-white">#61D125</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Health-Logic */}
          <div>
            <h4 className="mb-4">Gesundheit-Logik (Health-Logic)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#F18BB2' }}
                >
                  <span className="text-sm text-white">#F18BB2</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#F15993' }}
                >
                  <span className="text-sm text-white">#F15993</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Enjoyment-Values-Love */}
          <div>
            <h4 className="mb-4">Genuss-Werte-Liebe (Enjoyment-Values-Love)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#FFA9B0' }}
                >
                  <span className="text-sm text-white">#FFA9B0</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#E9505D' }}
                >
                  <span className="text-sm text-white">#E9505D</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Success-Structure */}
          <div>
            <h4 className="mb-4">Erfolg-Struktur (Success-Structure)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#FF9BE7' }}
                >
                  <span className="text-sm text-white">#FF9BE7</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#E656C3' }}
                >
                  <span className="text-sm text-white">#E656C3</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Care-Legacy */}
          <div>
            <h4 className="mb-4">Fürsorge-Hinterlassen (Care-Legacy)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#A5EDED' }}
                >
                  <span className="text-sm text-gray-900">#A5EDED</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#3BC5C5' }}
                >
                  <span className="text-sm text-white">#3BC5C5</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Relaxation-Contribution */}
          <div>
            <h4 className="mb-4">Entspannung-Beitrag (Relaxation-Contribution)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#AEB8F3' }}
                >
                  <span className="text-sm text-white">#AEB8F3</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#4C66EC' }}
                >
                  <span className="text-sm text-white">#4C66EC</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Self-awareness-Groundedness */}
          <div>
            <h4 className="mb-4">Selbsterkenntnis-Bodenständigkeit (Self-awareness-Groundedness)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#98D4F7' }}
                >
                  <span className="text-sm text-gray-900">#98D4F7</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#50B7F2' }}
                >
                  <span className="text-sm text-white">#50B7F2</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Community-Power */}
          <div>
            <h4 className="mb-4">Gemeinschaft-Macht (Community-Power)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#FFBE8E' }}
                >
                  <span className="text-sm text-white">#FFBE8E</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#F59855' }}
                >
                  <span className="text-sm text-white">#F59855</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Curiosity-Mindfulness */}
          <div>
            <h4 className="mb-4">Neugierde-Achtsamkeit (Curiosity-Mindfulness)</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#FFF07E' }}
                >
                  <span className="text-sm text-gray-900">#FFF07E</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Dark</p>
                <div 
                  className="h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#F8E33B' }}
                >
                  <span className="text-sm text-gray-900">#F8E33B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}