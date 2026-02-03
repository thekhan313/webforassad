require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // enable CORS for all origins
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// Authorization middleware for admin routes
const authMiddleware = require('./middleware/auth');

// Routes
app.use('/api', publicRoutes);              // public routes (no auth)
app.use('/api/admin', adminRoutes); // admin.js handles its own auth internally

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'VideoHub API is running', timestamp: new Date() });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Public APIs: http://localhost:${PORT}/api/videos`);
    console.log(`Admin APIs (require token): http://localhost:${PORT}/api/admin`);
});

// Disable timeout for large uploads
server.timeout = 0;
server.keepAliveTimeout = 0;

