import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { CheckCircle, AlertCircle } from 'lucide-react';

const API_BASE = 'http://localhost:4000';
const ADMIN_TOKEN = 'admin123'; // must match backend ADMIN_PASSWORD

const AdminUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categories: '',
        thumbnail: '',
        videoUrl: ''
    });

    const [uploadStatus, setUploadStatus] = useState('idle'); // idle | submitting | success | error
    const [error, setError] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title || !formData.videoUrl || !formData.categories) {
            return setError('Title, Categories, and Video URL are required');
        }

        const bunnyBaseUrl = 'https://pvideos-cdn.b-cdn.net/';
        if (!formData.videoUrl.startsWith(bunnyBaseUrl)) {
            return setError(`Video URL must start with ${bunnyBaseUrl}`);
        }

        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            videoUrl: formData.videoUrl.trim(),
            thumbnail: formData.thumbnail.trim(),
            categories: formData.categories
                .split(',')
                .map(c => c.trim().toLowerCase())
                .filter(Boolean)
        };

        try {
            setUploadStatus('submitting');
            setError('');

            const res = await fetch(`${API_BASE}/api/admin/upload-video`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            setUploadStatus('success');

        } catch (err) {
            console.error('Admin upload error:', err);
            setError(err.message);
            setUploadStatus('error');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            categories: '',
            thumbnail: '',
            videoUrl: ''
        });
        setUploadStatus('idle');
        setError('');
    };

    return (
        <AdminLayout>
            <div style={styles.container}>
                <h1 style={styles.pageTitle}>Publish New Video</h1>

                {uploadStatus === 'success' ? (
                    <div style={styles.successCard}>
                        <CheckCircle size={64} color="#4caf50" />
                        <h2>Video Published</h2>
                        <p>Your video is now live.</p>
                        <button onClick={resetForm} style={styles.resetBtn}>
                            Publish Another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleUpload} style={styles.uploadCard}>
                        <label style={styles.label}>Title *</label>
                        <input
                            style={styles.input}
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />

                        <label style={styles.label}>Bunny Video URL *</label>
                        <input
                            style={styles.input}
                            placeholder="https://pvideos-cdn.b-cdn.net/video.mp4"
                            value={formData.videoUrl}
                            onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                        />

                        <label style={styles.label}>Categories (comma separated) *</label>
                        <input
                            style={styles.input}
                            placeholder="tiktok, desi, actress"
                            value={formData.categories}
                            onChange={e => setFormData({ ...formData, categories: e.target.value })}
                        />

                        <label style={styles.label}>Thumbnail URL (optional)</label>
                        <input
                            style={styles.input}
                            value={formData.thumbnail}
                            onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                        />

                        <label style={styles.label}>Description</label>
                        <textarea
                            style={styles.textarea}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />

                        {error && (
                            <div style={styles.errorBox}>
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={uploadStatus === 'submitting'}
                            style={styles.submitBtn}
                        >
                            {uploadStatus === 'submitting' ? 'Publishing…' : 'Submit & Publish'}
                        </button>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

const styles = {
    container: { maxWidth: '700px' },
    pageTitle: { fontSize: '26px', marginBottom: '24px' },
    uploadCard: {
        background: '#111',
        padding: '24px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    label: { color: '#aaa', fontSize: '13px' },
    input: {
        padding: '10px',
        background: '#000',
        border: '1px solid #333',
        color: '#fff',
        borderRadius: '6px'
    },
    textarea: {
        minHeight: '120px',
        padding: '10px',
        background: '#000',
        border: '1px solid #333',
        color: '#fff',
        borderRadius: '6px'
    },
    submitBtn: {
        marginTop: '20px',
        padding: '14px',
        fontWeight: 'bold',
        background: 'var(--accent-color)',
        color: '#000',
        borderRadius: '8px'
    },
    errorBox: {
        marginTop: '12px',
        padding: '10px',
        background: 'rgba(255,0,0,0.1)',
        color: '#ff5555',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    },
    successCard: {
        padding: '50px',
        background: '#111',
        borderRadius: '12px',
        textAlign: 'center'
    },
    resetBtn: {
        marginTop: '16px',
        padding: '10px 20px',
        background: '#333',
        borderRadius: '6px'
    }
};

export default AdminUpload;
