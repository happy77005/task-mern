# Task Manager - Frontend Documentation

A modern, responsive React frontend for the Task Manager application built with TypeScript, Vite, and Tailwind CSS.

## Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTask.tsx     # Task creation component
│   ├── TaskItem.tsx    # Individual task display component
│   └── TaskList.tsx    # Task list container component
├── services/           # API integration layer
│   └── taskService.ts  # Centralized API calls with axios
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## Features

### Core Functionality
- **Add Tasks**: Create new tasks with a simple input form
- **View Tasks**: Display all tasks with completion status
- **Toggle Completion**: Mark tasks as complete/incomplete with a single click
- **Delete Tasks**: Remove tasks permanently
- **Task Counter**: Track completed vs total tasks

### User Experience
- **Loading States**: Spinner while fetching data
- **Error Handling**: Clear error messages for failed operations
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Clean UI**: Modern design with Tailwind CSS
- **Visual Feedback**: Hover states and smooth transitions

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- Backend server running (see main README.md)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Or update the existing `.env` file to include the API URL.

## Running Locally

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Architecture

### Component Structure

**App.tsx**
- Main application container
- Manages global state (tasks, loading, error)
- Handles all API operations
- Coordinates child components

**AddTask.tsx**
- Controlled form component
- Input validation
- Loading state during submission
- Clears input after successful submission

**TaskList.tsx**
- Displays array of tasks
- Shows empty state when no tasks exist
- Maps tasks to TaskItem components

**TaskItem.tsx**
- Displays individual task
- Toggle completion button with visual feedback
- Delete button with icon
- Strikethrough styling for completed tasks

### API Service Layer

**taskService.ts**
- Centralized API calls using axios
- TypeScript interfaces for type safety
- Base URL from environment variables
- Error handling for all requests
- Exports typed functions for all CRUD operations

### State Management

State is managed using React hooks:
- `useState` for tasks array, loading, and error states
- `useEffect` for initial data fetching
- Async handlers for all API operations

### Error Handling

- Network errors caught and displayed to user
- Backend validation errors shown in error banner
- Console logging for debugging
- User-friendly error messages

## API Integration

All API calls go through `src/services/taskService.ts`:

```typescript
// Get all tasks
const tasks = await taskService.getAllTasks();

// Create task
const newTask = await taskService.createTask(title);

// Update task
const updated = await taskService.updateTask(id, { completed: true });

// Delete task
await taskService.deleteTask(id);
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

## Styling

- **Framework**: Tailwind CSS
- **Design System**:
  - Blue accent color (#2563eb)
  - Gradient background (blue to gray)
  - Rounded corners (lg, xl)
  - Shadow system (sm, md, lg)
  - Responsive spacing (gap, padding, margin)

## Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM renderer
- `axios` - HTTP client
- `lucide-react` - Icon library

### Development
- `vite` - Build tool and dev server
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `@vitejs/plugin-react` - React plugin for Vite
- ESLint and plugins for code quality

## Browser Support

Modern browsers supporting ES6+:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues

- Backend server must be running before starting frontend
- CORS must be enabled on backend (already configured)
- No authentication (future enhancement)

## Future Enhancements

- User authentication
- Task categories/tags
- Due dates
- Task search and filter
- Dark mode
- Drag-and-drop reordering
- Task editing inline
- Pagination for large task lists

## Troubleshooting

### Frontend won't start
- Check Node.js version: `node --version`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Can't connect to backend
- Verify backend is running on port 5000
- Check `VITE_API_BASE_URL` in `.env`
- Check browser console for CORS errors

### Build fails
- Run type checking: `npm run typecheck`
- Check for TypeScript errors
- Ensure all dependencies installed

### Tasks don't load
- Open browser DevTools console
- Check Network tab for failed requests
- Verify backend health endpoint: `http://localhost:5000/health`

## Development Tips

1. Use React DevTools browser extension for debugging
2. Keep components small and focused
3. All API calls should go through service layer
4. Use TypeScript interfaces for props and data
5. Handle loading and error states for all async operations
6. Test responsive design at different breakpoints

## License

MIT
