const express = require('express');

const controller = require('../controllers/transaction.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/:id/complete', controller.isComplete);

router.get('/:id/delete', controller.delete);

module.exports = router;