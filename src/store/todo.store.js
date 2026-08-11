import { randomUUID } from 'node:crypto';

export class TodoStore {
  #todos = new Map();

  list() {
    return [...this.#todos.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  create({ id, title }) {
    const todo = {
      id: id ?? randomUUID(),
      title,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
    };
    this.#todos.set(todo.id, todo);
    return todo;
  }

  complete(id) {
    const todo = this.#todos.get(id);
    if (!todo) return null;
    if (todo.completed) return todo; // idempotent: re-completing is a no-op
    todo.completed = true;
    todo.completedAt = new Date().toISOString();
    return todo;
  }
}
