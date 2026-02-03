import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { CATEGORIES } from '../../constants/categories'; // import categories here

const MainLayout = ({ children, selectedCategory, setSelectedCategory }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div style={styles.container}>
            <Header toggleSidebar={toggleSidebar} />
            <div style={styles.contentWrapper}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    categories={CATEGORIES} // pass categories
                    selectedCategory={selectedCategory} // pass current category
                    setSelectedCategory={setSelectedCategory} // pass setter
                />
                <main style={{
                    ...styles.main,
                    marginLeft: isSidebarOpen ? 'var(--sidebar-width)' : '0',
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
    contentWrapper: { display: 'flex', flex: 1, marginTop: 'var(--header-height)' },
    main: { flex: 1, padding: '24px', transition: 'margin-left 0.3s ease', maxWidth: '100%', overflowX: 'hidden' },
};

export default MainLayout;
