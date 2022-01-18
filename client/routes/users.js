import express from 'express';
import { createUser, readUsers, updateUser, deleteUser, readUser } from '../controller/users.js';

const router = express.Router();
router.get('/', readUsers);
router.get('/:id', readUser)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)


export default router;