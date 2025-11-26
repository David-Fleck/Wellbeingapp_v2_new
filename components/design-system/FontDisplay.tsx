export function FontDisplay() {
  // NOTE: Hardcoded font sizes in this file are INTENTIONAL for documentation purposes
  // These demonstrate the Design System's typography scale and should NOT be changed
  return (
    <div className="space-y-12">
      <div>
        <h3 className="mb-6">Font Family</h3>
        <div className="space-y-3">
          <p><span className="text-gray-500">Name:</span> Geologica</p>
          <p><span className="text-gray-500">CSS Variable:</span> <code className="text-blue-600">--font-family-primary</code></p>
          <p><span className="text-gray-500">Weights:</span> 100-900 (Variable)</p>
          <p><span className="text-gray-500">Source:</span> Google Fonts</p>
          <p className="text-3xl mt-6 pt-6 border-t border-gray-200">The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-6">Headings</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Heading 1 (H1)</p>
              <p className="text-sm text-gray-400 font-mono">40px / Medium</p>
            </div>
            <h1 style={{ fontSize: '40px', lineHeight: '1.2' }}>The quick brown fox jumps</h1>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Heading 2 (H2)</p>
              <p className="text-sm text-gray-400 font-mono">32px / Medium</p>
            </div>
            <h2 style={{ fontSize: '32px', lineHeight: '1.3' }}>The quick brown fox jumps</h2>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Heading 3 (H3)</p>
              <p className="text-sm text-gray-400 font-mono">24px / Medium</p>
            </div>
            <h3 style={{ fontSize: '24px', lineHeight: '1.4' }}>The quick brown fox jumps</h3>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Heading 4 (H4)</p>
              <p className="text-sm text-gray-400 font-mono">20px / Medium</p>
            </div>
            <h4 style={{ fontSize: '20px', lineHeight: '1.4' }}>The quick brown fox jumps</h4>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Heading 5 (H5)</p>
              <p className="text-sm text-gray-400 font-mono">18px / Medium</p>
            </div>
            <h5 style={{ fontSize: '18px', lineHeight: '1.5' }}>The quick brown fox jumps</h5>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-6">Body Text - P1 (Normal / 400)</h3>
        <div className="space-y-5">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P1 XS</p>
              <p className="text-sm text-gray-400 font-mono">10px / Normal</p>
            </div>
            <p style={{ fontSize: '10px', fontWeight: 400, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P1 SM</p>
              <p className="text-sm text-gray-400 font-mono">12px / Normal</p>
            </div>
            <p style={{ fontSize: '12px', fontWeight: 400, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P1 MD</p>
              <p className="text-sm text-gray-400 font-mono">14px / Normal</p>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P1 Base</p>
              <p className="text-sm text-gray-400 font-mono">16px / Normal</p>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P1 LG</p>
              <p className="text-sm text-gray-400 font-mono">18px / Normal</p>
            </div>
            <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P1 XL</p>
              <p className="text-sm text-gray-400 font-mono">24px / Normal</p>
            </div>
            <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-6">Body Text - P2 (Light / 300)</h3>
        <div className="space-y-5">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P2 XS</p>
              <p className="text-sm text-gray-400 font-mono">10px / Light</p>
            </div>
            <p style={{ fontSize: '10px', fontWeight: 300, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P2 SM</p>
              <p className="text-sm text-gray-400 font-mono">12px / Light</p>
            </div>
            <p style={{ fontSize: '12px', fontWeight: 300, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P2 MD</p>
              <p className="text-sm text-gray-400 font-mono">14px / Light</p>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P2 Base</p>
              <p className="text-sm text-gray-400 font-mono">16px / Light</p>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P2 LG</p>
              <p className="text-sm text-gray-400 font-mono">18px / Light</p>
            </div>
            <p style={{ fontSize: '18px', fontWeight: 300, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">P2 XL</p>
              <p className="text-sm text-gray-400 font-mono">24px / Light</p>
            </div>
            <p style={{ fontSize: '24px', fontWeight: 300, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is sample body text.</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-6">Body Text - P3 (Big)</h3>
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-sm text-gray-500">P3 Big</p>
            <p className="text-sm text-gray-400 font-mono">20px / Normal</p>
          </div>
          <p style={{ fontSize: '20px', fontWeight: 400, lineHeight: '1.5' }}>The quick brown fox jumps over the lazy dog. This is a larger body text for emphasis and better readability in hero sections or important content.</p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-6">Text Links</h3>
        <div className="space-y-5">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Link Base</p>
              <p className="text-sm text-gray-400 font-mono">16px / Normal / Underline</p>
            </div>
            <a 
              href="#" 
              className="underline hover:no-underline transition-all"
              style={{ fontSize: '16px', fontWeight: 400, color: 'var(--color-primary)' }}
              onClick={(e) => e.preventDefault()}
            >
              Click here to learn more about our services
            </a>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Link Small</p>
              <p className="text-sm text-gray-400 font-mono">14px / Normal / Underline</p>
            </div>
            <a 
              href="#" 
              className="underline hover:no-underline transition-all"
              style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-primary)' }}
              onClick={(e) => e.preventDefault()}
            >
              View terms and conditions
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-6">Action Text</h3>
        <div className="space-y-5">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Action Base</p>
              <p className="text-sm text-gray-400 font-mono">16px / Medium</p>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 500, lineHeight: '1.5' }}>Submit Application</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Action Small</p>
              <p className="text-sm text-gray-400 font-mono">14px / Medium</p>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 500, lineHeight: '1.5' }}>Continue</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Action Bold</p>
              <p className="text-sm text-gray-400 font-mono">16px / Semi-Bold</p>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 600, lineHeight: '1.5' }}>Get Started Now</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-6">Captions</h3>
        <div className="space-y-5">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Caption Regular</p>
              <p className="text-sm text-gray-400 font-mono">12px / Normal</p>
            </div>
            <p style={{ fontSize: '12px', fontWeight: 400, lineHeight: '1.4', color: 'var(--color-dark-40)' }}>This is a caption text for descriptions and labels</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Caption Small</p>
              <p className="text-sm text-gray-400 font-mono">10px / Normal</p>
            </div>
            <p style={{ fontSize: '10px', fontWeight: 400, lineHeight: '1.4', color: 'var(--color-dark-40)' }}>Smallest caption for legal text and fine print</p>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm text-gray-500">Caption Medium</p>
              <p className="text-sm text-gray-400 font-mono">12px / Medium</p>
            </div>
            <p style={{ fontSize: '12px', fontWeight: 500, lineHeight: '1.4', color: 'var(--color-dark-40)' }}>Caption with emphasis for labels</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="mb-6">Font Weights</h3>
        <div className="space-y-4">
          <p style={{ fontWeight: 300 }}>Geologica Light (300)</p>
          <hr className="border-gray-100" />
          <p style={{ fontWeight: 400 }}>Geologica Regular (400)</p>
          <hr className="border-gray-100" />
          <p style={{ fontWeight: 500 }}>Geologica Medium (500)</p>
          <hr className="border-gray-100" />
          <p style={{ fontWeight: 600 }}>Geologica Semi Bold (600)</p>
          <hr className="border-gray-100" />
          <p style={{ fontWeight: 700 }}>Geologica Bold (700)</p>
        </div>
      </div>
    </div>
  );
}