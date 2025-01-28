const db = require('./database');

// Function to fetch all flavors
function getAllFlavors() {
  const query = `SELECT * FROM coffee_flavors ORDER BY created_at DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching flavors:', err.message);
    } else {
      console.log('Available Coffee Flavors:');
      rows.forEach((row) => {
        console.log(`${row.id}: ${row.name} - ${row.description}`);
      });
    }
  });
}

// Fetch and display all flavors
getAllFlavors();