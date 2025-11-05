const Task = require("../models/task.model");

async function createTask(req, res) {
    try {
        const { name, project, team, owners, tags, timeToComplete, status } = req.body;
        if (name && project && team && owners && tags && timeToComplete && status) {
            const newTask = new Task({ name, project, team, owners, tags, timeToComplete, status });
            const savedTask = await newTask.save();
            return res.status(200).json({ message: "Task is created", task: savedTask });
        } else {
            return res.status(404).json({ message: 'Missing required fields' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while creating the task', error });
    }
}

async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find().populate(["project", "team", "owners"])
        if (tasks.length > 0) {
            return res.status(200).json({ message: "Tasks are found", tasks });
        } else {
            return res.status(404).json({ message: 'Tasks are not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while fetching the tasks', error });
    }
}

async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id).populate(["project", "team", "owners"])
        if (task) {
            let remainingDays = null;
            if (task.status !== 'Completed') {
                const now = new Date();
                const timeToCompleteDate = new Date(task.createdAt);
                timeToCompleteDate.setDate(timeToCompleteDate.getDate() + task.timeToComplete);
                let diffMs = timeToCompleteDate - now;
                if (diffMs <= 0) {
                    remainingDays = 0;
                } else {
                    remainingDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                }
                return res.status(200).json({ message: "Task is found", task: {
                ...task.toObject(),
                timeToComplete: remainingDays
            } });
            }
            return res.status(200).json({ message: "Task is found", task });
        } else {
            return res.status(404).json({ message: 'Task is not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while fetching the task', error });
    }
}

async function updateTaskById(req, res) {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (task) {
            return res.status(200).json({ message: "Task is updated", task });
        } else {
            return res.status(404).json({ message: 'Task is not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while updating the task', error });
    }
}

async function deleteTaskById(req, res) {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (task) {
            return res.status(200).json({ message: "Task is updated", task });
        } else {
            return res.status(404).json({ message: 'Task is not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while deleting the task', error });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
}
