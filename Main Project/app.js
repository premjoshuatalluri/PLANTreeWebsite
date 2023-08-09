const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Create and connect to the SQLite database
const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Create the 'users' table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`);

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Serve the static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sign In endpoint
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Implement your logic to check the user credentials in the database
  // Replace this example with your database query
  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) {
      console.error('Error during sign in:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.json({ message: 'Sign in successful' });
  });
});

// ... other middleware and configurations ...

// Sign Up endpoint
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  try {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error('Error during sign up:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (row) {
        return res.status(409).json({ error: 'User already exists' });
      }
  
      // Insert the new user into the database
      db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
        if (err) {
          console.error('Error inserting user:', err.message);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        return res.json({ message: 'Sign up successful' });
      });
    });

    // Example response based on the outcome of user registration
    const successMessage = 'Sign up successful';
    res.json({ message: successMessage });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... other routes and server configuration ...

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
//signup




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
$.post("/signup", { name: name, email: email, password: password }, function (response) {
  alert(response); // Show response from the server (e.g., "Sign up successful" or "User already exists")
}).fail(function (jqXHR, textStatus, errorThrown) {
  console.error("AJAX Error:", textStatus, errorThrown);
  alert("An error occurred. Please try again.");
});

