import { useState, useMemo, useEffect } from 'react';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';

import heroImage from '/assets/hero-restaurant.jpg';
import { API_BASE_URL } from '@/config';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);           // All food items
  const [searchResults, setSearchResults] = useState([]); // Semantic results
  const [loading, setLoading] = useState(true);

  // Load entire menu on first load
  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/food/all`);
        const data = await res.json();
        if (data.success) setItems(data.items);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/food/search?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        if (data.success) {
          setSearchResults(data.results);
        }
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const recommendations = useMemo(() => {
    return [...items]
      .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
      .slice(0, 3);
  }, [items]);

  if (loading) {
    return <div className="text-center py-12 text-xl">Loading menu...</div>;
  }

  const displayItems = searchQuery ? searchResults : items;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Restaurant hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="relative z-10 container text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient">ByteMonk</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience culinary excellence with our signature dishes
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="container pt-12">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </section>

      {/* Recommendations */}
      {!searchQuery && (
        <section className="container pb-12 pt-6">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">Chef's Recommendations</h2>
              <p className="text-muted-foreground text-lg">Most loved by our guests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map(item => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Menu / Search Results */}
      <section className="container pt-6 pb-12">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              {searchQuery ? 'Search Results' : 'Our Menu'}
            </h2>

            {!searchQuery && <p className="text-muted-foreground text-lg">Crafted with passion, served with love</p>}
          </div>

          {displayItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.map(item => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No dishes found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
