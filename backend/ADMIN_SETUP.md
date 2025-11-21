# Admin Setup Guide

## Create First Admin User

Use this curl command or Postman to create your first admin account:

```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@metabyte.com",
    "password": "admin123",
    "name": "Admin User"
  }'
```

Or using PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/create-admin" -Method Post -ContentType "application/json" -Body '{"email":"admin@metabyte.com","password":"admin123","name":"Admin User"}'
```

## Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@metabyte.com",
    "password": "admin123"
  }'
```

This will return a JWT token. Use this token in subsequent requests:

```bash
curl -X GET http://localhost:5000/api/quotes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## API Endpoints

### Public (No Authentication Required)
- `POST /api/appointments` - Create appointment
- `POST /api/quotes` - Create quote request

### Protected (Requires Authentication)
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `PATCH /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Delete appointment

- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/:id` - Get quote by ID
- `PATCH /api/quotes/:id/status` - Update quote status
- `DELETE /api/quotes/:id` - Delete quote

### Auth Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/create-admin` - Create admin (use once)

## Default Credentials

**Email:** admin@metabyte.com  
**Password:** admin123

**⚠️ IMPORTANT:** Change these credentials after first login!
