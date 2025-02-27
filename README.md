# My Node.js + MySQL App

A simple Node.js app using **Express**, **mysql2**, and **dotenv** for environment-based configuration. It provides basic CRUD for a `users` table.

## Setup

1. Clone the repo and run:
   ```bash
   npm install
   ```
2. Update your MySQL credentials in `config/development.js`.
3. Create a `users` table in your MySQL database:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255)
   );
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- **GET** `/users` – Get all users  
- **GET** `/users/:id` – Get a user by ID  
- **POST** `/users` – Create a user (send JSON with `name` and `email`)  
- **PUT** `/users/:id` – Update a user  
- **DELETE** `/users/:id` – Delete a user

## Git Flow

- **main**: production  
- **develop**: integration  
- **feature/**: new features via pull requests