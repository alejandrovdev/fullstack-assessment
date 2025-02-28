import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { setupSwagger } from './config/swagger';

const app = express();

const morganConfig = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(express.json());
app.use(cors());
app.use(morgan(morganConfig));
app.use('/api', routes);

setupSwagger(app);

export default app;
