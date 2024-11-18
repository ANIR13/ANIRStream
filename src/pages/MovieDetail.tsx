import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plus, Star } from 'lucide-react';
import { findMovieById } from '../data/movies';

export default function MovieDetail() {
  const { id } = useParams();
  const movie = findMovieById(Number(id));

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img
          src={movie.backdrop || movie.image}
          alt={movie.title}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative pt-32 px-8 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-[2fr,1fr] gap-8"
        >
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                {movie.rating}/10
              </span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">{movie.description}</p>
            
            <div className="flex space-x-4">
              <button className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
                <Play className="w-5 h-5 mr-2" />
                Play Now
              </button>
              <button className="flex items-center px-6 py-3 bg-gray-600/80 text-white rounded-lg hover:bg-gray-600 transition">
                <Plus className="w-5 h-5 mr-2" />
                Add to My List
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-gray-400">Cast:</span>
              <p>{movie.cast.join(', ')}</p>
            </div>
            <div>
              <span className="text-gray-400">Genre:</span>
              <p>{movie.genres.join(', ')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}