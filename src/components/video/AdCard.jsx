import React from 'react';

const AdCard = ({ type }) => {
    const getAdContent = () => {
        switch (type) {
            case 'first':
                return {
                    title: 'Premium Access - 50% OFF',
                    desc: 'Watch all videos in 4K with no ads!',
                    cta: 'Upgrade Now',
                    color: '#ff9000'
                };
            case 'middle':
                return {
                    title: 'Join our Community',
                    desc: '1M+ members are waiting for you.',
                    cta: 'Register Free',
                    color: '#2196f3'
                };
            case 'last':
            default:
                return {
                    title: 'Download our App',
                    desc: 'Fast, secure and private browsing.',
                    cta: 'Download',
                    color: '#4caf50'
                };
        }
    };

    const ad = getAdContent();

    return (
        <div style={{ ...styles.card, borderTop: `4px solid ${ad.color}` }}>
            <div style={styles.badge}>SPONSORED</div>
            <div style={styles.content}>
                <h3 style={styles.title}>{ad.title}</h3>
                <p style={styles.desc}>{ad.desc}</p>
                <button style={{ ...styles.button, backgroundColor: ad.color }}>
                    {ad.cta}
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#222',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '200px',
        position: 'relative',
        overflow: 'hidden',
    },
    badge: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '10px',
        color: '#666',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: '18px',
        color: '#fff',
        marginBottom: '8px',
    },
    desc: {
        fontSize: '14px',
        color: '#aaa',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        color: '#000',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    }
};

export default AdCard;
