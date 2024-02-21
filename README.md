# Quip REST API

## Overview

This repository is the backend for a chat application built with Node.js and Express.js, and MySQL database. 
This REST API supports user authentication and protected routes using JWT, allows realtime message exchange between clients using websockets message exchanges.
An ORM(Sequelize) is used to interact with the database and utilizes transaction management for data integrity.

## API Endpoints

### User Management

- **POST /api/v1/users/signup**: Signup a new user.
- **POST /api/v1/users/login**: Authenticate a user and sends a JWT token.
