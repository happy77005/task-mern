import { Check, Trash2 } from 'lucide-react';
import { Task } from '../services/taskService';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(task._id, !task.completed)}
        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-400'
        }`}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && <Check className="w-4 h-4 text-white" />}
      </button>

      <span
        className={`flex-1 text-gray-800 ${
          task.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task._id)}
        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
