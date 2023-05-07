# 2FA Manager API

🚧 WIP WORK IN PROGRESS

## Overview

This is a simple 2FA manager API built with Express.js and MongoDB. It provides an easy-to-use interface for securely managing two-factor authentication methods for your users.

## Installation

1. Clone the repository:
```bash
  git clone https://github.com/willaug/2fa-manager-express-mongodb.git
```

2. Install the dependencies:
```bash
  cd 2fa-manager-express-mongodb
  npm install
```

3. Start the server:
```bash
  npm start # production
  npm run dev # development
```

# Usage
The API exposes the following endpoints:

- `POST /users` - Create a new user with 2FA disabled
- `GET /users/:userId` - Get a user data
- `POST /users/authenticate` - Authenticate a user and generate a JWT token for subsequent requests
- `POST /2fa` - Enable 2FA for a user
- `DELETE /2fa` - Disable 2FA for a user
- `POST /2fa/code` - Generate a 2FA code for a user
- `POST /2fa/validate` - Validate a 2FA code for a user

Refer to the API documentation for more details on each endpoint and their required inputs.

## Author
- Developed by [@will](https://github.comn/willaug)
- Developed in MongoDB, NodeJS and ExpressJS
- *Contact me:* william.santos315@outlook.com
