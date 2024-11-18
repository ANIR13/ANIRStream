interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
  backdrop?: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  cast: string[];
}

export const trendingNow: Movie[] = [
  {
    id: 1,
    title: "The Last Kingdom",
    description: "As Alfred the Great defends his kingdom from Norse invaders, Uhtred -- born a Saxon but raised by Vikings -- seeks to claim his ancestral birthright.",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80",
    year: 2022,
    rating: 8.9,
    duration: "2h 15m",
    genres: ["Action", "Drama", "History"],
    cast: ["Alexander Dreymon", "Emily Cox", "David Dawson"]
  },
  {
    id: 2,
    title: "Eternal Shadows",
    description: "In a world where darkness reigns eternal, one group of heroes must find the light within.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80",
    year: 2023,
    rating: 8.5,
    duration: "2h 30m",
    genres: ["Fantasy", "Adventure"],
    cast: ["Emma Stone", "Tom Hardy", "Michael B. Jordan"]
  }
];

export const popular: Movie[] = [
  {
    id: 3,
    title: "City Lights",
    description: "A modern tale of love and ambition in the bright lights of the big city.",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80",
    year: 2023,
    rating: 9.1,
    duration: "1h 55m",
    genres: ["Romance", "Drama"],
    cast: ["Ryan Gosling", "Emma Watson", "Idris Elba"]
  },
  {
    id: 4,
    title: "Ocean's Mystery",
    description: "Deep beneath the waves, an ancient secret awaits discovery.",
    image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80",
    year: 2023,
    rating: 8.7,
    duration: "2h 10m",
    genres: ["Mystery", "Adventure"],
    cast: ["Morgan Freeman", "Scarlett Johansson", "Chris Hemsworth"]
  }
];

export const newReleases: Movie[] = [
  {
    id: 5,
    title: "Desert Storm",
    description: "A thrilling journey through the heart of the Sahara.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80",
    year: 2024,
    rating: 8.8,
    duration: "2h 20m",
    genres: ["Action", "Adventure"],
    cast: ["Tom Hardy", "Charlize Theron", "Idris Elba"]
  },
  {
    id: 6,
    title: "Mountain Peak",
    description: "The ultimate test of human endurance against nature's mighty peaks.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    year: 2024,
    rating: 8.6,
    duration: "2h 5m",
    genres: ["Adventure", "Drama"],
    cast: ["Jake Gyllenhaal", "Keira Knightley", "Michael Fassbender"]
  }
];

export const actionMovies: Movie[] = [
  {
    id: 7,
    title: "Urban Warriors",
    description: "In a dystopian future, street fighters become the last line of defense.",
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80",
    year: 2023,
    rating: 8.4,
    duration: "2h 25m",
    genres: ["Action", "Sci-Fi"],
    cast: ["Chris Evans", "Michelle Rodriguez", "Jason Statham"]
  }
];

export const comedyMovies: Movie[] = [
  {
    id: 8,
    title: "Office Party",
    description: "When the boss is away, the office will play.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    year: 2023,
    rating: 7.9,
    duration: "1h 45m",
    genres: ["Comedy"],
    cast: ["Seth Rogen", "Jennifer Aniston", "Kevin Hart"]
  }
];

export const dramaMovies: Movie[] = [
  {
    id: 9,
    title: "Silent Echo",
    description: "A powerful story of love, loss, and redemption.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
    year: 2023,
    rating: 9.2,
    duration: "2h 35m",
    genres: ["Drama"],
    cast: ["Cate Blanchett", "Joaquin Phoenix", "Meryl Streep"]
  }
];

export const myList: Movie[] = [
  {
    id: 10,
    title: "Cosmic Journey",
    description: "An interstellar adventure beyond the known universe.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80",
    year: 2023,
    rating: 8.8,
    duration: "2h 40m",
    genres: ["Sci-Fi", "Adventure"],
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
  }
];

export function findMovieById(id: number): Movie | undefined {
  const allMovies = [...trendingNow, ...popular, ...newReleases, ...actionMovies, ...comedyMovies, ...dramaMovies, ...myList];
  return allMovies.find(movie => movie.id === id);
}

export function findMovieByTitle(searchTerm: string): Movie[] {
  const allMovies = [...trendingNow, ...popular, ...newReleases, ...actionMovies, ...comedyMovies, ...dramaMovies, ...myList];
  return allMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()))
  );
}