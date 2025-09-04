# Registration Backend

This is a Node.js backend for user registration, storing user details in a MongoDB database.

## Features

- User registration with first name, last name, email, and password
- Password hashing using bcrypt
- MongoDB for data storage
- CORS enabled for frontend integration

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up MongoDB:
   - For local development, install MongoDB and update `.env` with your local URI.
   - For production, use MongoDB Atlas and update `.env` with the Atlas URI.

3. Update `.env` file:
   ```
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   ```

4. Run the server:
   ```
   npm start
   ```
   Or for development:
   ```
   npm run dev
   ```

## API Endpoints

- POST `/api/auth/register`: Register a new user
  - Body: { firstName, lastName, email, password }

## Deployment

### Backend Deployment (e.g., Heroku)

1. Create a Heroku app.
2. Set environment variables in Heroku:
   - MONGODB_URI: Your MongoDB Atlas URI
   - PORT: 5000 (or as per Heroku)
3. Deploy the code to Heroku.

### Frontend Deployment

The frontend is static HTML/JS. Deploy to Netlify, Vercel, or GitHub Pages.

Update the fetch URL in `register.html` to the deployed backend URL.

## Security Notes

- Passwords are hashed before storage.
- Input validation is implemented.
- For production, consider adding rate limiting, email verification, etc.
