import mongoose from 'mongoose';
import User from '../models/users.js';

export const readUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const readUser = async(req, res) => {
    try {
        const {id} = req.params;
        const users = await User.findById(id);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send(`The id ${id} is not valid`)
    }
    const user = {title,content,_id:id};
    await User.findByIdAndUpdate(id, user, {new: true})
    res.status(201).json(user);
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send(`The id ${id} is not valid`)
    }
    await User.findByIdAndRemove(id)
    res.status(201).json({message: "task delete successfully"});
}