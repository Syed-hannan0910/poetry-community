# Quick Deploy Checklist - 15 Minutes to Live

Print this page and check off as you go!

## Pre-Deployment (5 minutes)

- [ ] Open Terminal
- [ ] Navigate to project: `cd /path/to/poetry-community`
- [ ] Check .env file: `cat .env`
  - [ ] Contains `VITE_SUPABASE_URL`
  - [ ] Contains `VITE_SUPABASE_ANON_KEY`
- [ ] Build locally: `npm run build`
  - [ ] No errors
  - [ ] See "built in X.XXs" message

## GitHub Setup (3 minutes)

- [ ] Create GitHub account (if needed)
- [ ] Go to: https://github.com/new
- [ ] Create repository: `poetry-community`
- [ ] Run these commands:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/poetry-community.git
git push -u origin main
```

- [ ] Verify push succeeded
- [ ] See files on GitHub website

## Vercel Deployment (5 minutes)

### 5-1: Create Vercel Account
- [ ] Go to https://vercel.com
- [ ] Click "Sign Up"
- [ ] Choose GitHub
- [ ] Authorize

### 5-2: Import Project
- [ ] In Vercel: Click "Add New" → "Project"
- [ ] Search: `poetry-community`
- [ ] Click "Import"
- [ ] Wait for auto-configuration
- [ ] Click "Deploy"
- [ ] ✓ See "Congratulations! Your site is live"

### 5-3: Add Environment Variables
- [ ] Copy your Vercel deployment URL
- [ ] Click "Settings" tab
- [ ] Click "Environment Variables"
- [ ] Add variable #1:
  - [ ] Key: `VITE_SUPABASE_URL`
  - [ ] Value: `https://ueatjffjshxrdqetldse.supabase.co`
  - [ ] Check: ☑ Production ☑ Preview ☑ Development
  - [ ] Save
- [ ] Add variable #2:
  - [ ] Key: `VITE_SUPABASE_ANON_KEY`
  - [ ] Value: (from your .env file)
  - [ ] Check: ☑ Production ☑ Preview ☑ Development
  - [ ] Save

### 5-4: Redeploy
- [ ] Go to "Deployments" tab
- [ ] Click latest deployment
- [ ] Click "Redeploy"
- [ ] Wait for ✓ Ready status

## Testing (2 minutes)

- [ ] Visit your Vercel URL
- [ ] See "Verses & Souls" title
- [ ] Click "Join Community"
- [ ] See sign-up form
- [ ] Sign up with test account
- [ ] See success message

## Verify Database

- [ ] Go to Supabase Dashboard
- [ ] Select your project
- [ ] Click "Table Editor"
- [ ] Click "profiles"
- [ ] See your test user in the list

## Admin Setup

- [ ] Go to Supabase: SQL Editor
- [ ] Run this query:
```sql
UPDATE profiles SET is_admin = true WHERE username = 'YOUR_USERNAME';
```
- [ ] Sign out and back in
- [ ] See "Admin" in navigation
- [ ] Click Admin
- [ ] See admin dashboard

## Final Verification

- [ ] Admin → Poems → Click "New Poem"
- [ ] Create test poem
- [ ] Go to Poems page
- [ ] See test poem displayed
- [ ] All features working!

## Done! 🎉

```
✓ Website live: https://your-project.vercel.app
✓ Database connected: Supabase
✓ Admin access: Working
✓ Community ready: For users to join
```

---

## After Deployment - Future Updates

### Making Updates
```bash
# Make changes locally
# Test with: npm run dev

# When ready to deploy:
git add .
git commit -m "Add new poems"
git push origin main

# Vercel auto-deploys!
# (Check Deployments tab for status)
```

### Key URLs to Bookmark
- **Your Site**: https://your-project.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **GitHub Repo**: https://github.com/your-username/poetry-community

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Sign-up doesn't work | Go to Vercel Settings → Check env vars → Redeploy |
| Site shows 404 | Go to Deployments → Check build logs |
| Database shows error | Go to Supabase → Check SQL Editor → Verify tables |
| Admin button missing | Make sure is_admin is true in database |
| Poems not saving | Check Supabase table → Verify RLS policies |

---

**Estimated Time:** 15 minutes
**Difficulty:** Easy
**Result:** Professional live website!

Print this checklist and check off each item as you complete it.
Good luck! 🚀
