import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { CATEGORIES } from '../../constants/categories';

const MainLayout = () => {
    const { isSidebarOpen, isMobile, toggleSidebar, closeSidebar } = useUI();

    const closeSidebarOnMobile = () => {
        if (isMobile) closeSidebar();
    };

    return (
        <div style={styles.container}>
            <Header toggleSidebar={toggleSidebar} />
            
            <div style={styles.contentWrapper}>
                {/* BACKDROP FOR MOBILE */}
                {isMobile && isSidebarOpen && (
                    <div 
                        style={styles.backdrop} 
                        onClick={closeSidebarOnMobile}
                        className="fade-in"
                    />
                )}

                <Sidebar />
                
                <main style={{
                    ...styles.main,
                    marginLeft: (!isMobile && isSidebarOpen) ? 'var(--sidebar-width)' : '0',
                    padding: isMobile ? '16px' : '24px',
                }}>
                    <div style={styles.outletWrapper}>
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' },
    contentWrapper: { display: 'flex', flex: 1, marginTop: 'var(--header-height)', position: 'relative' },
    main: { flex: 1, transition: 'margin-left 0.3s ease', maxWidth: '100%', overflowX: 'hidden', display: 'flex', flexDirection: 'column' },
    outletWrapper: { flex: 1 },
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 850, // Below sidebar (900), above content
    }
};

export default MainLayout;
