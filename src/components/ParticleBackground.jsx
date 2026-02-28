import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const particles = Array.from({ length: 30 });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
      background: 'radial-gradient(circle at 50% 50%, #0a0e14 0%, #05070a 100%)'
    }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, '-20%', '120%'],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: i % 2 === 0 ? 'var(--neon-blue)' : 'var(--neon-purple)',
            borderRadius: '50%',
            filter: 'blur(1px)',
            boxShadow: i % 2 === 0 ? '0 0 10px var(--neon-blue)' : '0 0 10px var(--neon-purple)',
          }}
        />
      ))}

      {/* Decorative Gradients */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(188, 19, 254, 0.1), transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.08), transparent 70%)',
        filter: 'blur(80px)',
      }} />
    </div>
  );
};

export default ParticleBackground;
