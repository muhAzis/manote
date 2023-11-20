import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './src/connections/mongodb.js';
import routes from './src/routes/routes.js';

const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: ['https://manote.vercel.app', 'http://localhost:5173', 'https://cloudinary.com'] }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is runningat http://localhost:${port}`);
});

export default app;
