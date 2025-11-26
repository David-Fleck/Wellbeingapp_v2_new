/**
 * Utility to upload the audit protocol document to Supabase Storage
 * This should be run once to initialize the system
 */

import { projectId, publicAnonKey } from './supabase/info';

export async function uploadAuditProtocol() {
  try {
    console.log('📤 Uploading audit protocol to Supabase Storage...');
    
    // Read the protocol document
    const response = await fetch('/docs/design-system-audit-protocol.md');
    const protocolContent = await response.text();
    
    // Convert to blob
    const blob = new Blob([protocolContent], { type: 'text/markdown' });
    
    // Create form data
    const formData = new FormData();
    formData.append('file', blob, 'design-system-audit-protocol.md');
    
    // Upload to server (which will store in Supabase)
    const uploadResponse = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-f1d63157/audits/protocol/upload`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: formData,
      }
    );
    
    const result = await uploadResponse.json();
    
    if (result.success) {
      console.log('✅ Audit protocol uploaded successfully!');
      return true;
    } else {
      console.error('❌ Failed to upload audit protocol:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Error uploading audit protocol:', error);
    return false;
  }
}
