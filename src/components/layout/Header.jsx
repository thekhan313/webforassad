import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Upload, User, Menu, X, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import LoginModal from '../common/LoginModal';

const Header = () => {
    const { toggleSidebar } = useUI();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.left}>
                <button onClick={toggleSidebar} style={styles.menuButton}>
                    <Menu size={24} />
                </button>
                <Link to="/" style={styles.logo}>
                    <span style={styles.logoPorn}>Video</span>
                    <span style={styles.logoHub}>Hub</span>
                </Link>
            </div>

            <form onSubmit={handleSearch} style={styles.center}>
                <div style={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button type="submit" style={styles.searchButton}>
                        <Search size={20} />
                    </button>
                </div>
            </form>

            <div style={styles.right}>
                {isAdmin && (
                    <Link to="/admin/dashboard" style={styles.iconLink}>
                        <Upload size={20} />
                        <span style={styles.iconText}>Admin</span>
                    </Link>
                )}
                <Link to="/submit" style={styles.iconLink}>
                    <Upload size={20} />
                    <span style={styles.iconText}>Submit</span>
                </Link>
                {user ? (
                    <div style={styles.userSection}>
                        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
                        <div style={styles.avatar}>
                            <User size={20} />
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setIsLoginModalOpen(true)} style={styles.loginBtn}>
                        <LogIn size={20} style={{ marginRight: '8px' }} />
                        Login
                    </button>
                )}
            </div>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </header>
    );
};

const styles = {
    header: {
        height: 'var(--header-height)',
        backgroundColor: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderBottom: '1px solid var(--border-color)',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    menuButton: {
        color: 'var(--text-primary)',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
    logoPorn: {
        color: '#fff',
    },
    logoHub: {
        backgroundColor: 'var(--accent-color)',
        color: '#000',
        padding: '2px 6px',
        borderRadius: '4px',
        marginLeft: '2px',
    },
    center: {
        flex: 1,
        maxWidth: '600px',
        margin: '0 24px',
    },
    searchBar: {
        display: 'flex',
        backgroundColor: '#000',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid #333',
    },
    searchInput: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        color: '#fff',
        padding: '8px 12px',
        outline: 'none',
        fontSize: '16px',
    },
    searchButton: {
        backgroundColor: '#333',
        padding: '0 16px',
        color: '#ccc',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    iconLink: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '11px',
        color: 'var(--text-secondary)',
    },
    iconText: {
        marginTop: '2px',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    avatar: {
        width: '32px',
        height: '32px',
        backgroundColor: '#333',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: {
        backgroundColor: 'var(--accent-color)',
        color: '#000',
        padding: '8px 16px',
        borderRadius: '4px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
    logoutBtn: {
        fontSize: '14px',
        color: 'var(--text-secondary)',
    }
};

export default Header;
