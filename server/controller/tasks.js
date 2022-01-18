import mongoose from 'mongoose';
import Task from '../models/tasks.js';

export const readTasks = async(req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save()
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {todo, status, createdBy, createdAt} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send(`The id ${id} is not valid`)
    }
    const task = {todo, status, createdBy, createdAt,_id:id};
    await Task.findByIdAndUpdate(id, task, {new: true})
    res.status(201).json(task);
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send(`The id ${id} is not valid`)
    }
    await Task.findByIdAndRemove(id)
    res.status(200).json({message: "task delete successfully"});
}