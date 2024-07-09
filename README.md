# Todo-App Backend API

This is a simple CRUD (Create, Read, Update, Delete) API for Todo's in the Todo App. It's built with Node.js, Express, and MongoDb.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDb
- Postman or alternative to test API.

### Installing

1. Clone the repository: `git clone https://github.com/Lindo-pineapple/Todo-Server Backend-API`
2. Navigate to the project directory: `cd Backend-API`
3. Install the dependencies: `npm install`

### Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=3000
MONGO_CONNECTION_STRING = your_mongoDb_database_connection_string
AUTH_SECRET=your_app_auth_secret
```

### Running the Application
1. Update the .env file with all your details, see `.env.sample`. simply rename the file to `.env` and replace the values with your values.
2. Start the application: `npm start`.

The application will be running at http://localhost:3000 unless a different port is specified.

### Docker
You can also run the application in a **Docker container**:

* Build the Docker image: `docker build -t backend-api .`
* Run the application in a Docker container: `docker run -p 3000:3000 -d backend-api`

### Running the Tests
Run the tests: `npm test`

A `test-results.xml` file will be created with the test results.

### API Documentation
API documentation is available at http://localhost:3000/api-docs (when the application is running).

### Built With
* Node.js - JavaScript runtime
* Express - Web application framework
* MongoDb - Database
* Docker - Containerization platform

### License
This project is licensed under the MIT License.
