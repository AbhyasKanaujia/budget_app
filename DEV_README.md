# Budget App

## Folder Structure

```plaintext
backend
├── config
│   └── config.js
├── controllers
│   └── userController.js
├── models
│   └── User.js
├── routes
│   └── userRoutes.js
├── middleware
│   └── authMiddleware.js
├── server.js
└── package.json

```

## TODO

### User Registration and Authentication

1. Design the User Model:

- [x] Define the structure of the user data. For example, create a User model with fields such as username, email, password, etc.
- [x] Decide which fields are required and include any validation rules you deem necessary.

2. Set up the User Registration Endpoint:

- [ ] Create a route in your backend to handle user registration, such as POST /api/users/register.
- [ ] Accept the required user information (e.g., username, email, password) in the request body.
- [ ] Implement server-side validation for the provided data.
- [ ] Hash the user's password for security using a library like bcrypt.
- [ ] Create a new user instance based on the model and save it to the database (e.g., MongoDB).
- [ ] Handle duplicate email

3. Implement User Authentication:

- [ ] Create a route for user login, such as POST /api/users/login.
- [ ] Accept the login credentials (e.g., username/email and password) in the request body.
- [ ] Validate the provided credentials against the stored user data in the database.
- [ ] Use bcrypt to compare the hashed password with the input password.
- [ ] If the credentials are valid, generate a JSON Web Token (JWT) using a library like jsonwebtoken.
- [ ] Sign the JWT with a secret key and include user-specific data (e.g., id, username) in the payload.
- [ ] Send the JWT as a response to the client.

4. Secure Protected Routes:

- [ ] For routes that require authentication, create middleware to verify the JWT in the request headers.
- [ ] Extract the JWT from the request headers and verify its authenticity using the secret key.
- [ ] If the JWT is valid, set the authenticated user data (e.g., id, username) in the request object and allow access to the protected route.
- [ ] Otherwise, return an unauthorized response.

5. Client-Side Integration:

- [ ] Create registration and login forms in your React frontend, including fields for username, email, and password.
- [ ] Implement form validation and error handling to ensure the provided data meets the necessary requirements.
- [ ] Make API requests to the backend for user registration and login using libraries like axios.
- [ ] Store the JWT in the client's local storage or a secure cookie after successful login.
- [ ] Include the JWT in the headers of subsequent authenticated requests to access protected routes.
