import React from 'react';
import { Bookmark, ShoppingBag, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showSearchBar: boolean;
  onToggleSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenWishlist,
  cartCount,
  wishlistCount,
  onNavigate,
  searchQuery,
  onSearchChange,
  showSearchBar,
  onToggleSearch
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E2D8]">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); onNavigate('hero'); }}
          className="font-serif-display text-2xl font-bold tracking-tight text-[#1C1917] hover:text-[#8C2D19] transition-colors whitespace-nowrap shrink-0"
        >
          Folio & Quill
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-medium text-[#57534E]">
          <button 
            onClick={() => onNavigate('catalog')}
            className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Catalog
          </button>
          <button 
            onClick={() => onNavigate('staff-picks')}
            className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Staff Picks
          </button>
          <button 
            onClick={() => onNavigate('bindery')}
            className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Bindery & Editions
          </button>
          <button 
            onClick={() => onNavigate('events')}
            className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Literary Salons
          </button>
          <button 
            onClick={() => onNavigate('reading-room')}
            className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Reading Room
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onToggleSearch}
            className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm transition-colors"
            title="Search catalog"
            aria-label="Search catalog"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm transition-colors"
            title="View reading list"
            aria-label="View reading list"
          >
            <Bookmark className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-mono font-bold bg-[#8C2D19] text-white rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Bag Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 py-2 px-3.5 text-xs font-medium text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-sm transition-colors shadow-sm whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums font-semibold px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Search Drawer / Bar */}
      {showSearchBar && (
        <div className="border-t border-[#E7E2D8] bg-[#F7F4EE] px-4 py-3 animate-fadeIn">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#78716C]" />
            <input
              type="text"
              placeholder="Search by book title, author, translator, topic, or ISBN..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none font-reading"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-[#78716C] hover:text-[#1C1917] px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
