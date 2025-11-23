# Backend Deployed! 🎉

**Live URL:** https://githubnasilkullanilmaz.vercel.app

---

## 📋 Complete API Endpoints

### 1️⃣ Health Check

**GET** `/api/health`

```bash
curl https://githubnasilkullanilmaz.vercel.app/api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

### 2️⃣ Register User

**POST** `/api/auth/register`

```bash
curl -X POST https://githubnasilkullanilmaz.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "mehmet",
    "email": "mehmet@example.com",
    "password": "123456",
    "fullName": "Mehmet Öz",
    "role": "operator",
    "amirId": "550e8400-e29b-41d4-a716-446655440000"
  }'
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

### 3️⃣ Login

**POST** `/api/auth/login`

```bash
curl -X POST https://githubnasilkullanilmaz.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mehmet@example.com",
    "password": "123456"
  }'
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

### 4️⃣ Get Current User

**GET** `/api/auth/me`

```bash
curl https://githubnasilkullanilmaz.vercel.app/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
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

### 5️⃣ Create Production Record

**POST** `/api/production-records`

```bash
curl -X POST https://githubnasilkullanilmaz.vercel.app/api/production-records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
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
  }'
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

### 6️⃣ Get All Production Records

**GET** `/api/production-records`

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 50)
- `tarih` - Filter by date (YYYY-MM-DD)
- `urunKodu` - Filter by product code
- `operator` - Filter by operator UUID
- `hatNo` - Filter by line number
- `tezgahNo` - Filter by machine number
- `sortBy` - Sort field (default: tarih)
- `sortOrder` - asc/desc (default: desc)

```bash
# Get all records
curl https://githubnasilkullanilmaz.vercel.app/api/production-records \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# With filters
curl "https://githubnasilkullanilmaz.vercel.app/api/production-records?page=1&limit=20&tarih=2025-11-23&urunKodu=PRD" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
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

### 7️⃣ Get Single Production Record

**GET** `/api/production-records/:id`

```bash
curl https://githubnasilkullanilmaz.vercel.app/api/production-records/789e4567-e89b-12d3-a456-426614174999 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:** Same as single record object above

---

### 8️⃣ Update Production Record

**PUT** `/api/production-records/:id`

```bash
curl -X PUT https://githubnasilkullanilmaz.vercel.app/api/production-records/789e4567-e89b-12d3-a456-426614174999 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "uretimAdedi": 175,
    "operatorHatasi": 2,
    "tezgahAyari": 2
  }'
```

**Response:**
```json
{
  "message": "Production record updated successfully",
  "record": {
    "id": "789e4567-e89b-12d3-a456-426614174999",
    "uretimAdedi": 175,
    "operatorHatasi": 2,
    "tezgahAyari": 2,
    ...
  }
}
```

---

### 9️⃣ Delete Production Record

**DELETE** `/api/production-records/:id`

```bash
curl -X DELETE https://githubnasilkullanilmaz.vercel.app/api/production-records/789e4567-e89b-12d3-a456-426614174999 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "message": "Production record deleted successfully"
}
```

---

## 🔑 Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT token:

```bash
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Get your token from login/register response.

---

## 📊 Field Descriptions

### Production Record Fields

| Field | Type | Description |
|-------|------|-------------|
| `tarih` | DATE | Production date (YYYY-MM-DD) |
| `vardiyaNo` | STRING | Shift number |
| `hatNo` | STRING | Line number |
| `tezgahNo` | STRING | Machine number |
| `operatorId` | UUID | Operator user ID |
| `bolumSorumlusuId` | UUID | Supervisor user ID |
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
| `isBaslangic` | TIME | Work start (HH:MM) |
| `isBitis` | TIME | Work end (HH:MM) |
| `molaVar` | INTEGER | Break duration (minutes) |

---

## 🌐 Frontend Connection

Update your frontend API URL:

```javascript
const API_URL = 'https://githubnasilkullanilmaz.vercel.app/api';
```

Or in `client/src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: 'https://githubnasilkullanilmaz.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
```
