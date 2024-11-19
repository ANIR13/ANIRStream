import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { favorites } from '../services/api';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  movieId: number;
  isFavorited?: boolean;
  onToggle?: (isFavorited: boolean) => void;
}

export default function FavoriteButton({ movieId, isFavorited = false, onToggle }: FavoriteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      if (isFavorite) {
        await favorites.remove(movieId);
        toast.success('Removed from favorites');
      } else {
        await favorites.add(movieId);
        toast.success('Added to favorites');
      }
      setIsFavorite(!isFavorite);
      onToggle?.(!isFavorite);
    } catch (error) {
      toast.error('Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isFavorite 
          ? 'bg-primary text-white hover:bg-red-700' 
          : 'bg-gray-800 text-gray-400 hover:text-white'
      }`}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );
}