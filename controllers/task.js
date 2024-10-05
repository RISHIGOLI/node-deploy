const mongoose = require('mongoose')
const { Task } = require('../models/Task')

function createTask(req, res) {
    const { title, status, date } = req.body

    if (typeof title !== 'string') {
        return res.status(400).json({ message: 'title must be a string' })
    }

    let task = new Task({
        title: title,
        status: typeof status === 'boolean' ? status : undefined,
        date: date ? Date.now : undefined
    })

    task.save()
        .then((response) => { res.status(201).json({ message: 'task added successfully', data: response }) })
        .catch((error) => { res.status(500).json({ message: 'task couldnt be added successfully', info: error }) })
}

async function getTasks(req, res) {
    try {
        const tasks = await Task.find()
        res.status(200).json({ message: 'query successful', data: tasks })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong', info: error })
    }
}

async function getTasksByName(req, res) {
    try {
        const tasks = await Task.find({ title: new RegExp(req.params.title, "i") })
        res.status(200).json({ message: 'query successful', data: tasks })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateTaskByPut(req, res) {
    const { id } = req.params;
    const { title, status, date } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                title,
                status,
                date: date ? new Date(date) : undefined, // If date is passed, convert it to Date
            },
            { new: true, overwrite: true } // 'overwrite' ensures full replacement
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function patchTask(req, res) {
    const { id } = req.params;
    const updateData = req.body; // This can contain only some fields, like { title: "new title" }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: updateData }, // Only update the fields provided in the body
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    createTask, getTasks, getTasksByName, updateTaskByPut, patchTask
}