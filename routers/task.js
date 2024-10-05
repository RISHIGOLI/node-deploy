const express = require('express')
const { createTask, getTasks, getTasksByName, updateTaskByPut, patchTask } = require('../controllers/task')
const router = express.Router()

router.post('/', createTask)
router.get('/', getTasks)
router.get('/:title', getTasksByName)
router.put('/:id', updateTaskByPut)
router.patch('/:id', patchTask)

module.exports = router