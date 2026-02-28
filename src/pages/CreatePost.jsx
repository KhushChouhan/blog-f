import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { createPost } from '../services/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;
    setSubmitting(true);
    try {
      await createPost({ title, body });
      navigate('/');
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{ padding: '3rem', width: '100%', maxWidth: '600px', backdropFilter: 'blur(20px)' }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            fontFamily: 'var(--font-hero)',
            fontSize: '0.7rem'
          }}
        >
          <ArrowLeft size={16} /> BACK TO SECTOR
        </button>

        <h1 style={{ marginBottom: '2rem', color: 'var(--neon-purple)', fontSize: '2rem' }}>New Transmission</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontFamily: 'var(--font-hero)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Transmission Title</label>
            <input
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                padding: '1rem',
                color: '#fff',
                outline: 'none',
                fontFamily: 'var(--font-main)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontFamily: 'var(--font-hero)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Message Body</label>
            <textarea
              placeholder="Compose message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                padding: '1rem',
                color: '#fff',
                outline: 'none',
                fontFamily: 'var(--font-main)',
                resize: 'none'
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: 'var(--glow-purple)' }}
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
            type="submit"
            className="btn-neon"
            style={{
              borderColor: 'var(--neon-purple)',
              color: 'var(--neon-purple)',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '1rem'
            }}
          >
            {submitting ? 'Transmitting...' : 'Send Transmission'}
            <Send size={18} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
