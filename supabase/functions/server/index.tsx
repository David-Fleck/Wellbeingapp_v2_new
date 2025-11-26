import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// 🔥 CORS: Ultra-permissive for Figma Make compatibility
// This is necessary because Figma Make environment has non-standard origin handling
app.use(
  "/*",
  cors({
    origin: '*',  // Allow all origins - required for Figma Make
    allowHeaders: [
      "Content-Type", 
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length", "Content-Type"],
    credentials: false,  // Must be false when origin is '*'
    maxAge: 600,
  }),
);

console.log('🔥 CORS: Open policy active for Figma Make compatibility');

// 🔒 SECURITY: Rate Limiting
// Simple in-memory rate limiter
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

function getRateLimitKey(c: any): string {
  // Use IP address as key
  const forwarded = c.req.header('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }
  
  if (entry.count >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  entry.count++;
  return true;
}

// Apply rate limiting middleware to all routes
app.use('/make-server-8d8d3c7a/*', async (c, next) => {
  const key = getRateLimitKey(c);
  const path = c.req.path;
  
  // Different limits for different routes
  let maxRequests = 100;
  let windowMs = 15 * 60 * 1000; // 15 minutes
  
  // Stricter limits for backup operations
  if (path.includes('/backup/')) {
    maxRequests = 20;
    windowMs = 60 * 60 * 1000; // 1 hour
  }
  
  // Stricter limits for audit operations
  if (path.includes('/audits/run')) {
    maxRequests = 5;
    windowMs = 60 * 60 * 1000; // 1 hour
  }
  
  const allowed = checkRateLimit(key, maxRequests, windowMs);
  
  if (!allowed) {
    console.warn(`🚫 Rate limit exceeded for ${key} on ${path}`);
    return c.json({ 
      success: false, 
      error: 'Too many requests. Please try again later.' 
    }, 429);
  }
  
  await next();
});

// Health check endpoint
app.get("/make-server-8d8d3c7a/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Storage bucket names
const BUCKET_LOGO = 'make-8d8d3c7a-logo';
const BUCKET_ICONS = 'make-8d8d3c7a-icons';
const BUCKET_ILLUSTRATIONS = 'make-8d8d3c7a-illustrations';
const BUCKET_DOCS = 'make-8d8d3c7a-docs';
const BUCKET_BACKUPS = 'make-8d8d3c7a-backups';

// 🔒 SECURITY: Signed URL expiry times (in seconds)
// Different timeouts based on use case
const SIGNED_URL_EXPIRY = {
  LIST: 3600,       // 1 hour for list/preview views
  DOWNLOAD: 14400,  // 4 hours for downloads (large files)
  UPLOAD: 7200,     // 2 hours for upload operations
  RESTORE: 7200,    // 2 hours for restore operations
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize storage buckets on startup
async function initializeStorageBuckets() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    
    // Create logo bucket if it doesn't exist
    const logoBucketExists = buckets?.some(bucket => bucket.name === BUCKET_LOGO);
    if (!logoBucketExists) {
      console.log(`Creating bucket: ${BUCKET_LOGO}`);
      await supabase.storage.createBucket(BUCKET_LOGO, { public: false });
    }
    
    // Create icons bucket if it doesn't exist
    const iconsBucketExists = buckets?.some(bucket => bucket.name === BUCKET_ICONS);
    if (!iconsBucketExists) {
      console.log(`Creating bucket: ${BUCKET_ICONS}`);
      await supabase.storage.createBucket(BUCKET_ICONS, { public: false });
    }
    
    // Create illustrations bucket if it doesn't exist
    const illustrationsBucketExists = buckets?.some(bucket => bucket.name === BUCKET_ILLUSTRATIONS);
    if (!illustrationsBucketExists) {
      console.log(`Creating bucket: ${BUCKET_ILLUSTRATIONS}`);
      await supabase.storage.createBucket(BUCKET_ILLUSTRATIONS, { public: false });
    }
    
    // Create docs bucket if it doesn't exist
    const docsBucketExists = buckets?.some(bucket => bucket.name === BUCKET_DOCS);
    if (!docsBucketExists) {
      console.log(`Creating bucket: ${BUCKET_DOCS}`);
      await supabase.storage.createBucket(BUCKET_DOCS, { public: false });
    }
    
    // Create backups bucket if it doesn't exist
    const backupsBucketExists = buckets?.some(bucket => bucket.name === BUCKET_BACKUPS);
    if (!backupsBucketExists) {
      console.log(`Creating bucket: ${BUCKET_BACKUPS}`);
      await supabase.storage.createBucket(BUCKET_BACKUPS, { public: false });
      
      // Add RLS policies for backups bucket (allow service role to manage backups)
      console.log(`Setting up RLS policies for ${BUCKET_BACKUPS}...`);
      // Note: RLS policies need to be set in Supabase Dashboard or via SQL
      // For now, we'll rely on service role key which bypasses RLS
    }
    
    console.log('Storage buckets initialized successfully');
    
    // Initialize audit protocol if it doesn't exist
    await initializeAuditProtocol();
  } catch (error) {
    console.error('Error initializing storage buckets:', error);
  }
}

// Initialize audit protocol in storage if it doesn't exist
async function initializeAuditProtocol() {
  try {
    console.log('Checking if audit protocol exists...');
    
    // Check if protocol file exists
    const { data: files } = await supabase.storage
      .from(BUCKET_DOCS)
      .list('', { limit: 100 });
    
    const protocolExists = files?.some(f => f.name === 'design_system_audit_protocol.json');
    
    if (!protocolExists) {
      console.log('Protocol file not found. Creating from audit-protocol-data.tsx...');
      
      // Import the protocol data
      const { AUDIT_PROTOCOL } = await import('./audit-protocol-data.tsx');
      
      // Convert to JSON and upload
      const protocolJson = JSON.stringify(AUDIT_PROTOCOL, null, 2);
      const buffer = new TextEncoder().encode(protocolJson);
      
      const { error } = await supabase.storage
        .from(BUCKET_DOCS)
        .upload('design_system_audit_protocol.json', buffer, {
          contentType: 'application/json',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading protocol:', error);
      } else {
        console.log('✅ Audit protocol initialized successfully in storage');
      }
    } else {
      console.log('✅ Audit protocol already exists in storage');
    }
  } catch (error) {
    console.error('Error initializing audit protocol:', error);
  }
}

// Initialize buckets on startup
initializeStorageBuckets();

// Helper function to get signed URLs for files
async function getSignedUrlsForBucket(bucketName: string) {
  try {
    // First check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error(`Error checking buckets:`, bucketsError);
      return [];
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      console.log(`Bucket ${bucketName} does not exist yet`);
      return [];
    }

    // List all files in the bucket
    const { data: files, error: listError } = await supabase.storage
      .from(bucketName)
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (listError) {
      console.error(`Error listing files from ${bucketName}:`, listError);
      return [];
    }

    if (!files || files.length === 0) {
      return [];
    }

    // Generate signed URLs for each file (valid for 1 hour)
    const filesWithUrls = await Promise.all(
      files
        .filter(file => !file.name.includes('.emptyFolderPlaceholder'))
        .map(async (file) => {
          try {
            const { data: signedUrlData, error: urlError } = await supabase.storage
              .from(bucketName)
              .createSignedUrl(file.name, SIGNED_URL_EXPIRY.LIST); // List views - 1 hour

            if (urlError) {
              console.error(`Error creating signed URL for ${file.name}:`, urlError);
              return null;
            }

            if (!signedUrlData?.signedUrl) {
              console.error(`No signed URL returned for ${file.name}`);
              return null;
            }

            return {
              name: file.name,
              url: signedUrlData.signedUrl,
              size: file.metadata?.size,
              createdAt: file.created_at,
              updatedAt: file.updated_at
            };
          } catch (error) {
            console.error(`Exception creating signed URL for ${file.name}:`, error);
            return null;
          }
        })
    );

    return filesWithUrls.filter(file => file !== null);
  } catch (error) {
    console.error(`Error getting signed URLs for ${bucketName}:`, error);
    return [];
  }
}

// Endpoint to get all logos
app.get("/make-server-8d8d3c7a/assets/logos", async (c) => {
  try {
    const files = await getSignedUrlsForBucket(BUCKET_LOGO);
    return c.json({ success: true, files });
  } catch (error) {
    console.error('Error fetching logos:', error);
    return c.json({ success: false, error: 'Failed to fetch logos' }, 500);
  }
});

// Endpoint to get all icons
app.get("/make-server-8d8d3c7a/assets/icons", async (c) => {
  try {
    const files = await getSignedUrlsForBucket(BUCKET_ICONS);
    return c.json({ success: true, files });
  } catch (error) {
    console.error('Error fetching icons:', error);
    return c.json({ success: false, error: 'Failed to fetch icons' }, 500);
  }
});

// Endpoint to get all illustrations
app.get("/make-server-8d8d3c7a/assets/illustrations", async (c) => {
  try {
    const files = await getSignedUrlsForBucket(BUCKET_ILLUSTRATIONS);
    return c.json({ success: true, files });
  } catch (error) {
    console.error('Error fetching illustrations:', error);
    return c.json({ success: false, error: 'Failed to fetch illustrations' }, 500);
  }
});

// ========================================
// AUDIT SYSTEM ENDPOINTS
// ========================================

// Get audit protocol from storage (MUST BE BEFORE :filename route)
app.get("/make-server-8d8d3c7a/audits/protocol", async (c) => {
  try {
    console.log('Fetching audit protocol from storage...');
    
    // First check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error checking buckets:', bucketsError);
      return c.json({ 
        success: false, 
        error: `Failed to check buckets: ${bucketsError.message}` 
      }, 500);
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_DOCS);
    if (!bucketExists) {
      console.error(`Bucket ${BUCKET_DOCS} does not exist`);
      return c.json({ 
        success: false, 
        error: `Bucket ${BUCKET_DOCS} does not exist` 
      }, 404);
    }
    
    // List all files in the docs bucket to debug
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET_DOCS)
      .list('', { limit: 100 });
    
    if (listError) {
      console.error('Error listing files:', listError);
      return c.json({ 
        success: false, 
        error: `Failed to list files: ${listError.message}` 
      }, 500);
    }
    
    console.log('Files in bucket:', files?.map(f => f.name));
    
    const protocolFile = files?.find(f => f.name === 'design_system_audit_protocol.json');
    
    if (!protocolFile) {
      console.error('Protocol file not found. Available files:', files?.map(f => f.name));
      return c.json({ 
        success: false, 
        error: 'Protocol file not found in storage. Available files: ' + (files?.map(f => f.name).join(', ') || 'none'),
        availableFiles: files?.map(f => f.name) || []
      }, 404);
    }
    
    // Get signed URL
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(BUCKET_DOCS)
      .createSignedUrl('design_system_audit_protocol.json', SIGNED_URL_EXPIRY.LIST);
    
    if (urlError || !signedUrlData?.signedUrl) {
      console.error('Error creating signed URL:', urlError);
      return c.json({ 
        success: false, 
        error: `Failed to generate signed URL: ${urlError?.message || 'Unknown error'}` 
      }, 500);
    }
    
    // 🔒 SECURITY: Signed URLs are not logged to prevent exposure
    
    // Fetch the protocol content
    const response = await fetch(signedUrlData.signedUrl);
    
    if (!response.ok) {
      console.error('Error fetching file:', response.status, response.statusText);
      return c.json({ 
        success: false, 
        error: `Failed to fetch file: ${response.status} ${response.statusText}` 
      }, 500);
    }
    
    const protocol = await response.json();
    
    console.log('Protocol fetched successfully');
    
    return c.json({ 
      success: true, 
      protocol,
      url: signedUrlData.signedUrl
    });
  } catch (error) {
    console.error('Error fetching protocol:', error);
    return c.json({ 
      success: false, 
      error: `Failed to fetch protocol: ${error.message}` 
    }, 500);
  }
});

// Get all audit logs from storage
app.get("/make-server-8d8d3c7a/audits", async (c) => {
  try {
    console.log('Fetching all audit logs from storage...');
    
    // List all files in the docs bucket
    const { data: files, error } = await supabase.storage
      .from(BUCKET_DOCS)
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });
    
    if (error) {
      console.error('Error listing files:', error);
      return c.json({ success: false, error: 'Failed to list audit files' }, 500);
    }
    
    // Filter for audit log files (audit-*.json)
    const auditFiles = files?.filter(f => f.name.startsWith('audit-') && f.name.endsWith('.json')) || [];
    
    // Get signed URLs and content for each audit file
    const audits = await Promise.all(
      auditFiles.map(async (file) => {
        try {
          // Get signed URL
          const { data: signedUrlData } = await supabase.storage
            .from(BUCKET_DOCS)
            .createSignedUrl(file.name, 3600);
          
          if (!signedUrlData?.signedUrl) {
            return null;
          }
          
          // Fetch the file content
          const response = await fetch(signedUrlData.signedUrl);
          const auditData = await response.json();
          
          return {
            ...auditData,
            fileName: file.name,
            createdAt: file.created_at,
          };
        } catch (err) {
          console.error(`Error fetching audit file ${file.name}:`, err);
          return null;
        }
      })
    );
    
    // Filter out null values
    const validAudits = audits.filter(a => a !== null);
    
    console.log(`Found ${validAudits.length} audit logs`);
    return c.json({ success: true, audits: validAudits });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return c.json({ success: false, error: 'Failed to fetch audit logs' }, 500);
  }
});

