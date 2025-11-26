import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  code: string;
  language?: string;
}

export function CodeViewerDialog({ 
  open, 
  onOpenChange, 
  title, 
  code,
  language = 'tsx'
}: CodeViewerDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              style={{
                fontFamily: 'var(--font-family-primary)',
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" style={{ color: 'var(--color-success-100)' }} />
                  <span style={{ color: 'var(--color-success-100)' }}>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <DialogDescription className="sr-only">
            Component source code for {title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto rounded-lg" style={{ backgroundColor: 'var(--color-dark-100)' }}>
          <pre className="p-4 text-sm overflow-x-auto">
            <code style={{ 
              fontFamily: 'monospace',
              color: 'var(--color-light-100)',
              lineHeight: '1.6'
            }}>
              {code}
            </code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}