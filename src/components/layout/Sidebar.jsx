import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, Clock, Film, ShieldAlert } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { CATEGORIES } from '../../constants/categories';

const Sidebar = () => {
    const { isSidebarOpen: isOpen, selectedCategory, setSelectedCategory, isMobile, closeSidebar } = useUI();
    const location = useLocation();
    const navigate = useNavigate();

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        if (location.pathname !== '/') {
            navigate('/');
        }
        if (isMobile) {
            closeSidebar();
        }
    };

    const categories = CATEGORIES;

    const menuItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Trending', icon: TrendingUp, path: '/search?q=trending' },
        { name: 'Latest', icon: Clock, path: '/search?q=latest' },
    ];

    const transitionStyle = {
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        boxShadow: isOpen ? '5px 0 15px rgba(0,0,0,0.5)' : 'none',
    };

    return (
        <aside style={{ ...styles.sidebar, ...transitionStyle }}>
            {/* Main menu */}
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
                ))
            }
            </div>

            <div style={styles.divider} />

            {/* Categories */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Categories</h3>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        style={{
                            ...styles.navLink,
                            backgroundColor:
                                selectedCategory === cat ? '#333' : 'transparent',
                            color: selectedCategory === cat ? 'var(--accent-color)' : '#eee',
                            border: 'none',
                            textAlign: 'left',
                            width: '100%',
                            cursor: 'pointer',
                        }}
                    >
                        <Film size={18} style={styles.icon} />
                        <span>{cat}</span>
                    </button>
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
