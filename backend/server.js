const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Import Routes
const notificationRoutes = require('./routes/notification.routes');
const roleRoutes = require('./routes/role.routes');

// Use Routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/roles', roleRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
