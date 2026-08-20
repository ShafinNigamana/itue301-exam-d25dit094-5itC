# Library Book Management System

**ITUE301 — Advanced Web Development Frameworks**  
**SET B — Library Book Management System**

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Express.js
- **Database:** MongoDB with Mongoose

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`

---

## Backend Setup

```bash
cd backend
npm install
node server.js
```

Or:

```bash
cd backend
npm start
```

The backend runs at `http://localhost:5000`

---

## MongoDB Setup

1. Make sure MongoDB is running locally on `localhost:27017`
2. Copy `.env.example` to `backend/.env`
3. Update the `MONGO_URI` if needed

---

## Environment Variables

| Variable    | Description                    | Example                                  |
|-------------|--------------------------------|------------------------------------------|
| `MONGO_URI` | MongoDB connection string      | `mongodb://localhost:27017/library_db`    |

---

## API Endpoints

### In-Memory (Task 3 & 4)

| Method | Endpoint               | Purpose                  |
|--------|------------------------|--------------------------|
| GET    | `/api/v1/books`        | Get all books            |
| GET    | `/api/v1/borrowings`   | Get all borrowing records|
| POST   | `/api/v1/borrowings`   | Create a borrowing       |

### MongoDB (Task 5)

| Method | Endpoint                    | Purpose                  |
|--------|-----------------------------|--------------------------|
| POST   | `/api/v1/mongo/books`       | Create a book in MongoDB |
| GET    | `/api/v1/mongo/books`       | Get all MongoDB books    |
| POST   | `/api/v1/mongo/members`     | Create a member          |
| POST   | `/api/v1/mongo/borrowings`  | Create a borrowing       |
| GET    | `/api/v1/mongo/borrowings`  | Get all borrowings       |
