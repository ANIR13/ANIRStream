import React from 'react';
import { motion } from 'framer-motion';
import { myList } from '../data/movies';
import { Link } from 'react-router-dom';

export default function MyList() {
  return (
    <div className="pt-20 px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">My List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myList.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-video rounded-lg overflow-hidden"
          >
            <Link to={`/movie/${item.id}`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-lg font-medium text-center px-4">
                  {item.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}