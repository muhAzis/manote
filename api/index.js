import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './src/connections/mongodb.js';
import routes from './src/routes/routes.js';

const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is runningat http://localhost:${port}`);
});

export default app;
