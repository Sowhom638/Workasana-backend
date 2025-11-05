const express = require("express")
const router = express.Router();

const { verifyJWT } = require('../middleware/verifyJWT');
const {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProjectById
} = require("../controllers/project.controller");

router.post('/', verifyJWT, createProject);
router.get('/', verifyJWT, getAllProjects);
router.get('/:id', verifyJWT, getProjectById);
router.delete('/:id', verifyJWT, deleteProjectById);

module.exports = router;