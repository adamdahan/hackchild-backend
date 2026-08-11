import { Router } from 'express';
import { TodoStore } from '../store/todo.store.js';
import { publish } from '../events/bus.js';

export const todosRouter = Router();
const store = new TodoStore();

todosRouter.get('/', (req, res) => {
  res.json({ todos: store.list() });
});

todosRouter.post('/', (req, res) => {
  const title = (req.body?.title ?? '').trim();
  if (!title) {
    return res.status(422).json({ error: { code: 'TITLE_REQUIRED', message: 'title is required' } });
  }

  // The client generates the id so it can render optimistically before the
  // round trip completes. We honour it rather than minting our own.
  const todo = store.create({ id: req.body.clientId, title });
  res.status(201).json({ todo });
});

todosRouter.patch('/:id/complete', (req, res) => {
  const todo = store.complete(req.params.id);
  if (!todo) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'no such todo' } });
  }

  // Fire and forget. Nothing in this file names the handler that picks it up.
  publish({ type: 'todo.completed', todoId: todo.id, at: todo.completedAt });

  res.json({ todo });
});
