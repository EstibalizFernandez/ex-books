const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

router.get('/', booksController.list);
router.get('/:id', booksController.get);
router.get('/create', booksController.create);
router.post('/create', booksController.doCreate);

module.exports = router;