import { Router } from 'express';
import * as TodoController from '../controllers/todo.controller';
const router = new Router();

// Get all Todos
router.route('/todos').get(TodoController.getTodos);
/*
// Get one  by cuid
router.route('/posts/:cuid').get(PostController.getPost);
*/
// Add a new Todo
router.route('/todos').post(TodoController.addTodo);

// Delete a todo by cuid
router.route('/todos/:cuid').delete(TodoController.deleteTodo);
// Update a todo by cuid
router.route('/todos/:cuid').put(TodoController.updateTodo);


export default router;
