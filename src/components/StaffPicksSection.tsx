import React from 'react';
import { Book } from '../types';
import { BookCover } from './BookCover';
import { Quote, BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';

interface StaffPicksSectionProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onLookInside: (book: Book) => void;
  onQuickAdd: (book: Book, e: React.MouseEvent) => void;
}

export const StaffPicksSection: React.FC<StaffPicksSectionProps> = ({
  books,
  onSelectBook,
  onLookInside,
  onQuickAdd
}) => {
  const staffPicks = books.filter((b) => b.isStaffPick);

  return (
    <section id="staff-picks" className="py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-mono text-[#8C2D19] mb-1 font-semibold">
              From Our Booksellers' Desks
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] tracking-tight">
              Curator Recommendations
            </h2>
          </div>
          <p className="font-reading text-sm text-[#57534E] max-w-md">
            Our bibliographers read every volume before it reaches our mahogany shelves. 
            Here are four works that captivated our reading rooms this season.
          </p>
        </div>

        {/* Staff Picks Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {staffPicks.map((book) => (
            <div 
              key={book.id}
              className="bg-[#FBF9F5] border border-[#E2DBD0] rounded-sm p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6"
            >
              {/* Cover */}
              <div 
                onClick={() => onSelectBook(book)}
                className="w-36 sm:w-44 flex-shrink-0 cursor-pointer mx-auto sm:mx-0 group"
              >
                <div className="transform group-hover:scale-[1.02] transition-transform">
                  <BookCover book={book} size="md" />
                </div>
              </div>

              {/* Information & Curator Note */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#78716C] mb-1 font-medium">
                    <span className="uppercase text-[#8C2D19]">{book.genre}</span>
                    <span>·</span>
                    <span>{book.year}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectBook(book)}
                    className="font-serif-display text-xl font-bold text-[#1C1917] hover:text-[#8C2D19] cursor-pointer transition-colors leading-snug"
                  >
                    {book.title}
                  </h3>
                  
                  <p className="text-xs text-[#57534E] font-medium mt-0.5">
                    by {book.author}
                  </p>

                  {/* Curator Quote Block */}
                  {book.staffRecommendation && (
                    <div className="mt-4 p-3.5 bg-[#F6F1E7] border-l-2 border-[#8C2D19] rounded-r-sm">
                      <div className="flex items-start gap-2">
                        <Quote className="w-3.5 h-3.5 text-[#8C2D19] flex-shrink-0 mt-0.5" />
                        <p className="text-xs italic font-reading text-[#3A3632] leading-relaxed">
                          "{book.staffRecommendation.quote}"
                        </p>
                      </div>
                      <div className="mt-2 text-[10px] uppercase font-mono text-[#78716C] pl-5">
                        — {book.staffRecommendation.curator}, {book.staffRecommendation.role}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-5 pt-3 border-t border-[#EDE6DA] flex items-center justify-between">
                  <span className="text-sm font-semibold font-mono text-[#1C1917] tabular-nums">
                    ${book.price.toFixed(2)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLookInside(book)}
                      className="py-1.5 px-3 text-xs font-medium border border-[#D5CDBD] text-[#1C1917] hover:bg-[#F3EFE7] rounded-sm transition-colors flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3 text-[#8C2D19]" />
                      <span>Excerpt</span>
                    </button>
                    <button
                      onClick={(e) => onQuickAdd(book, e)}
                      className="py-1.5 px-3 text-xs font-medium text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-sm transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
