# 🚀 Deployment Reference - Task Manager

This document provides a comprehensive log of the deployment process, commands used, and final configurations for the Task Manager (MERN) application.

---

## 🏗️ Project Architecture
- **Frontend**: React + Vite + TypeScript (Netlify)
- **Backend**: Node.js + Express (Render)
- **Database**: MongoDB Atlas (Cloud)

---

## 📦 Phase 1: GitHub Repository Setup
The project was initialized with Git and pushed to a new public repository.

**Commands:**
```bash
git init
git add .
git commit -m "Task Manager - Production Ready"
git remote add origin https://github.com/happy77005/task-mern.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Phase 2: Backend Deployment (Render)
The backend service was connected to the GitHub repository on Render.

**Render Configuration:**
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `node server/server.js`

**Environment Variables:**
| Variable | Value |
|----------|-------|
| `MONGO_URI` | `mongodb+srv://haripreetham789:Mytask123v@firstcluster.rnycqqq.mongodb.net/?appName=Firstcluster` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

**Backend URL**: `https://task-mern-z7f4.onrender.com`

---

## 🌐 Phase 3: Frontend Deployment (Netlify)
The frontend was built locally with the production API URL and deployed via Netlify CLI.

**Build Commands:**
```bash
# Install root dependencies
npm install

# Build with production API URL
$env:VITE_API_BASE_URL="https://task-mern-z7f4.onrender.com/api"
npm run build
```

**Deployment Command:**
```bash
# Deploy the 'dist' folder to production
netlify deploy --prod --dir=dist
```

**Frontend URL**: `https://tasky-bypreetham.netlify.app`

---

## 🛠️ Post-Deployment Fixes
### CORS Configuration
Modified `server/server.js` to allow the specific Netlify domain in production.

**Code Change:**
```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://tasky-bypreetham.netlify.app', 'http://localhost:3000']
    : 'http://localhost:3000',
  // ... other settings
};
```

**Applied Fix:**
```bash
git add server/server.js
git commit -m "Update CORS origin for Netlify deployment"
git push origin main
```

---

## ✅ Deployment Summary
- **Source Code**: [happy77005/task-mern](https://github.com/happy77005/task-mern)
- **Live Frontend**: [tasky-bypreetham.netlify.app](https://tasky-bypreetham.netlify.app)
- **Live API Backend**: [task-mern-z7f4.onrender.com](https://task-mern-z7f4.onrender.com)
- **Database**: MongoDB Atlas
