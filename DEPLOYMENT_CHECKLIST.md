# Deployment Checklist

Use this checklist to ensure everything is properly configured before deploying to production.

---

## Pre-Deployment Setup

### Local Environment
- [ ] All dependencies installed: `npm install`
- [ ] Project builds successfully: `npm run build`
- [ ] No TypeScript errors: `npm run typecheck`
- [ ] Frontend works locally: `npm run dev`
- [ ] Can create/read/update/delete tasks locally
- [ ] `.env` file is NOT in version control (check `.gitignore`)
- [ ] All sensitive credentials are in `.env`, not hardcoded

### Git Repository
- [ ] GitHub repository created: `https://github.com/happy77005/task-mern`
- [ ] All code pushed to GitHub
- [ ] No uncommitted changes: `git status` is clean
- [ ] Branch is `main` (not `master`)

### MongoDB Atlas
- [ ] Account created and active
- [ ] Cluster deployed (Free M0 tier is fine)
- [ ] Network Access allows "0.0.0.0/0" (all IPs)
- [ ] Database credentials noted:
  - [ ] Username: `haripreetham789`
  - [ ] Password: `KvfNiz4auQv5M8VE`
  - [ ] Connection String: `mongodb+srv://...`
- [ ] Can connect to MongoDB locally with connection string

### Render Account
- [ ] Account created at https://render.com
- [ ] GitHub account connected to Render

### Netlify Account
- [ ] Account created at https://www.netlify.com
- [ ] Can access dashboard

---

## Backend Deployment (Render)

### Before Creating Service
- [ ] `server/server.js` exists and starts the app
- [ ] `package.json` has correct `main` entry
- [ ] All dependencies listed in `package.json`
- [ ] Server listens on `process.env.PORT || 5000`
- [ ] CORS is configured for production
- [ ] Health check endpoint exists: `/health`

### Render Configuration
- [ ] Web Service created in Render dashboard
- [ ] GitHub repository connected
- [ ] Build command set: `npm install && npm run build`
- [ ] Start command set: `node server/server.js`

### Environment Variables in Render
- [ ] `MONGO_URI` set to: `mongodb+srv://haripreetham789:KvfNiz4auQv5M8VE@firstcluster.rnycqqq.mongodb.net/?appName=Firstcluster`
- [ ] `NODE_ENV` set to: `production`
- [ ] `PORT` set to: `5000`

### Deployment Verification
- [ ] Build completed successfully (check Render logs)
- [ ] Service is showing "Live" status in Render dashboard
- [ ] Public URL is accessible (e.g., `https://task-manager-api-xxxx.onrender.com`)
- [ ] Health check works: `curl https://your-render-url/health`
- [ ] Response shows: `{"status":"OK","message":"Server is running"}`
- [ ] MongoDB connection successful (check logs for "MongoDB connected")
- [ ] No errors in Render logs

### API Testing
- [ ] GET `/api/tasks` returns list (empty or with data)
- [ ] POST `/api/tasks` with `{"title":"Test"}` creates task
- [ ] PUT `/api/tasks/{id}` updates task
- [ ] DELETE `/api/tasks/{id}` removes task

---

## Frontend Deployment (Netlify)

### Before Building
- [ ] `VITE_API_BASE_URL` environment variable ready
- [ ] `src/services/taskService.ts` uses correct API endpoint
- [ ] `vite.config.ts` is properly configured
- [ ] Build target is `dist` directory
- [ ] No hardcoded localhost URLs in code

### Build Verification
- [ ] Build succeeds locally: `npm run build`
- [ ] `dist/` folder created with HTML, CSS, JS
- [ ] No build errors or warnings in console
- [ ] File sizes are reasonable

### Netlify Deployment
- [ ] Site created in Netlify dashboard
- [ ] Build command set: `npm run build`
- [ ] Publish directory set: `dist`

### Environment Variables in Netlify
- [ ] `VITE_API_BASE_URL` set to: `https://your-render-url/api`
- [ ] (Replace `your-render-url` with actual Render service URL)

### Deployment Verification
- [ ] Build completed successfully in Netlify
- [ ] Site is showing "Published" status
- [ ] Public URL is accessible
- [ ] Page loads without errors
- [ ] Browser DevTools Console has no errors
- [ ] All assets load (CSS, JS, images)

---

## Frontend-Backend Connection

### API Configuration
- [ ] Frontend environment variable `VITE_API_BASE_URL` set correctly
- [ ] Backend CORS accepts frontend domain
- [ ] API requests use correct URL (check Network tab in DevTools)

