import express from 'express';
import { createTask, readTasks, updateTask, deleteTask } from '../controller/tasks.js';

const router = express.Router();
router.get('/', readTasks);
router.post('/', createTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)


export default router;