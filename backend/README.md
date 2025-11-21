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
