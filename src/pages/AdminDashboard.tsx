import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import MovieForm from '../components/admin/MovieForm';
import MovieList from '../components/admin/MovieList';
import api from '../services/api';

export default function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/admin/movies');
      setMovies(response.data);
    } catch (error) {
      toast.error('Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (movieId: number) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await api.delete(`/admin/movies/${movieId}`);
        toast.success('Movie deleted successfully');
        fetchMovies();
      } catch (error) {
        toast.error('Failed to delete movie');
      }
    }
  };

  const handleEdit = (movie: any) => {
    setEditingMovie(movie);
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (movieData: any) => {
    try {
      if (editingMovie) {
        await api.put(`/admin/movies/${editingMovie.id}`, movieData);
        toast.success('Movie updated successfully');
      } else {
        await api.post('/admin/movies', movieData);
        toast.success('Movie added successfully');
      }
      setIsAddModalOpen(false);
      setEditingMovie(null);
      fetchMovies();
    } catch (error) {
      toast.error(editingMovie ? 'Failed to update movie' : 'Failed to add movie');
    }
  };

  const filteredMovies = movies.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Movie Management</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary px-4 py-2 rounded-lg flex items-center hover:bg-red-700 transition"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Movie
          </button>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <MovieList
            movies={filteredMovies}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {isAddModalOpen && (
        <MovieForm
          movie={editingMovie}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingMovie(null);
          }}
        />
      )}
    </div>
  );
}