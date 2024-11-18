import React, { useState, useEffect } from 'react';
import { Search, Bell, User, List, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-primary text-2xl font-bold">ANIRSTREAM</Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/" 
                    className={`px-3 py-2 ${location.pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/tv-shows" 
                    className={`px-3 py-2 ${location.pathname === '/tv-shows' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    TV Shows
                  </Link>
                  <Link 
                    to="/movies" 
                    className={`px-3 py-2 ${location.pathname === '/movies' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    Movies
                  </Link>
                  <Link 
                    to="/my-list" 
                    className={`px-3 py-2 ${location.pathname === '/my-list' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    My List
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="text-gray-300 hover:text-white"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-6 h-6" />
              </button>
              <button className="text-gray-300 hover:text-white">
                <Bell className="w-6 h-6" />
              </button>
              <Link to="/my-list" className="text-gray-300 hover:text-white">
                <List className="w-6 h-6" />
              </Link>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white">
                  <User className="w-6 h-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-black/90 rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">
                    Login
                  </Link>
                  <Link to="/register" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}