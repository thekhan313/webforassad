import React, { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us | VideoHub";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Learn more about VideoHub, our mission, and our commitment to providing the best video platform.");
    }, []);

    return (
        <div style={styles.container} className="fade-in">
            <div style={styles.header}>
                <h1 style={styles.title}>About Us</h1>
                <p style={styles.subtitle}>Discover our platform and our mission.</p>
            </div>
            
            <div style={styles.content}>
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Introduction</h2>
                    <p style={styles.text}>
                        Welcome to our platform. We are dedicated to providing a high-quality video sharing and viewing experience. Our platform is designed with the user in mind, offering a clean interface, robust features, and a seamless environment for creators and viewers alike.
                    </p>
                </section>
                
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Mission</h2>
                    <p style={styles.text}>
                        Our mission is to empower creators to share their voices and connect with audiences globally. We believe in open communication, creativity, and building a supportive community where everyone can find content that resonates with them.
                    </p>
                </section>
                
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>What We Offer</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>A vast library of diverse video content.</li>
                        <li style={styles.listItem}>High-definition streaming for the best viewing experience.</li>
                        <li style={styles.listItem}>Intuitive search and recommendation features.</li>
                        <li style={styles.listItem}>A platform that supports creators and their growth.</li>
                    </ul>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Commitment to You</h2>
                    <p style={styles.text}>
                        We are committed to maintaining a safe, inclusive, and respectful platform for all our users. We continuously strive to improve our technology and policies to ensure that your experience here is nothing short of excellent.
                    </p>
                </section>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
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
        gap: '30px'
    },
    section: {
        backgroundColor: 'var(--card-bg)',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)'
    },
    sectionTitle: {
        fontSize: '22px',
        marginBottom: '16px',
        color: 'var(--text-primary)',
        borderLeft: '4px solid var(--accent-color)',
        paddingLeft: '12px'
    },
    text: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#ccc'
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#ccc',
        lineHeight: '1.6'
    },
    listItem: {
        marginBottom: '8px'
    }
};

export default AboutUs;
