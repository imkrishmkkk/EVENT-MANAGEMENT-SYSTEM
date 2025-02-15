# Event Management System

A full-stack event management system that allows users to create, manage, and browse events. The system includes a backend API built with Node.js, Express, and MongoDB, along with a React frontend (using Vite, Tailwind CSS, React Query, and Axios) for a smooth, interactive user experience.

## Features

- **User Authentication:**  
  - Secure sign up, sign in, and sign out using JWT.
- **Event Creation & Management:**  
  - Create events with details (title, description, date/time, location, etc.)
  - View, update, and delete events (with ownership restrictions).
- **Event Browsing:**  
  - Filter and paginate events by category and status.
- **Responsive UI:**  
  - Mobile-friendly and modern UI built with Tailwind CSS.
- **Real-Time Data Fetching:**  
  - Uses React Query for efficient data fetching and caching.
## Tech Stack

- **Backend:**  
  - Node.js, Express
  - MongoDB, Mongoose
  - JSON Web Tokens (JWT) for authentication
  - CORS, dotenv

- **Frontend:**  
  - React (Vite)
  - Tailwind CSS
  - React Query
  - Axios,fetch
  - Redux (with persistence)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A MongoDB instance (local or cloud, e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Backend Setup

1. **Navigate to the backend directory:**
   cd backend

2. **Install dependencies:**
    npm install

3. **Create a .env file in the backend root and add:**
    