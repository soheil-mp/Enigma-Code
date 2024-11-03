import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </motion.button>
  );
} 