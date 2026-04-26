import React from 'react';

const TopAdBanner = () => {
    return (
        <div className="top-ad-banner-container">
            <style dangerouslySetInnerHTML={{ __html: `
                .top-ad-banner-container {
                    width: 100%;
                    background: #111;
                    border: 1px dashed #333;
                    border-radius: 8px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    position: relative;
                }

                /* Default / Desktop / Tablet */
                @media (min-width: 769px) {
                    .top-ad-banner-container {
                        height: 180px;
                    }
                }

                /* Mobile */
                @media (max-width: 768px) {
                    .top-ad-banner-container {
                        height: 150px;
                    }
                }

                /* Small Mobile */
                @media (max-width: 360px) {
                    .top-ad-banner-container {
                        height: 100px;
                    }
                }

                .top-ad-content {
                    color: #555;
                    font-size: 11px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    display: flex;
                    flex-direction: column;
                    alignItems: center;
                    gap: 8px;
                }

                .top-ad-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.3s;
                }
            `}} />
            
            <div className="top-ad-placeholder">
                <div className="top-ad-content" style={{ textAlign: 'center' }}>
                    <span>ADVERTISEMENT</span>
                    {/* Iframes or real ad tags would go here */}
                    <div style={{ padding: '10px', background: '#222', borderRadius: '4px', fontSize: '10px', color: '#888' }}>
                        Mobile Optimized Banner Unit
                    </div>
                </div>
            </div>
            
            {/* 
              Performance: Explicit lazy loading if we had an iframe
              Example: <iframe loading="lazy" ... /> 
            */}
        </div>
    );
};

export default TopAdBanner;
