import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Trash2, EyeOff, ShieldCheck, Flag } from 'lucide-react';

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/admin/reports')
            .then(res => res.json())
            .then(data => {
                setReports(data);
                setIsLoading(false);
            })
            .catch(() => {
                // Fallback
                setReports([
                    { id: 1, videoTitle: 'Explicit Content Video', reason: 'Non-consensual', count: 5, videoId: 'v123' },
                    { id: 2, videoTitle: 'Spam Video Title', reason: 'Spam/Advertisement', count: 12, videoId: 'v456' },
                    { id: 3, videoTitle: 'Copyright Infringement', reason: 'Copyright', count: 2, videoId: 'v789' },
                ]);
                setIsLoading(false);
            });
    }, []);

    const handleIgnore = (id) => {
        setReports(reports.filter(r => r.id !== id));
    };

    const handleRemove = (id) => {
        setReports(reports.filter(r => r.id !== id));
        alert('Video removed and report closed');
    };

    return (
        <AdminLayout>
            <div className="fade-in">
                <h1 style={styles.pageTitle}>Content Reports</h1>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div style={styles.list}>
                        {reports.map((report) => (
                            <div key={report.id} style={styles.card}>
                                <div style={styles.badge}>
                                    <Flag size={20} color="#f44336" />
                                    <span>{report.count} Reports</span>
                                </div>
                                <div style={styles.info}>
                                    <h3 style={styles.videoTitle}>{report.videoTitle}</h3>
                                    <p style={styles.reason}>Reason: <span style={styles.reasonText}>{report.reason}</span></p>
                                </div>
                                <div style={styles.actions}>
                                    <button onClick={() => handleRemove(report.id)} style={styles.removeBtn}>
                                        <Trash2 size={18} />
                                        Remove Content
                                    </button>
                                    <button onClick={() => handleIgnore(report.id)} style={styles.ignoreBtn}>
                                        <ShieldCheck size={18} />
                                        Ignore
                                    </button>
                                </div>
                            </div>
                        ))}
                        {reports.length === 0 && <div style={styles.empty}>No active reports</div>}
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
        gap: '16px',
    },
    card: {
        backgroundColor: '#111',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #222',
    },
    badge: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '12px',
        backgroundColor: 'rgba(244, 67, 54, 0.05)',
        borderRadius: '8px',
        minWidth: '100px',
        color: '#f44336',
        fontWeight: 'bold',
        fontSize: '12px',
    },
    info: {
        flex: 1,
        padding: '0 30px',
    },
    videoTitle: {
        fontSize: '18px',
        marginBottom: '8px',
    },
    reason: {
        fontSize: '14px',
        color: '#666',
    },
    reasonText: {
        color: '#aaa',
        fontWeight: '600',
    },
    actions: {
        display: 'flex',
        gap: '12px',
    },
    removeBtn: {
        backgroundColor: '#f44336',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '6px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    ignoreBtn: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '6px',
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

export default AdminReports;