### Network Testing
- [ ] Open frontend in browser
- [ ] Open DevTools → Network tab
- [ ] Perform action (create task)
- [ ] Request URL matches Render backend URL
- [ ] Response status is 200-201 (not 4xx or 5xx)
- [ ] Response contains expected data

### CORS Testing
- [ ] No "CORS blocked" errors in console
- [ ] `Access-Control-Allow-Origin` header present in responses
- [ ] Requests include proper origin header

---

## End-to-End Testing

### Create Task
- [ ] Open frontend app
- [ ] Type task title
- [ ] Click "Add Task"
- [ ] Task appears in list immediately
- [ ] Check Network tab: POST request successful
- [ ] Refresh page: Task still visible (persisted)

### Read Tasks
- [ ] Page loads all tasks on startup
- [ ] List displays correctly formatted
- [ ] Check Network tab: GET request successful
- [ ] Data matches what's in MongoDB

### Update Task
- [ ] Click task checkbox to mark complete
- [ ] Visual feedback shows (strikethrough, color change)
- [ ] Check Network tab: PUT request successful
- [ ] Refresh page: Status persisted

### Delete Task
- [ ] Click delete button on task
- [ ] Task removed from list immediately
- [ ] Check Network tab: DELETE request successful
- [ ] Refresh page: Task not visible

### Error Handling
- [ ] Try creating task with empty title
- [ ] Error message displays appropriately
- [ ] App doesn't crash
- [ ] Can recover and create valid task

---

## Performance & Reliability

### Performance Metrics
- [ ] Frontend loads in under 3 seconds (first time)
- [ ] API responses complete in under 1 second
- [ ] No console warnings or errors
- [ ] No memory leaks in DevTools Performance tab

### Edge Cases
- [ ] Test with no tasks (empty list)
- [ ] Test with many tasks (100+)
- [ ] Test rapid task creation
- [ ] Test task creation + deletion in succession
- [ ] Test page refresh at various points

### Cold Start Handling
- [ ] First request to backend takes longer (expected)
- [ ] Subsequent requests are faster
- [ ] App handles waiting gracefully
- [ ] No timeout errors in logs

---

## Monitoring & Logs

### Render Logs
- [ ] Go to Render dashboard → Your service
- [ ] Click "Logs" tab
- [ ] Review for any errors or warnings
- [ ] Confirm "Server running on port 5000" message
- [ ] Look for database connection success message

### Netlify Logs
- [ ] Go to Netlify dashboard → Your site
- [ ] Click "Deployments"
- [ ] Click latest deployment → "Deploy log"
- [ ] Review build log for warnings or errors
- [ ] Check "Publish log" for any issues

### Browser Logs
- [ ] Open frontend in browser
- [ ] F12 → Console tab
- [ ] Perform actions and check for errors
- [ ] Verify no network request errors
- [ ] Check for CORS or API errors

---

## Final Sign-Off

### All Systems Go?
- [ ] Backend is live and responding
- [ ] Frontend is live and accessible
- [ ] Database connections working
- [ ] All CRUD operations functional
- [ ] No errors in any logs
- [ ] Performance is acceptable
- [ ] Can reproduce steps without issues

### Ready for Users?
- [ ] App is stable and reliable
- [ ] UI is responsive and works on mobile
- [ ] Loading states show appropriately
- [ ] Error messages are user-friendly
- [ ] No sensitive data in logs or console

### Deployment Successful!
- [ ] Frontend URL: `https://your-site.netlify.app`
- [ ] Backend URL: `https://your-service.onrender.com`
- [ ] Database: MongoDB Atlas (haripreetham789@cluster)
- [ ] Repository: `https://github.com/happy77005/task-mern`

---

## Post-Deployment

### Monitor for Issues
- [ ] Check Render logs daily for first week
- [ ] Monitor Netlify deployments
- [ ] Watch for MongoDB quota warnings
- [ ] Keep GitHub repository updated

### Future Updates
- [ ] Document any deployment issues encountered
- [ ] Note any environment-specific configurations
- [ ] Keep `.env.example` updated
- [ ] Review and update this checklist as needed

---

## Need Help?

Refer to:
- **DEPLOYMENT_GUIDE.md** - Detailed step-by-step guide
- **QUICK_DEPLOY.md** - Quick reference deployment steps
- Common errors section in **DEPLOYMENT_GUIDE.md**

---

**Deployment Date**: _______________

**Deployed By**: _______________

**Notes**:
```
[Add any additional notes here]
```
