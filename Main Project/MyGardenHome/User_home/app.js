// Declare variables for the database connection and database instance
let db, dbPath;

// Function to initialize the database
function initDatabase() {
    // Provide the path to the wasm file
    dbPath = 'sql-wasm.wasm';
    
    // Load the database and create a new instance
    // If you already have an existing database, you can load it instead.
    db = new SQL.Database();

    // Execute your SQL commands here (e.g., create tables, insert data)
    // Example:
    // db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
    // db.run('INSERT INTO users (name, email) VALUES ("John Doe", "john@example.com")');
}

// Function to run SQL queries on the database
function runQuery(query) {
    return db.exec(query);
}

// Function to close the database connection
function closeDatabase() {
    db.close();
}

// Call the initDatabase function to set up the database when the page loads
initDatabase();