const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('coffee_flavors.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the `coffee_flavors` table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS coffee_flavors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table `coffee_flavors` is ready.');
    }
  });
});
// Preseed the database with some flavors
const preseedFlavors = [
    { name: 'Vanilla', description: 'Classic sweet vanilla syrup' },
    { name: 'Caramel', description: 'Rich caramel syrup with a buttery flavor' },
    { name: 'Hazelnut', description: 'Nutty and creamy hazelnut flavor' },
    { name: 'Pumpkin Spice', description: 'Perfect for fall, with cinnamon and nutmeg notes' },
    { name: 'Mocha', description: 'Rich chocolate flavor with a hint of coffee' },
  ];
  
  // Insert preseed data
  preseedFlavors.forEach((flavor) => {
    const query = `INSERT INTO coffee_flavors (name, description) VALUES (?, ?)`;
    db.run(query, [flavor.name, flavor.description], (err) => {
      if (err) {
        console.error('Error seeding data:', err.message);
      }
    });
  });

// Export the database connection
module.exports = db;