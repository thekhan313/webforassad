import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, FileVideo, ShieldAlert, LogOut, ChevronLeft, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const { logout } = useAuth();
    const { isMobile } = useUI();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        setIsDrawerOpen(false);
    }, [location.pathname]);

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Manage Videos', icon: FileVideo, path: '/admin/videos' },
        { name: 'Upload Video', icon: Upload, path: '/admin/upload' },
        { name: 'Submissions', icon: FileVideo, path: '/admin/submissions' },
        { name: 'Reports', icon: ShieldAlert, path: '/admin/reports' },
    ];

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    return (
        <div style={styles.container}>
            {/* Mobile Header */}
            {isMobile && (
                <header style={styles.mobileHeader}>
                    <button onClick={toggleDrawer} style={styles.menuBtn}>
                        <Menu size={24} />
                    </button>
                    <h2 style={styles.mobileTitle}>Admin Panel</h2>
                    <div style={{ width: 40 }} /> {/* Spacer */}
                </header>
            )}

            {/* Overlay */}
            {isMobile && isDrawerOpen && (
                <div style={styles.overlay} onClick={() => setIsDrawerOpen(false)} />
            )}

            {/* Admin Sidebar */}
            <aside style={{
                ...styles.sidebar,
                left: isMobile ? (isDrawerOpen ? 0 : '-280px') : 0,
                transition: 'left 0.3s ease-in-out',
                zIndex: isMobile ? 1200 : 10,
            }}>
                <div style={styles.logoSection}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/" style={styles.backLink}>
                            <ChevronLeft size={16} />
                            Back to Site
                        </Link>
                        {isMobile && (
                            <button onClick={() => setIsDrawerOpen(false)} style={styles.closeBtn}>
                                <X size={20} />
                            </button>
                        )}
                    </div>
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
            <main style={{
                ...styles.main,
                marginLeft: isMobile ? 0 : '260px',
                padding: isMobile ? '80px 16px 40px 16px' : '40px',
            }}>
                <div style={styles.contentWrapper}>
                    {children}
                </div>
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
    mobileHeader: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#111',
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 1100,
    },
    menuBtn: {
        color: '#fff',
        padding: '8px',
    },
    mobileTitle: {
        fontSize: '18px',
        color: '#fff',
        fontWeight: 'bold',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1150,
        backdropFilter: 'blur(2px)',
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
    closeBtn: {
        color: '#999',
        padding: '4px',
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
        textDecoration: 'none',
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    main: {
        flex: 1,
        backgroundColor: 'var(--bg-color)',
        minWidth: 0, // Prevent overflow
    },
    contentWrapper: {
        maxWidth: '1200px',
        margin: '0 auto',
    }
};

export default AdminLayout;
