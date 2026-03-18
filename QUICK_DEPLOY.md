# Quick Deployment Steps

## Phase 1: Push to GitHub (5 minutes)

```bash
# From project root
git init
git add .
git commit -m "Task Manager - Ready for production"
git remote add origin https://github.com/happy77005/task-mern.git
git branch -M main
git push -u origin main
```

---

## Phase 2: Deploy Backend to Render (5 minutes)

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Select **task-mern** repository from GitHub
4. Fill in:
   - **Name**: `task-manager-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/server.js`

5. Scroll to **Environment** section, add:
   ```
   MONGO_URI = mongodb+srv://haripreetham789:Mytask123v@firstcluster.rnycqqq.mongodb.net/?appName=Firstcluster
   NODE_ENV = production
   PORT = 5000
   ```

6. Click **"Create Web Service"**
7. Wait for build to complete (2-5 minutes)
8. Copy your URL (e.g., `https://task-manager-api-xxxx.onrender.com`)
9. Test: Visit `https://your-url/health` → Should see `{"status":"OK",...}`

---

## Phase 3: Deploy Frontend to Netlify (5 minutes)

```bash
# Build the project
npm run build

# Install Netlify CLI (one-time)
npm install -g netlify-cli

# Deploy to production
VITE_API_BASE_URL=https://your-render-url/api netlify deploy --prod --dir=dist
```

Replace `https://your-render-url` with your actual Render backend URL (from Phase 2).

When prompted during deploy, select your Netlify team/site.

---

## Phase 4: Verify Everything Works (2 minutes)

1. **Visit your Netlify URL**: `https://your-site.netlify.app`
2. **Create a task**: Type something and submit
3. **Refresh page**: Task should still be there (persisted in MongoDB)
4. **Update task**: Check/uncheck it
5. **Delete task**: Remove it
6. **Check Network tab**: All requests should go to your Render URL

---

## That's It!

Your app is now live and production-ready!

- **Frontend**: Your Netlify URL
- **Backend**: Your Render URL
- **Database**: MongoDB Atlas

### To Update Later:

```bash
# Make changes → Commit → Push
git add .
git commit -m "Update description"
git push origin main

# Render deploys automatically
# Netlify deploys automatically (if connected to GitHub)
```

---

## Troubleshooting

**CORS Error?** → Make sure `VITE_API_BASE_URL` environment variable is set in Netlify

**Can't create tasks?** → Check Render logs for MongoDB connection errors

**Page is blank?** → Check browser console (F12) for errors

**Check Logs**:
- Render: Dashboard → Your service → Logs tab
- Netlify: Dashboard → Your site → Deploys → View deploy logs

---

See **DEPLOYMENT_GUIDE.md** for detailed troubleshooting!
