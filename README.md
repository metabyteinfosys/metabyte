# Metabyte - Professional IT Services Website

A modern, full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. This professional website showcases IT services including website development, mobile app development, digital branding, and more.

## 🚀 Features

- **Modern & Responsive Design**: Beautiful, mobile-friendly interface with smooth animations
- **Book Appointments**: Interactive form for scheduling consultations
- **Get Quotes**: Detailed quote request system for project inquiries
- **Service Showcase**: Comprehensive display of IT services offered
- **Contact Forms**: Easy communication channels for clients
- **RESTful API**: Full-featured backend with MongoDB integration
- **Type Safety**: Built entirely with TypeScript for robust development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🛠️ Installation

### 1. Clone or Navigate to the Project

```bash
cd d:\development\metabyte
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env file with your configuration
# Open .env and set your MongoDB URI and other settings
```

**Backend Environment Variables** (`.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/metabyte
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd d:\development\metabyte\frontend

# Install dependencies
npm install
```

**Frontend Environment Variables** (`.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or run mongod directly
mongod
```

### Start Backend Server

```bash
# In the backend directory
cd d:\development\metabyte\backend

# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm run build
npm start
```

The backend server will start at `http://localhost:5000`

### Start Frontend Application

```bash
# In a new terminal, navigate to frontend directory
cd d:\development\metabyte\frontend

# Start the React development server
npm start
```

The frontend will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
metabyte/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── appointment.controller.ts
│   │   │   └── quote.controller.ts
│   │   ├── models/
│   │   │   ├── Appointment.ts       # Appointment schema
│   │   │   └── Quote.ts             # Quote schema
│   │   ├── routes/
│   │   │   ├── appointment.routes.ts
│   │   │   └── quote.routes.ts
│   │   └── server.ts                # Express server setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/             # Navigation component
│   │   │   └── Footer/             # Footer component
│   │   ├── pages/
│   │   │   ├── Home/               # Homepage
│   │   │   ├── Services/           # Services page
│   │   │   ├── About/              # About page
│   │   │   ├── Contact/            # Contact page
│   │   │   ├── BookAppointment/    # Appointment booking
│   │   │   └── GetQuote/           # Quote request
│   │   ├── services/
│   │   │   └── api.ts              # API integration
│   │   ├── App.tsx                 # Main app component
│   │   ├── index.tsx               # App entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── README.md
```

## 🎯 API Endpoints

### Appointments

- **POST** `/api/appointments` - Create new appointment
- **GET** `/api/appointments` - Get all appointments
- **GET** `/api/appointments/:id` - Get appointment by ID
- **PATCH** `/api/appointments/:id/status` - Update appointment status
- **DELETE** `/api/appointments/:id` - Delete appointment

### Quotes

- **POST** `/api/quotes` - Create new quote request
- **GET** `/api/quotes` - Get all quotes
- **GET** `/api/quotes/:id` - Get quote by ID
- **PATCH** `/api/quotes/:id/status` - Update quote status
- **DELETE** `/api/quotes/:id` - Delete quote

## 🎨 Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 🔧 Development

### Backend Development

```bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Frontend Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📦 Building for Production

### Backend

```bash
cd backend
npm run build
# Compiled files will be in the dist/ folder
```

### Frontend

```bash
cd frontend
npm run build
# Optimized production build will be in the build/ folder
```

## 🌐 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible (consider MongoDB Atlas for cloud hosting)
3. Deploy the `dist` folder after building

### Frontend Deployment

1. Build the production version: `npm run build`
2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)
3. Configure environment variables on the hosting platform

## 🔐 Environment Variables

### Backend Required Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin

### Frontend Required Variables

- `REACT_APP_API_URL` - Backend API URL

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check if the MongoDB URI in `.env` is correct
- Verify firewall settings aren't blocking port 27017

### CORS Errors

- Verify `CORS_ORIGIN` in backend `.env` matches your frontend URL
- Ensure backend server is running before frontend

### Port Already in Use

```bash
# Windows - Find and kill process using port
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change the PORT in .env file
```

## 📝 License

This project is created for Metabyte IT Services.

## 👥 Contact

For questions or support, please contact:
- **Email**: info@metabyte.com
- **Phone**: +1 (555) 123-4567
- **Website**: [metabyteinfosys.com](https://www.metabyteinfosys.com)

## 🚀 Next Steps

1. Install dependencies for both backend and frontend
2. Configure environment variables
3. Start MongoDB
4. Run backend server
5. Run frontend application
6. Access the website at `http://localhost:3000`

---

**Built with ❤️ using MERN Stack + TypeScript**
# Backend README

## API Documentation

### Appointment Endpoints

#### Create Appointment
```http
POST /api/appointments
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "service": "Website Development",
  "preferredDate": "2024-01-15",
  "preferredTime": "10:00 AM",
  "message": "Need a new company website"
}
```

#### Get All Appointments
```http
GET /api/appointments
```

#### Get Appointment by ID
```http
GET /api/appointments/:id
```

#### Update Appointment Status
```http
PATCH /api/appointments/:id/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

Status options: `pending`, `confirmed`, `cancelled`, `completed`

#### Delete Appointment
```http
DELETE /api/appointments/:id
```

### Quote Endpoints

#### Create Quote
```http
POST /api/quotes
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "StartUp Inc",
  "services": ["Website Development", "Mobile App Development"],
  "projectDescription": "Need a complete digital solution",
  "budget": "$10,000 - $25,000",
  "timeline": "3-6 months"
}
```

#### Get All Quotes
```http
GET /api/quotes
```

#### Get Quote by ID
```http
GET /api/quotes/:id
```

#### Update Quote Status
```http
PATCH /api/quotes/:id/status
Content-Type: application/json

{
  "status": "reviewed"
}
```

Status options: `pending`, `reviewed`, `quoted`, `rejected`

#### Delete Quote
```http
DELETE /api/quotes/:id
```

## Database Models

### Appointment Model
- name (String, required)
- email (String, required)
- phone (String, required)
- company (String, optional)
- service (String, required, enum)
- preferredDate (Date, required)
- preferredTime (String, required)
- message (String, optional)
- status (String, enum: pending/confirmed/cancelled/completed)
- timestamps (createdAt, updatedAt)

### Quote Model
- name (String, required)
- email (String, required)
- phone (String, required)
- company (String, optional)
- services (Array of Strings, required)
- projectDescription (String, required)
- budget (String, optional)
- timeline (String, optional)
- status (String, enum: pending/reviewed/quoted/rejected)
- timestamps (createdAt, updatedAt)

## Running Tests

Currently no tests are configured. To add tests:

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

## Environment Configuration

Create a `.env` file in the backend root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/metabyte
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

For production, update these values accordingly.
