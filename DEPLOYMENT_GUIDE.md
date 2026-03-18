# MERN Task Manager - Production Deployment Guide

This guide covers deploying the Task Manager app to:
- **Backend**: Render (Node.js)
- **Frontend**: Netlify (React/Vite)
- **Database**: MongoDB Atlas

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
4. [Connecting Frontend to Backend](#connecting-frontend-to-backend)
5. [Testing the Deployment](#testing-the-deployment)
6. [Common Errors & Fixes](#common-errors--fixes)
7. [Final Verification Checklist](#final-verification-checklist)

---

## Prerequisites

### What You Already Have
- ✅ MongoDB Atlas account with cluster
- ✅ Render account created
- ✅ Netlify account ready
- ✅ GitHub repository: `https://github.com/happy77005/task-mern`

### Credentials Ready
- MongoDB URI: `mongodb+srv://haripreetham789:KvfNiz4auQv5M8VE@firstcluster.rnycqqq.mongodb.net/?appName=Firstcluster`
- GitHub Repository: `https://github.com/happy77005/task-mern`

---

## Backend Deployment (Render)

### Step 1: Push Code to GitHub

```bash
# Navigate to project root
cd /path/to/project

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial MERN Task Manager commit - ready for production"

# Add remote repository
git remote add origin https://github.com/happy77005/task-mern.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 2: Create Render Web Service

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +"** → Select **"Web Service"**
3. **Connect GitHub Repository**:
   - Click "Connect GitHub Account" (if not connected)
   - Search for `task-mern` repository
   - Click "Connect"

4. **Configure Web Service**:
   - **Name**: `task-manager-api` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server/server.js`
   - **Instance Type**: Free (for testing) or Starter (recommended)

### Step 3: Set Environment Variables in Render

1. In the Render dashboard, scroll down to **"Environment"** section
2. **Add the following environment variables**:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://haripreetham789:KvfNiz4auQv5M8VE@firstcluster.rnycqqq.mongodb.net/?appName=Firstcluster` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

3. Click **"Create Web Service"**

### Step 4: Verify Backend Deployment

- Render will automatically build and deploy your app
- Wait for the build to complete (2-5 minutes)
- You'll see a URL like: `https://task-manager-api-xxxx.onrender.com`
- Test it by visiting: `https://your-render-url/health`
- Expected response: `{"status":"OK","message":"Server is running"}`

**Copy your Render URL** - you'll need it for the frontend!

---

## Frontend Deployment (Netlify)

### Step 1: Create Environment Variable File

Create `.env.production` in your project root:

```env
VITE_API_BASE_URL=https://your-render-url/api
```

Replace `https://your-render-url` with your actual Render backend URL.

### Step 2: Update Vite Config (Optional - Already Configured)

The frontend is already set up to use `VITE_API_BASE_URL` from environment variables.

### Step 3: Deploy to Netlify

**Option A: Using Netlify CLI (Recommended for this project)**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to production
netlify deploy --prod --dir=dist
```

When prompted:
- **Team**: Select your team or "Create and authorize a new site"
- **Site**: Choose to deploy to a new site or existing site

**Option B: Using Netlify Web Dashboard**

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop your `dist` folder
4. Netlify will generate a URL (e.g., `https://your-app.netlify.app`)

### Step 4: Configure Build Settings in Netlify (If Using Dashboard)

1. Go to your site **Settings** → **Build & deploy**
2. Set:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

3. Go to **Environment** section
4. Add environment variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your Render backend URL (e.g., `https://task-manager-api-xxxx.onrender.com/api`)

5. Trigger a new deploy to use the new environment variable

---

## Connecting Frontend to Backend

### The Connection Flow

```
Frontend (Netlify)
  ↓ (VITE_API_BASE_URL)
API Requests to Render Backend
  ↓ (MONGO_URI)
MongoDB Atlas
```

### Verify Connection

1. **Check Frontend Environment Variable**:
   - In browser DevTools (F12) → Console
   - Check if API calls are going to your Render URL

2. **Check Backend CORS**:
   - Your Render backend automatically accepts requests from your Netlify domain
   - CORS is configured in `server/server.js`

3. **Test API Endpoint from Frontend**:
   - Open your Netlify deployed app
   - Try creating a new task
   - Check Network tab to see requests going to your Render URL
   - Verify responses return successfully

---

## Testing the Deployment

### Quick Test Checklist

- [ ] **Backend Health Check**: Visit `https://your-render-url/health`
- [ ] **Frontend Loads**: Visit `https://your-netlify-domain.netlify.app`
- [ ] **Create Task**: Add a new task from the UI
- [ ] **Read Tasks**: See tasks displayed on the page
- [ ] **Update Task**: Mark a task as completed
- [ ] **Delete Task**: Remove a task from the list

### Monitor Logs

**Render Logs**:
1. Go to your Render service dashboard
2. Click **"Logs"** tab
3. Watch for errors or issues

**Netlify Logs**:
1. Go to your Netlify site settings
2. Click **"Deployments"**
3. Check build logs and runtime logs

---

## Common Errors & Fixes

### 1. **CORS Error**
**Error**: "Access to XMLHttpRequest blocked by CORS policy"

**Causes & Fixes**:
- Make sure `VITE_API_BASE_URL` uses your correct Render URL
- Verify Render backend has CORS enabled (already configured)
- Check browser console for exact error message

**Fix Steps**:
```bash
# Rebuild frontend with correct environment variable
npm run build

# Redeploy
netlify deploy --prod --dir=dist
```

### 2. **API Requests Returning 404**
**Error**: "Route not found" or "Cannot POST /api/tasks"

**Causes & Fixes**:
- Frontend is calling wrong endpoint
- Backend routes not properly set up
- Environment variable not loaded

**Verification**:
```bash
# Test backend endpoint directly
curl https://your-render-url/api/tasks
```

### 3. **MongoDB Connection Failed**
**Error**: "Cannot connect to MongoDB" or "MongoServerError"

**Causes & Fixes**:
- Wrong MONGO_URI in Render environment variables
- MongoDB Atlas IP whitelist issue
- Network connectivity problem

**Fix**:
1. Check MONGO_URI is exactly correct in Render settings
2. Go to MongoDB Atlas → Network Access
3. Ensure "0.0.0.0/0" (allow all) is in IP whitelist OR add Render's IP

### 4. **Cold Start Delays**
**Issue**: First request takes 10-30 seconds

**This is normal** for free Render tier. Expected behavior:
- Free tier spins down after inactivity
- First request after inactivity takes longer
- Subsequent requests are fast

**Solution**: Use a paid Render plan for consistent performance

### 5. **Build Failing on Netlify**
**Error**: "npm run build failed"

**Causes & Fixes**:
- Missing dependencies
- TypeScript errors
- Environment variables not set

**Debug**:
```bash
# Run locally to check for errors
npm run build

# Check for TypeScript errors
npm run typecheck
```

### 6. **Tasks Not Persisting**
**Issue**: Created tasks disappear on page refresh

**Causes & Fixes**:
- MongoDB connection issue
- Data not being saved to database
- Frontend not fetching data on load

**Verify**:
1. Check MongoDB Atlas has data records
2. Verify task creation API returns successfully
3. Check backend logs for database errors

### 7. **Render Cold Start Error**
**Error**: "Connection timeout" or "Service not responding"

**Fix**:
- Wait for service to start (2-5 minutes)
- Check Render dashboard for build status
- View logs for specific errors

---

## Final Verification Checklist

### Before Going Live

- [ ] **GitHub Repository**
  - [ ] Code pushed to `https://github.com/happy77005/task-mern`
  - [ ] `.env` file is in `.gitignore` (not committed)
  - [ ] All changes committed

- [ ] **Render Backend**
  - [ ] Service created and building
  - [ ] All environment variables set (MONGO_URI, NODE_ENV, PORT)
  - [ ] Health endpoint returns 200 OK
  - [ ] Service URL is accessible
  - [ ] Logs show no errors

- [ ] **MongoDB Atlas**
  - [ ] Cluster is running
  - [ ] Network access allows connections from anywhere (0.0.0.0/0)
  - [ ] Can connect with provided credentials
  - [ ] Database name is correct

- [ ] **Netlify Frontend**
  - [ ] Site created and deployed
  - [ ] `VITE_API_BASE_URL` environment variable set correctly
  - [ ] Frontend loads without errors
  - [ ] Console shows no CORS warnings

- [ ] **Frontend-Backend Connection**
  - [ ] API requests go to correct URL (check Network tab)
  - [ ] Tasks can be created
  - [ ] Tasks persist after page refresh
  - [ ] Tasks can be updated and deleted
  - [ ] No error messages in browser console

- [ ] **Performance**
  - [ ] Page loads in under 3 seconds
  - [ ] Task operations complete in under 1 second
  - [ ] No memory leaks or console errors

---

## Updating Your App

After initial deployment, to push updates:

```bash
# Make your code changes locally
# Test locally: npm run dev

# Push to GitHub
git add .
git commit -m "Your update description"
git push origin main

# Render will automatically rebuild and deploy
# Netlify will automatically rebuild on push (if connected to GitHub)
```

---

## Support & Troubleshooting

### Useful Resources

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Express.js Docs**: https://expressjs.com

### Quick Debug Steps

1. Check all environment variables are set correctly
2. Verify URLs don't have trailing slashes
3. Check browser Network tab for actual requests
4. Review logs in Render and Netlify dashboards
5. Test API endpoints with curl or Postman

---

## Summary

Your Task Manager is now deployed!

- **Frontend**: `https://your-app.netlify.app`
- **Backend API**: `https://task-manager-api-xxxx.onrender.com/api`
- **Database**: MongoDB Atlas (shared cluster)

Monitor your apps regularly using the Render and Netlify dashboards, and enjoy your production-ready MERN application!
