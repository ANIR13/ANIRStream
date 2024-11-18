import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { findMovieByTitle } from '../data/movies';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const searchResults = findMovieByTitle(searchTerm);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleSelect = (id: number) => {
    navigate(`/movie/${id}`);
    onClose();
    setSearchTerm('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-gray-900 w-full max-w-2xl rounded-lg p-4 mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-gray-700 pb-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                className="flex-1 bg-transparent border-none outline-none text-white px-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>
            
            <div className="mt-4 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => handleSelect(result.id)}
                >
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-16 h-10 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-white font-medium">{result.title}</h4>
                    <p className="text-sm text-gray-400">{result.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}