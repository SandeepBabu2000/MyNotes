# MY Notes - Real-time Collaborative Note Taking Application

## 📝 Description

MY Notes is a modern, real-time collaborative note-taking application built with React, TypeScript, and Node.js. The application allows users to create, edit, share, and collaborate on notes in real-time using WebSocket technology.

### ✨ Features

- **User Authentication**: Secure login and signup system with JWT tokens
- **Real-time Collaboration**: Live note editing with WebSocket integration
- **Note Management**: Create, edit, delete, and organize notes
- **Note Sharing**: Share notes with other users for collaboration
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Rich Text Editor**: WYSIWYG editor for enhanced note formatting
- **Real-time Updates**: Instant synchronization across all connected clients
- **Database Persistence**: PostgreSQL database with Prisma ORM

### 🏗️ Tech Stack

**Frontend:**

- React 19 with TypeScript
- Vite for build tooling
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Socket.io Client for real-time communication
- React Simple WYSIWYG for rich text editing

**Backend:**

- Node.js with Express
- TypeScript
- Prisma ORM with PostgreSQL
- Socket.io for real-time features
- JWT for authentication
- bcrypt for password hashing
- CORS enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SandeepBabu2000/MyNotes.git
   cd MyNotes
   ```

2. **Install Backend Dependencies**

   ```bash
   cd my-notes-backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../my-notes-frontend
   npm install
   ```

### Database Setup

1. **Set up PostgreSQL database**

   - Create a new PostgreSQL database
   - Note down the database connection details

2. **Run Database Migrations**
   ```bash
   cd my-notes-backend
   npm run prisma:migrate
   npm run prisma:generate
   ```

### Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `my-notes-backend` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/mynotes_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:5173
```

#### Frontend Environment Variables

Create a `.env` file in the `my-notes-frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# WebSocket Configuration
VITE_SOCKET_URL=http://localhost:5000
```

### Running the Application

#### Start the Backend Server

```bash
cd my-notes-backend

# Development mode with auto-reload
npm run dev

# Production build and start
npm run build
npm start
```

The backend server will start on `http://localhost:5000`

#### Start the Frontend Development Server

```bash
cd my-notes-frontend

# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

The frontend application will start on `http://localhost:5173`

### Available Scripts

#### Backend Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build the TypeScript application
- `npm start` - Start the production server
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio for database management

#### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
MyNotes/
├── my-notes-backend/          # Backend API server
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Express middleware
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── sockets/          # WebSocket handlers
│   │   └── config/           # Configuration files
│   ├── prisma/               # Database schema and migrations
│   └── package.json
├── my-notes-frontend/         # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # Redux store
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🔧 Configuration Details

### Backend Environment Variables

| Variable       | Description                      | Required | Default               |
| -------------- | -------------------------------- | -------- | --------------------- |
| `DATABASE_URL` | PostgreSQL connection string     | Yes      | -                     |
| `JWT_SECRET`   | Secret key for JWT token signing | Yes      | -                     |
| `PORT`         | Server port number               | No       | 5000                  |
| `NODE_ENV`     | Environment mode                 | No       | development           |
| `CORS_ORIGIN`  | Allowed CORS origin              | No       | http://localhost:5173 |

### Frontend Environment Variables

| Variable            | Description          | Required | Default |
| ------------------- | -------------------- | -------- | ------- |
| `VITE_API_BASE_URL` | Backend API base URL | Yes      | -       |
| `VITE_SOCKET_URL`   | WebSocket server URL | Yes      | -       |

## 🛠️ Development

### Database Management

- **Prisma Studio**: Run `npm run prisma:studio` to open a web interface for database management
- **Migrations**: Use `npm run prisma:migrate` to apply database schema changes
- **Generate Client**: Run `npm run prisma:generate` after schema changes

### API Endpoints

The backend provides the following main endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `POST /api/notes/:id/share` - Share a note with another user

---

**Happy Note Taking! 📝✨**
