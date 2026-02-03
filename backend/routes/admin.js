const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/auth');

const VIDEOS_FILE = path.join(__dirname, '../data/videos.json');
const SUBMISSIONS_FILE = path.join(__dirname, '../data/submissions.json');
const REPORTS_FILE = path.join(__dirname, '../data/reports.json');


const getData = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const setData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// POST /api/admin/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token, role: 'admin' });
    }

    res.status(401).json({ error: 'Invalid credentials' });
});

// Protected Admin Routes
router.use(authMiddleware);

// POST /api/admin/upload-video
// Refactored to accept JSON metadata only (no file upload)
router.post('/upload-video', async (req, res) => {
    const { title, description, categories, videoUrl, thumbnail } = req.body;

    // Validation
    if (!title || !videoUrl) {
        return res.status(400).json({ error: 'Title and Video URL are required' });
    }

    // Bunny CDN URL validation (as requested: must start with https://pvideos-cdn.b-cdn.net/)
    const bunnyBaseUrl = 'https://pvideos-cdn.b-cdn.net/';
    if (!videoUrl.startsWith(bunnyBaseUrl)) {
        return res.status(400).json({
            error: `Invalid Video URL. Must start with ${bunnyBaseUrl}`
        });
    }

    try {
        const videos = getData(VIDEOS_FILE);

        const newVideo = {
            id: uuidv4(),
            title,
            description: description || '',
            categories: Array.isArray(categories) ? categories : (categories || '').split(',').map(c => c.trim()).filter(Boolean),
            videoUrl: videoUrl,
            thumbnail: thumbnail || `${bunnyBaseUrl}default_thumb.jpg`,
            views: 0,
            rating: '100%',
            createdAt: new Date().toISOString()
        };

        videos.unshift(newVideo);
        setData(VIDEOS_FILE, videos);

        res.json({
            success: true,
            message: 'Video published successfully',
            video: newVideo
        });
    } catch (err) {
        console.error('Submission Error:', err);
        res.status(500).json({ error: 'Failed to save video metadata' });
    }
});


// GET /api/admin/submissions
router.get('/submissions', (req, res) => {
    try {
        const submissions = getData(SUBMISSIONS_FILE);
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
});

// GET /api/admin/reports
router.get('/reports', (req, res) => {
    try {
        const reports = getData(REPORTS_FILE);
        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

module.exports = router;