// Get a specific audit by filename
app.get("/make-server-8d8d3c7a/audits/:filename", async (c) => {
  try {
    const filename = c.req.param('filename');
    console.log(`Fetching audit: ${filename}`);
    
    // Get signed URL
    const { data: signedUrlData, error } = await supabase.storage
      .from(BUCKET_DOCS)
      .createSignedUrl(filename, 3600);
    
    if (error || !signedUrlData?.signedUrl) {
      return c.json({ success: false, error: 'Audit file not found' }, 404);
    }
    
    // Fetch the file content
    const response = await fetch(signedUrlData.signedUrl);
    const auditData = await response.json();
    
    return c.json({ success: true, audit: auditData });
  } catch (error) {
    console.error('Error fetching audit:', error);
    return c.json({ success: false, error: 'Failed to fetch audit' }, 500);
  }
});

// Store a new audit in storage
app.post("/make-server-8d8d3c7a/audits", async (c) => {
  try {
    const auditData = await c.req.json();
    console.log(`Storing new audit: ${auditData.id}`);
    
    // Validate audit data
    if (!auditData.id || !auditData.date || !auditData.version) {
      return c.json({ 
        success: false, 
        error: 'Invalid audit data: missing required fields' 
      }, 400);
    }
    
    // Create filename
    const filename = `${auditData.id}.json`;
    
    // Convert to JSON string
    const auditJson = JSON.stringify(auditData, null, 2);
    const buffer = new TextEncoder().encode(auditJson);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_DOCS)
      .upload(filename, buffer, {
        contentType: 'application/json',
        upsert: false,
      });
    
    if (error) {
      console.error('Error uploading audit:', error);
      return c.json({ 
        success: false, 
        error: `Failed to store audit: ${error.message}` 
      }, 500);
    }
    
    console.log(`✅ Audit stored successfully: ${filename}`);
    return c.json({ success: true, audit: auditData, filename });
  } catch (error) {
    console.error('Error storing audit:', error);
    return c.json({ success: false, error: 'Failed to store audit' }, 500);
  }
});

