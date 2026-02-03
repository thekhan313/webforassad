import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import VideoCard from '../components/video/VideoCard';
import AdCard from '../components/video/AdCard';
import { CATEGORIES } from '../constants/categories';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setIsLoading(true);
                const url = selectedCategory === 'All'
                    ? 'http://localhost:4000/api/videos'
                    : `http://localhost:4000/api/videos?category=${selectedCategory}`;

                const res = await fetch(url);
                const data = await res.json();
                setVideos(data);
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, [selectedCategory]);

    const renderContent = () => {
        if (isLoading) return <div style={styles.loading}>Loading videos...</div>;

        const items = [];
        videos.forEach((video, index) => {
            if (index === 0) items.push(<AdCard key="ad-first" type="first" />);
            if (index === Math.floor(videos.length / 2)) items.push(<AdCard key="ad-middle" type="middle" />);
            items.push(<VideoCard key={video.id} video={video} />);
            if (index === videos.length - 1) items.push(<AdCard key="ad-last" type="last" />);
        });

        return <div style={styles.grid}>{items}</div>;
    };

    return (
        <MainLayout selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}>
            <h2 style={styles.title}>
                {selectedCategory === 'All' ? 'Recommended For You' : `Videos in ${selectedCategory}`}
            </h2>
            {renderContent()}
        </MainLayout>
    );
};

const styles = {
    title: { fontSize: '20px', marginBottom: '20px', color: '#fff', borderLeft: '4px solid var(--accent-color)', paddingLeft: '12px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    loading: { textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' },
};

export default Home;
