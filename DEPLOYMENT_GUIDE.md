# Verses & Souls - Complete Deployment Guide

## Table of Contents
1. [Verify Supabase Connection](#verify-supabase-connection)
2. [Deploy to Vercel](#deploy-to-vercel)
3. [Connect Environment Variables](#connect-environment-variables)
4. [Test Live Deployment](#test-live-deployment)
5. [Future Deployment Workflow](#future-deployment-workflow)
6. [Troubleshooting](#troubleshooting)

---

## Verify Supabase Connection

### Step 1: Test Local Connection
Before deploying, ensure your local Supabase connection works:

```bash
# Navigate to project directory
cd /path/to/your/project

# Check .env file exists with credentials
cat .env

# Expected output:
# VITE_SUPABASE_URL=https://ueatjffjshxrdqetldse.supabase.co
# VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

### Step 2: Verify Supabase Project Status
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Log in with your account
3. Select project `ueatjffjshxrdqetldse`
4. Check **Settings → Database** - should show "Connected"
5. Go to **SQL Editor** - run test query:

```sql
-- Test connection
SELECT count(*) as table_count FROM information_schema.tables
WHERE table_schema = 'public';
```

Should return something like `table_count: 8` (your tables)

### Step 3: Verify Database Tables
In Supabase Dashboard:
1. Click **Table Editor** on left sidebar
2. Verify these tables exist:
   - `profiles`
   - `poems`
   - `forum_posts`
   - `forum_comments`
   - `courses`
   - `lessons`
   - `enrollments`
   - `auth.users` (created automatically)

### Step 4: Test API Connection Locally
```bash
# Run dev server
npm run dev

# Open http://localhost:5173
# Click "Join Community" button
# If the auth modal opens without errors, Supabase is connected
```

---

## Deploy to Vercel

### Step 1: Create Vercel Account
1. Go to [https://vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **GitHub** (recommended) or Email
4. Complete verification

### Step 2: Prepare Project for Deployment

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Create .gitignore (important - don't commit .env)
cat > .gitignore << 'EOF'
node_modules/
.env.local
.env.*.local
dist/
.DS_Store
*.log
EOF

# 3. Remove old .env from git history (if it exists)
git rm --cached .env 2>/dev/null || true

# 4. Commit your code
git add .
git commit -m "Initial poetry community platform"
```

### Step 3: Connect GitHub Repository
1. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/poetry-community.git
git branch -M main
git push -u origin main
```

2. In Vercel Dashboard:
   - Click **"Add New..." → "Project"**
   - Click **"Import Git Repository"**
   - Search and select your repository
   - Click **"Import"**

### Step 4: Configure Environment Variables on Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. After importing, go to **Settings tab**
2. Click **"Environment Variables"** in left menu
3. Add these variables:

| Key | Value | Scope |
|-----|-------|-------|
| `VITE_SUPABASE_URL` | `https://ueatjffjshxrdqetldse.supabase.co` | All (Development, Preview, Production) |
| `VITE_SUPABASE_ANON_KEY` | Your anon key from `.env` | All (Development, Preview, Production) |

**Steps:**
1. Click **"Add New Variable"**
2. Enter Key: `VITE_SUPABASE_URL`
3. Enter Value: Copy from your `.env` file
4. Under "Scope": Select all three checkboxes ✓
   - ✓ Production
   - ✓ Preview
   - ✓ Development
5. Click **"Save"**
6. Repeat for `VITE_SUPABASE_ANON_KEY`

**Option B: Via .env.local File**
```bash
# Create local file (NOT committed)
echo "VITE_SUPABASE_URL=https://ueatjffjshxrdqetldse.supabase.co" > .env.local
echo "VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY" >> .env.local
```

### Step 5: Deploy
1. In Vercel Dashboard, click **"Deploy"** button
2. Wait for deployment to complete (usually 30-60 seconds)
3. You'll see: **"Congratulations! Your site is live"**
4. Click **"Visit"** to see your live site

Your URL will be: `https://your-project-name.vercel.app`

---

## Connect Environment Variables - Detailed Steps

### Visual Guide for Vercel Dashboard:

```
Vercel Dashboard
│
├─ [Your Project Name]
│  │
│  ├─ Settings (click here)
│  │  │
│  │  ├─ Environment Variables (click here)
│  │  │  │
│  │  │  ├─ Add Variable Button (click)
│  │  │  │  ├─ Key: VITE_SUPABASE_URL
│  │  │  │  ├─ Value: https://ueatjffjshxrdqetldse.supabase.co
│  │  │  │  ├─ Scope: Production ✓ Preview ✓ Development ✓
│  │  │  │  └─ Save
│  │  │  │
│  │  │  └─ Add Variable Button (click again)
│  │  │     ├─ Key: VITE_SUPABASE_ANON_KEY
│  │  │     ├─ Value: [Paste your key]
│  │  │     ├─ Scope: Production ✓ Preview ✓ Development ✓
│  │  │     └─ Save
│  │  │
│  │  └─ Redeploy Project (needed after adding env vars)
│  │
│  └─ Deployments tab (see build progress)
```

### Redeploy After Adding Environment Variables:
1. Go to **Deployments** tab
2. Click the most recent deployment
3. Click **"Redeploy"** button
4. Wait for new build to complete

---

## Test Live Deployment

### Test 1: Basic Page Load
```
Visit: https://your-project-name.vercel.app
Expected: See landing page with "Verses & Souls" title
```

### Test 2: Test Authentication
1. Click **"Join Community"** button
2. Fill in:
   - Username: `testuser123`
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `TestPassword123`
3. Click **"Sign Up"**
4. Expected: Success message, profile saved in Supabase

### Test 3: Verify Database Connection
1. After signup, go to Supabase Dashboard
2. Click **Table Editor**
3. Click **profiles** table
4. Should see your test user in the table

### Test 4: Test Admin Access
1. Go to Supabase Dashboard
2. **SQL Editor** - Run:
```sql
UPDATE profiles
SET is_admin = true
WHERE username = 'testuser123';
```
3. Sign out from website
4. Sign in again with test user
5. Click **"Admin"** in navigation - should see admin dashboard

### Test 5: Create Test Poem
1. In Admin Dashboard, click **Poems** tab
2. Click **"New Poem"** button
3. Fill in:
   - Title: "Test Poem"
   - Content: "This is a test poem for deployment verification"
   - Genre: "Romantic"
   - Style: "Free Verse"
4. Check "Feature this poem"
5. Click **"Create Poem"**
6. Go to **Poems** page - should see it there

---

## Future Deployment Workflow

### Weekly/Monthly Updates

**Step 1: Make Changes Locally**
```bash
# Make your code changes
# Edit files, add poems, etc.

# Test locally
npm run dev
```

**Step 2: Build & Test**
```bash
# Build production version
npm run build

# If successful, commit
git add .
git commit -m "Add new poems and update learning content"
```

**Step 3: Push to GitHub**
```bash
git push origin main
```

**Step 4: Vercel Auto-Deploys**
- Vercel automatically detects push
- Builds your project
- Deploys to production
- You'll receive email notification

**Step 5: Verify Deployment**
- Visit your Vercel URL
- Test new features
- Check Deployments tab for status

### Update Admin Controls

**Adding New Poems via Admin Dashboard:**
1. Sign in as admin (username/password)
2. Click **"Admin"** in navigation
3. Go to **Poems** tab
4. Click **"New Poem"**
5. Fill details and submit
6. Changes live immediately!

**Creating Courses:**
1. Admin → **Courses** tab
2. Click **"New Course"**
3. Add title, description, price
4. Publish when ready
5. Add lessons to course

**Managing Forum Posts:**
1. Admin → **Forum Posts** tab
2. See all pending posts
3. Approve or reject posts
4. Delete inappropriate content

---

## Troubleshooting

### Issue 1: "Supabase Connection Failed"
**Solution:**
1. Verify variables in Vercel Settings
2. Copy exact values from Supabase (no extra spaces)
3. Redeploy project
4. Check browser console (F12) for error messages

### Issue 2: "Cannot POST/GET to Database"
**Solution:**
```bash
# Verify .env locally
cat .env

# Check Supabase status
# Go to Supabase Dashboard → Settings → Status
# Should show "All systems operational"
```

### Issue 3: "Auth Not Working"
**Solution:**
1. Check Supabase → Authentication → Providers
2. Ensure "Email" is enabled
3. Go to Vercel → Redeploy
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue 4: "404 on Vercel"
**Solution:**
```bash
# Make sure you have
1. vercel.json exists (or Vercel auto-detects Vite)
2. Build completes successfully
3. Check Vercel Deployments tab for build errors
4. Scroll down - click "View Build Logs"
```

### Issue 5: "Environment Variables Not Loading"
**Solution:**
1. Go to Vercel Settings → Environment Variables
2. Check all variables are present
3. For each variable, ensure all scopes are selected:
   - ✓ Production
   - ✓ Preview
   - ✓ Development
4. Click **Redeploy**
5. Hard refresh browser (Ctrl+F5)

### Issue 6: "Supabase Table Not Found"
**Solution:**
```bash
# SSH into database and verify tables
# OR use Supabase Dashboard

1. Go to Supabase → Table Editor
2. Verify all tables exist:
   - profiles ✓
   - poems ✓
   - forum_posts ✓
   - courses ✓
   - lessons ✓
   - enrollments ✓

# If missing, run migration again:
# Go to SQL Editor and paste migration code
```

---

## Useful Links

| Service | URL | Purpose |
|---------|-----|---------|
| **Vercel Dashboard** | https://vercel.com/dashboard | View deployments, settings |
| **Supabase Dashboard** | https://app.supabase.com | Database management |
| **Your Live Site** | https://your-project-name.vercel.app | Your published website |
| **Vercel Docs** | https://vercel.com/docs | Deployment help |
| **Supabase Docs** | https://supabase.com/docs | Database guides |

---

## Quick Reference Commands

```bash
# Local Development
npm run dev              # Start dev server on localhost:5173

# Testing
npm run build           # Build for production
npm run typecheck       # Check TypeScript errors
npm run lint            # Check code style

# Git Push to Auto-Deploy
git add .
git commit -m "message"
git push origin main    # Triggers Vercel deployment

# Check Environment Variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

---

## Your Deployment Timeline

```
Day 1: Supabase Connection ✓ (Database ready)
Day 2: Local Testing ✓ (Features verified)
Day 3: Deploy to Vercel ✓ (Live URL created)
Day 4: Verify Connection ✓ (Test all features)
Day 5+: Launch & Marketing ✓ (Share with community)
```

---

## Contact & Support

- **Supabase Issues**: support@supabase.io
- **Vercel Issues**: support@vercel.com
- **Your Email**: syedhannan0109@gmail.com

Good luck with your poetry community platform!