// Run a new audit
app.post("/make-server-8d8d3c7a/audits/run", async (c) => {
  try {
    console.log('🔍 Starting new design system audit...');
    
    // Import audit runner (dynamically to avoid circular dependencies)
    const { runAudit } = await import('./audit-runner.tsx');
    
    // File reader function that reads from the client-side file system
    // This is a simplified version - in production, you'd need to pass file contents
    const fileReader = async (path: string): Promise<string | null> => {
      // In this implementation, the client sends file contents
      // For a real implementation, you'd read from a file system or repository
      return null;
    };
    
    const auditResult = await runAudit(fileReader);
    
    // Store the audit result
    await kv.set(auditResult.id, auditResult);
    
    console.log(`✅ Audit complete and stored: ${auditResult.id}`);
    return c.json({ success: true, audit: auditResult });
  } catch (error) {
    console.error('Error running audit:', error);
    return c.json({ 
      success: false, 
      error: `Failed to run audit: ${error.message}` 
    }, 500);
  }
});

// Upload audit protocol document
app.post("/make-server-8d8d3c7a/audits/protocol/upload", async (c) => {
  try {
    console.log('📤 Uploading audit protocol document...');
    
    const body = await c.req.parseBody();
    const file = body['file'];
    
    // 🔒 SECURITY: File Upload Validation
    
    // 1. Validate file exists
    if (!file || !(file instanceof File)) {
      return c.json({ 
        success: false, 
        error: 'No file provided or invalid file' 
      }, 400);
    }
    
    // 2. Check file size (max 10MB for markdown/json)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      console.warn(`🚫 File too large: ${file.size} bytes (max: ${MAX_SIZE})`);
      return c.json({ 
        success: false, 
        error: `File too large. Max size: ${MAX_SIZE / 1024 / 1024}MB` 
      }, 413);
    }
    
    // 3. Validate MIME type
    const allowedTypes = ['text/markdown', 'text/plain', 'application/json'];
    if (!allowedTypes.includes(file.type)) {
      console.warn(`🚫 Invalid file type: ${file.type}`);
      return c.json({ 
        success: false, 
        error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` 
      }, 400);
    }
    
    // 4. Validate file extension
    const allowedExtensions = ['.md', '.txt', '.json'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    if (!allowedExtensions.includes(fileExtension)) {
      console.warn(`🚫 Invalid file extension: ${fileExtension}`);
      return c.json({ 
        success: false, 
        error: `Invalid file extension. Allowed: ${allowedExtensions.join(', ')}` 
      }, 400);
    }
    
    // 5. Sanitize filename to prevent path traversal
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, '_')  // Remove special chars
      .replace(/\.{2,}/g, '_')            // Prevent ../ attacks
      .slice(0, 255);                     // Limit length
    
    console.log(`✅ File validation passed: ${sanitizedName} (${file.size} bytes)`);
    
    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // 6. Validate content is not empty
    if (buffer.length === 0) {
      return c.json({ 
        success: false, 
        error: 'File is empty' 
      }, 400);
    }
    
    // Upload to Supabase Storage with sanitized name
    const { data, error } = await supabase.storage
      .from(BUCKET_DOCS)
      .upload('design-system-audit-protocol.md', buffer, {
        contentType: file.type,
        upsert: true, // Overwrite if exists
      });
    
    if (error) {
      console.error('Error uploading to storage:', error);
      return c.json({ 
        success: false, 
        error: `Failed to upload: ${error.message}` 
      }, 500);
    }
    
    console.log('✅ Protocol document uploaded successfully');
    return c.json({ 
      success: true, 
      message: 'Protocol document uploaded successfully',
      path: data.path,
      size: file.size
    });
  } catch (error) {
    console.error('Error uploading protocol:', error);
    return c.json({ 
      success: false, 
      error: `Failed to upload protocol: ${error.message}` 
    }, 500);
  }
});

// Initialize audit system (stores protocol JSON in KV store)
app.post("/make-server-8d8d3c7a/audits/initialize", async (c) => {
  try {
    console.log('🔧 Initializing audit system...');
    
    // Import the protocol data
    const { AUDIT_PROTOCOL } = await import('./audit-protocol-data.tsx');
    
    // Store the protocol in KV store
    await kv.set('audit-protocol-v1', AUDIT_PROTOCOL);
    
    console.log('✅ Audit protocol stored successfully in KV store');
    
    return c.json({ 
      success: true, 
      message: 'Audit system initialized successfully',
      protocol: {
        version: AUDIT_PROTOCOL.protocol.version,
        totalComponents: AUDIT_PROTOCOL.protocol.totalComponents,
        totalVariables: AUDIT_PROTOCOL.metadata.totalVariables
      }
    });
  } catch (error) {
    console.error('Error initializing audit system:', error);
    return c.json({ 
      success: false, 
      error: `Failed to initialize: ${error.message}` 
    }, 500);
  }
});

// Get audit protocol from KV store
app.get("/make-server-8d8d3c7a/audits/protocol/json", async (c) => {
  try {
    console.log('Fetching audit protocol from KV store...');
    
    const protocol = await kv.get('audit-protocol-v1');
    
    if (!protocol) {
      return c.json({ 
        success: false, 
        error: 'Protocol not found. Please initialize the audit system first.' 
      }, 404);
    }
    
    return c.json({ 
      success: true, 
      protocol 
    });
  } catch (error) {
    console.error('Error fetching protocol:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch protocol' 
    }, 500);
  }
});

// ========================================
// BACKUP MANAGER ENDPOINTS
// ========================================

// Create a new backup
app.post("/make-server-8d8d3c7a/backup/create", async (c) => {
  try {
    console.log('🔄 Creating new backup...');
    
    // Get all keys from KV store
    const allData = await kv.getByPrefix('');
    
    // Calculate metadata
    const totalKeys = allData.length;
    const dataJson = JSON.stringify(allData, null, 2);
    const sizeBytes = new TextEncoder().encode(dataJson).length;
    
    // Get bucket file counts
    const getBucketCount = async (bucketName: string) => {
      try {
        const { data: files } = await supabase.storage.from(bucketName).list('', { limit: 1000 });
        return files?.filter(f => !f.name.includes('.emptyFolderPlaceholder')).length || 0;
      } catch {
        return 0;
      }
    };
    
    const [logoCount, iconsCount, illustrationsCount] = await Promise.all([
      getBucketCount(BUCKET_LOGO),
      getBucketCount(BUCKET_ICONS),
      getBucketCount(BUCKET_ILLUSTRATIONS)
    ]);
    
    // Create backup object
    const timestamp = new Date().toISOString();
    const backupId = `backup-${timestamp.replace(/[:.]/g, '-').slice(0, -5)}`;
    
    const backup = {
      id: backupId,
      timestamp,
      version: 'V2-DEV',
      projectId: supabaseUrl.replace('https://', '').replace('.supabase.co', ''),
      kvStore: allData.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, any>),
      metadata: {
        totalKeys,
        sizeBytes,
        bucketsSnapshot: {
          [BUCKET_LOGO]: logoCount,
          [BUCKET_ICONS]: iconsCount,
          [BUCKET_ILLUSTRATIONS]: illustrationsCount
        }
      }
    };
    
    // Convert to JSON and upload to storage
    const backupJson = JSON.stringify(backup, null, 2);
    const buffer = new TextEncoder().encode(backupJson);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_BACKUPS)
      .upload(`${backupId}.json`, buffer, {
        contentType: 'application/json',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading backup:', error);
      return c.json({ 
        success: false, 
        error: `Failed to create backup: ${error.message}` 
      }, 500);
    }
    
    console.log(`✅ Backup created successfully: ${backupId}`);
    
    // 🔒 CLEANUP: Auto-delete old backups after creating new one
    await cleanupOldBackups();
    
    return c.json({ 
      success: true, 
      backup: {
        id: backupId,
        timestamp,
        totalKeys,
        sizeBytes
      }
    });
  } catch (error) {
    console.error('Error creating backup:', error);
    return c.json({ 
      success: false, 
      error: `Failed to create backup: ${error.message}` 
    }, 500);
  }
});

// 🔒 BACKUP RETENTION POLICY
// Automatically cleanup old backups to prevent storage bloat
const BACKUP_RETENTION_DAYS = 30;
const MAX_BACKUPS = 50;

async function cleanupOldBackups() {
  try {
    const { data: files } = await supabase.storage
      .from(BUCKET_BACKUPS)
      .list('', {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' }
      });
    
    if (!files || files.length === 0) return;
    
    const now = new Date();
    const filesToDelete: string[] = [];
    
    // Delete backups older than retention period
    for (const file of files) {
      const fileDate = new Date(file.created_at);
      const daysDiff = (now.getTime() - fileDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // Skip safety backups - they have special retention
      if (file.name.startsWith('safety-backup-')) continue;
      
      if (daysDiff > BACKUP_RETENTION_DAYS) {
        filesToDelete.push(file.name);
      }
    }
    
    // Keep only MAX_BACKUPS most recent (even if within retention period)
    const regularBackups = files.filter(f => !f.name.startsWith('safety-backup-'));
    if (regularBackups.length > MAX_BACKUPS) {
      const excess = regularBackups.slice(MAX_BACKUPS);
      filesToDelete.push(...excess.map(f => f.name));
    }
    
    // Delete in batches
    if (filesToDelete.length > 0) {
      console.log(`🧹 Cleaning up ${filesToDelete.length} old backups...`);
      await supabase.storage.from(BUCKET_BACKUPS).remove(filesToDelete);
      console.log(`✅ Cleanup complete`);
    }
  } catch (error) {
    console.error('Backup cleanup failed (non-critical):', error);
    // Don't fail the main operation
  }
}

// List all backups
app.get("/make-server-8d8d3c7a/backup/list", async (c) => {
  try {
    console.log('📋 Listing all backups...');
    
    // 🔒 PAGINATION: Support query parameters
    const page = Math.max(1, parseInt(c.req.query('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(c.req.query('limit') || '100')));
    const offset = (page - 1) * limit;
    
    // List all backup files with pagination
    const { data: files, error } = await supabase.storage
      .from(BUCKET_BACKUPS)
      .list('', {
        limit,
        offset,
        sortBy: { column: 'created_at', order: 'desc' }
      });
    
    if (error) {
      console.error('Error listing backups:', error);
      return c.json({ 
        success: false, 
        error: `Failed to list backups: ${error.message}` 
      }, 500);
    }
    
    if (!files || files.length === 0) {
      return c.json({ 
        success: true, 
        backups: [],
        pagination: { page, limit, total: 0, hasMore: false }
      });
    }
    
    // 🔒 PROMISE.ALLSETTLED: Isolate errors - one failure doesn't break all
    const backupPromises = files
      .filter(f => f.name.endsWith('.json'))
      .map(async (file) => {
        try {
          // Get signed URL
          const { data: signedUrlData } = await supabase.storage
            .from(BUCKET_BACKUPS)
            .createSignedUrl(file.name, 3600);
          
          if (!signedUrlData?.signedUrl) {
            return null;
          }
          
          // 🔒 PERFORMANCE: Only fetch metadata, not full backup
          // In future: Store metadata separately in KV for even better performance
          const response = await fetch(signedUrlData.signedUrl);
          const backupData = await response.json();
          
          return {
            id: backupData.id,
            timestamp: backupData.timestamp,
            version: backupData.version,
            totalKeys: backupData.metadata.totalKeys,
            sizeBytes: backupData.metadata.sizeBytes,
            createdAt: file.created_at
          };
        } catch (err) {
          console.error(`Error fetching backup ${file.name}:`, err);
          return null;
        }
      });
    
    const backupResults = await Promise.allSettled(backupPromises);
    
    const validBackups = backupResults
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value as {
        id: string;
        timestamp: string;
        version: string;
        totalKeys: number;
        sizeBytes: number;
        createdAt: string;
      });
    
    const totalBackups = await supabase.storage
      .from(BUCKET_BACKUPS)
      .list('', { limit: 1 });
    
    const total = totalBackups.data?.length || 0;
    const hasMore = total > page * limit;
    
    console.log(`Found ${validBackups.length} backups`);
    return c.json({ 
      success: true, 
      backups: validBackups,
      pagination: { page, limit, total, hasMore }
    });
  } catch (error) {
    console.error('Error listing backups:', error);
    return c.json({ 
      success: false, 
      error: `Failed to list backups: ${error.message}` 
    }, 500);
  }
});

// Restore a backup
app.post("/make-server-8d8d3c7a/backup/restore/:id", async (c) => {
  let safetyBackupId: string | null = null;
  
  try {
    const backupId = c.req.param('id');
    console.log(`🔄 Restoring backup: ${backupId}...`);
    
    // 🔒 STEP 1: Create automatic safety backup BEFORE any changes
    console.log('📦 Creating safety backup before restore...');
    const currentData = await kv.getByPrefix('');
    
    if (currentData.length > 0) {
      const timestamp = new Date().toISOString();
      safetyBackupId = `safety-backup-${timestamp.replace(/[:.]/g, '-').slice(0, -5)}`;
      
      const safetyBackup = {
        id: safetyBackupId,
        timestamp,
        version: 'SAFETY-BACKUP',
        projectId: supabaseUrl.replace('https://', '').replace('.supabase.co', ''),
        kvStore: currentData.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, any>),
        metadata: {
          totalKeys: currentData.length,
          sizeBytes: new TextEncoder().encode(JSON.stringify(currentData)).length,
          originalBackupId: backupId,
          bucketsSnapshot: {}
        }
      };
      
      // Upload safety backup
      const safetyJson = JSON.stringify(safetyBackup, null, 2);
      const safetyBuffer = new TextEncoder().encode(safetyJson);
      
      const { error: safetyError } = await supabase.storage
        .from(BUCKET_BACKUPS)
        .upload(`${safetyBackupId}.json`, safetyBuffer, {
          contentType: 'application/json',
          upsert: false
        });
      
      if (safetyError) {
        console.error('❌ Failed to create safety backup:', safetyError);
        return c.json({ 
          success: false, 
          error: 'Failed to create safety backup. Restore aborted for data protection.' 
        }, 500);
      }
      
      console.log(`✅ Safety backup created: ${safetyBackupId}`);
    }
    
    // 🔒 STEP 2: Fetch and validate backup to restore
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(BUCKET_BACKUPS)
      .createSignedUrl(`${backupId}.json`, 3600);
    
    if (urlError || !signedUrlData?.signedUrl) {
      return c.json({ 
        success: false, 
        error: 'Backup not found' 
      }, 404);
    }
    
    const response = await fetch(signedUrlData.signedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch backup: ${response.status}`);
    }
    
    const backup = await response.json();
    
    // Validate backup structure
    if (!backup.kvStore || typeof backup.kvStore !== 'object') {
      throw new Error('Invalid backup structure: missing or invalid kvStore');
    }
    
    console.log(`📋 Backup validated. Contains ${Object.keys(backup.kvStore).length} keys`);
    
    // 🔒 STEP 3: Perform restore operation
    console.log('🗑 Deleting current keys...');
    const keysToDelete = currentData.map(item => item.key);
    if (keysToDelete.length > 0) {
      await kv.mdel(keysToDelete);
      console.log(`✅ Deleted ${keysToDelete.length} keys`);
    }
    
    console.log('📥 Restoring backup data...');
    const keys = Object.keys(backup.kvStore);
    const values = Object.values(backup.kvStore);
    
    if (keys.length > 0) {
      await kv.mset(keys, values);
      console.log(`✅ Restored ${keys.length} keys`);
    }
    
    // 🔒 STEP 4: Verify restore operation
    console.log('🔍 Verifying restore...');
    const verifyData = await kv.getByPrefix('');
    const expectedCount = keys.length;
    const actualCount = verifyData.length;
    
    if (actualCount !== expectedCount) {
      // Verification failed! Attempt rollback
      console.error(`❌ Restore verification failed! Expected ${expectedCount} keys, found ${actualCount}`);
      console.log('🔄 Attempting rollback to safety backup...');
      
      try {
        // Rollback: Clear failed restore
        const failedKeys = verifyData.map(item => item.key);
        if (failedKeys.length > 0) {
          await kv.mdel(failedKeys);
        }
        
        // Restore from safety backup
        if (safetyBackupId) {
          const safetyKeys = Object.keys(safetyBackup.kvStore);
          const safetyValues = Object.values(safetyBackup.kvStore);
          if (safetyKeys.length > 0) {
            await kv.mset(safetyKeys, safetyValues);
          }
          
          console.log('✅ Rollback successful. Data restored from safety backup.');
        }
        
        return c.json({ 
          success: false, 
          error: `Restore verification failed. Data has been rolled back to previous state. Safety backup: ${safetyBackupId}` 
        }, 500);
      } catch (rollbackError) {
        console.error('❌ CRITICAL: Rollback failed:', rollbackError);
        return c.json({ 
          success: false, 
          error: `Restore failed and rollback failed. Please restore manually from safety backup: ${safetyBackupId}`,
          safetyBackupId 
        }, 500);
      }
    }
    
    console.log(`✅✅ Backup restored and verified successfully: ${backupId}`);
    console.log(`📦 Safety backup available: ${safetyBackupId}`);
    
    return c.json({ 
      success: true, 
      message: `Backup ${backupId} restored successfully`,
      restoredKeys: keys.length,
      safetyBackupId: safetyBackupId || undefined
    });
  } catch (error) {
    console.error('❌ Error during restore operation:', error);
    
    // Attempt rollback if safety backup exists
    if (safetyBackupId) {
      console.log('🔄 Attempting emergency rollback...');
      try {
        const currentKeys = (await kv.getByPrefix('')).map(item => item.key);
        if (currentKeys.length > 0) {
          await kv.mdel(currentKeys);
        }
        
        // Fetch and restore safety backup
        const { data: safetySignedUrl } = await supabase.storage
          .from(BUCKET_BACKUPS)
          .createSignedUrl(`${safetyBackupId}.json`, 3600);
        
        if (safetySignedUrl?.signedUrl) {
          const safetyResponse = await fetch(safetySignedUrl.signedUrl);
          const safetyBackup = await safetyResponse.json();
          
          const safetyKeys = Object.keys(safetyBackup.kvStore);
          const safetyValues = Object.values(safetyBackup.kvStore);
          if (safetyKeys.length > 0) {
            await kv.mset(safetyKeys, safetyValues);
          }
          
          console.log('✅ Emergency rollback successful');
        }
      } catch (rollbackError) {
        console.error('❌ CRITICAL: Emergency rollback failed:', rollbackError);
      }
    }
    
    return c.json({ 
      success: false, 
      error: `Failed to restore backup: ${error.message}`,
      safetyBackupId: safetyBackupId || undefined
    }, 500);
  }
});

