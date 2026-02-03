import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PreRoll = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            navigate(`/video/${id}`);
        }
    }, [countdown, id, navigate]);

    return (
        <div style={styles.container}>
            <div style={styles.adContent}>
                <h1 style={styles.title}>Advertisement</h1>
                <div style={styles.adPlaceholder}>
                    <img
                        src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&auto=format&fit=crop&q=60"
                        alt="Ad"
                        style={styles.adImage}
                    />
                    <div style={styles.promoText}>
                        <h2>GET PREMIUM ACCESS</h2>
                        <p>Unlock all content and remove ads forever!</p>
                    </div>
                </div>

                <div style={styles.timerContainer}>
                    <div style={styles.timer}>
                        Your video will start in <span style={styles.seconds}>{countdown}</span> seconds
                    </div>
                    <button style={styles.skipBtn} disabled>
                        {countdown > 0 ? `Skip Ad in ${countdown}s` : 'Starting...'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2000,
    },
    adContent: {
        maxWidth: '800px',
        width: '90%',
        textAlign: 'center',
    },
    title: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '20px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
    },
    adPlaceholder: {
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: '#111',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid #333',
        marginBottom: '30px',
    },
    adImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.7,
    },
    promoText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        width: '80%',
    },
    timerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    timer: {
        fontSize: '20px',
        color: '#eee',
    },
    seconds: {
        color: 'var(--accent-color)',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    skipBtn: {
        backgroundColor: '#333',
        color: '#666',
        padding: '12px 30px',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'not-allowed',
        border: '1px solid #444',
    }
};

export default PreRoll;
