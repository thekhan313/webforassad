import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, FileVideo, ShieldAlert, LogOut, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Manage Videos', icon: FileVideo, path: '/admin/videos' },
        { name: 'Upload Video', icon: Upload, path: '/admin/upload' },
        { name: 'Submissions', icon: FileVideo, path: '/admin/submissions' },
        { name: 'Reports', icon: ShieldAlert, path: '/admin/reports' },
    ];

    return (
        <div style={styles.container}>
            {/* Admin Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.logoSection}>
                    <Link to="/" style={styles.backLink}>
                        <ChevronLeft size={16} />
                        Back to Site
                    </Link>
                    <h2 style={styles.title}>Admin Panel</h2>
                </div>

                <nav style={styles.nav}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            style={{
                                ...styles.navLink,
                                ...(location.pathname === item.path ? styles.activeLink : {}),
                            }}
                        >
                            <item.icon size={20} style={styles.icon} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <button onClick={logout} style={styles.logoutBtn}>
                    <LogOut size={20} style={styles.icon} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Admin Main Content */}
            <main style={styles.main}>
                {children}
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#000',
    },
    sidebar: {
        width: '260px',
        backgroundColor: '#111',
        borderRight: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
    },
    logoSection: {
        padding: '24px',
        borderBottom: '1px solid #222',
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: 'var(--accent-color)',
        fontSize: '12px',
        marginBottom: '12px',
    },
    title: {
        fontSize: '20px',
        color: '#fff',
    },
    nav: {
        flex: 1,
        padding: '20px 0',
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px',
        color: '#999',
        transition: 'all 0.2s',
    },
    activeLink: {
        color: '#fff',
        backgroundColor: '#222',
        borderLeft: '4px solid var(--accent-color)',
    },
    icon: {
        marginRight: '12px',
    },
    logoutBtn: {
        padding: '24px',
        color: '#ff4444',
        borderTop: '1px solid #222',
        width: '100%',
        justifyContent: 'flex-start',
    },
    main: {
        flex: 1,
        marginLeft: '260px',
        padding: '40px',
        backgroundColor: 'var(--bg-color)',
    },
};

export default AdminLayout;