// Delete a backup
app.delete("/make-server-8d8d3c7a/backup/delete/:id", async (c) => {
  try {
    const backupId = c.req.param('id');
    console.log(`🗑 Deleting backup: ${backupId}`);
    
    const { error } = await supabase.storage
      .from(BUCKET_BACKUPS)
      .remove([`${backupId}.json`]);
    
    if (error) {
      console.error('Error deleting backup:', error);
      return c.json({ 
        success: false, 
        error: `Failed to delete backup: ${error.message}` 
      }, 500);
    }
    
    console.log(`✅ Backup deleted successfully: ${backupId}`);
    
    return c.json({ 
      success: true, 
      message: `Backup ${backupId} deleted successfully` 
    });
  } catch (error) {
    console.error('Error deleting backup:', error);
    return c.json({ 
      success: false, 
      error: `Failed to delete backup: ${error.message}` 
    }, 500);
  }
});

// Download a backup
app.get("/make-server-8d8d3c7a/backup/download/:id", async (c) => {
  try {
    const backupId = c.req.param('id');
    console.log(`📥 Downloading backup: ${backupId}`);
    
    // Get backup file
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(BUCKET_BACKUPS)
      .createSignedUrl(`${backupId}.json`, 3600);
    
    if (urlError || !signedUrlData?.signedUrl) {
      return c.json({ 
        success: false, 
        error: 'Backup not found' 
      }, 404);
    }
    
    // Fetch backup content
    const response = await fetch(signedUrlData.signedUrl);
    const backup = await response.json();
    
    console.log(`✅ Backup downloaded successfully: ${backupId}`);
    
    return c.json({ 
      success: true, 
      backup 
    });
  } catch (error) {
    console.error('Error downloading backup:', error);
    return c.json({ 
      success: false, 
      error: `Failed to download backup: ${error.message}` 
    }, 500);
  }
});

Deno.serve(app.fetch);