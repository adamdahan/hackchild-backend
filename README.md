# hackchild-backend

Express API serving todos for the hackchild demo stack.

```bash
npm install
npm start     # http://localhost:3000
```

## Endpoints

| Method | Path                      | Notes                                    |
|--------|---------------------------|------------------------------------------|
| GET    | `/v1/todos`               | list, newest first                       |
| POST   | `/v1/todos`               | accepts a client-supplied `clientId`      |
| PATCH  | `/v1/todos/:id/complete`  | idempotent; publishes `todo.completed`   |

Architecture documentation lives in
[hackchild-architecture](https://github.com/adamdahan/hackchild-architecture).
