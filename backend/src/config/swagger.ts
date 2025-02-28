import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application, Request, Response } from 'express';

const swaggerOptionsV1 = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management API - V1',
      version: '1.0.0',
      description:
        'Fullstack assessment backend for employee management application (Version 1)',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
        description: 'Local server (V1)',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const swaggerSpecV1 = swaggerJsdoc(swaggerOptionsV1);

export const setupSwagger = (app: Application) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecV1));

  app.get('/api/v1/docs.json', (_: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecV1);
  });
};
