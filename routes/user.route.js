const express = require('express');

const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/:id/update', controller.update);

router.get('/:id/delete', controller.delete);

router.post('/create', controller.postCreate);

router.post('/update', controller.postUpdate);

module.exports = router;
