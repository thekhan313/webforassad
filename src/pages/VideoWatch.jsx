import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Flag,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import VideoCard from '../components/video/VideoCard';
import LoginModal from '../components/common/LoginModal';
import { useAuth } from '../context/AuthContext';

const VideoWatch = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleInteraction = (action) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    alert(`You clicked ${action}`);
  };

  useEffect(() => {
    setIsLoading(true);

    // Fetch video details
    fetch(`http://localhost:4000/api/video/${id}`)
      .then(res => res.json())
      .then(data => {
        setVideo(data);
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback demo data
        setVideo({
          id,
          title: 'Demo Video',
          description: 'Demo video description',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          views: '1.5M',
          likes: '150K',
          dislikes: '2K',
          category: 'Demo',
          uploadDate: 'Today',
          thumbnail: 'https://picsum.photos/400/225'
        });
        setIsLoading(false);
      });

    // Fetch related videos
    fetch(`http://localhost:4000/api/videos?related=${id}`)
      .then(res => res.json())
      .then(data => setRelatedVideos(data))
      .catch(() => setRelatedVideos([]));

    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div style={styles.loading}>Loading video...</div>
      </MainLayout>
    );
  }

  if (!video) {
    return (
      <MainLayout>
        <div>Video not found</div>
      </MainLayout>
    );
  }



  return (
    <MainLayout>
      <div style={styles.container} className="fade-in">
        <div style={styles.videoContent}>
          {/* VIDEO PLAYER */}
          <div style={styles.playerContainer}>
            {video.videoUrl ? (
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={video.thumbnail}
                style={styles.player}
                key={video.id}
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div style={styles.errorPlayer}>Video source unavailable</div>
            )}
          </div>

          {/* VIDEO INFO */}
          <div style={styles.header}>
            <h1 style={styles.title}>{video.title}</h1>
            <div style={styles.statsRow}>
              <div style={styles.views}>
                {video.views} views • {video.uploadDate}
              </div>
              <div style={styles.actions}>
                <button style={styles.actionBtn} onClick={() => handleInteraction('Like')}>
                  <ThumbsUp size={20} /> <span>{video.likes}</span>
                </button>
                <button style={styles.actionBtn} onClick={() => handleInteraction('Dislike')}>
                  <ThumbsDown size={20} /> <span>{video.dislikes}</span>
                </button>
                <button style={styles.actionBtn} onClick={() => handleInteraction('Share')}>
                  <Share2 size={20} /> <span>Share</span>
                </button>
                <button style={styles.actionBtn} onClick={() => handleInteraction('Report')}>
                  <Flag size={20} /> <span>Report</span>
                </button>
                <button style={styles.actionBtn}>
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>

          <div style={styles.divider} />

          {/* DESCRIPTION */}
          <div style={styles.descriptionSection}>
            <div style={styles.performerInfo}>
              <div style={styles.avatar}>V</div>
              <div>
                <div style={styles.performerName}>Video Creator</div>
                <div style={styles.subCount}>2.5M subscribers</div>
              </div>
              <button style={styles.subscribeBtn}>SUBSCRIBE</button>
            </div>

            <div style={styles.description}>{video.description}</div>

            <div style={styles.tags}>
              <span style={styles.category}>Category: {video.category}</span>
            </div>
          </div>

          <div style={styles.divider} />

          {/* COMMENTS */}
          <div style={styles.comments}>
            <h3>Comments</h3>
            <div style={styles.commentInputRow}>
              <div style={styles.avatarMini}>U</div>
              <input
                type="text"
                placeholder="Add a comment..."
                style={styles.commentInput}
              />
            </div>
            <p style={styles.commentNotice}>Please login to post comments.</p>
          </div>
        </div>

        {/* RELATED VIDEOS */}
        <div style={styles.relatedSide}>
          <h3 style={styles.sideTitle}>Related Videos</h3>
          <div style={styles.relatedGrid}>
            {relatedVideos.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </MainLayout>
  );
};

const styles = {
  container: { display: 'flex', gap: '24px' },
  videoContent: { flex: 3 },
  relatedSide: { flex: 1, minWidth: '320px' },
  playerContainer: {
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#000',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  player: { width: '100%', height: '100%' },
  header: { marginTop: '20px' },
  title: { fontSize: '24px', fontWeight: '700' },
  statsRow: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' },
  views: { fontSize: '14px', color: '#aaa' },
  actions: { display: 'flex', gap: '12px' },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#222',
    padding: '6px 12px',
    borderRadius: '20px'
  },
  divider: { height: '1px', backgroundColor: '#333', margin: '20px 0' },
  descriptionSection: { backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px' },
  performerInfo: { display: 'flex', alignItems: 'center', gap: '16px' },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#f5c518',
    color: '#000',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  performerName: { fontWeight: 'bold' },
  subCount: { fontSize: '13px', color: '#aaa' },
  subscribeBtn: {
    marginLeft: 'auto',
    backgroundColor: '#fff',
    color: '#000',
    padding: '8px 18px',
    borderRadius: '20px'
  },
  description: { marginTop: '16px', fontSize: '14px' },
  tags: { marginTop: '12px' },
  category: {
    backgroundColor: '#333',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  comments: { marginTop: '30px' },
  commentInputRow: { display: 'flex', gap: '12px', marginTop: '16px' },
  avatarMini: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  commentInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #444',
    color: '#fff'
  },
  commentNotice: { marginTop: '10px', fontSize: '13px', color: '#888' },
  sideTitle: { fontSize: '18px', marginBottom: '16px' },
  relatedGrid: { display: 'flex', flexDirection: 'column', gap: '16px' },
  loading: { padding: '100px', textAlign: 'center', fontSize: '20px' }
};

export default VideoWatch;
