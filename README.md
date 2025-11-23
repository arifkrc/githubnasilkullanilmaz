# Production Records Management System

A full-stack application for managing daily production records with React frontend and Node.js/Express backend.

## Features

- User authentication (login/register)
- Create, read, update, and delete production records
- Filter records by date, product code, and operator
- All Turkish column names as requested
- PostgreSQL database with Sequelize ORM

## Production Record Fields

- Tarih (Date)
- Vardiya No (Shift Number)
- Hat No (Line Number)
- Tezgah No (Machine Number)
- Operatör (Operator)
- Bölüm Sorumlusu (Department Supervisor)
- Ürün Kodu (Product Code)
- Yapılan İşlem (Operation Performed)
- Üretim Adedi (Production Quantity)
- Döküm Hatası (Casting Error)
- Operatör Hatası (Operator Error)
- Tezgah Arızası (Machine Breakdown - minutes)
- Tezgah Ayarı (Machine Setup - minutes)
- Elmas Değişimi (Diamond Change - minutes)
- Parça Bekleme (Part Waiting - minutes)
- Temizlik (Cleaning - minutes)
- İş Başlangıç (Work Start Time)
- İş Bitiş (Work End Time)
- Mola Var/Yok (Break Yes/No)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE production_records;
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=production_records
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

### Backend Setup

1. Install backend dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### First Time Setup

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Register a new user account
4. Login with your credentials
5. Start creating production records!

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

#### Production Records
- `GET /api/production-records` - Get all records (with filters)
- `GET /api/production-records/:id` - Get single record
- `POST /api/production-records` - Create new record
- `PUT /api/production-records/:id` - Update record
- `DELETE /api/production-records/:id` - Delete record

## Project Structure

```
UTFbackEnd/
├── config/
│   └── database.js          # Database configuration
├── models/
│   ├── User.js              # User model
│   ├── ProductionRecord.js  # Production record model
│   └── index.js             # Models index
├── routes/
│   ├── auth.js              # Authentication routes
│   └── productionRecords.js # Production records routes
├── middleware/
│   └── auth.js              # Authentication middleware
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Login.js
│       │   ├── Navbar.js
│       │   ├── ProductionRecordForm.js
│       │   └── ProductionRecordsList.js
│       ├── context/
│       │   └── AuthContext.js
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       └── index.js
├── .env.example
├── .gitignore
├── package.json
└── server.js                # Express server
```

## Technologies Used

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router
- Axios
- Context API for state management

## License

ISC
