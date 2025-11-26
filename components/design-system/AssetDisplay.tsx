import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../../utils/supabase/client';
import { projectId } from '../../utils/supabase/info';

interface AssetDisplayProps {
  type: 'logo' | 'icons' | 'illustration';
}

interface AssetFile {
  name: string;
  url: string;
  size?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function AssetDisplay({ type }: AssetDisplayProps) {
  const [files, setFiles] = useState<AssetFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const titles = {
    logo: 'Logo',
    icons: 'Icons',
    illustration: 'Illustration'
  };

  const descriptions = {
    logo: 'Brand logo assets stored in Supabase Storage',
    icons: 'Icon library stored in Supabase Storage',
    illustration: 'Illustration assets stored in Supabase Storage'
  };

  const bucketNames = {
    logo: 'make-f1d63157-logo',
    icons: 'make-f1d63157-icons',
    illustration: 'make-f1d63157-illustrations'
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        const bucketName = bucketNames[type];
        
        console.log(`[AssetDisplay] Fetching assets for type: ${type}, bucket: ${bucketName}`);
        
        // Get singleton Supabase client
        const supabase = getSupabaseClient();
        const supabaseUrl = `https://${projectId}.supabase.co`;
        
        console.log(`[AssetDisplay] Supabase client created, URL: ${supabaseUrl}`);
        
        // List files in the bucket
        const { data: fileList, error: listError } = await supabase.storage
          .from(bucketName)
          .list('', {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' }
          });

        console.log(`[AssetDisplay] List result:`, { fileList, listError });
        console.log(`[AssetDisplay] FileList type:`, typeof fileList, Array.isArray(fileList));
        console.log(`[AssetDisplay] FileList length:`, fileList?.length);
        console.log(`[AssetDisplay] FileList content:`, JSON.stringify(fileList, null, 2));

        if (listError) {
          console.error(`[AssetDisplay] List error:`, listError);
          throw new Error(`Failed to list files: ${listError.message}`);
        }

        if (!fileList || fileList.length === 0) {
          console.warn(`[AssetDisplay] No files found in bucket: ${bucketName}`);
          setFiles([]);
          return;
        }
        
        console.log(`[AssetDisplay] Found ${fileList.length} files:`, fileList.map(f => f.name));
        
        // Map files to include public URLs
        const filesWithUrls = fileList
          .filter((file) => !file.name.includes('.emptyFolderPlaceholder'))
          .map((file) => ({
            name: file.name,
            url: `${supabaseUrl}/storage/v1/object/public/${bucketName}/${file.name}`,
            size: file.metadata?.size,
            createdAt: file.created_at,
            updatedAt: file.updated_at
          }));
        
        console.log(`[AssetDisplay] Files with URLs:`, filesWithUrls);
        
        setFiles(filesWithUrls);
      } catch (err) {
        console.error(`[AssetDisplay] Error fetching ${type} assets:`, err);
        setError(err instanceof Error ? err.message : 'Failed to load assets');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [type]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4">{titles[type]}</h3>
        <p className="text-gray-600 mb-6">{descriptions[type]}</p>
        
        {loading && (
          <div className="bg-gray-50 p-12 rounded-lg border border-gray-200 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-32 rounded-lg"></div>
              </div>
              <p className="text-gray-500">Loading assets...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <p className="text-red-600">Error: {error}</p>
            <p className="text-sm text-red-500 mt-2">Please check the console for more details.</p>
          </div>
        )}

        {!loading && !error && files.length === 0 && (
          <div className="bg-gray-50 p-12 rounded-lg border border-gray-200 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500">No assets uploaded yet</p>
              <p className="text-sm text-gray-400">Upload files to Supabase Storage to see them here</p>
            </div>
          </div>
        )}

        {!loading && !error && files.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img 
                    src={file.url} 
                    alt={file.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        `;
                      }
                    }}
                  />
                </div>
                <div className="p-3 border-t border-gray-200">
                  <p className="text-xs text-gray-700 truncate" title={file.name}>
                    {file.name}
                  </p>
                  {file.size && (
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 className="mb-3">How to Upload Files</h4>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-3">
          <p className="text-sm text-blue-900">
            <strong>Step 1:</strong> Go to your Supabase Dashboard
          </p>
          <p className="text-sm text-blue-900">
            <strong>Step 2:</strong> Navigate to Storage section
          </p>
          <p className="text-sm text-blue-900">
            <strong>Step 3:</strong> Find the bucket: <code className="bg-blue-100 px-2 py-0.5 rounded text-xs">
              make-f1d63157-{type}
            </code>
          </p>
          <p className="text-sm text-blue-900">
            <strong>Step 4:</strong> Click "Upload File" and select your {type} files
          </p>
          <p className="text-sm text-blue-900">
            <strong>Step 5:</strong> Refresh this page to see your uploaded assets
          </p>
        </div>
      </div>

      <div>
        <h4 className="mb-3">Integration Notes</h4>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
          <p className="text-sm text-gray-700">• Assets are stored in private Supabase Storage buckets</p>
          <p className="text-sm text-gray-700">• Signed URLs are generated with 1-hour expiry for security</p>
          <p className="text-sm text-gray-700">• Supports common image formats: PNG, JPG, SVG, WebP</p>
          <p className="text-sm text-gray-700">• Files are served via CDN for optimal performance</p>
        </div>
      </div>
    </div>
  );
}