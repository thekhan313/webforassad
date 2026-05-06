import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Check, X, Play, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE } from '../../config';

const AdminSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const token = user?.token;

    const fetchSubmissions = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/admin/submissions`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setSubmissions(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            setError('Failed to load submissions');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [token]);

    const handleAction = async (id, action) => {
        try {
            let res;
            if (action === 'delete') {
                res = await fetch(`${API_BASE}/api/admin/submission/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } else {
                res = await fetch(`${API_BASE}/api/admin/submission/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: action === 'approve' ? 'approved' : 'rejected' })
                });
            }

            if (res.ok) {
                setSubmissions(submissions.filter(s => s.id !== id));
            } else {
                alert(`Failed to ${action} submission`);
            }
        } catch (err) {
            alert(`Error during ${action}`);
        }
    };

    return (
        <AdminLayout>
            <div className="fade-in">
                <h1 style={styles.pageTitle}>User Submissions</h1>

                {isLoading ? (
                    <div style={styles.empty}>Loading...</div>
                ) : error ? (
                    <div style={styles.error}>{error}</div>
                ) : (
                    <div style={styles.list}>
                        {submissions.map((sub) => (
                            <div key={sub.id} style={styles.card}>
                                <div style={styles.info}>
                                    <h3 style={styles.subTitle}>{sub.title}</h3>
                                    <p style={styles.subDesc}>{sub.description}</p>
                                    <div style={styles.subMeta}>
                                        <span>by {sub.submittedBy}</span>
                                        <span>•</span>
                                        <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span style={{
                                            color: sub.status === 'approved' ? '#4caf50' :
                                                sub.status === 'rejected' ? '#f44336' : '#ff9800'
                                        }}>
                                            {sub.status.toUpperCase()}
                                        </span>
                                    </div>
                                    {sub.videoUrl && (
                                        <a href={sub.videoUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                            View Video URL
                                        </a>
                                    )}
                                    {sub.filePath && (
                                        <div style={styles.fileInfo}>
                                            <span style={styles.fileLabel}>Uploaded File:</span>
                                            <a href={`${API_BASE}${sub.filePath}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                                {sub.originalName || 'Download File'}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div style={styles.actions}>
                                    {sub.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleAction(sub.id, 'approve')} style={styles.approveBtn} title="Approve">
                                                <Check size={20} />
                                            </button>
                                            <button onClick={() => handleAction(sub.id, 'reject')} style={styles.rejectBtn} title="Reject">
                                                <X size={20} />
                                            </button>
                                        </>
                                    )}
                                    <button onClick={() => handleAction(sub.id, 'delete')} style={styles.deleteBtn} title="Delete">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {submissions.length === 0 && <div style={styles.empty}>No submissions found</div>}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

const styles = {
    pageTitle: {
        fontSize: '28px',
        marginBottom: '32px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    card: {
        backgroundColor: '#111',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '20px',
        border: '1px solid #222',
    },
    info: {
        flex: 1,
    },
    subTitle: {
        fontSize: '20px',
        marginBottom: '8px',
        color: '#fff',
    },
    subDesc: {
        fontSize: '14px',
        color: '#aaa',
        marginBottom: '12px',
        lineHeight: '1.5',
    },
    subMeta: {
        display: 'flex',
        gap: '12px',
        color: '#666',
        fontSize: '13px',
        alignItems: 'center',
    },
    link: {
        display: 'inline-block',
        marginTop: '12px',
        color: 'var(--accent-color)',
        fontSize: '14px',
        textDecoration: 'none',
    },
    fileInfo: {
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    fileLabel: {
        fontSize: '13px',
        color: '#666',
    },
    actions: {
        display: 'flex',
        gap: '12px',
    },
    approveBtn: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        color: '#4caf50',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid rgba(76, 175, 80, 0.3)',
        cursor: 'pointer',
    },
    rejectBtn: {
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        color: '#f44336',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid rgba(244, 67, 54, 0.3)',
        cursor: 'pointer',
    },
    deleteBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: '#888',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #333',
        cursor: 'pointer',
    },
    error: {
        color: '#f44336',
        textAlign: 'center',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        padding: '100px',
        color: '#666',
        fontSize: '18px',
    }
};

export default AdminSubmissions;
