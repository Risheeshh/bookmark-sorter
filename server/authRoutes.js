// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const router = express.Router();

// const users = [
//   { username: 'admin', password: '$2a$10$WqU5q6ytrdKqF9z1c0W5puOWJGfF3J92CkSTlP71QxmkY.XE3Q32G' } // hashed password: "password123"
// ];

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find((u) => u.username === username);
//   if (!user) return res.status(401).json({ message: 'User not found' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//   // Generate a JWT token
//   const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

//   res.json({ token });
// });

// module.exports = router;
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFilePath = path.join(__dirname, "../src/assets/users.json");

// Helper function to read users.json
const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) return [];
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
};

// Helper function to write users.json
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
};

// User signup
router.post("/signup", (req, res) => {
  console.log("Rishi");
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Both fields are required!" });
    }

    const users = readUsers();
    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ error: "User already exists!" });
    }

    const newUser = { username, password }; // Store password as plain text (will improve later)
    users.push(newUser);
    writeUsers(users);

    res.json({username});
});

// User login
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(400).json({ error: "User does not exist!" });
    }
    if (user.password !== password) {
        return res.status(400).json({ error: "Incorrect password!" });
    }

    res.json({username});
});

// Get user details
router.get("/user/:username", (req, res) => {
    const { username } = req.params;
    const users = readUsers();
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(404).json({ error: "User not found!" });
    }
    res.json(user);
});

module.exports = router;
