import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const BREAKPOINT = 768;
    const isMobileInitial = window.innerWidth < BREAKPOINT;
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobileInitial);
    const [isMobile, setIsMobile] = useState(isMobileInitial);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < BREAKPOINT;
            setIsMobile(mobile);
            
            // Auto close/open when shifting between mobile/desktop
            if (mobile) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);
    const openSidebar = () => setIsSidebarOpen(true);

    return (
        <UIContext.Provider value={{
            isSidebarOpen,
            setIsSidebarOpen,
            isMobile,
            toggleSidebar,
            closeSidebar,
            openSidebar,
            selectedCategory,
            setSelectedCategory
        }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
