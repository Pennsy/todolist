import Todo from '../models/todo';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getTodos(req, res) {
  Todo.find().sort('-dateAdded').exec((err, todos) => {
    if (err) {
      //console.log("!!! hahahaha ");
      res.status(500).send(err);
    }
    res.json({ todos });
    //res.json({ todos:[1,2,3] });
  });
}

/**
 * Save a todo
 * @param req
 * @param res
 * @returns void
 */
export function addTodo(req, res) {
  console.log("!!!add in server!!!", req.body)
  if (!req.body.todo.text) {
    res.status(403).end();
  }

  const newTodo = new Todo(req.body.todo);

  // Let's sanitize inputs
  newTodo.text = sanitizeHtml(newTodo.text);
  newTodo.completed = sanitizeHtml(newTodo.completed);

  newTodo.cuid = cuid();
  newTodo.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ todo: saved });
  });
}

/**
 * Get a single Todo
 * @param req
 * @param res
 * @returns void
 */
/*
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}
*/
/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteTodo(req, res) {
  Todo.findOne({ cuid: req.params.cuid }).exec((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }

    todo.remove(() => {
      res.status(200).end();
    });
  });
}

export function updateTodo(req, res) {
  Todo.findOne({ cuid: req.params.cuid }).exec((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    const updatedTodo = req.body.todo;
    if(!updatedTodo.text){todo.text = sanitizeHtml(updatedTodo.text);}
    if(updatedTodo.completed!=undefined){todo.completed = sanitizeHtml(updatedTodo.completed);}

    todo.save(function (err, saved) {
    if (err) return handleError(err);
      res.json({ todo:saved });
    });
  });
}
