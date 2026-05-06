import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/video/VideoCard';
import { API_BASE } from '../config';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_BASE}/api/search?q=${query}`)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setIsLoading(false);
            })
            .catch(() => {
                // Fallback
                setResults([
                    { id: 201, title: `Result for ${query} 1`, thumbnail: 'https://picsum.photos/seed/201/320/180', views: '200K', duration: '12:05', rating: '95%' },
                    { id: 202, title: `Result for ${query} 2`, thumbnail: 'https://picsum.photos/seed/202/320/180', views: '450K', duration: '08:20', rating: '97%' },
                    { id: 203, title: `Result for ${query} 3`, thumbnail: 'https://picsum.photos/seed/203/320/180', views: '1M', duration: '15:45', rating: '99%' },
                    { id: 204, title: `Result for ${query} 4`, thumbnail: 'https://picsum.photos/seed/204/320/180', views: '300K', duration: '10:12', rating: '92%' },
                ]);
                setIsLoading(false);
            });
    }, [query]);

    return (
        <div className="fade-in">
                <h2 style={styles.title}>Search Results for: <span style={styles.query}>{query}</span></h2>

                {isLoading ? (
                    <div style={styles.loading}>Searching...</div>
                ) : (
                    <div style={styles.grid}>
                        {results.map(video => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                )}

                {!isLoading && results.length === 0 && (
                    <div style={styles.noResults}>No videos found for "{query}"</div>
                )}
        </div>
    );
};

const styles = {
    title: {
        fontSize: '20px',
        marginBottom: '30px',
        color: '#fff',
    },
    query: {
        color: 'var(--accent-color)',
        fontStyle: 'italic',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px',
        color: 'var(--text-secondary)',
    },
    noResults: {
        textAlign: 'center',
        padding: '100px',
        color: 'var(--text-secondary)',
        fontSize: '20px',
    }
};

export default SearchResults;
