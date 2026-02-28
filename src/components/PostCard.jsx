import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Heart, MessageSquare, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { createComment, likePost } from '../services/api';

const PostCard = ({ post, onDelete, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes?.length || 0);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await likePost(post._id);
      setLocalLikes(prev => prev + 1);
      if (onLike) onLike(post._id);
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000); // Reset after 3 seconds
      return;
    }
    onDelete(post._id);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await createComment({ post: post._id, user: "Guest", body: commentText });
      setCommentText('');
      // In a real app, we'd update the local state or refetch
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="glass floating"
      style={{
        padding: '1.5rem',
        margin: '1rem 0',
        width: '100%',
        maxWidth: '800px',
        border: '1px solid var(--glass-border)',
        transition: 'border-color 0.3s ease',
      }}
    >
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--neon-blue)' }}>{post.title}</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleConfirmDelete}
          style={{
            background: confirmDelete ? 'rgba(255, 75, 43, 0.2)' : 'transparent',
            border: confirmDelete ? '1px solid #ff4b2b' : 'none',
            color: confirmDelete ? '#ff4b2b' : 'var(--text-secondary)',
            cursor: 'pointer',
            padding: confirmDelete ? '4px 12px' : '0',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-hero)',
            transition: 'all 0.3s ease',
            boxShadow: confirmDelete ? '0 0 10px rgba(255, 75, 43, 0.3)' : 'none'
          }}
        >
          {confirmDelete && <span>DELETE?</span>}
          <Trash2 size={18} />
        </motion.button>
      </div>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        {post.body}
      </p>

      <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          disabled={isLiking}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'transparent',
            border: 'none',
            color: localLikes > 0 ? 'var(--neon-purple)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontFamily: 'var(--font-hero)',
            fontSize: '0.8rem'
          }}
        >
          <Heart size={18} fill={localLikes > 0 ? 'var(--neon-purple)' : 'none'} />
          <span>{localLikes}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowComments(!showComments)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--neon-cyan)',
            cursor: 'pointer',
            fontFamily: 'var(--font-hero)',
            fontSize: '0.8rem'
          }}
        >
          <MessageSquare size={18} />
          <span>{post.comments?.length || 0}</span>
          {showComments ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', marginTop: '1rem' }}
          >
            <div style={{ padding: '1rem 0', borderTop: '1px solid var(--glass-border)' }}>
              {post.comments?.length > 0 ? (
                post.comments.map((c, idx) => (
                  <div key={idx} style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '10px', background: 'rgba(255,255,255,0.02)' }}>
                    <small style={{ color: 'var(--neon-cyan)', display: 'block', marginBottom: '0.2rem' }}>{c.user || 'Guest'}</small>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{c.body}</p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>No comments yet.</p>
              )}

              <form onSubmit={handleComment} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '20px',
                    padding: '0.5rem 1rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  style={{ background: 'transparent', border: 'none', color: 'var(--neon-blue)', cursor: 'pointer' }}
                >
                  <Send size={20} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;
