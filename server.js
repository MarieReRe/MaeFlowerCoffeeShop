import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: 'fcb03831-b02d-4251-b7fc-079f90fc38df',
    clientToken: 'pub58db0d20aaf005d3cf0b57062bcfe30a',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.com',
    service: 'maeflower',
    env: '<ENV_NAME>',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    defaultPrivacyLevel: 'mask-user-input',
});
const express = require('express');
const db = require('./database');
const app = express();
app.use(express.json());

// API to fetch all coffee flavors
app.get('/api/flavors', (req, res) => {
  const query = `SELECT * FROM coffee_flavors ORDER BY created_at DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// API to add a new coffee flavor
app.post('/api/flavors', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Flavor name is required.' });
  }
  const query = `INSERT INTO coffee_flavors (name, description) VALUES (?, ?)`;
  db.run(query, [name, description], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, name, description });
    }
  });
});

// API to delete a coffee flavor by ID
app.delete('/api/flavors/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM coffee_flavors WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: `Flavor with ID ${id} deleted.` });
    } else {
      res.status(404).json({ error: `Flavor with ID ${id} not found.` });
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});