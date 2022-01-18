import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    todo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;