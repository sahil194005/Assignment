# User Management API

A RESTful API for managing users, built with Node.js, Express, and a simple JSON file for storing user data. The API supports horizontal scaling with a load balancer to distribute requests among multiple instances.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Scaling](#scaling)

## Features

- Create, update, delete, and retrieve users
- Store user data in a JSON file
- Validate UUIDs and request data
- Middleware for error handling
- Horizontal scaling with a load balancer
- Async/Await implementation for better readability

## Requirements

- Node.js
- npm

## Setup

1. Clone the repository:

```
git clone https://github.com/yourusername/user-management-api.git
```

2. Install dependencies:

```
cd user-management-api
npm install
```

3. Create a `.env` file in the root directory of the project and set the `PORT` variable (optional, defaults to 4000):

```
PORT=4000
```

4. Start the development server:

```
npm run start:dev
```

5. For production, build the project and start the server:

```
npm run start:prod
```

## Usage

The API is now running on `http://localhost:4000/api`. Use a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to make requests to the available endpoints.

## API Endpoints

| Method | Endpoint       | Description                          |
|--------|----------------|--------------------------------------|
| GET    | /api/users     | Retrieve a list of all users         |
| GET    | /api/users/:id | Retrieve a user by their UUID        |
| POST   | /api/users     | Create a new user                    |
| PUT    | /api/users/:id | Update an existing user by their UUID |
| DELETE | /api/users/:id | Delete a user by their UUID          |

## Scaling

The application supports horizontal scaling using the Node.js `Cluster` API and a Round-robin load balancer. To start multiple instances of the application, run:

```
npm run start:multi
```

This will start a load balancer on port 4000 and worker instances on ports `4000 + n`, where `n` is the worker ID. The load balancer will distribute incoming requests among the worker instances.

Note: Ensure that the state of the data is consistent across different workers.
