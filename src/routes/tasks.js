const express = require('express');
const controller = require('../controllers/tasks');
const router = express.Router();

// localhost:5000/api/tasks/...
router.get('/', controller.getList);
router.get('/:id', controller.getById);
router.delete('/:id', controller.deleteById);
router.post('/', controller.create);
router.put('/:id', controller.updateById);

module.exports = router;
