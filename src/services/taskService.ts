import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data || [];
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
    if (!response.data.data) {
      throw new Error('Task not found');
    }
    return response.data.data;
  },

  createTask: async (title: string): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>('/tasks', { title });
    if (!response.data.data) {
      throw new Error('Failed to create task');
    }
    return response.data.data;
  },

  updateTask: async (id: string, updates: { title?: string; completed?: boolean }): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, updates);
    if (!response.data.data) {
      throw new Error('Failed to update task');
    }
    return response.data.data;
  },

  deleteTask: async (id: string): Promise<Task> => {
    const response = await api.delete<ApiResponse<Task>>(`/tasks/${id}`);
    if (!response.data.data) {
      throw new Error('Failed to delete task');
    }
    return response.data.data;
  },
};
