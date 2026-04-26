import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = "Privacy Policy | VideoHub";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Our Privacy Policy outlines how we collect, use, and protect your data while you use VideoHub.");
    }, []);

    return (
        <div style={styles.container} className="fade-in">
            <div style={styles.header}>
                <h1 style={styles.title}>Privacy Policy</h1>
                <p style={styles.subtitle}>Last updated: [Date]</p>
            </div>
            
            <div style={styles.content}>
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
                    <p style={styles.text}>
                        We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), and other information you choose to provide.
                    </p>
                </section>
                
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>2. How We Use Your Data</h2>
                    <p style={styles.text}>
                        We use the information we collect about you to provide, maintain, and improve our services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users, develop safety features, authenticate users, and send product updates and administrative messages.
                    </p>
                </section>
                
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>3. Cookies</h2>
                    <p style={styles.text}>
                        We use cookies and similar technologies to remember your preferences, understand how you interact with our website, and improve our marketing. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>4. Advertising</h2>
                    <p style={styles.text}>
                        We may allow others to provide audience measurement and analytics services for us, to serve advertisements on our behalf across the Internet, and to track and report on the performance of those advertisements. These entities may use cookies, web beacons, SDKs, and other technologies to identify your device when you visit our site and use our services, as well as when you visit other online sites and services.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>5. User Rights</h2>
                    <p style={styles.text}>
                        Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict the use of your data. To exercise these rights, please contact us using the information provided on our Contact Us page.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>6. Security</h2>
                    <p style={styles.text}>
                        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. However, no internet or email transmission is ever fully secure or error free.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>7. Policy Updates</h2>
                    <p style={styles.text}>
                        We may change this Privacy Policy from time to time. If we make significant changes in the way we treat your personal information, or to the Privacy Policy, we will provide you notice through the Services or by some other means, such as email. Your continued use of the Services after such notice constitutes your consent to the changes.
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
        fontSize: '16px',
        color: 'var(--text-secondary)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    section: {
        backgroundColor: 'var(--card-bg)',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)'
    },
    sectionTitle: {
        fontSize: '20px',
        marginBottom: '12px',
        color: 'var(--text-primary)',
        borderLeft: '4px solid var(--accent-color)',
        paddingLeft: '12px'
    },
    text: {
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#ccc'
    }
};

export default PrivacyPolicy;
