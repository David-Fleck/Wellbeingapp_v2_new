# 📍 Where to Find Audit Data in Supabase

This guide shows you exactly where all audit-related data is stored in your Supabase project.

---

## 🗄️ **Supabase KV Store (Database Table: `kv_store_f1d63157`)**

All audit data is stored in the **Key-Value Store** table. Here's how to access it:

### **Step 1: Access Your Supabase Dashboard**
1. Go to: `https://supabase.com/dashboard`
2. Select your project
3. Click **"Table Editor"** in the left sidebar

### **Step 2: Open the KV Store Table**
- Table name: `kv_store_f1d63157`
- This table has two columns:
  - `key` (text) - The unique identifier
  - `value` (jsonb) - The actual data stored as JSON

---

## 📋 **Audit Protocol Location**

### **Key:** `audit-protocol-v1`

**What it contains:**
- Complete audit instructions
- All 212+ design system variables
- Detection patterns (pixel values, icon sizes, opacity, etc.)
- Severity levels (critical, high, medium, low)
- Component definitions (19 components)
- Value mappings (hardcoded → design system variable)
- Remediation guidelines
- Special cases and exemptions

**How to view:**
1. Open `kv_store_f1d63157` table
2. Look for row where `key` = `audit-protocol-v1`
3. Click on the `value` column to view the full JSON

**Or via SQL:**
```sql
SELECT * FROM kv_store_f1d63157 WHERE key = 'audit-protocol-v1';
```

**Or via API:**
```bash
GET https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-f1d63157/audits/protocol/json
Authorization: Bearer YOUR_ANON_KEY
```

---

## 📊 **Audit Logs Location**

### **Key Pattern:** `audit-{timestamp}-{random}`

Example keys:
- `audit-1732089600000-123`
- `audit-1732089700000-456`
- `audit-1732089800000-789`

**What each audit contains:**
```json
{
  "id": "audit-1732089600000-123",
  "date": "2024-11-20",
  "version": "v1.0.0",
  "compliance": 79,
  "discrepancies": [
    {
      "component": "Modal",
      "issues": [
        "Line 36: width: '400px' - HARDCODED (should use var(--modal-size-sm))",
        "Line 53: zIndex: 1000 - HARDCODED (should use var(--z-index-modal))"
      ]
    }
  ],
  "summary": {
    "totalComponents": 19,
    "componentsWithIssues": 2,
    "totalIssues": 17
  }
}
```

**How to view all audits:**
1. Open `kv_store_f1d63157` table
2. Filter where `key` STARTS WITH `audit-`
3. Sort by `key` (descending) to see most recent first

**Or via SQL:**
```sql
SELECT * FROM kv_store_f1d63157 
WHERE key LIKE 'audit-%' 
ORDER BY key DESC;
```

**Or via API:**
```bash
GET https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-f1d63157/audits
Authorization: Bearer YOUR_ANON_KEY
```

---

## 🔍 **Quick Search Queries**

### **View All Audit-Related Keys**
```sql
SELECT key FROM kv_store_f1d63157 
WHERE key LIKE 'audit%' 
ORDER BY key;
```

### **Count Total Audits**
```sql
SELECT COUNT(*) FROM kv_store_f1d63157 
WHERE key LIKE 'audit-_%';
```

### **Get Latest Audit**
```sql
SELECT * FROM kv_store_f1d63157 
WHERE key LIKE 'audit-_%' 
ORDER BY key DESC 
LIMIT 1;
```

### **Get Protocol Version**
```sql
SELECT value->>'protocol'->>'version' as version 
FROM kv_store_f1d63157 
WHERE key = 'audit-protocol-v1';
```

---

## 📂 **Supabase Storage (Optional - for Markdown Protocol)**

If you uploaded the `.md` file version:

### **Bucket:** `make-f1d63157-docs`

**Location in Dashboard:**
1. Click **"Storage"** in left sidebar
2. Look for bucket: `make-f1d63157-docs`
3. File: `design-system-audit-protocol.md`

**Note:** The JSON protocol in KV store is the main source. The markdown file is optional for human reading.

---

## 🚀 **API Endpoints Summary**

All endpoints use base URL:
```
https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-f1d63157
```

### **Initialize System**
```bash
POST /audits/initialize
```
Stores the protocol JSON in KV store

