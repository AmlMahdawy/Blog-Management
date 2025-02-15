# Blog Api

This project implements a RESTful API for blogs management, including registration (signup) and login , CRUD on blogs , filter by category , search by blog's content or title. It's built using Node.js, Express, and utilizes MongoDB for data persistence. Input validation is performed using Joi, passwords are securely hashed with bcrypt, and JSON Web Tokens (JWT) are used for authentication and authorization. Comprehensive unit tests are written using Jest.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- joi
- Jest

## Installation

1. Clone the repository: `git clone https://github.com/AmlMahdawy/nodejsProject.git`
2. Navigate to the project directory: `cd nodejsProject`
3. Install dependencies: `npm install` or `yarn install`
4. Configure environment variables: Create a `.env` file in the root directory and add the following environment variables:

   ```
   SECRET_KEY=your_secret_key  // Replace with a strong secret
   MONGODB_URI=mongodb://your_mongodb_connection_string // Your MongoDB connection string
   PORT=3000 // (Optional) Port number. Defaults to 3000 if not provided.

   ```

5. Start the server: `npm start` or `yarn start`

### Documentation
