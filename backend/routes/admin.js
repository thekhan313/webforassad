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

// Helpers
const getData = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const setData = (file, data) =>
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

/**
 * POST /api/admin/login
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign(
            { username, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.json({ token, role: 'admin' });
    }

    res.status(401).json({ error: 'Invalid credentials' });
});

// 🔒 Protect everything below
router.use(authMiddleware);

/**
 * POST /api/admin/upload-video
 * Metadata only (Bunny CDN URL)
 */
router.post('/upload-video', (req, res) => {
    const { title, description, categories, videoUrl, thumbnail } = req.body;

    if (!title || !videoUrl || !Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({
            error: 'Title, Video URL and at least one category are required'
        });
    }

    const bunnyBaseUrl = 'https://pvideos-cdn.b-cdn.net/';
    if (!videoUrl.startsWith(bunnyBaseUrl)) {
        return res.status(400).json({
            error: `Invalid Video URL. Must start with ${bunnyBaseUrl}`
        });
    }

    try {
        const videos = getData(VIDEOS_FILE);

        const normalizedCategories = [...new Set(
            categories.map(c => String(c).trim()).filter(Boolean)
        )];

        const newVideo = {
            id: uuidv4(),
            title: title.trim(),
            description: description?.trim() || '',
            categories: normalizedCategories,
            videoUrl,
            thumbnail: thumbnail?.trim() || '',
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
        console.error('Upload Error:', err);
        res.status(500).json({ error: 'Failed to save video metadata' });
    }
});

/**
 * GET /api/admin/videos
 * List all videos for admin management
 */
router.get('/videos', (req, res) => {
    try {
        const videos = getData(VIDEOS_FILE);
        res.json(videos);
    } catch {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

/**
 * GET /api/admin/submissions
 */
router.get('/submissions', (req, res) => {
    try {
        res.json(getData(SUBMISSIONS_FILE));
    } catch {
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
});

/**
 * GET /api/admin/reports
 */
router.get('/reports', (req, res) => {
    try {
        res.json(getData(REPORTS_FILE));
    } catch {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

/**
 * PUT /api/admin/video/:id
 */
router.put('/video/:id', (req, res) => {
    const { title, description, categories, videoUrl, thumbnail } = req.body;
    const { id } = req.params;

    if (!title || !videoUrl || !Array.isArray(categories)) {
        return res.status(400).json({
            error: 'Title, Video URL and categories are required'
        });
    }

    try {
        const videos = getData(VIDEOS_FILE);
        const index = videos.findIndex(v => v.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const updatedCategories = [...new Set(
            categories.map(c => String(c).trim()).filter(Boolean)
        )];

        videos[index] = {
            ...videos[index],
            title: title.trim(),
            description: description?.trim() || '',
            categories: updatedCategories,
            videoUrl,
            thumbnail: thumbnail?.trim() || videos[index].thumbnail,
            updatedAt: new Date().toISOString()
        };

        setData(VIDEOS_FILE, videos);

        res.json({
            success: true,
            message: 'Video updated successfully',
            video: videos[index]
        });
    } catch (err) {
        console.error('Update Error:', err);
        res.status(500).json({ error: 'Failed to update video' });
    }
});

/**
 * DELETE /api/admin/video/:id
 */
router.delete('/video/:id', (req, res) => {
    try {
        const videos = getData(VIDEOS_FILE);
        const filtered = videos.filter(v => v.id !== req.params.id);

        if (videos.length === filtered.length) {
            return res.status(404).json({ error: 'Video not found' });
        }

        setData(VIDEOS_FILE, filtered);

        res.json({
            success: true,
            message: 'Video deleted successfully'
        });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({ error: 'Failed to delete video' });
    }
});

/**
 * PUT /api/admin/submission/:id
 */
router.put('/submission/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const submissions = getData(SUBMISSIONS_FILE);
        const index = submissions.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        submissions[index].status = status;
        submissions[index].updatedAt = new Date().toISOString();
        setData(SUBMISSIONS_FILE, submissions);

        res.json({ success: true, submission: submissions[index] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update submission' });
    }
});

/**
 * DELETE /api/admin/submission/:id
 */
router.delete('/submission/:id', (req, res) => {
    try {
        const submissions = getData(SUBMISSIONS_FILE);
        const filtered = submissions.filter(s => s.id !== req.params.id);

        if (submissions.length === filtered.length) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        setData(SUBMISSIONS_FILE, filtered);
        res.json({ success: true, message: 'Submission deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete submission' });
    }
});

/**
 * PUT /api/admin/report/:id
 */
router.put('/report/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['open', 'reviewed', 'resolved'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const reports = getData(REPORTS_FILE);
        const index = reports.findIndex(r => r.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Report not found' });
        }

        reports[index].status = status;
        reports[index].updatedAt = new Date().toISOString();
        setData(REPORTS_FILE, reports);

        res.json({ success: true, report: reports[index] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update report' });
    }
});

/**
 * DELETE /api/admin/report/:id
 */
router.delete('/report/:id', (req, res) => {
    try {
        const reports = getData(REPORTS_FILE);
        const filtered = reports.filter(r => r.id !== req.params.id);

        if (reports.length === filtered.length) {
            return res.status(404).json({ error: 'Report not found' });
        }

        setData(REPORTS_FILE, filtered);
        res.json({ success: true, message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete report' });
    }
});

module.exports = router;
