const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');

router.post('/', blogController.create);

router.get('/', blogController.readAll);

router.get('/:id', blogController.readById);

router.put('/:id', blogController.updateById);

router.delete('/:id', blogController.deleteById);

module.exports = router;
