const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory store for registered users
const users = {};

// Serve the login form at the root URL
app.get('/login', (req, res) => {
    res.send(`
        <h2>Login Page</h2>
        <form action="/login" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register here</a></p>
    `);
});

// Serve the registration form
app.get('/register', (req, res) => {
    res.send(`
        <h2>Register Page</h2>
        <form action="/register" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit">Register</button>
        </form>
    `);
});

// Handle registration form submission
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (users[username]) {
        return res.send('Username already exists. Please choose another one.');
    }

    // Save the user's credentials
    users[username] = password;
    res.send('Registration successful! You can now <a href="/login">login</a>.');
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] === username && users[username] === password) {
        res.send('Login Successful');
    }
    else if(users[username] === username && users[username] !== password) {
        res.send('Password is incorrect, please re-check!!');
    }
     else {
        res.send('Please Register First');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

