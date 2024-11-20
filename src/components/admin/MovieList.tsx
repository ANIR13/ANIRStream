import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';

interface MovieListProps {
  movies: any[];
  onEdit: (movie: any) => void;
  onDelete: (id: number) => void;
}

export default function MovieList({ movies, onEdit, onDelete }: MovieListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <motion.div
          key={movie.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-gray-800 rounded-lg overflow-hidden"
        >
          <div className="aspect-video relative">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
              <p className="text-sm text-gray-300">{movie.year}</p>
            </div>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">{movie.rating}/10</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{movie.duration}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(movie)}
                className="p-2 text-gray-400 hover:text-white transition"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(movie.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}