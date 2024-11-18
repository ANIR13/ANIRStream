import React from 'react';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';
import { trendingNow, popular, newReleases } from '../data/movies';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="mt-4">
        <ContentRow title="Trending Now" items={trendingNow} />
        <ContentRow title="Popular on StreamPlus" items={popular} />
        <ContentRow title="New Releases" items={newReleases} />
      </div>
    </div>
  );
}