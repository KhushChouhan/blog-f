import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import PostCard from '../components/PostCard';
import { deletePost, getPosts } from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(p => p._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container" style={{ position: 'relative', minHeight: '100vh', paddingBottom: '4rem' }}>
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', color: 'var(--neon-blue)' }}>Blog Feed</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Defying cognitive boundaries with every post.</p>
      </motion.div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Loader2 className="animate-spin" style={{ color: 'var(--neon-blue)' }} size={48} />
          <style>{`
            .animate-spin { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimatePresence>
            {posts.length > 0 ? (
              posts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass"
                style={{ padding: '3rem', textAlign: 'center' }}
              >
                <p style={{ color: 'var(--text-secondary)' }}>No transmissions found in this sector.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Home;
