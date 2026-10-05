import React from 'react';
import { Book } from '../types';
import { BookCover } from './BookCover';
import { ArrowDown, BookOpen, ShoppingBag, Sparkles, Feather } from 'lucide-react';

interface HeroSectionProps {
  featuredBook: Book;
  onSelectBook: (book: Book) => void;
  onLookInside: (book: Book) => void;
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredBook,
  onSelectBook,
  onLookInside,
  onExploreCatalog
}) => {
  return (
    <section id="hero" className="relative border-b border-[#E7E2D8] bg-[#F7F4EE] overflow-hidden">
      {/* Background subtle architectural grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1C1917 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C2D19] font-medium">
              <Feather className="w-3.5 h-3.5" />
              <span>Independent Bookseller & Fine Bindery · Est. 1888</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1C1917] leading-[1.08] text-balance">
              Quiet Stories for Restless Inquiries.
            </h1>

            <p className="font-reading text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl">
              We curate independent literature, clothbound philosophical treatises, 
              and forgotten maritime maps. Hand-inspected in our Bloomsbury bindery 
              and dispatched in wax-sealed archival parcel wrapping worldwide.
            </p>

            {/* Featured Book of the Month Callout */}
            <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-sm border border-[#E2DBD0] rounded-sm max-w-xl">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C2D19] font-semibold block mb-1">
                Book of the Month · Clothbound First Edition
              </span>
              <h2 className="font-serif-display text-lg font-semibold text-[#1C1917]">
                {featuredBook.title}
              </h2>
              <p className="text-xs text-[#78716C] mt-0.5">
                by {featuredBook.author} · {featuredBook.genre}
              </p>
              <p className="text-xs italic text-[#57534E] mt-2 font-reading">
                "{featuredBook.staffRecommendation?.quote || featuredBook.synopsis}"
              </p>

              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#F0EBE1]">
                <button
                  onClick={() => onSelectBook(featuredBook)}
                  className="py-2 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#2C2724] transition-colors rounded-sm flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Acquire Edition (${featuredBook.price.toFixed(2)})</span>
                </button>

                <button
                  onClick={() => onLookInside(featuredBook)}
                  className="py-2 px-3 text-xs font-medium text-[#1C1917] hover:bg-[#F3EFE7] border border-[#D5CDBD] transition-colors rounded-sm flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8C2D19]" />
                  <span>Read Chapter One</span>
                </button>
              </div>
            </div>

            {/* Trust and dispatch highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#78716C]">
              <span>Complimentary tracked parcel over $50</span>
              <span aria-hidden="true">·</span>
              <span>100% Acid-free Munken paper</span>
              <span aria-hidden="true">·</span>
              <span>Bloomsbury Reading Rooms Open Daily</span>
            </div>
          </div>

          {/* Right Column: Hero Tactile Book Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group cursor-pointer" onClick={() => onSelectBook(featuredBook)}>
              {/* Background architectural aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D5CDBD]/30 to-[#EBE4D5]/40 rounded-sm -rotate-2 transform group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
              
              {/* Large tactile book cover */}
              <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                <BookCover book={featuredBook} size="hero" />
              </div>

              {/* Curator annotation card floating below */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-3.5 border border-[#E2DBD0] shadow-lg rounded-sm max-w-[220px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#8C2D19]" />
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#78716C]">Curator Note</span>
                </div>
                <p className="text-[11px] font-reading italic text-[#44403C] leading-snug">
                  "Only 7 hand-numbered first impressions remain in our London cellar."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
