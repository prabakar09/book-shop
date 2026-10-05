import React from 'react';
import { Book } from '../types';
import { BookCover } from './BookCover';
import { Bookmark, BookOpen, ShoppingBag, Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onQuickAdd: (book: Book, e: React.MouseEvent) => void;
  onLookInside: (book: Book, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (book: Book, e: React.MouseEvent) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelect,
  onQuickAdd,
  onLookInside,
  isWishlisted,
  onToggleWishlist
}) => {
  return (
    <article 
      onClick={() => onSelect(book)}
      className="group relative flex flex-col bg-[#FDFCFB] border border-[#E7E2D8] hover:border-[#D0C6B5] transition-all duration-300 rounded-sm cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(28,25,23,0.08)]"
    >
      {/* Top Cover Display Area on neutral background */}
      <div className="relative p-6 pb-4 bg-[#F7F4EE] flex items-center justify-center overflow-hidden border-b border-[#EBE6DC]">
        {/* Wishlist button */}
        <button
          onClick={(e) => onToggleWishlist(book, e)}
          aria-label={isWishlisted ? "Remove from Reading List" : "Save to Reading List"}
          className={`absolute top-3 right-3 z-30 p-2 rounded-full transition-colors ${
            isWishlisted 
              ? 'text-[#8C2D19] bg-[#F3EDE2] hover:bg-[#EBE2D4]' 
              : 'text-[#78716C] hover:text-[#1C1917] bg-white/80 hover:bg-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Tactile Book Cover */}
        <div className="w-48 sm:w-52 transition-transform duration-300 group-hover:scale-[1.02]">
          <BookCover book={book} size="md" />
        </div>

        {/* Hover Quick Action Layer */}
        <div className="absolute inset-x-4 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            onClick={(e) => onLookInside(book, e)}
            className="flex-1 py-2 px-3 text-xs font-medium text-[#1C1917] bg-white/95 backdrop-blur-sm border border-[#D5CDBD] hover:bg-white transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#57534E]" />
            <span>Look Inside</span>
          </button>
          
          <button
            onClick={(e) => onQuickAdd(book, e)}
            className="py-2 px-3.5 text-xs font-medium text-white bg-[#1C1917] hover:bg-[#2C2724] transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
            title="Add Clothbound Edition to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Clean unboxed metadata (Zero-Pill rule) */}
          <div className="flex items-center gap-1.5 text-xs text-[#78716C] mb-1.5 font-medium tracking-wide">
            <span className="uppercase text-[11px] tracking-wider text-[#8C2D19]">{book.genre}</span>
            <span aria-hidden="true">·</span>
            <span>{book.pages} pp.</span>
            {book.isCollectorEdition && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#A07E4A]">Collector's</span>
              </>
            )}
          </div>

          <h3 className="font-serif-display text-lg font-semibold text-[#1C1917] leading-snug line-clamp-1 group-hover:text-[#8C2D19] transition-colors">
            {book.title}
          </h3>

          <p className="text-xs text-[#57534E] mt-0.5 font-medium tracking-wide">
            by {book.author}
          </p>

          <p className="mt-2 text-xs text-[#78716C] line-clamp-2 leading-relaxed font-reading">
            {book.synopsis}
          </p>
        </div>

        {/* Staff note if applicable */}
        {book.staffRecommendation && (
          <div className="pt-2 border-t border-[#F0EBE1] text-[11px] italic text-[#635E59] font-reading">
            "{book.staffRecommendation.quote}"
          </div>
        )}

        {/* Price & Rating Row */}
        <div className="pt-2.5 border-t border-[#F0EBE1] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-[#78716C]">from</span>
            <span className="text-base font-semibold text-[#1C1917] tabular-nums font-mono">
              ${book.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#78716C]">
            <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
            <span className="font-medium text-[#1C1917] tabular-nums">{book.rating.toFixed(1)}</span>
            <span className="text-[11px]">({book.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
