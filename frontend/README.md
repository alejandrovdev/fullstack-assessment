# Fullstack Assessment

This repository contains a frontend application that demonstrates a typical CRUD setup for managing employees. It uses **React.js**, **TypeScript**, and other data layers to illustrate best practices for organizing code and validating data.

## Table of Contents

- [Fullstack Assessment](#fullstack-assessment)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Technologies Used](#technologies-used)
  - [Setup Instructions](#setup-instructions)
  - [Running the Application](#running-the-application)

## Prerequisites

- Install Node: [https://nodejs.org](https://nodejs.org)
- Install Pnpm: [https://pnpm.io](https://pnpm.io)

## Technologies Used

- **Node.js** and **Express** for server-side code
- **React** for dynamic UI components
- **ESLint** and **Prettier** for code formatting and linting

## Setup Instructions

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Configure environment variables**:

- Create a `.env` file and copy `.env.example` content to `.env`.
- Update values in `.env`. Example:

  ```
  VITE_APP_BASE_API="http://localhost:3000/api/v1"
  ```

## Running the Application

Once you have the environment set up, run:

```bash
pnpm run dev
```

This command starts the server in development mode in [http://localhost:5174](http://localhost:5174).

