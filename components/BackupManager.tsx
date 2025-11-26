import { useState, useEffect, useRef } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Button } from './ui/button';
import { AlertCircle, Download, Trash2, RotateCcw, Clock, Database } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { fetchWithRetry } from '../utils/fetchUtils';

interface Backup {
  id: string;
  timestamp: string;
  version: string;
  totalKeys: number;
  sizeBytes: number;
  createdAt: string;
}

export function BackupManager() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  
  // 🔒 MEMORY LEAK FIX: Track if component is still mounted
  const isMountedRef = useRef(true);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-8d8d3c7a`;

  useEffect(() => {
    isMountedRef.current = true;
    fetchBackups();
    
    // Cleanup function - prevents memory leaks
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchBackups = async () => {
    try {
      if (!isMountedRef.current) return;
      
      setLoading(true);
      setError(null);

      // 🔒 PERFORMANCE FIX: Removed unnecessary health check
      // Just fetch backups directly - if it fails, we'll handle the error
      
      const response = await fetchWithRetry(`${serverUrl}/backup/list`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      }, 3, 10000); // 3 retries, 10s timeout
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backup list error:', response.status);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch backups');
      }

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setBackups(data.backups || []);
      }
    } catch (err) {
      console.error('Error fetching backups:', err);
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to load backups');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const createBackup = async () => {
    try {
      if (!isMountedRef.current) return;
      
      setCreating(true);
      setError(null);

      const response = await fetchWithRetry(`${serverUrl}/backup/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      }, 3, 30000); // 3 retries, 30s timeout (backup creation can take time)

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create backup');
      }

      // Refresh list
      await fetchBackups();
      toast.success('Backup created successfully');
    } catch (err) {
      console.error('Error creating backup:', err);
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to create backup');
        toast.error('Failed to create backup');
      }
    } finally {
      if (isMountedRef.current) {
        setCreating(false);
      }
    }
  };

  const restoreBackup = async (backupId: string) => {
    try {
      setRestoring(true);
      setError(null);

      const response = await fetch(`${serverUrl}/backup/restore/${backupId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to restore backup');
      }

      // Reload page with restore confirmation parameter
      window.location.href = `/?restored=${encodeURIComponent(backupId)}`;
    } catch (err) {
      console.error('Error restoring backup:', err);
      setError(err instanceof Error ? err.message : 'Failed to restore backup');
      toast.error('Failed to restore backup');
    } finally {
      setRestoring(false);
    }
  };

  const deleteBackup = async (backupId: string) => {
    try {
      setError(null);

      const response = await fetch(`${serverUrl}/backup/delete/${backupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete backup');
      }

      // Refresh list
      await fetchBackups();
      toast.success('Backup deleted successfully');
    } catch (err) {
      console.error('Error deleting backup:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete backup');
      toast.error('Failed to delete backup');
    }
  };

  const downloadBackup = async (backupId: string) => {
    try {
      setError(null);

      const response = await fetch(`${serverUrl}/backup/download/${backupId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to download backup');
      }

      // Create blob and trigger download
      const blob = new Blob([JSON.stringify(data.backup, null, 2)], { 
        type: 'application/json' 
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${backupId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      console.log(`✅ Backup downloaded: ${backupId}`);
      toast.success('Backup downloaded successfully');
    } catch (err) {
      console.error('Error downloading backup:', err);
      setError(err instanceof Error ? err.message : 'Failed to download backup');
      toast.error('Failed to download backup');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Restore Progress Overlay */}
      {restoring && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                <Database className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="mb-2">Restoring Backup...</h3>
              <p className="text-gray-600 text-sm mb-4">
                Please wait while we restore your data. This may take a few moments.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Database Backup Manager</h1>
        <p className="text-gray-600">
          Create and manage backups of your KV Store data. Backups include all key-value pairs but not storage assets.
        </p>
      </div>

      {/* Current Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <Database className="w-6 h-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="mb-2">Current Database: V2-DEV</h3>
            <p className="text-sm text-blue-900 mb-2">
              Project ID: <code className="bg-blue-100 px-2 py-0.5 rounded">{projectId}</code>
            </p>
            <p className="text-sm text-blue-900">
              Total Backups: <strong>{backups.length}</strong>
              {backups.length > 0 && (
                <> • Last Backup: <strong>{formatDate(backups[0].timestamp)}</strong></>
              )}
            </p>
          </div>
          <Button
            onClick={createBackup}
            disabled={creating}
            className="shrink-0"
          >
            {creating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Create Backup
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-red-900">{error}</p>
          </div>
        </div>
      )}

      {/* Backups List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <h3>Backup History</h3>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading backups...</p>
          </div>
        ) : backups.length === 0 ? (
          <div className="p-12 text-center">
            <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No backups yet</p>
            <p className="text-sm text-gray-400">Click "Create Backup" to create your first backup</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {backups.map((backup) => (
              <div key={backup.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900">{backup.id}</h4>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {backup.version}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(backup.timestamp)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Database className="w-3.5 h-3.5" />
                        {backup.totalKeys} keys
                      </span>
                      <span>•</span>
                      <span>{formatSize(backup.sizeBytes)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadBackup(backup.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBackup(backup);
                        setRestoreDialogOpen(true);
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Restore
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBackup(backup);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="mb-3">Important Information</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Backups include all KV Store data (key-value pairs)</li>
          <li>• Storage assets (logos, icons, illustrations) are NOT included in backups</li>
          <li>• Restoring a backup will overwrite all current data</li>
          <li>• The page will reload automatically after restore</li>
          <li>• Backups are stored in private Supabase Storage</li>
        </ul>
      </div>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Backup?</AlertDialogTitle>
            <AlertDialogDescription>
              This will overwrite all current data with the backup from{' '}
              <strong>{selectedBackup ? formatDate(selectedBackup.timestamp) : ''}</strong>.
              <br /><br />
              This action cannot be undone. Make sure you have a recent backup of your current data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedBackup) {
                  restoreBackup(selectedBackup.id);
                  setRestoreDialogOpen(false);
                }
              }}
            >
              Yes, Restore Backup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Backup?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the backup{' '}
              <strong>{selectedBackup?.id}</strong>?
              <br /><br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedBackup) {
                  deleteBackup(selectedBackup.id);
                  setDeleteDialogOpen(false);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Delete Backup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}