const router = require('express').Router();
const { getAllTodo, getOneTodo, postTodo, updateTodo, deleteTodo } = require('../controller/todoItemsController');


router.get('/', getAllTodo);

router.get('/:id', getOneTodo);

router.post('/', postTodo);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router;