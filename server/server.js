// const express = require('express');
// const cors = require('cors');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // CORS configuration (Allow frontend requests with credentials)
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   })
// );

// app.use(bodyParser.json());

// // Session configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'your_secret_key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Secure in production
//       maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
//     },
//   })
// );

// // Root route
// app.get('/', (req, res) => {
//   res.send('Backend is running...');
// });

// // Import and use authentication routes
// const authRoutes = require('./authRoutes');
// app.use('/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./authRoutes");


const app = express();
const PORT = 5000;
const filePath = path.join(__dirname, "../src/assets/bookmarks.json");

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true"); // ✅ Required for credentials
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use("/auth", authRoutes); // Now all auth routes start with /auth
app.get("/", (req, res) => {  
  res.send("Backend is running...");
});
// Read bookmarks
app.get("/bookmarks", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });
        res.json(JSON.parse(data));
    });
});

// Add a new bookmark
app.post("/bookmarks", (req, res) => {
    const newBookmark = req.body;

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        let bookmarks = JSON.parse(data);

        // Check if the bookmark already exists
        const exists = bookmarks.some((bookmark) => bookmark.description === newBookmark.description);
        if (exists) return res.status(400).json({ error: "Bookmark already exists" });

        // Add and save
        bookmarks.push(newBookmark);
        fs.writeFile(filePath, JSON.stringify(bookmarks, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error writing file" });
            res.json({ message: "Bookmark added successfully", newBookmark });
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

