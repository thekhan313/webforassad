import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.linksContainer}>
                    <Link to="/about-us" style={styles.link}>About Us</Link>
                    <span style={styles.separator}>|</span>
                    <Link to="/contact-us" style={styles.link}>Contact Us</Link>
                    <span style={styles.separator}>|</span>
                    <Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link>
                </div>
                <div style={styles.copyright}>
                    &copy; {new Date().getFullYear()} VideoHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid var(--border-color)',
        padding: '24px 0',
        marginTop: 'auto', // Pushes footer to the bottom if container is flex
        width: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
    },
    linksContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
    },
    link: {
        color: 'var(--text-secondary)',
        fontSize: '14px',
        textDecoration: 'none',
        transition: 'color 0.2s',
    },
    separator: {
        color: 'var(--border-color)',
        fontSize: '14px',
    },
    copyright: {
        color: '#666',
        fontSize: '13px',
    }
};

export default Footer;
