const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

router.get('/create', booksController.create);
router.post('/create', booksController.doCreate);

router.get('/', booksController.list);
router.get('/:id', booksController.get);

router.get('/:id/update', booksController.update);
router.post('/:id/update', booksController.doUpdate);


module.exports = router;