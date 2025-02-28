import 'dotenv/config';
import 'reflect-metadata';

import app from './app';
import { AppDataSource } from './config/data-source';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing Data Source:', error);
  });
