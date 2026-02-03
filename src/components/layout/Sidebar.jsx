import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Clock, ThumbsUp, Heart, Film, Users, Info, ShieldAlert } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Trending', icon: TrendingUp, path: '/search?q=trending' },
        { name: 'Latest', icon: Clock, path: '/search?q=latest' },
    ];

    const categories = [
        'TikTok', 'Desi', 'Actress', 'Pathan', 'Punjabi', 'Balochi', 'Indian', 'Afghan', 'Bangali', 'Nepal', 'Arab', 'All'
    ];

    if (!isOpen) return null;

    return (
        <aside style={styles.sidebar}>
            <div style={styles.section}>
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
            </div>

            <div style={styles.divider} />

            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Categories</h3>
                {categories.map((cat) => (
                    <Link
                        key={cat}
                        to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                        style={styles.navLink}
                    >
                        <Film size={18} style={styles.icon} />
                        <span>{cat}</span>
                    </Link>
                ))}
            </div>

            <div style={styles.adminSection}>
                <div style={styles.divider} />
                <Link to="/admin/login" style={styles.navLink}>
                    <ShieldAlert size={18} style={styles.icon} />
                    <span>Admin Login</span>
                </Link>
            </div>
        </aside>
    );
};

const styles = {
    sidebar: {
        width: 'var(--sidebar-width)',
        backgroundColor: '#1a1a1a',
        height: 'calc(100vh - var(--header-height))',
        position: 'fixed',
        top: 'var(--header-height)',
        left: 0,
        overflowY: 'auto',
        borderRight: '1px solid var(--border-color)',
        padding: '16px 0',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
    },
    section: {
        padding: '0 8px',
    },
    adminSection: {
        marginTop: 'auto',
        padding: '0 8px',
        paddingBottom: '16px',
    },
    sectionTitle: {
        color: 'var(--text-secondary)',
        fontSize: '12px',
        textTransform: 'uppercase',
        padding: '8px 12px',
        marginBottom: '4px',
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        borderRadius: '4px',
        color: '#eee',
        fontSize: '14px',
        transition: 'background 0.2s',
    },
    activeLink: {
        backgroundColor: '#333',
        color: 'var(--accent-color)',
    },
    icon: {
        marginRight: '12px',
        color: 'inherit',
    },
    divider: {
        height: '1px',
        backgroundColor: 'var(--border-color)',
        margin: '12px 0',
    },
};

export default Sidebar;
