import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Users, Eye, PlaySquare, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Views', value: '24.5M', icon: Eye, color: '#2196f3' },
        { label: 'Total Videos', value: '1,245', icon: PlaySquare, color: 'var(--accent-color)' },
        { label: 'Active Users', value: '85K', icon: Users, color: '#4caf50' },
        { label: 'Pending Reports', value: '12', icon: ShieldAlert, color: '#f44336' },
    ];

    return (
        <AdminLayout>
            <div className="fade-in">
                <h1 style={styles.pageTitle}>Dashboard Overview</h1>

                <div style={styles.statsGrid}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={styles.statCard}>
                            <div style={{ ...styles.iconContainer, backgroundColor: `${stat.color}22` }}>
                                <stat.icon size={24} color={stat.color} />
                            </div>
                            <div style={styles.statInfo}>
                                <div style={styles.statLabel}>{stat.label}</div>
                                <div style={styles.statValue}>{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={styles.recentActivity}>
                    <h2 style={styles.sectionTitle}>Recent Content Submissions</h2>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Uploader</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <tr key={i}>
                                        <td>Video Submission #{i}</td>
                                        <td>Creator_{i}</td>
                                        <td>2024-05-12</td>
                                        <td><span style={styles.statusBadge}>Pending</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

const styles = {
    pageTitle: {
        fontSize: '28px',
        marginBottom: '32px',
        color: '#fff',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
    },
    statCard: {
        backgroundColor: '#111',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #222',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    iconContainer: {
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    statLabel: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '4px',
    },
    statValue: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff',
    },
    recentActivity: {
        backgroundColor: '#111',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #222',
    },
    sectionTitle: {
        fontSize: '20px',
        marginBottom: '20px',
    },
    tableContainer: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
    },
    statusBadge: {
        backgroundColor: 'rgba(255, 144, 0, 0.1)',
        color: 'var(--accent-color)',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
};

export default AdminDashboard;
