import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';

const ConsentOverlay = () => {
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
    const [showAgeModal, setShowAgeModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const ageVerified = localStorage.getItem('isAgeVerified') === 'true';
        const privacyAccepted = localStorage.getItem('isPrivacyAccepted') === 'true';

        setIsAgeVerified(ageVerified);
        setIsPrivacyAccepted(privacyAccepted);

        if (!ageVerified) {
            setShowAgeModal(true);
        } else if (!privacyAccepted) {
            setShowPrivacyModal(true);
        }
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (showAgeModal || showPrivacyModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showAgeModal, showPrivacyModal]);

    const handleAgeYes = () => {
        localStorage.setItem('isAgeVerified', 'true');
        setIsAgeVerified(true);
        setShowAgeModal(false);
        if (!isPrivacyAccepted) {
            setShowPrivacyModal(true);
        }
    };

    const handleAgeNo = () => {
        window.location.href = 'https://www.google.com';
    };

    const handlePrivacyAccept = () => {
        localStorage.setItem('isPrivacyAccepted', 'true');
        setIsPrivacyAccepted(true);
        setShowPrivacyModal(false);
    };

    // If on admin route or privacy policy page, we might not want to show this
    if (location.pathname.startsWith('/admin') || location.pathname === '/privacy-policy') {
        return null;
    }

    if (!showAgeModal && !showPrivacyModal) return null;

    return (
        <div style={styles.overlay}>
            {showAgeModal && (
                <div style={styles.modal} className="fade-in">
                    <div style={styles.iconContainer}>
                        <ShieldCheck size={48} color="var(--accent-color)" />
                    </div>
                    <h2 style={styles.title}>Age Verification</h2>
                    <p style={styles.message}>
                        This website contains content that is only suitable for adults.
                        Are you 18 years or older?
                    </p>
                    <div style={styles.buttonContainer}>
                        <button onClick={handleAgeYes} style={styles.primaryButton}>
                            Yes, I am 18+
                        </button>
                        <button onClick={handleAgeNo} style={styles.secondaryButton}>
                            No
                        </button>
                    </div>
                </div>
            )}

            {showPrivacyModal && !showAgeModal && (
                <div style={styles.modal} className="fade-in">
                    <div style={styles.iconContainer}>
                        <AlertCircle size={48} color="var(--accent-color)" />
                    </div>
                    <h2 style={styles.title}>Privacy Policy</h2>
                    <p style={styles.message}>
                        We value your privacy. Please review and accept our Privacy Policy to continue using the platform.
                    </p>
                    <Link to="/privacy-policy" style={styles.policyLink}>
                        Read Privacy Policy <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                    </Link>
                    <div style={styles.buttonContainer}>
                        <button onClick={handlePrivacyAccept} style={styles.primaryButton}>
                            Accept & Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid #333',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    },
    iconContainer: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontSize: '24px',
        marginBottom: '16px',
        color: '#fff',
    },
    message: {
        fontSize: '16px',
        color: '#ccc',
        lineHeight: '1.6',
        marginBottom: '24px',
    },
    policyLink: {
        display: 'inline-flex',
        alignItems: 'center',
        color: 'var(--accent-color)',
        fontSize: '14px',
        marginBottom: '24px',
        textDecoration: 'underline',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    primaryButton: {
        backgroundColor: 'var(--accent-color)',
        color: '#000',
        padding: '14px 24px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '100%',
        transition: 'transform 0.2s',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        color: '#999',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        width: '100%',
        border: '1px solid #333',
    }
};

export default ConsentOverlay;
