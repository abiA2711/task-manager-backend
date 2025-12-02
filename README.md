# Task Manager Backend

⚠️ **Important:** Admin Access for Reviewers  
To test admin functionalities, use the following credentials:

- **Admin Email:** admin@example.com  
- **Admin Password:** Admin@123  

> Note: Admin accounts are created securely from the backend/database to prevent unauthorized access. Normal users cannot sign up as Admin.
## Project Description
This is the backend for the Task Manager application. It provides REST APIs for user authentication, task management, and role-based access control (Normal User and Admin). The backend is built using Node.js, Express, and MongoDB.
## Features

- User authentication (Sign Up / Sign In)
- Role-based access control: Admin & Normal User
- CRUD operations for tasks (Admin has full control)
- JWT-based authentication
- Secure password storage using bcrypt

## Installation

1. Clone the repository:


  1) git clone https://github.com/abiA2711/task-manager-backend.git
  2) cd task-manager-backend
  3) npm install
 ⚠️ **Important:**
 4) Create a .env file in the root directory and add the following variables: 
   PORT=5000
  JWT_SECRET=mySuperSecret123
  MONGO_URI=mongodb://localhost:27017/task-manager
5)npm start



