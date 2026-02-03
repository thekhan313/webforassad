import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { PlaySquare, Edit, Trash2, X, Save, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';
import { useAuth } from '../../context/AuthContext';

const API_BASE = 'http://localhost:4000';

const AdminDashboard = () => {
    const { user } = useAuth();
    const token = user?.token;

    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingVideo, setEditingVideo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/admin/videos`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setVideos(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this video permanently?')) return;
        try {
            const res = await fetch(`${API_BASE}/api/admin/video/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setVideos(videos.filter(v => v.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`${API_BASE}/api/admin/video/${editingVideo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editingVideo)
            });
            const data = await res.json();
            if (res.ok) {
                setVideos(videos.map(v => v.id === editingVideo.id ? data.video : v));
                setEditingVideo(null);
            } else {
                setError(data.error || 'Update failed');
            }
        } catch (err) {
            setError('Connection error');
        }
    };

    const toggleCategory = (cat) => {
        const current = editingVideo.categories || [];
        const updated = current.includes(cat)
            ? current.filter(c => c !== cat)
            : [...current, cat];
        setEditingVideo({ ...editingVideo, categories: updated });
    };

    return (
        <AdminLayout>
            <div className="fade-in">
                <div style={styles.headerRow}>
                    <h1 style={styles.pageTitle}>Video Management</h1>
                    <div style={styles.statsMini}>
                        <PlaySquare size={20} color="var(--accent-color)" />
                        <span>{videos.length} Total Videos</span>
                    </div>
                </div>

                {isLoading ? (
                    <div style={styles.loading}>Loading videos...</div>
                ) : (
                    <div style={styles.videoGrid}>
                        {videos.map((video) => (
                            <div key={video.id} style={styles.videoCard}>
                                <img src={video.thumbnail || 'https://picsum.photos/320/180'} alt="" style={styles.thumb} />
                                <div style={styles.videoInfo}>
                                    <h3 style={styles.videoTitle}>{video.title}</h3>
                                    <p style={styles.categoryText}>{video.categories?.join(', ')}</p>
                                    <div style={styles.actions}>
                                        <button onClick={() => setEditingVideo(video)} style={styles.btnEdit}>
                                            <Edit size={16} /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(video.id)} style={styles.btnDelete}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* EDIT MODAL */}
                {editingVideo && (
                    <div style={styles.overlay}>
                        <div style={styles.modal}>
                            <div style={styles.modalHeader}>
                                <h2>Edit Video Metadata</h2>
                                <button onClick={() => setEditingVideo(null)} style={styles.closeBtn}><X /></button>
                            </div>
                            <form onSubmit={handleUpdate} style={styles.form}>
                                <label style={styles.label}>Title</label>
                                <input
                                    style={styles.input}
                                    value={editingVideo.title}
                                    onChange={e => setEditingVideo({ ...editingVideo, title: e.target.value })}
                                />

                                <label style={styles.label}>Thumbnail URL</label>
                                <input
                                    style={styles.input}
                                    value={editingVideo.thumbnail}
                                    onChange={e => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                                />

                                <label style={styles.label}>Categories</label>
                                <div style={styles.catGrid}>
                                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                                        <label key={cat} style={styles.catItem}>
                                            <input
                                                type="checkbox"
                                                checked={editingVideo.categories?.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                            />
                                            {cat}
                                        </label>
                                    ))}
                                </div>

                                <label style={styles.label}>Description</label>
                                <textarea
                                    style={styles.textarea}
                                    value={editingVideo.description}
                                    onChange={e => setEditingVideo({ ...editingVideo, description: e.target.value })}
                                />

                                {error && <div style={styles.error}><AlertCircle size={16} /> {error}</div>}

                                <button type="submit" style={styles.saveBtn}>
                                    <Save size={18} /> Update Content
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

const styles = {
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
    pageTitle: { fontSize: '28px', color: '#fff' },
    statsMini: { display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '14px' },
    loading: { textAlign: 'center', padding: '40px', color: '#666' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    videoCard: { background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222' },
    thumb: { width: '100%', aspectRatio: '16/9', objectFit: 'cover' },
    videoInfo: { padding: '16px' },
    videoTitle: { fontSize: '16px', fontWeight: 'bold', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    categoryText: { fontSize: '12px', color: 'var(--accent-color)', marginBottom: '16px' },
    actions: { display: 'flex', gap: '10px' },
    btnEdit: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', background: '#222', borderRadius: '6px', fontSize: '13px' },
    btnDelete: { padding: '8px', background: 'rgba(255,0,0,0.1)', color: '#ff4444', borderRadius: '6px' },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { background: '#111', width: '90%', maxWidth: '600px', borderRadius: '16px', padding: '30px', border: '1px solid #333', maxHeight: '90vh', overflowY: 'auto' },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    closeBtn: { color: '#666' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    label: { fontSize: '12px', color: '#666' },
    input: { padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '8px' },
    catGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', background: '#000', padding: '12px', borderRadius: '8px', border: '1px solid #333' },
    catItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' },
    textarea: { padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '8px', minHeight: '80px' },
    saveBtn: { background: 'var(--accent-color)', color: '#000', padding: '14px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' },
    error: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4444', fontSize: '14px' }
};

export default AdminDashboard;
