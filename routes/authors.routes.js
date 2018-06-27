const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.controller');

router.get('/create', authorsController.create);
router.post('/create', authorsController.doCreate);

router.get('/', authorsController.list);


module.exports = router;