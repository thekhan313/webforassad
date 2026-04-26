import React, { useEffect, useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        document.title = "Contact Us | VideoHub";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Get in touch with the VideoHub team for general inquiries, support, or business opportunities.");
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder functionality
        setStatus('Thank you for reaching out. We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <div style={styles.container} className="fade-in">
            <div style={styles.header}>
                <h1 style={styles.title}>Contact Us</h1>
                <p style={styles.subtitle}>We'd love to hear from you. Reach out to the right team below.</p>
            </div>
            
            <div style={styles.content}>
                <div style={styles.infoSection}>
                    <div style={styles.infoCard}>
                        <h3 style={styles.cardTitle}>General Inquiries</h3>
                        <p style={styles.text}>For general questions about our platform or services.</p>
                        <p style={styles.email}>contact@example-platform.com</p>
                    </div>
                    
                    <div style={styles.infoCard}>
                        <h3 style={styles.cardTitle}>Support</h3>
                        <p style={styles.text}>Need help with your account or experiencing technical issues?</p>
                        <p style={styles.email}>support@example-platform.com</p>
                    </div>
                    
                    <div style={styles.infoCard}>
                        <h3 style={styles.cardTitle}>Business Inquiries</h3>
                        <p style={styles.text}>For partnerships, advertising, and other business opportunities.</p>
                        <p style={styles.email}>business@example-platform.com</p>
                    </div>
                </div>

                <div style={styles.formContainer}>
                    <h2 style={styles.formTitle}>Send us a Message</h2>
                    {status && <div style={styles.statusMessage}>{status}</div>}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                style={styles.input} 
                                required 
                            />
                        </div>
                        
                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input} 
                                required 
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="subject">Subject</label>
                            <input 
                                type="text" 
                                id="subject" 
                                name="subject" 
                                value={formData.subject}
                                onChange={handleChange}
                                style={styles.input} 
                                required 
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="message">Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="5" 
                                value={formData.message}
                                onChange={handleChange}
                                style={styles.textarea} 
                                required 
                            />
                        </div>

                        <button type="submit" style={styles.submitBtn}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px',
        color: 'var(--text-primary)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-color)'
    },
    title: {
        fontSize: '32px',
        marginBottom: '10px',
        color: 'var(--accent-color)'
    },
    subtitle: {
        fontSize: '18px',
        color: 'var(--text-secondary)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
    },
    infoSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
    },
    infoCard: {
        backgroundColor: 'var(--card-bg)',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
    },
    cardTitle: {
        fontSize: '20px',
        marginBottom: '12px',
        color: 'var(--text-primary)',
    },
    text: {
        fontSize: '15px',
        color: '#ccc',
        marginBottom: '16px',
        lineHeight: '1.5'
    },
    email: {
        fontSize: '15px',
        color: 'var(--accent-color)',
        fontWeight: 'bold'
    },
    formContainer: {
        backgroundColor: 'var(--card-bg)',
        padding: '30px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)'
    },
    formTitle: {
        fontSize: '24px',
        marginBottom: '24px',
        color: 'var(--text-primary)',
        borderLeft: '4px solid var(--accent-color)',
        paddingLeft: '12px'
    },
    statusMessage: {
        backgroundColor: 'rgba(255, 144, 0, 0.1)',
        color: 'var(--accent-color)',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '20px',
        border: '1px solid var(--accent-color)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '14px',
        color: 'var(--text-secondary)',
        fontWeight: '600'
    },
    input: {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid var(--border-color)',
        backgroundColor: '#2a2a2a',
        color: 'var(--text-primary)',
        fontSize: '16px',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    textarea: {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid var(--border-color)',
        backgroundColor: '#2a2a2a',
        color: 'var(--text-primary)',
        fontSize: '16px',
        fontFamily: 'inherit',
        resize: 'vertical',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    submitBtn: {
        backgroundColor: 'var(--accent-color)',
        color: '#000',
        padding: '14px 24px',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '10px',
        transition: 'background-color 0.2s, transform 0.1s',
        alignSelf: 'flex-start'
    }
};

export default ContactUs;
