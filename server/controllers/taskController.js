import { Task } from '../../db/models/Task.js';
import { asyncHandler } from '../../middleware/errorHandler.js';

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

export const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Task title is required',
    });
  }

  const task = await Task.create({
    title: title.trim(),
    completed: false,
  });

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task title cannot be empty',
      });
    }
    task.title = title.trim();
  }

  if (completed !== undefined) {
    task.completed = Boolean(completed);
  }

  await task.save();

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: task,
  });
});
