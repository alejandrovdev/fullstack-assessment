# Fullstack Assessment (Backend)

This repository contains a backend application that demonstrates a typical CRUD setup for managing employees. It uses **Node.js**, **Express**, **TypeScript**, **TypeORM** and other data layers to illustrate best practices for organizing code, validating data, and writing unit tests.

## Table of Contents

- [Fullstack Assessment (Backend)](#fullstack-assessment-backend)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Technologies Used](#technologies-used)
  - [Setup Instructions](#setup-instructions)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
    - [Swagger Docs](#swagger-docs)
    - [Example Requests](#example-requests)
  - [Testing](#testing)

## Prerequisites

- Install Node: [https://nodejs.org](https://nodejs.org)
- Install Pnpm: [https://pnpm.io](https://pnpm.io)
- Install Docker Desktop: [https://www.docker.com](https://www.docker.com)

## Technologies Used

- **Node.js** and **Express** for server-side code
- **TypeScript** for static typing
- **TypeORM** for database interaction
- **Jest** for testing
- **ESLint** and **Prettier** for code formatting and linting
- **Swagger** for API documentation
- **Docker** for containerizing the database

## Setup Instructions

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Configure environment variables**:

- Create a `.env` file and copy `.env.example` content to `.env`.
- Update values in `.env`. Example:

  ```
  NODE_ENV=dev

  PORT=3000

  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=user
  DB_PASSWORD=pass
  DB_NAME=fullstack_assessment
  PORT=3000
  ```

3. **Run database container**:

   This will start the MySQL container. Make sure the `.env` matches the credentials in `docker-compose.yml`.

   ```bash
   docker-compose up -d
   ```

## Running the Application

Once you have the environment set up:

```bash
pnpm run dev
```

This command starts the server in development mode, listening on the port specified in your `.env`.

- Open `http://localhost:3000` in your browser or use a tool like **Postman** to interact with the endpoints.

## API Endpoints

Below is a general overview of the endpoints defined in `employee.routes.ts` and handled by `employee.controller.ts`. The exact routes may differ based on your code:

| Method | Endpoint         | Description                   | Request Body                                         |
| ------ | ---------------- | ----------------------------- | ---------------------------------------------------- |
| GET    | `/employees`     | Retrieves all employees       | _None_                                               |
| GET    | `/employees/:id` | Retrieves a specific employee | _None_                                               |
| POST   | `/employees`     | Creates a new employee        | `{ firstName, lastName, hireDate, department, ... }` |
| PUT    | `/employees/:id` | Updates an existing employee  | Partial or full employee data                        |
| DELETE | `/employees/:id` | Deletes a specific employee   | _None_                                               |

### Swagger Docs

You can interact directly with the API through swagger by entering to `http://localhost:3000/api/v1/docs`

### Example Requests

1. **Create Employee** (POST `/employees`):

   ```bash
   curl -X POST http://localhost:3000/employees \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "John",
       "lastName": "Doe",
       "hireDate": "2025-02-27T00:00:00Z",
       "department": "IT",
       "phone": "1234567890",
       "address": "123 Main St"
     }'
   ```

2. **Get All Employees** (GET `/employees`):

   ```bash
   curl http://localhost:3000/employees
   ```

3. **Get Employee by ID** (GET `/employees/1`):

   ```bash
   curl http://localhost:3000/employees/1
   ```

4. **Update Employee** (PUT `/employees/1`):

   ```bash
   curl -X PUT http://localhost:3000/employees/1 \
     -H "Content-Type: application/json" \
     -d '{
       "department": "Marketing",
       "phone": "9876543210"
     }'
   ```

5. **Delete Employee** (DELETE `/employees/1`):

   ```bash
   curl -X DELETE http://localhost:3000/employees/1
   ```

## Testing

To run the tests (unit or integration), use:

```bash
pnpm run test
```
