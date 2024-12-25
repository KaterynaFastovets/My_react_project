# REST API with connection to Mongo database.
___
### This project demonstrates the creation of a simple REST API with MongoDB and a React-based frontend to manage a list of products. 
___
## Features
### Backend (REST API)
+ GET /products: Retrieve the list of all products.
+ POST /product: Add a new product with validation for fields.
### Frontend
+ Product List Page: Displays all products in a styled list using Material UI.
+ Add Product Form: A form to add a new product with validation using Formik.
## Backend Setup
**1. Requirements:** 
+ Node.js
+ MongoDB
  
**2. Steps:**

+ Clone the repository:
  
`git clone <repository-url>`

`cd <repository-folder>`

+ Navigate to the backend folder:
  
`cd backend`

+ Run the server:
  
`node index.js`

The backend will be available at http://localhost:3002.

**3. Set environment variables**

Create an *.env* file in the root directory of the project and set the necessary variables:

`MONGO_DB_KEY=user_secret_key`

`MONGO_DB_USER=user_name`

`MONGO_DB_SERVER_NAME=user_database_name`

`PORT=3002`

**4.  Sample Data:** 

 Populate the database with initial product data using MongoDB Compass.
 
## Frontend Setup

**1. Requirements:**

+ Node.js
  
**2. Steps:**

+ Navigate to the frontend folder:
  
`cd client`

+ Start the development server:
  
`npm start`

The frontend will be available at http://localhost:3000.

___
### Student on the Fullstack development course
### Kateryna Fastovets
- 📫 How to reach me **KatyaFastovets@gimail.com**

