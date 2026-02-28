import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: '1rem',
      margin: '0 2rem 2rem',
      zIndex: 100,
      padding: '1rem 2rem',
    }}>
      <div className="flex-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            style={{
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
              background: 'linear-gradient(to right, #fff, var(--neon-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ANTIGRAVITY
          </motion.h1>
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" className="btn-neon" style={{ border: 'none' }}>Home</Link>
          <Link to="/create" className="btn-neon">Create Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
