African Marketplace 

Welcome to African Marketplace backend, to find endpoints and/or table schema, please use the model below.

Dependencies:
express, knex, sqlite3, pg, nodemon, dotenv cross-env, cors
bcryptjs, jsonwebtoken, jest, supertest

Base url: 
Restricted routes requiring a token are specified below.


Users Table

| data     | type    | required | 
|----------|---------|----------|
| id       | integer | yes      | 
| name     | string  | yes      | 
| username | string  | yes      |  
| password | string  | yes      |
| owner    | boolean | yes      |


Items Table

| data        | type       | required    | 
|-------------|------------|-------------|
| id          | integer    | yes         | 
| item_name   | string     | yes         | 
| quantity    | integer    | yes         | 
| description | text       | yes         | 
| price       | float      | yes         | 
| location    | string     | yes         | 


User_items Table 

| data        | type       | required    | 
|-------------|------------|-------------|
| user_id     | integer    | yes         | 
| item_id     | integer    | yes         | 



Endpoints

Authentication Routes


| Method | Endpoint          | Token | Required                                                                                            |   
|--------|-------------------|-------|-----------------------------------------------------------------------------------------------------|
| POST   | api/auth/register | no    | registers a new user. required: name, username, password, owner. returns: id, username and password |   
| POST   | api/auth/login    | no    | Signs user in and returns a token. Required: username and password. Returns a token.                |   



Users Routes

| Method | Endpoint   | Token | Required                   |  
|--------|------------|-------|----------------------------|
| GET    | /users     | yes   | returns all users          |   
| GET    | /users/:id | yes   | returns user by id         |   
| DELETE | /users/:id | yes   | deletes an individual user |  


Items Routes

| Method | Endpoint         | Token | Required                        |   
|--------|------------------|-------|---------------------------------|
| GET    | /items           | yes   | returns all items               |   
| GET    | /items/:id       | yes   | returns an item by id           |      
| POST   | /items/addItem   | yes   | creates new item in database    |   
| PUT    | /items/:id       | yes   | edits a single item by id       |   
| GET    | /items/:id       | yes   | deletes a specific item by id   |   

