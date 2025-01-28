const db = require('./database');

// Function to delete a flavor by ID
function deleteFlavor(id) {
  const query = `DELETE FROM coffee_flavors WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error deleting flavor:', err.message);
    } else if (this.changes > 0) {
      console.log(`Flavor with ID ${id} deleted.`);
    } else {
      console.log(`Flavor with ID ${id} not found.`);
    }
  });
}

// Example: Delete a coffee flavor by ID
deleteFlavor(1);