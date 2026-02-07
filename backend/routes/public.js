// routes/public.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const router = express.Router();

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit
});

// Data file paths
const VIDEOS_FILE = path.join(__dirname, '../data/videos.json');
const SUBMISSIONS_FILE = path.join(__dirname, '../data/submissions.json');
const REPORTS_FILE = path.join(__dirname, '../data/reports.json');

// Helper functions
const getData = (file) => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        return JSON.parse(content || '[]');
    } catch (err) {
        return [];
    }
};

const setData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

const getVideos = () => getData(VIDEOS_FILE);

// =======================
// PUBLIC VIDEO ROUTES
// =======================

// GET /api/videos - List all videos or filter by category
router.get('/videos', (req, res) => {
    const category = req.query.category;
    try {
        let videos = getVideos();

        if (category && category.toLowerCase() !== 'all') {
            const filterCat = category.toLowerCase();
            videos = videos.filter(v =>
                v.categories && v.categories.some(c => c.toLowerCase() === filterCat)
            );
        }

        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// GET /api/video/:id - Get single video details
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

// GET /api/search?q= - Search videos
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

// GET /api/category/:name - Filter by category
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

// =======================
// USER SUBMISSIONS
// =======================

// POST /api/submit-video (Original URL-based)
router.post('/submit-video', (req, res) => {
    const { title, description, videoUrl, submittedBy } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const submissions = getData(SUBMISSIONS_FILE);
        const newSubmission = {
            id: uuidv4(),
            type: 'video',
            title,
            description: description || '',
            videoUrl: videoUrl || '',
            submittedBy: submittedBy || 'guest',
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        submissions.unshift(newSubmission);
        setData(SUBMISSIONS_FILE, submissions);

        res.status(201).json({ success: true, submission: newSubmission });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save submission' });
    }
});

// POST /api/submit-video-file (New File-based)
router.post('/submit-video-file', upload.single('video'), (req, res) => {
    const { title, description, submittedBy } = req.body;
    const file = req.file;

    if (!title || !file) {
        return res.status(400).json({ error: 'Title and Video File are required' });
    }

    try {
        const submissions = getData(SUBMISSIONS_FILE);
        const newSubmission = {
            id: uuidv4(),
            type: 'video-file',
            title,
            description: description || '',
            filePath: `/uploads/${file.filename}`,
            originalName: file.originalname,
            submittedBy: submittedBy || 'guest',
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        submissions.unshift(newSubmission);
        setData(SUBMISSIONS_FILE, submissions);

        res.status(201).json({ success: true, submission: newSubmission });
    } catch (err) {
        console.error('File Submission Error:', err);
        res.status(500).json({ error: 'Failed to save file submission' });
    }
});

// POST /api/report
router.post('/report', (req, res) => {
    const { type, targetId, reason, reportedBy } = req.body;

    if (!type || !targetId || !reason) {
        return res.status(400).json({ error: 'Type, targetId, and reason are required' });
    }

    try {
        const reports = getData(REPORTS_FILE);
        const newReport = {
            id: uuidv4(),
            type, // 'video' | 'comment'
            targetId,
            reason,
            reportedBy: reportedBy || 'guest',
            status: 'open',
            createdAt: new Date().toISOString()
        };

        reports.unshift(newReport);
        setData(REPORTS_FILE, reports);

        res.status(201).json({ success: true, report: newReport });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save report' });
    }
});

module.exports = router;
