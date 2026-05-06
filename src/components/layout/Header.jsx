import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Upload, User, Menu, X, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import LoginModal from '../common/LoginModal';

const Header = () => {
    const { toggleSidebar, isMobile } = useUI();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsMobileSearchVisible(false);
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

            <form onSubmit={handleSearch} style={{...styles.center, display: isMobile ? 'none' : 'flex'}}>
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

            {/* Desktop Right Section */}
            <div style={{...styles.right, display: isMobile ? 'none' : 'flex'}}>
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

            {/* Mobile Right Section */}
            {isMobile && (
                <div style={styles.mobileRight}>
                    <button 
                        onClick={() => setIsMobileSearchVisible(true)} 
                        style={styles.mobileIconBtn}
                    >
                        <Search size={24} />
                    </button>
                    <button 
                        onClick={() => user ? logout() : setIsLoginModalOpen(true)} 
                        style={styles.mobileAvatarBtn}
                    >
                        <div style={styles.mobileAvatar}>
                            <User size={24} />
                        </div>
                    </button>
                </div>
            )}

            {/* Mobile Search Overlay */}
            {isMobile && isMobileSearchVisible && (
                <div style={styles.searchOverlay}>
                    <div style={styles.searchOverlayContent}>
                        <form onSubmit={handleSearch} style={styles.mobileSearchForm}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search videos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={styles.mobileSearchInput}
                            />
                            <button type="submit" style={styles.mobileSearchSubmit}>
                                <Search size={20} />
                            </button>
                        </form>
                        <button 
                            onClick={() => setIsMobileSearchVisible(false)} 
                            style={styles.closeSearchBtn}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}

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
        padding: '8px',
        margin: '-8px',
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
        width: '100%',
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
    },
    mobileRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    mobileIconBtn: {
        color: '#fff',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileAvatarBtn: {
        padding: '4px',
    },
    mobileAvatar: {
        width: '36px',
        height: '36px',
        backgroundColor: '#333',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-color)',
        border: '1px solid #444',
    },
    searchOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        backgroundColor: '#1a1a1a',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        animation: 'slideDown 0.2s ease-out',
    },
    searchOverlayContent: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: '12px',
    },
    mobileSearchForm: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#000',
        borderRadius: '20px',
        padding: '4px 12px',
        border: '1px solid #333',
    },
    mobileSearchInput: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        color: '#fff',
        padding: '8px 0',
        outline: 'none',
        fontSize: '16px',
    },
    mobileSearchSubmit: {
        color: '#999',
        padding: '4px',
    },
    closeSearchBtn: {
        color: '#fff',
        padding: '4px',
    }
};

export default Header;
