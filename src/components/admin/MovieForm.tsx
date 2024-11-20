import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface MovieFormProps {
  movie?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function MovieForm({ movie, onSubmit, onClose }: MovieFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    backdrop: '',
    year: new Date().getFullYear(),
    rating: 0,
    duration: '',
    genres: '',
    cast: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        ...movie,
        genres: Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres,
        cast: Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast
      });
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      genres: formData.genres.split(',').map(g => g.trim()),
      cast: formData.cast.split(',').map(c => c.trim()),
      year: parseInt(formData.year.toString()),
      rating: parseFloat(formData.rating.toString())
    };
    onSubmit(submitData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{movie ? 'Edit Movie' : 'Add Movie'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Backdrop URL</label>
              <input
                type="url"
                name="backdrop"
                value={formData.backdrop}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="10"
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="2h 15m"
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Genres (comma-separated)</label>
            <input
              type="text"
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              placeholder="Action, Drama, Sci-Fi"
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Cast (comma-separated)</label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              placeholder="Tom Cruise, Emma Stone"
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition"
            >
              {movie ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}