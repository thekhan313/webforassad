import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Upload, ShieldCheck, DollarSign, Clock } from 'lucide-react';

const SubmitInfo = () => {
    return (
        <MainLayout>
            <div style={styles.container} className="fade-in">
                <div style={styles.hero}>
                    <h1 style={styles.heroTitle}>Submit Your Content</h1>
                    <p style={styles.heroSub}>Join the world's leading community and start earning today.</p>
                </div>

                <div style={styles.features}>
                    <div style={styles.featureCard}>
                        <Upload size={40} color="var(--accent-color)" />
                        <h3>Easy Upload</h3>
                        <p>High speed servers ensuring your content is live in minutes.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <ShieldCheck size={40} color="var(--accent-color)" />
                        <h3>Secure & Private</h3>
                        <p>Advanced encryption and content protection for all creators.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <DollarSign size={40} color="var(--accent-color)" />
                        <h3>Monetization</h3>
                        <p>Industry-leading payout rates and flexible payment options.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <Clock size={40} color="var(--accent-color)" />
                        <h3>24/7 Support</h3>
                        <p>Our dedicated team is here to help you grow your brand.</p>
                    </div>
                </div>

                <div style={styles.ctaSection}>
                    <h2>Ready to get started?</h2>
                    <p>Contact our partnership team to create your verified creator account.</p>
                    <button style={styles.ctaBtn}>Contact Partnership Team</button>
                </div>
            </div>
        </MainLayout>
    );
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 0',
    },
    hero: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    heroTitle: {
        fontSize: '48px',
        marginBottom: '16px',
        background: 'linear-gradient(to right, #fff, var(--accent-color))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    heroSub: {
        fontSize: '20px',
        color: '#aaa',
    },
    features: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px',
        marginBottom: '80px',
    },
    featureCard: {
        backgroundColor: '#1a1a1a',
        padding: '30px',
        borderRadius: '12px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid #333',
    },
    ctaSection: {
        textAlign: 'center',
        backgroundColor: 'var(--accent-color)',
        padding: '60px',
        borderRadius: '20px',
        color: '#000',
    },
    ctaBtn: {
        backgroundColor: '#000',
        color: '#fff',
        padding: '16px 40px',
        borderRadius: '30px',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '30px',
    }
};

export default SubmitInfo;
