import { useState } from 'react';
import { InputField } from '../components/library/InputField';
import { Button } from '../components/library/Button';
import { Mail, Lock } from 'lucide-react';

interface LoginScreenProps {
  onNavigateToDesignSystem?: () => void;
}

export function LoginScreen({ onNavigateToDesignSystem }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented later
    console.log('Login attempt:', { email, password });
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundColor: 'var(--color-white)',
        padding: `var(--spacing-vh-xl-v) var(--spacing-vh-xl-h)`,
      }}
    >
      {/* Combined Fluid Spacing VH-XL (top) - applied via padding above */}
      
      {/* Login Form Container */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-lg)',
          maxWidth: '400px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* H2 Title */}
        <h2 style={{ alignSelf: 'flex-start', width: '100%' }}>Log-in</h2>
        
        {/* Login Form */}
        <form 
          onSubmit={handleLogin}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-md)',
            width: '100%',
          }}
        >
          {/* Full Width Email Input */}
          <InputField
            type="email"
            label="E-Mail"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-5 h-5" />}
            fullWidth
            required
          />
          
          {/* Full Width Password Input */}
          <InputField
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-5 h-5" />}
            fullWidth
            required
          />
          
          {/* Login Button */}
          <Button 
            type="submit" 
            variant="primary" 
            size="md"
            fullWidth
            style={{ marginTop: 'var(--spacing-md)' }}
          >
            Log in
          </Button>
        </form>
      </div>
      
      {/* Combined Fluid Spacing VH-XL (middle) */}
      <div style={{ height: 'var(--spacing-vh-xl-v)' }} />
      
      {/* Logo Section */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-md)',
          marginTop: 'auto',
        }}
      >
        {/* Logo+Slogan 1.svg */}
        <img 
          src="https://euaegjptuiwnaymxvavx.supabase.co/storage/v1/object/public/make-f1d63157-logo/Logo+Slogan%201.svg"
          alt="Logo"
          style={{
            maxWidth: '200px',
            width: '100%',
            height: 'auto',
          }}
        />
        
        {/* Ghost Button to Design System */}
        {onNavigateToDesignSystem && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onNavigateToDesignSystem}
          >
            design
          </Button>
        )}
      </div>
    </div>
  );
}