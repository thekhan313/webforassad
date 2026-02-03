import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import VideoCard from '../components/video/VideoCard';
import AdCard from '../components/video/AdCard';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/videos')
            .then(res => res.json())
            .then(data => {
                setVideos(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
                // Fallback data for development if backend is not running
                setVideos([
                    { id: 1, title: 'Sample Video 1', thumbnail: 'https://picsum.photos/seed/1/320/180', views: '1.2M', duration: '10:05', rating: '98%' },
                    { id: 2, title: 'Sample Video 2', thumbnail: 'https://picsum.photos/seed/2/320/180', views: '500K', duration: '05:20', rating: '95%' },
                    { id: 3, title: 'Sample Video 3', thumbnail: 'https://picsum.photos/seed/3/320/180', views: '100K', duration: '15:45', rating: '90%' },
                    { id: 4, title: 'Sample Video 4', thumbnail: 'https://picsum.photos/seed/4/320/180', views: '750K', duration: '08:12', rating: '97%' },
                    { id: 5, title: 'Sample Video 5', thumbnail: 'https://picsum.photos/seed/5/320/180', views: '2.5M', duration: '20:00', rating: '99%' },
                    { id: 6, title: 'Sample Video 6', thumbnail: 'https://picsum.photos/seed/6/320/180', views: '300K', duration: '12:30', rating: '92%' },
                ]);
            });
    }, []);

    const renderContent = () => {
        if (isLoading) return <div style={styles.loading}>Loading videos...</div>;

        const items = [];
        videos.forEach((video, index) => {
            // Insert Ads
            if (index === 0) items.push(<AdCard key="ad-first" type="first" />);
            if (index === Math.floor(videos.length / 2)) items.push(<AdCard key="ad-middle" type="middle" />);

            items.push(<VideoCard key={video.id} video={video} />);

            if (index === videos.length - 1) items.push(<AdCard key="ad-last" type="last" />);
        });

        return (
            <div style={styles.grid}>
                {items}
            </div>
        );
    };

    return (
        <MainLayout>
            <div className="fade-in">
                <h2 style={styles.title}>Recommended For You</h2>
                {renderContent()}
            </div>
        </MainLayout>
    );
};

const styles = {
    title: {
        fontSize: '20px',
        marginBottom: '20px',
        color: '#fff',
        borderLeft: '4px solid var(--accent-color)',
        paddingLeft: '12px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: 'var(--text-secondary)',
    }
};

export default Home;
