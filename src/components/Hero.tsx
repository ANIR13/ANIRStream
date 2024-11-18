import React from 'react';
import { Play, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full">
      <img
        src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 p-12 space-y-6 max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white"
        >
          The Last Kingdom
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-200"
        >
          As Alfred the Great defends his kingdom from Norse invaders, Uhtred -- born a Saxon but raised by Vikings -- seeks to claim his ancestral birthright.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-4"
        >
          <button className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
            <Play className="w-5 h-5 mr-2" />
            Play Now
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-600/80 text-white rounded-lg hover:bg-gray-600 transition">
            <Plus className="w-5 h-5 mr-2" />
            My List
          </button>
        </motion.div>
      </div>
    </div>
  );
}