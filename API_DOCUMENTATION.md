# Production Records API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All endpoints (except register/login) require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## API Endpoints

### 1. User Registration

**POST** `/auth/register`

**Request Body:**
```json
{
  "username": "mehmet",
  "email": "mehmet@example.com",
  "password": "123456",
  "fullName": "Mehmet Öz",
  "role": "operator",
  "amirId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "mehmet",
    "email": "mehmet@example.com",
    "fullName": "Mehmet Öz",
    "role": "operator"
  }
}
```

---

### 2. User Login

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "mehmet@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "mehmet",
    "email": "mehmet@example.com",
    "fullName": "Mehmet Öz",
    "role": "operator"
  }
}
```

---

### 3. Get Current User

**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "mehmet",
  "email": "mehmet@example.com",
  "fullName": "Mehmet Öz",
  "role": "operator",
  "createdAt": "2025-11-23T10:00:00Z",
  "updatedAt": "2025-11-23T10:00:00Z"
}
```

---

### 4. Create Production Record

**POST** `/production-records`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "tarih": "2025-11-23",
  "vardiyaNo": "1",
  "hatNo": "HAT-2",
  "tezgahNo": "TZ-14",
  "operatorId": "123e4567-e89b-12d3-a456-426614174000",
  "bolumSorumlusuId": "550e8400-e29b-41d4-a716-446655440000",
  "urunKodu": "PRD-001",
  "yapilanIslem": "Torna işlemi",
  "uretimAdedi": 150,
  "dokumHatasi": 0,
  "operatorHatasi": 1,
  "islemHatasi": 0,
  "tezgahArizasi": 0,
  "tezgahAyari": 1,
  "elmasDegisimi": 1,
  "parcaBekleme": 0,
  "temizlik": 1,
  "isBaslangic": "08:00",
  "isBitis": "16:00",
  "molaVar": 1
}
```

**Response:**
```json
{
  "message": "Production record created successfully",
  "record": {
    "id": "789e4567-e89b-12d3-a456-426614174999",
    "tarih": "2025-11-23",
    "vardiyaNo": "1",
    "hatNo": "HAT-2",
    "tezgahNo": "TZ-14",
    "operatorId": "123e4567-e89b-12d3-a456-426614174000",
    "operator": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "username": "mehmet",
      "full_name": "Mehmet Öz"
    },
    "bolumSorumlusuId": "550e8400-e29b-41d4-a716-446655440000",
    "bolumSorumlusu": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "ahmet",
      "full_name": "Ahmet Yılmaz"
    },
    "urunKodu": "PRD-001",
    "yapilanIslem": "Torna işlemi",
    "uretimAdedi": 150,
    "dokumHatasi": 0,
    "operatorHatasi": 1,
    "islemHatasi": 0,
    "tezgahArizasi": 0,
    "tezgahAyari": 1,
    "elmasDegisimi": 1,
    "parcaBekleme": 0,
    "temizlik": 1,
    "isBaslangic": "08:00",
    "isBitis": "16:00",
    "molaVar": 1,
    "createdBy": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2025-11-23T10:30:00Z",
    "updatedAt": "2025-11-23T10:30:00Z"
  }
}
```

---

### 5. Get All Production Records

**GET** `/production-records`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters (Optional):**
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 50)
- `tarih` - Filter by date (YYYY-MM-DD)
- `urunKodu` - Filter by product code (partial match)
- `operator` - Filter by operator UUID
- `hatNo` - Filter by line number
- `tezgahNo` - Filter by machine number
- `sortBy` - Sort field (default: tarih)
- `sortOrder` - Sort order: asc/desc (default: desc)

**Example:**
```
GET /production-records?page=1&limit=20&tarih=2025-11-23&urunKodu=PRD
```

**Response:**
```json
{
  "records": [
    {
      "id": "789e4567-e89b-12d3-a456-426614174999",
      "tarih": "2025-11-23",
      "vardiyaNo": "1",
      "hatNo": "HAT-2",
      "tezgahNo": "TZ-14",
      "operatorId": "123e4567-e89b-12d3-a456-426614174000",
      "operator": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "username": "mehmet",
        "full_name": "Mehmet Öz"
      },
      "bolumSorumlusuId": "550e8400-e29b-41d4-a716-446655440000",
      "bolumSorumlusu": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "username": "ahmet",
        "full_name": "Ahmet Yılmaz"
      },
      "urunKodu": "PRD-001",
      "yapilanIslem": "Torna işlemi",
      "uretimAdedi": 150,
      "dokumHatasi": 0,
      "operatorHatasi": 1,
      "islemHatasi": 0,
      "tezgahArizasi": 0,
      "tezgahAyari": 1,
      "elmasDegisimi": 1,
      "parcaBekleme": 0,
      "temizlik": 1,
      "isBaslangic": "08:00",
      "isBitis": "16:00",
      "molaVar": 1,
      "createdBy": "123e4567-e89b-12d3-a456-426614174000",
      "createdAt": "2025-11-23T10:30:00Z",
      "updatedAt": "2025-11-23T10:30:00Z"
    }
  ],
  "totalRecords": 1,
  "totalPages": 1,
  "currentPage": 1
}
```

---

### 6. Get Single Production Record

**GET** `/production-records/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Example:**
```
GET /production-records/789e4567-e89b-12d3-a456-426614174999
```

