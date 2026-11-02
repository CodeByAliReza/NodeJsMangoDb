const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');

router.get('/', taskController.getAllTask);
router.get('/:id', taskController.getUserById);
router.post('/', taskController.postUser);
router.patch('/:id', taskController.patchUser);
router.put('/:id', taskController.putUser);
router.get('/search', taskController.getUserByParams);
router.delete('/:id', taskController.deleteUser);

module.exports = router;
