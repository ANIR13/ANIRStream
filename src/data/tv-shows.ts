interface TVShow {
  id: number;
  title: string;
  image: string;
}

export const tvDramas: TVShow[] = [
  {
    id: 101,
    title: "Crown of Thorns",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80"
  },
  {
    id: 102,
    title: "Medical Lines",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80"
  },
  // ... more drama shows
];

export const tvComedies: TVShow[] = [
  {
    id: 201,
    title: "Office Hours",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
  },
  {
    id: 202,
    title: "Family Ties",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80"
  },
  // ... more comedy shows
];

export const tvDocumentaries: TVShow[] = [
  {
    id: 301,
    title: "Wild Earth",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&q=80"
  },
  {
    id: 302,
    title: "Deep Ocean",
    image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80"
  },
  // ... more documentaries
];