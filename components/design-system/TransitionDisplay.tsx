import { useState } from 'react';

export function TransitionDisplay() {
  const [hoveredFast, setHoveredFast] = useState(false);
  const [hoveredBase, setHoveredBase] = useState(false);
  const [hoveredSlow, setHoveredSlow] = useState(false);

  const transitions = [
    { 
      name: 'Fast', 
      cssVar: '--transition-fast', 
      value: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      description: 'Quick interactions (hover, focus states)',
      state: hoveredFast,
      setState: setHoveredFast
    },
    { 
      name: 'Base', 
      cssVar: '--transition-base', 
      value: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
      description: 'Standard animations (dropdowns, modals)',
      state: hoveredBase,
      setState: setHoveredBase
    },
    { 
      name: 'Slow', 
      cssVar: '--transition-slow', 
      value: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
      description: 'Complex transitions (page changes, slides)',
      state: hoveredSlow,
      setState: setHoveredSlow
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4">Transition System</h3>
        <p className="text-gray-600 mb-6">Material Design easing with custom timing values</p>
        
        <div className="space-y-6">
          {transitions.map((transition) => (
            <div key={transition.name} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">{transition.name}</p>
                <p className="text-xs text-gray-600 mb-2">{transition.description}</p>
                <code className="text-xs bg-white px-2 py-1 rounded block">{transition.cssVar}</code>
                <code className="text-xs bg-white px-2 py-1 rounded block mt-1">{transition.value}</code>
              </div>
              
              <div className="flex gap-4 items-center">
                <p className="text-sm text-gray-600">Hover to test:</p>
                <div
                  onMouseEnter={() => transition.setState(true)}
                  onMouseLeave={() => transition.setState(false)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer"
                  style={{
                    transform: transition.state ? 'scale(1.1)' : 'scale(1)',
                    transition: transition.value,
                    transitionProperty: 'transform, background-color'
                  }}
                >
                  Interactive Demo
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4">Easing Curve</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-sm mb-3"><strong>cubic-bezier(0.4, 0, 0.2, 1)</strong> - Material Design Standard Easing</p>
          <p className="text-sm text-gray-600">This easing curve provides natural motion with a slight acceleration at the start and deceleration at the end, commonly known as "ease-in-out" in Material Design.</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Usage Guidelines</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
          <p className="text-sm"><strong>Fast (150ms):</strong> Hover effects, button states, tooltips</p>
          <p className="text-sm"><strong>Base (250ms):</strong> Dropdown menus, modals, tabs, accordions</p>
          <p className="text-sm"><strong>Slow (350ms):</strong> Page transitions, drawer slides, complex animations</p>
        </div>
      </div>
    </div>
  );
}
