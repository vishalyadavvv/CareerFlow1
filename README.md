# JobZee

JobZee is a full-stack job portal application that allows users to search and apply for jobs, and companies to post job listings. The project is divided into two main parts: a Node.js/Express backend and a React/Vite frontend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [License](#license)

---

## Features

- User authentication (register/login)
- Job posting and management (for companies)
- Job search and application (for users)
- Resume upload and management
- Responsive UI

---

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT Authentication

**Frontend:**
- React
- Vite
- CSS

---

## Project Structure

```
JobZee/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
```

---

## Setup Instructions

### 1. Clone the repository

```sh
git clone https://github.com/vishalyadavvv/JobZee.git
cd JobZee
```

### 2. Backend Setup

```sh
cd backend
npm install
```

- Create a `.env` file in `backend/config/` (see Environment Variables section).

#### Start Backend Server

```sh
npm start
# or for development
npm run dev
```

### 3. Frontend Setup

```sh
cd ../frontend
npm install
```

#### Start Frontend

```sh
npm run dev
```

---

## Environment Variables

Create a `config.env` file in `backend/config/` with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Scripts

**Backend:**
- `npm start` — Start server
- `npm run dev` — Start server with nodemon

**Frontend:**
- `npm run dev` — Start development server

---

## License

This project is licensed under the MIT License.

---

Feel free to modify this README to better fit your project’s specifics!
