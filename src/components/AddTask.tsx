import { useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface AddTaskProps {
  onAdd: (title: string) => Promise<void>;
}

export function AddTask({ onAdd }: AddTaskProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') return;

    setIsSubmitting(true);
    try {
      await onAdd(title.trim());
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        disabled={isSubmitting}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={isSubmitting || title.trim() === ''}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add</span>
      </button>
    </form>
  );
}
