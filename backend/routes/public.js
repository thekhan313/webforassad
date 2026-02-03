const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const VIDEOS_FILE = path.join(__dirname, '../data/videos.json');

const getVideos = () => JSON.parse(fs.readFileSync(VIDEOS_FILE, 'utf8'));

// GET /api/videos - List all videos
router.get('/videos', (req, res) => {
    try {
        const videos = getVideos();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// GET /api/video/:id - Single video details
router.get('/video/:id', (req, res) => {
    try {
        const videos = getVideos();
        const video = videos.find(v => v.id === req.params.id);
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.json(video);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

// GET /api/search?q= - Search results
router.get('/search', (req, res) => {
    const query = req.query.q?.toLowerCase() || '';
    try {
        const videos = getVideos();
        const filtered = videos.filter(v =>
            v.title.toLowerCase().includes(query) ||
            v.description.toLowerCase().includes(query) ||
            v.categories.some(c => c.toLowerCase().includes(query))
        );
        res.json(filtered);
    } catch (err) {
        res.status(500).json({ error: 'Search failed' });
    }
});

// GET /api/category/:name - Category filter
router.get('/category/:name', (req, res) => {
    const category = req.params.name.toLowerCase();
    try {
        const videos = getVideos();
        const filtered = videos.filter(v =>
            v.categories.some(c => c.toLowerCase() === category)
        );
        res.json(filtered);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

module.exports = router;
