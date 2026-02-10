# Where to Find Your Supabase Credentials for Vercel

## Your Current Credentials

Your project is already connected to Supabase. Here's what you need to copy to Vercel:

### Location 1: Your .env File
```
File: /project/.env

Content:
VITE_SUPABASE_URL=https://ueatjffjshxrdqetldse.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Copy these two values** to Vercel Environment Variables.

---

## How to Get Credentials from Supabase Dashboard

If you need to find them in Supabase:

### Step 1: Go to Supabase Dashboard
```
https://app.supabase.com
```

### Step 2: Select Your Project
```
Project Name: ueatjffjshxrdqetldse
```

### Step 3: Go to Project Settings
```
Click "Settings" icon (bottom left)
  └─ Or click gear icon in top right
```

### Step 4: Navigate to API Section
```
Left Sidebar:
  ├─ Configuration
  │  └─ API (CLICK HERE)
  │
  └─ You'll see:
     ├─ Project URL (this is VITE_SUPABASE_URL)
     └─ API Keys (this is VITE_SUPABASE_ANON_KEY)
```

### Visual Location Guide

```
Supabase Dashboard
│
├─ Your Project: ueatjffjshxrdqetldse
│  │
│  ├─ Settings (bottom left icon)
│  │  │
│  │  └─ Configuration → API
│  │     │
│  │     ├─ Project URL
│  │     │  └─ https://ueatjffjshxrdqetldse.supabase.co
│  │     │     (this is VITE_SUPABASE_URL)
│  │     │
│  │     └─ API Keys
│  │        ├─ anon (public)
│  │        │  └─ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
│  │        │     (this is VITE_SUPABASE_ANON_KEY)
│  │        │
│  │        └─ service_role (secret - don't use this)
│  │           └─ (more secret key)
```

---

## Copying Credentials Step by Step

### Getting VITE_SUPABASE_URL

```
1. Open Supabase Dashboard
   └─ https://app.supabase.com

2. Click your project
   └─ ueatjffjshxrdqetldse

3. Click Settings (gear icon, bottom left)

4. Click Configuration → API

5. Find "Project URL" section
   └─ You'll see: https://ueatjffjshxrdqetldse.supabase.co

6. Click the copy icon (or triple-click to select)
   └─ URL is copied to clipboard

7. Go to Vercel → Environment Variables
   └─ Paste here
```

### Getting VITE_SUPABASE_ANON_KEY

```
1. Same location as above (Supabase Settings → API)

2. Find "API Keys" section
   └─ You'll see "anon" (public)

3. Below "anon", there's a long key starting with:
   └─ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

4. Click the copy icon next to it
   └─ Key is copied to clipboard

5. Go to Vercel → Environment Variables
   └─ Paste here

⚠️ NOTE: Copy the "anon" key, NOT "service_role"
```

---

## For Your Reference

Your Project Details:
```
Project ID: ueatjffjshxrdqetldse
Database: postgres
Region: [region shown in Supabase]
URL: https://ueatjffjshxrdqetldse.supabase.co
```

---

## Multiple Ways to Access Credentials

### Method 1: From .env File (Easiest)
```bash
# Already on your computer
cat .env

# Copy these values
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### Method 2: From Supabase Dashboard
```
1. Supabase: https://app.supabase.com
2. Click project
3. Settings → API
4. Copy URL and anon key
```

### Method 3: From CLI (If installed)
```bash
# List all supabase projects
supabase projects list

# Get specific project info
supabase projects describe --project-ref ueatjffjshxrdqetldse
```

---

## What Each Variable Does

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_SUPABASE_URL` | Database endpoint | `https://ueatjffjshxrdqetldse.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public auth key | `eyJhbGc...` (long string) |

**Important Distinctions:**
- `anon` key = Public (safe to expose in frontend)
- `service_role` key = Secret (never expose to frontend)

**For Vercel, always use the `anon` key**

---

## In Vercel Environment Variables

```
Add both to Vercel Settings → Environment Variables

Variable 1:
┌─────────────────────────────────────────┐
│ VITE_SUPABASE_URL                       │
│ https://ueatjffjshxrdqetldse.supabase.co│
│ Scope: ☑ Prod ☑ Preview ☑ Dev          │
└─────────────────────────────────────────┘

Variable 2:
┌─────────────────────────────────────────┐
│ VITE_SUPABASE_ANON_KEY                  │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6Ik... [long] │
│ Scope: ☑ Prod ☑ Preview ☑ Dev          │
└─────────────────────────────────────────┘
```

---

## Common Mistakes to Avoid

❌ **DON'T:**
- Copy the service_role key (it's secret)
- Add extra spaces before/after values
- Use only some scopes (Production only won't work)
- Forget to redeploy after adding variables

✅ **DO:**
- Copy the anon key (public, safe)
- Verify values match .env file exactly
- Select all three scopes: ☑ Production ☑ Preview ☑ Development
- Redeploy after adding/changing variables

---

## Verify Variables Are Set

After adding to Vercel:

**In Vercel Dashboard:**
```
Settings → Environment Variables
└─ Both variables should appear in the list
```

**In Vercel CLI:**
```bash
vercel env list

# Output should show:
# VITE_SUPABASE_URL=https://...
# VITE_SUPABASE_ANON_KEY=eyJhb...
```

---

## Questions?

**What if I can't find the values in Supabase?**
- Verify you're logged into the correct Supabase account
- Verify you selected the correct project
- Check Settings icon in bottom-left corner

**What if variables aren't working?**
- Verify no extra spaces in values
- Verify all three scopes are selected
- Redeploy after adding variables
- Hard refresh browser (Ctrl+Shift+R)

**Where do I put these in Vercel?**
```
Vercel Dashboard
  ├─ Click your project
  ├─ Click Settings (top navigation)
  ├─ Click Environment Variables (left sidebar)
  └─ Add your two variables here
```

---

## Your Checklist

- [ ] Open .env file
- [ ] Copy `VITE_SUPABASE_URL` value
- [ ] Go to Vercel → Settings → Environment Variables
- [ ] Paste URL as first variable
- [ ] Copy `VITE_SUPABASE_ANON_KEY` value
- [ ] Paste key as second variable
- [ ] Ensure both have all scopes selected
- [ ] Click Save on both
- [ ] Go to Deployments
- [ ] Click Redeploy
- [ ] Wait for ✓ Ready status
- [ ] Test your site!

**You're done!** ✓
