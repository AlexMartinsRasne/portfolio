import React from 'react'
import { motion } from 'framer-motion'

const orbs = [
  {
    className: 'top-[-10%] left-[-5%] w-[500px] h-[500px] bg-ocean-600/20',
    animate: {
      x: [0, 40, -20, 0],
      y: [0, -30, 20, 0],
      scale: [1, 1.06, 0.98, 1],
      rotate: [0, 6, -4, 0],
      opacity: [0.9, 0.7, 0.85, 0.9],
    },
    duration: 20,
  },
  {
    className: 'top-[30%] right-[-10%] w-[400px] h-[400px] bg-purple-600/15',
    animate: {
      x: [0, -30, 20, 0],
      y: [0, 40, -20, 0],
      scale: [1, 0.94, 1.04, 1],
      rotate: [0, -5, 5, 0],
      opacity: [0.88, 0.65, 0.9, 0.88],
    },
    duration: 25,
  },
  {
    className: 'bottom-[10%] left-[20%] w-[350px] h-[350px] bg-blue-500/10',
    animate: {
      x: [0, 25, -35, 0],
      y: [0, -25, 15, 0],
      scale: [1, 1.03, 0.95, 1],
      rotate: [0, 4, -6, 0],
      opacity: [0.9, 0.7, 0.85, 0.9],
    },
    duration: 18,
  },
]

const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform, opacity' }}
        />
      ))}
      <div className="absolute inset-0 bg-mesh-dark" />
    </div>
  )
}

export default AmbientBackground
