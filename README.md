# User Authentication API

This is a simple user authentication API built with Node.js, Express, and MongoDB. It supports user registration, login, and logout functionalities.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the required environment variables (see below).

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. The server will run at `http://localhost:<PORT>` (default port is defined in the `.env` file).

## API Endpoints

### User Registration
- **POST** `/user/signup`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
    ```
  - Response:
    - 201 Created: User created successfully
    - 400 Bad Request: Validation errors

### User Login
- **POST** `/user/login`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - Response:
    - 200 OK: User logged in successfully
    - 400 Bad Request: Invalid credentials

### User Logout
- **POST** `/user/logout`
  - Response:
    - 200 OK: Logged out successfully

## Environment Variables

Create a `.env` file in the root directory with the following variables:
# UBER-clone
# uber-clone
