import React, { useState, useMemo } from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { GENRES } from '../data/books';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

interface CatalogSectionProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onQuickAdd: (book: Book, e: React.MouseEvent) => void;
  onLookInside: (book: Book, e: React.MouseEvent) => void;
  wishlistIds: string[];
  onToggleWishlist: (book: Book, e: React.MouseEvent) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  books,
  onSelectBook,
  onQuickAdd,
  onLookInside,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
  onClearSearch
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All Collections');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'clothbound' | 'paperback' | 'collector'>('all');
  const [sortBy, setSortBy] = useState<'curated' | 'price-asc' | 'price-desc' | 'rating' | 'pages'>('curated');

  // Filter & Sort logic
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Genre filter
      if (selectedGenre !== 'All Collections' && book.genre !== selectedGenre) {
        return false;
      }

      // Format filter
      if (selectedFormat === 'collector' && !book.isCollectorEdition) {
        return false;
      }
      if (selectedFormat === 'clothbound') {
        const hasCloth = book.formats.some((f) => f.name.toLowerCase().includes('cloth'));
        if (!hasCloth) return false;
      }
      if (selectedFormat === 'paperback') {
        const hasPaperback = book.formats.some((f) => f.name.toLowerCase().includes('paperback'));
        if (!hasPaperback) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title.toLowerCase().includes(q);
        const matchesAuthor = book.author.toLowerCase().includes(q);
        const matchesSynopsis = book.synopsis.toLowerCase().includes(q);
        const matchesGenre = book.genre.toLowerCase().includes(q);
        const matchesIsbn = book.isbn.toLowerCase().includes(q);
        return matchesTitle || matchesAuthor || matchesSynopsis || matchesGenre || matchesIsbn;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'pages') return b.pages - a.pages;
      return 0; // curated order
    });
  }, [books, selectedGenre, selectedFormat, sortBy, searchQuery]);

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#FBF9F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title & Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-[#8C2D19] font-semibold block mb-2">
            The Complete Inventory
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] tracking-tight">
            Curated Volumes & Rare Editions
          </h2>
          <p className="font-reading text-sm text-[#57534E] mt-2">
            Filter through our shelves by literary discipline, edition binding, or search for titles and authors.
          </p>
        </div>

        {/* Genre Interactive Filter Buttons (Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {GENRES.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`py-2 px-4 text-xs font-medium rounded-sm transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#1C1917] text-white shadow-sm font-semibold' 
                    : 'bg-[#F2ECE1] text-[#57534E] hover:text-[#1C1917] hover:bg-[#EAE2D4]'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Second Level Control Bar: Format & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 px-4 bg-[#F7F4EE] border border-[#E7E2D8] rounded-sm mb-8 text-xs">
          {/* Format Sub-Filters */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-[#78716C] uppercase font-mono text-[10px] tracking-wider">Format:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'All Formats' },
                { id: 'clothbound', label: 'Clothbound' },
                { id: 'paperback', label: 'Paperback' },
                { id: 'collector', label: "Collector's Firsts" }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id as any)}
                  className={`py-1 px-2.5 rounded-sm transition-colors ${
                    selectedFormat === fmt.id
                      ? 'bg-white text-[#1C1917] font-semibold shadow-xs border border-[#D5CDBD]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort & Count */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-[#78716C] font-mono">
              Showing <strong>{filteredBooks.length}</strong> {filteredBooks.length === 1 ? 'volume' : 'volumes'}
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-[#78716C]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#D5CDBD] text-[#1C1917] py-1 px-2.5 rounded-sm focus:outline-none focus:border-[#8C2D19] cursor-pointer"
              >
                <option value="curated">Curator Sequence</option>
                <option value="price-asc">Price: Modest to Rare ($ → $$$)</option>
                <option value="price-desc">Price: Rare to Modest ($$$ → $)</option>
                <option value="rating">Highest Reader Acclaim</option>
                <option value="pages">Volume Length (Page Count)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Search notification */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-[#F4EFE6] border border-[#E2DBD0] rounded-sm flex items-center justify-between text-xs">
            <span>
              Searching for: <strong className="text-[#1C1917]">"{searchQuery}"</strong>
            </span>
            <button
              onClick={onClearSearch}
              className="text-[#8C2D19] hover:underline font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Search</span>
            </button>
          </div>
        )}

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-16 text-center bg-[#F7F4EE] border border-[#E7E2D8] rounded-sm p-8 max-w-lg mx-auto">
            <Search className="w-8 h-8 text-[#A8A29E] mx-auto mb-3" />
            <h3 className="font-serif-display text-xl text-[#1C1917] font-semibold mb-1">
              No volumes found
            </h3>
            <p className="text-xs text-[#78716C] font-reading mb-4">
              We couldn't locate any manuscripts matching your selected criteria or search term.
            </p>
            <button
              onClick={() => {
                setSelectedGenre('All Collections');
                setSelectedFormat('all');
                onClearSearch();
              }}
              className="py-2 px-4 text-xs font-medium uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-sm"
            >
              Reset Filters & View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                onQuickAdd={onQuickAdd}
                onLookInside={onLookInside}
                isWishlisted={wishlistIds.includes(book.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
