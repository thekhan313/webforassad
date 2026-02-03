import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Check, X, Play, Eye } from 'lucide-react';

const AdminSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/admin/submissions')
            .then(res => res.json())
            .then(data => {
                setSubmissions(data);
                setIsLoading(false);
            })
            .catch(() => {
                // Fallback
                setSubmissions([
                    { id: 1, title: 'Amateur Night Live', uploader: 'User123', date: '2024-05-12', thumbnail: 'https://picsum.photos/seed/s1/320/180' },
                    { id: 2, title: 'Big City Girls', uploader: 'ProCreator', date: '2024-05-11', thumbnail: 'https://picsum.photos/seed/s2/320/180' },
                    { id: 3, title: 'Summer Heat Wave', uploader: 'HotVids', date: '2024-05-10', thumbnail: 'https://picsum.photos/seed/s3/320/180' },
                ]);
                setIsLoading(false);
            });
    }, []);

    const handleAction = (id, action) => {
        // action: approve/reject
        setSubmissions(submissions.filter(s => s.id !== id));
        alert(`Submission ${id} ${action}ed`);
    };

    return (
        <AdminLayout>
            <div className="fade-in">
                <h1 style={styles.pageTitle}>Pending Submissions</h1>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div style={styles.list}>
                        {submissions.map((sub) => (
                            <div key={sub.id} style={styles.card}>
                                <div style={styles.thumbnailBox}>
                                    <img src={sub.thumbnail} alt="" style={styles.thumb} />
                                    <div style={styles.overlay}><Play size={32} /></div>
                                </div>
                                <div style={styles.info}>
                                    <h3 style={styles.subTitle}>{sub.title}</h3>
                                    <div style={styles.subMeta}>
                                        <span>by {sub.uploader}</span>
                                        <span>•</span>
                                        <span>{sub.date}</span>
                                    </div>
                                </div>
                                <div style={styles.actions}>
                                    <button onClick={() => handleAction(sub.id, 'approve')} style={styles.approveBtn}>
                                        <Check size={20} />
                                        Approve
                                    </button>
                                    <button onClick={() => handleAction(sub.id, 'reject')} style={styles.rejectBtn}>
                                        <X size={20} />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                        {submissions.length === 0 && <div style={styles.empty}>No pending submissions</div>}
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
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        border: '1px solid #222',
    },
    thumbnailBox: {
        width: '180px',
        aspectRatio: '16/9',
        backgroundColor: '#000',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
    },
    thumb: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.6,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    info: {
        flex: 1,
    },
    subTitle: {
        fontSize: '18px',
        marginBottom: '8px',
    },
    subMeta: {
        display: 'flex',
        gap: '10px',
        color: '#666',
        fontSize: '14px',
    },
    actions: {
        display: 'flex',
        gap: '12px',
    },
    approveBtn: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        color: '#4caf50',
        padding: '10px 20px',
        borderRadius: '6px',
        border: '1px solid rgba(76, 175, 80, 0.3)',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    rejectBtn: {
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        color: '#f44336',
        padding: '10px 20px',
        borderRadius: '6px',
        border: '1px solid rgba(244, 67, 54, 0.3)',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    empty: {
        textAlign: 'center',
        padding: '100px',
        color: '#666',
        fontSize: '18px',
    }
};

export default AdminSubmissions;
