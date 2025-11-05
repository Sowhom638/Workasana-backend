const express = require("express")
const router = express.Router();

const { verifyJWT } = require('../middleware/verifyJWT');
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
} = require("../controllers/task.controller");

router.post('/', verifyJWT, createTask);
router.get('/', verifyJWT, getAllTasks);
router.get('/:id', verifyJWT, getTaskById);
router.post('/:id', verifyJWT, updateTaskById);
router.delete('/:id', verifyJWT, deleteTaskById);

module.exports = router;