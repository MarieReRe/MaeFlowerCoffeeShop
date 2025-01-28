const db = require('./database');

// Function to add a new flavor
function addFlavor(name, description) {
  const query = `INSERT INTO coffee_flavors (name, description) VALUES (?, ?)`;
  db.run(query, [name, description], function (err) {
    if (err) {
      console.error('Error adding flavor:', err.message);
    } else {
      console.log(`Flavor added with ID: ${this.lastID}`);
    }
  });
}

// Example usage: Add a new coffee flavor
addFlavor('Vanilla', 'Classic sweet vanilla syrup');
addFlavor('Caramel', 'Rich caramel syrup with a buttery flavor');
addFlavor('Hazelnut', 'Nutty and creamy hazelnut flavor');