**Response:** Same as single record in Get All response

---

### 7. Update Production Record

**PUT** `/production-records/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:** (all fields optional, only send what you want to update)
```json
{
  "uretimAdedi": 175,
  "operatorHatasi": 2,
  "tezgahAyari": 2
}
```

**Response:**
```json
{
  "message": "Production record updated successfully",
  "record": {
    "id": "789e4567-e89b-12d3-a456-426614174999",
    "tarih": "2025-11-23",
    "uretimAdedi": 175,
    "operatorHatasi": 2,
    "tezgahAyari": 2,
    ...
  }
}
```

---

### 8. Delete Production Record

**DELETE** `/production-records/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Example:**
```
DELETE /production-records/789e4567-e89b-12d3-a456-426614174999
```

**Response:**
```json
{
  "message": "Production record deleted successfully"
}
```

---

## Field Descriptions

### Production Record Fields

| Field | Type | Description |
|-------|------|-------------|
| `tarih` | DATE | Production date (YYYY-MM-DD) |
| `vardiyaNo` | STRING | Shift number |
| `hatNo` | STRING | Line number |
| `tezgahNo` | STRING | Machine number |
| `operatorId` | UUID | Operator user ID |
| `bolumSorumlusuId` | UUID | Department supervisor user ID |
| `urunKodu` | STRING | Product code |
| `yapilanIslem` | STRING | Operation performed |
| `uretimAdedi` | INTEGER | Production quantity |
| `dokumHatasi` | INTEGER | Casting error count |
| `operatorHatasi` | INTEGER | Operator error count |
| `islemHatasi` | INTEGER | Process error count |
| `tezgahArizasi` | INTEGER | Machine breakdown (minutes) |
| `tezgahAyari` | INTEGER | Machine setup (minutes) |
| `elmasDegisimi` | INTEGER | Diamond change (minutes) |
| `parcaBekleme` | INTEGER | Part waiting (minutes) |
| `temizlik` | INTEGER | Cleaning (minutes) |
| `isBaslangic` | TIME | Work start time (HH:MM) |
| `isBitis` | TIME | Work end time (HH:MM) |
| `molaVar` | INTEGER | Break duration (minutes) |

### User Fields

| Field | Type | Description |
|-------|------|-------------|
| `username` | STRING | Unique username |
| `email` | STRING | Email address (used for login) |
| `password` | STRING | Password (min 6 characters) |
| `fullName` | STRING | Full name |
| `role` | ENUM | User role: 'admin', 'operator', 'supervisor' |
| `amirId` | UUID | Manager/supervisor user ID (optional) |

---

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Tarih is required",
      "param": "tarih",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

or

```json
{
  "message": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "message": "Production record not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Detailed error message"
}
```

---

## Testing with cURL

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "mehmet",
    "email": "mehmet@example.com",
    "password": "123456",
    "fullName": "Mehmet Öz",
    "role": "operator"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mehmet@example.com",
    "password": "123456"
  }'
```

### Create production record
```bash
curl -X POST http://localhost:5000/api/production-records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "tarih": "2025-11-23",
    "vardiyaNo": "1",
    "hatNo": "HAT-2",
    "tezgahNo": "TZ-14",
    "operatorId": "YOUR_USER_UUID",
    "bolumSorumlusuId": "SUPERVISOR_UUID",
    "urunKodu": "PRD-001",
    "yapilanIslem": "Torna işlemi",
    "uretimAdedi": 150,
    "dokumHatasi": 0,
    "operatorHatasi": 1,
    "islemHatasi": 0,
    "tezgahArizasi": 0,
    "tezgahAyari": 1,
    "elmasDegisimi": 1,
    "parcaBekleme": 0,
    "temizlik": 1,
    "isBaslangic": "08:00",
    "isBitis": "16:00",
    "molaVar": 1
  }'
```

### Get all production records
```bash
curl -X GET http://localhost:5000/api/production-records \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Setup Instructions

1. **Backend is already running on port 5000**

2. **Install frontend dependencies:**
```bash
cd client
npm install
```

3. **Start frontend:**
```bash
npm start
```

4. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

The backend is configured to connect to your Supabase database automatically.
