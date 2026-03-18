# Task Manager - MERN Stack Application

A production-ready Task Manager web application built with MongoDB, Express, React, and Node.js.

## Project Structure

```
task-manager-mern/
├── frontend/          # React + Vite frontend
├── server/            # Express.js backend
├── db/                # MongoDB models & connection
├── middleware/        # Custom middleware utilities
└── .env.example       # Environment variables template
```

## Backend Setup

### Prerequisites
- Node.js v14+
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. Navigate to server directory:
```bash
cd server
npm install
```

2. Install database dependencies:
```bash
cd ../db
npm install
cd ..
```

3. Set up environment variables by creating `.env` from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI:
```
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/task-manager-db
PORT=5000
NODE_ENV=development
```

### Running the Server

Development mode with auto-reload:
```bash
cd server
npm run dev
```

Production mode:
```bash
cd server
npm start
```

Server will run on `http://localhost:5000` by default.

## API Endpoints

All endpoints are prefixed with `/api/tasks`

### Get All Tasks
```
GET /api/tasks
Response: { success: true, count: number, data: Task[] }
```

### Get Task by ID
```
GET /api/tasks/:id
Response: { success: true, data: Task }
```

### Create Task
```
POST /api/tasks
Body: { title: string }
Response: { success: true, message: string, data: Task }
```

### Update Task
```
PUT /api/tasks/:id
Body: { title?: string, completed?: boolean }
Response: { success: true, message: string, data: Task }
```

### Delete Task
```
DELETE /api/tasks/:id
Response: { success: true, message: string, data: Task }
```

## Database Schema

### Task Model
```
{
  _id: ObjectId
  title: String (required, max 100 chars)
  completed: Boolean (default: false)
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## Architecture

### Backend Structure

- **server/** - Express application entry point and routing
  - `server.js` - Main server file with middleware setup
  - `controllers/` - CRUD operation handlers
  - `routes/` - API route definitions

- **db/** - Database layer (completely separate)
  - `models/` - Mongoose schemas and models
  - `connection/` - MongoDB connection logic

- **middleware/** - Custom middleware
  - `errorHandler.js` - Global error handling
  - `logger.js` - Request/response logging

### Design Patterns

- **MVC Pattern**: Controllers handle business logic, routes define endpoints, models define data
- **Async/Await**: All asynchronous operations use async/await for clean error handling
- **Error Handling**: Centralized error handler middleware catches all errors
- **Separation of Concerns**: Each layer has a single responsibility
- **CORS Enabled**: Configured to accept requests from any origin

## Deployment (Render)

### Prerequisites
- Render account
- GitHub repository with this code

### Deployment Steps

1. Push code to GitHub

2. Create new Web Service on Render:
   - Connect your GitHub repo
   - Set environment variables in Render dashboard:
     - `MONGO_URI`: Your MongoDB connection string
     - `NODE_ENV`: `production`
     - `PORT`: Leave blank (Render assigns automatically)

3. Set start command:
   ```
   cd server && npm install && npm start
   ```

4. Deploy!

## Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Returns 400 status with descriptive messages
- **Not Found Errors**: Returns 404 status when resource doesn't exist
- **Server Errors**: Returns 500 status with error details in development

All errors pass through the centralized error handler middleware.

## Development Notes

- Uses ES6 modules (`import`/`export`)
- All async operations wrapped with `asyncHandler` for error catching
- Request logging via custom logger middleware
- MongoDB connection pooling for performance
- Input validation at controller level

## Security Considerations (Future)

- Add authentication & authorization
- Implement rate limiting
- Add request validation middleware
- Use helmet.js for security headers
- Add HTTPS in production
- Sanitize user inputs

## License

MIT
