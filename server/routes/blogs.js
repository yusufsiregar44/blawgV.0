const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');

const authentication = require('../middlewares/authentication');

router.post('/', authentication.verifyToken, blogController.create);

router.get('/', blogController.readAll);

router.get('/:id', blogController.readById);

router.put('/:id', authentication.verifyToken, blogController.updateById);

router.delete('/:id', authentication.verifyToken, blogController.deleteById);

module.exports = router;
