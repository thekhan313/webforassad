import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Trash2, AlertTriangle, ShieldCheck, Flag, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE } from '../../config';

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const token = user?.token;

    const fetchReports = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/admin/reports`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setReports(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            setError('Failed to load reports');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [token]);

    const handleAction = async (id, action) => {
        try {
            let res;
            if (action === 'delete') {
                res = await fetch(`${API_BASE}/api/admin/report/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } else {
                res = await fetch(`${API_BASE}/api/admin/report/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: action })
                });
            }

            if (res.ok) {
                if (action === 'delete') {
                    setReports(reports.filter(r => r.id !== id));
                } else {
                    setReports(reports.map(r => r.id === id ? { ...r, status: action } : r));
                }
            } else {
                alert(`Failed to ${action} report`);
            }
        } catch (err) {
            alert(`Error during ${action}`);
        }
    };

    return (
        <AdminLayout>
            <div className="fade-in">
                <h1 style={styles.pageTitle}>User Reports</h1>

                {isLoading ? (
                    <div style={styles.empty}>Loading...</div>
                ) : error ? (
                    <div style={styles.error}>{error}</div>
                ) : (
                    <div style={styles.list}>
                        {reports.map((report) => (
                            <div key={report.id} style={styles.card}>
                                <div style={styles.badge}>
                                    <Flag size={20} color={report.status === 'open' ? "#f44336" : "#4caf50"} />
                                    <span>{report.type.toUpperCase()}</span>
                                </div>
                                <div style={styles.info}>
                                    <h3 style={styles.videoTitle}>ID: {report.targetId}</h3>
                                    <p style={styles.reason}>Reason: <span style={styles.reasonText}>{report.reason}</span></p>
                                    <div style={styles.meta}>
                                        <span>Reported by: {report.reportedBy}</span>
                                        <span>•</span>
                                        <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span style={{
                                            color: report.status === 'open' ? '#f44336' :
                                                report.status === 'resolved' ? '#4caf50' : '#ff9800'
                                        }}>
                                            {report.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div style={styles.actions}>
                                    {report.status === 'open' && (
                                        <button onClick={() => handleAction(report.id, 'reviewed')} style={styles.reviewBtn} title="Mark Reviewed">
                                            <ShieldCheck size={18} />
                                        </button>
                                    )}
                                    {report.status !== 'resolved' && (
                                        <button onClick={() => handleAction(report.id, 'resolved')} style={styles.resolveBtn} title="Resolve">
                                            <CheckCircle size={18} />
                                        </button>
                                    )}
                                    <button onClick={() => handleAction(report.id, 'delete')} style={styles.deleteBtn} title="Delete">
                                        <Trash2 size={18} />
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
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #222',
        gap: '20px',
    },
    badge: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        minWidth: '100px',
        color: '#aaa',
        fontWeight: 'bold',
        fontSize: '12px',
    },
    info: {
        flex: 1,
    },
    videoTitle: {
        fontSize: '18px',
        marginBottom: '8px',
        color: '#fff',
    },
    reason: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '8px',
    },
    reasonText: {
        color: '#eee',
        fontWeight: '500',
    },
    meta: {
        display: 'flex',
        gap: '12px',
        color: '#555',
        fontSize: '13px',
    },
    actions: {
        display: 'flex',
        gap: '12px',
    },
    reviewBtn: {
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        color: '#2196f3',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid rgba(33, 150, 243, 0.3)',
        cursor: 'pointer',
    },
    resolveBtn: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        color: '#4caf50',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid rgba(76, 175, 80, 0.3)',
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

export default AdminReports;
