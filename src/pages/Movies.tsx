import React from 'react';
import ContentRow from '../components/ContentRow';
import { actionMovies, comedyMovies, dramaMovies } from '../data/movies';

export default function Movies() {
  return (
    <div className="pt-20 px-4">
      <h1 className="text-4xl font-bold mb-8 px-8">Movies</h1>
      <ContentRow title="Action & Adventure" items={actionMovies} />
      <ContentRow title="Comedy" items={comedyMovies} />
      <ContentRow title="Drama" items={dramaMovies} />
    </div>
  );
}