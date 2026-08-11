import express from 'express';
import { todosRouter } from './routes/todos.route.js';
import { requestContext } from './middleware/request-context.js';
import { registerHandlers } from './events/handlers/index.js';

const app = express();
app.use(express.json());
app.use(requestContext);
app.use('/v1/todos', todosRouter);

app.use((err, _req, res, _next) => {
  res.status(err.status ?? 500).json({
    error: { code: err.code ?? 'INTERNAL', message: err.message },
  });
});

registerHandlers();

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`hackchild-backend listening on :${port}`));

export { app };
