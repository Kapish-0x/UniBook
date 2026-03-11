# UniBook

A campus book marketplace where university students can browse the university library catalog and trade second-hand books with each other.

---

## Frontend

Built with React 18 and Vite. Has 6 pages — Home, Library, Marketplace, Login, Register, and My Listings. The Library tab shows all official university books and the Marketplace lets students buy and sell second-hand books. Prices are in INR (₹). Uses React Router for navigation, Axios for API calls, and react-hot-toast for notifications.

```bash
cd client
npm install
npm run dev
# http://localhost:5173
```

## Backend

REST API built with Node.js and Express. Handles authentication with JWT and bcrypt. Three route groups — auth, library, and marketplace. Connects to MongoDB via Mongoose.

```bash
cd server
npm install
cp .env.example .env
npm run dev
# http://localhost:5000
```

**.env variables:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/unibook
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

To seed the library with sample books:
```bash
node seed.js
```

## Tech Stack

| | |
|---|---|
| Frontend | React, Vite, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
