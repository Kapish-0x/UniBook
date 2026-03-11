# 📖 UniBook — Campus Book Marketplace

A full-stack MERN application for university students to browse the library catalog and trade second-hand books.

---

## 🗂️ Project Structure

```
unibook/
├── server/              # Node.js + Express + MongoDB backend
│   ├── models/          # Mongoose schemas (User, LibraryBook, MarketplaceBook)
│   ├── routes/          # API routes (auth, library, marketplace)
│   ├── middleware/       # JWT auth middleware
│   ├── index.js         # Entry point
│   └── .env.example     # Environment variables template
│
└── client/              # React + Vite frontend
    └── src/
        ├── api/         # Axios instance
        ├── context/     # AuthContext (login state)
        ├── components/  # Navbar, BookCard, Modals
        └── pages/       # Home, Library, Marketplace, Login, Register, MyListings
```

---

## ⚙️ Setup & Run

### 1. Prerequisites
- Node.js v18+
- MongoDB running locally (`mongod`) or a MongoDB Atlas URI

---

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT_SECRET
npm run dev
# Runs on http://localhost:5000
```

**`.env` variables:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/unibook
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

> The Vite proxy automatically forwards `/api` requests to `localhost:5000`.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new student |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/auth/me` | Get current user (auth required) |

### Library
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/library` | List all books (supports `?search=&subject=`) |
| GET | `/api/library/:id` | Get one book |
| POST | `/api/library` | Add a book (auth required) |

### Marketplace
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/marketplace` | List all listings (supports `?search=&subject=&condition=`) |
| GET | `/api/marketplace/my-listings` | Your own listings (auth required) |
| GET | `/api/marketplace/:id` | Get one listing |
| POST | `/api/marketplace` | Create a listing (auth required) |
| PATCH | `/api/marketplace/:id/status` | Mark sold/available (auth required) |
| DELETE | `/api/marketplace/:id` | Delete listing (auth required) |

---

## ✨ Features

- **University Library Tab** — Browse all official library books, filter by subject
- **Student Marketplace Tab** — Buy & sell second-hand books, all prices in ₹
- **Authentication** — JWT-based register/login; every student can buy and sell
- **My Listings** — View, mark as sold, or delete your own listings
- **Search & Filter** — Real-time search + subject & condition filters
- **Contact Seller** — View seller's name, phone, and college on click
- **Dark UI** — Premium dark theme with gold accents, Fraunces + Outfit fonts

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6, Axios, react-hot-toast |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Styling | CSS-in-JS (inline styles + CSS variables) |