### **Get Protocol**
```bash
GET /audits/protocol/json
```
Returns the complete protocol JSON

### **Get All Audits**
```bash
GET /audits
```
Returns array of all audit logs

### **Get Specific Audit**
```bash
GET /audits/{audit-id}
```
Returns a single audit by ID

### **Run New Audit**
```bash
POST /audits/run
```
Executes audit and stores results

### **Store Audit**
```bash
POST /audits
Body: { audit JSON }
```
Manually store an audit

---

## 🎯 **Example: View Your Data**

### **Using Supabase Dashboard:**

1. **Go to Table Editor** → `kv_store_f1d63157`

2. **View Protocol:**
   - Find row: `audit-protocol-v1`
   - Click to expand JSON

3. **View Audits:**
   - Find rows starting with: `audit-`
   - Each row is one audit run
   - Click to see full report

### **Using SQL Editor:**

1. **Go to SQL Editor** in dashboard

2. **Run this query:**
```sql
-- Get everything
SELECT 
  key,
  value->>'date' as audit_date,
  value->>'compliance' as compliance,
  value->'summary'->>'totalIssues' as total_issues
FROM kv_store_f1d63157
WHERE key LIKE 'audit-_%'
ORDER BY key DESC;
```

---

## 📱 **Access from Frontend**

The `AuditsDisplay` component automatically fetches and displays all this data!

**Location:** `/components/design-system/AuditsDisplay.tsx`

**What it does:**
- Fetches all audits from Supabase on page load
- Displays in sortable table
- Shows compliance percentages
- Allows viewing full reports
- Enables copying reports to clipboard

---

## 🔐 **Security Note**

- All data is stored in your private Supabase project
- Only accessible with your project credentials
- The KV store table is protected by Row Level Security (RLS)
- API endpoints require authentication token

---

## 📊 **Data Structure Diagram**

```
Supabase Project
│
├── Table: kv_store_f1d63157
│   │
│   ├── audit-protocol-v1 (JSON)
│   │   ├── protocol { version, description, totalComponents }
│   │   ├── instructions { overview, objectives, auditProcess }
│   │   ├── components [19 component definitions]
│   │   ├── designSystemVariables { 212+ variables }
│   │   ├── detectionPatterns { 8 pattern types }
│   │   ├── valueMapping { hardcoded → CSS var mappings }
│   │   └── metadata { version history, AI instructions }
│   │
│   ├── audit-1732089600000-123 (JSON)
│   │   ├── id, date, version, compliance
│   │   ├── discrepancies [array of component issues]
│   │   └── summary { totalComponents, totalIssues }
│   │
│   ├── audit-1732089700000-456 (JSON)
│   │   └── ... (same structure)
│   │
│   └── ... (more audits)
│
└── Storage Bucket: make-f1d63157-docs (optional)
    └── design-system-audit-protocol.md
```

---

## ✅ **Checklist: Verify Everything is Stored**

- [ ] Open Supabase Dashboard
- [ ] Go to Table Editor → `kv_store_f1d63157`
- [ ] Confirm `audit-protocol-v1` exists (click to view JSON)
- [ ] Run an audit from the UI
- [ ] Refresh table and see new `audit-{timestamp}` entry
- [ ] View audit in UI (should match database)

---

## 🆘 **Troubleshooting**

**Q: I don't see the protocol in the database**
- Click "Initialize Audit Protocol" button in the UI
- Or call: `POST /audits/initialize` endpoint

**Q: Audits aren't saving**
- Check browser console for errors
- Verify Supabase credentials in `/utils/supabase/info.tsx`
- Check server logs in Supabase Functions dashboard

**Q: Can't access the table**
- Make sure you're logged into the correct Supabase project
- Check that `kv_store_f1d63157` table exists
- Verify your project has the edge function deployed

---

## 🎉 **That's It!**

All audit data is now stored persistently in Supabase and survives across:
- ✅ Page refreshes
- ✅ Browser restarts  
- ✅ Deployments
- ✅ Team collaboration (everyone sees same data)

**Key Takeaway:**
- **Protocol:** `audit-protocol-v1` in KV store
- **Audit Logs:** `audit-{timestamp}-{random}` in KV store
- **Access:** Supabase Dashboard → Table Editor → `kv_store_f1d63157`
