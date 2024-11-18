import React from 'react';
import ContentRow from '../components/ContentRow';
import { tvDramas, tvComedies, tvDocumentaries } from '../data/tv-shows';

export default function TVShows() {
  return (
    <div className="pt-20 px-4">
      <h1 className="text-4xl font-bold mb-8 px-8">TV Shows</h1>
      <ContentRow title="Popular Dramas" items={tvDramas} />
      <ContentRow title="Comedy Series" items={tvComedies} />
      <ContentRow title="Documentaries" items={tvDocumentaries} />
    </div>
  );
}