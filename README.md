# Event Management Website

A full-stack web application built for an event management company to showcase events, handle public registrations, and manage everything through a secure admin panel. Built as a 2-credit college course project.

## Features

**Public site**
- Browse all upcoming events on the homepage
- View full event details (date, location, price, capacity, description)
- Register for an event with just a name and email — no account needed
- Automatic capacity enforcement (prevents overbooking)

**Admin panel** (protected, login required)
- Secure login using JWT-based authentication
- Create, edit, and delete events
- View the list of registrants for any event
- Role-based access control — only accounts with the `admin` role can manage events

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas), Mongoose |
| Authentication | JWT, bcrypt.js |
| API Testing | Thunder Client |

## Project Structure

```
event_management_website/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route logic (events, auth, registrations)
│   ├── middleware/       # Auth/role protection
│   ├── models/           # Mongoose schemas (Event, User, Registration)
│   ├── routes/            # API route definitions
│   └── server.js
├── frontend/
│   └── src/
│       ├── api/          # Axios instance
│       ├── components/   # Navbar, ProtectedRoute
│       ├── context/       # Auth state (login/logout, persisted session)
│       └── pages/         # Home, EventDetails, Login, AdminPanel
├── docs/
│   └── project-report.docx
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (LTS)
- A MongoDB Atlas account (free tier) and connection string

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_random_secret_string
```

Run the server:
```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/events` | Public | List all events |
| GET | `/api/events/:id` | Public | Get a single event |
| POST | `/api/events` | Admin only | Create an event |
| PUT | `/api/events/:id` | Admin only | Update an event |
| DELETE | `/api/events/:id` | Admin only | Delete an event |
| POST | `/api/auth/register` | Public | Create a user account |
| POST | `/api/auth/login` | Public | Log in, returns a JWT |
| POST | `/api/registrations/:eventId` | Public | Register for an event |
| GET | `/api/registrations/:eventId` | Admin only | View registrants for an event |

## Notes

- The first admin account must be promoted manually by editing the `role` field to `"admin"` directly in the MongoDB `users` collection — this is intentional, so no one can self-promote to admin through the app.
- The project report, including the full SRS and development log, is available in `docs/project-report.docx`.

## Future Enhancements

- Email confirmation on registration
- Online payment integration for paid events
- Event search and filtering
- Pagination for large event lists