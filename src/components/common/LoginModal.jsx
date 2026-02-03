import React from 'react';
import { X, Mail, Lock } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <button style={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                </button>

                <div style={styles.content}>
                    <h2 style={styles.title}>Member Login</h2>
                    <p style={styles.sub}>Sign in to interact, like, and comment on videos.</p>

                    <form style={styles.form} onSubmit={e => e.preventDefault()}>
                        <div style={styles.inputGroup}>
                            <Mail size={20} style={styles.icon} />
                            <input type="email" placeholder="Email Address" style={styles.input} />
                        </div>

                        <div style={styles.inputGroup}>
                            <Lock size={20} style={styles.icon} />
                            <input type="password" placeholder="Password" style={styles.input} />
                        </div>

                        <button style={styles.submitBtn}>Sign In</button>
                    </form>

                    <div style={styles.divider}>
                        <span>OR</span>
                    </div>

                    <button style={styles.registerBtn}>Create Free Account</button>
                </div>
            </div>
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
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
    },
    modal: {
        backgroundColor: '#1a1a1a',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '12px',
        padding: '40px',
        position: 'relative',
        border: '1px solid #333',
    },
    closeBtn: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        color: '#666',
    },
    content: {
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        marginBottom: '8px',
    },
    sub: {
        color: '#999',
        fontSize: '14px',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    inputGroup: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: '12px',
        color: '#666',
    },
    input: {
        width: '100%',
        backgroundColor: '#000',
        border: '1px solid #333',
        padding: '12px 12px 12px 40px',
        borderRadius: '6px',
        color: '#fff',
        outline: 'none',
    },
    submitBtn: {
        backgroundColor: 'var(--accent-color)',
        color: '#000',
        padding: '12px',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: '16px',
        marginTop: '10px',
    },
    divider: {
        margin: '30px 0',
        borderTop: '1px solid #333',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    registerBtn: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #444',
        color: '#fff',
        fontWeight: '600',
    }
};

export default LoginModal;
