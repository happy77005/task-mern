import { useEffect, useState } from 'react';
import { CheckSquare, AlertCircle, Loader2 } from 'lucide-react';
import { Task, taskService } from './services/taskService';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please check if the backend server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (title: string) => {
    try {
      setError(null);
      const newTask = await taskService.createTask(title);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTask(id, { completed });
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckSquare className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
          </div>
          <p className="text-gray-600">Stay organized and productive</p>
          {totalCount > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {completedCount} of {totalCount} tasks completed
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <AddTask onAdd={handleAddTask} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
