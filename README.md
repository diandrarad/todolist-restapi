# ToDoList RESTful API

## Introduction
This document provides comprehensive documentation for the ToDoList RESTful API and web service. The API is built using Express.js and supports standard CRUD operations for managing a ToDoList. The database can be either MySQL or MongoDB, and the API implements authentication and authorization.

## Deployment
The web service and RESTful API are deployed on Render. You can access it [here](https://todolist-rest-api.onrender.com).

## Specifications
* Express.js is used for building the web service and RESTful API.
* Supports standard CRUD operations for a ToDoList.
* Database options: MySQL (using sequelize-cli) or MongoDB (using mongoose).
* Endpoints for:
    * Create a new user (Register)
    * Login
    * Create a new todo
    * View all todos
    * View todo details
    * Change todo
    * Delete todo
    * Delete all todos
* Implements authentication and authorization.
* Appropriate response codes are used.

## Endpoints
### User Management
Register (Create a new user)
* **Endpoint: POST /api/users/register**
* **Description:** Creates a new user.
* **Request:**
    * Body:
      ```
      {
          "username": "example",
          "password": "password123"
      }
      ```
* **Response:**
    * Status Code: **201 Created**
    * Body:
      ```
      {
          "user": {
              "_id": "user_id_here",
              "username": "example",
              "password": "hashed_password_here",
              "__v": 0
          },
          "token": "jwt_token_here"
      }
      ```
Login
* **Endpoint: POST /api/users/login**
* **Description:** Logs in an existing user.
* **Request:**
    * Body:
      ```
      {
          "username": "example",
          "password": "password123"
      }
      ```
* **Response:**
    * Status Code: **200 OK**
    * Body:
      ```
      {
          "user": {
              "_id": "user_id_here",
              "username": "example",
              "password": "hashed_password_here",
              "__v": 0
          },
          "token": "jwt_token_here"
      }
      ```
### ToDo Operations
Create a new todo
* **Endpoint: POST /api/todos**
* **Description:** Creates a new todo.
* **Request:**
    * Body:
      ```
      {
          "title": "New Todo",
          "description": "Description of the new todo"
      }
      ```
* **Response:**
    * Status Code: **201 Created**
    * Body:
      ```
      {
          "_id": "todo_id_here",
          "title": "New Todo",
          "description": "Description of the new todo",
          "user": "user_id_here",
          "__v": 0
      }
      ```
View all todos
* **Endpoint: GET /api/todos**
* **Description:** Retrieves all todos for the authenticated user.
* **Response:**
    * Status Code: **200 OK**
    * Body:
      ```
      [
          {
              "_id": "todo_id_here",
              "title": "Todo 1",
              "description": "Description of Todo 1",
              "user": "user_id_here",
              "__v": 0
          },
          {
              "_id": "todo_id_here",
              "title": "Todo 2",
              "description": "Description of Todo 2",
              "user": "user_id_here",
              "__v": 0
          }
      ]
      ```
View todo details
* **Endpoint: GET /api/todos/:id**
* **Description:** Retrieves details of a specific todo.
* **Response:**
    * Status Code: **200 OK**
    * Body:
      ```
      {
          "_id": "todo_id_here",
          "title": "Todo 1",
          "description": "Description of Todo 1",
          "user": "user_id_here",
          "__v": 0
      }
      ```
Update todo
* **Endpoint: PATCH /api/todos/:id**
* **Description:** Updates details of a specific todo.
* **Request:**
    * Body:
      ```
      {
          "title": "Updated Todo",
          "description": "Updated description"
      }
      ```
* **Response:**
    * Status Code: **200 OK**
    * Body:
      ```
      {
          "_id": "todo_id_here",
          "title": "Updated Todo",
          "description": "Updated description",
          "user": "user_id_here",
          "__v": 0
      }
      ```
Delete todo
* **Endpoint: DELETE /api/todos/:id**
* **Description:** Deletes a specific todo.
* **Response:**
    * Status Code: **204 No Content**

Delete all todos
* **Endpoint: DELETE /api/todos**
* **Description:** Deletes all todos for the authenticated user.
* **Response:**
    * Status Code: **204 No Content**

## Authentication and Authorization
* Authentication is implemented using JWT (JSON Web Token).
* Token should be included in the Authorization header for authenticated requests.
* Authorization is implemented to ensure that users can only perform actions on their own todos.

## Response Codes
* **200 OK**: Successful request.
* **201 Created**: Resource successfully created.
* **204 No Content**: Successful request with no response body.
* **400 Bad Request**: Invalid request or missing required parameters.
* **401 Unauthorized**: Authentication failed or user lacks necessary permissions.
* **404 Not Found**: Resource not found.
* **500 Internal**: Server Error: Unexpected server error.

## Database Design
* The database design includes collections for users and todos.
* Relationships: Each todo belongs to a specific user.

## Credits
Perempuan Inovasi 2023 - Full Stack Web Development BootCamp Back End Web Dev Stage
