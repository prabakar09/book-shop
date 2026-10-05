import React from 'react';
import { Book } from '../types';
import { 
  Compass, 
  Feather, 
  Sparkles, 
  BookOpen, 
  Flame, 
  Wind, 
  Globe2, 
  TreePine,
  Layers,
  CircleDot
} from 'lucide-react';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ 
  book, 
  size = 'md',
  className = '' 
}) => {
  const { coverDesign, title, author, year } = book;

  // Icon selector based on motif
  const renderMotif = () => {
    const iconProps = {
      className: "w-6 h-6 sm:w-8 sm:h-8 opacity-80",
      style: { color: coverDesign.foilColor }
    };

    switch (coverDesign.motifIcon) {
      case 'compass': return <Compass {...iconProps} />;
      case 'arch': return <Layers {...iconProps} />;
      case 'fern': return <TreePine {...iconProps} />;
      case 'star': return <Sparkles {...iconProps} />;
      case 'feather': return <Feather {...iconProps} />;
      case 'quill': return <Wind {...iconProps} />;
      case 'book': return <BookOpen {...iconProps} />;
      default: return <CircleDot {...iconProps} />;
    }
  };

  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-24 h-36 text-[9px]',
    md: 'w-full aspect-[3/4.4] min-h-[280px]',
    lg: 'w-64 h-92 sm:w-72 sm:h-104 text-xs',
    hero: 'w-64 h-96 sm:w-80 sm:h-[440px] text-sm'
  }[size];

  return (
    <div 
      className={`relative select-none rounded-[3px] overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)] group-hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.45)] ${sizeClasses} ${className}`}
      style={{
        backgroundColor: coverDesign.bg,
        color: coverDesign.textColor,
      }}
    >
      {/* Book spine simulation with depth hinge & 3D bevel */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.12) 30%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.55) 100%)`
        }}
      />
      <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-[1px] bg-black/35 z-20" />
      <div className="absolute left-[13px] sm:left-[17px] top-0 bottom-0 w-[1px] bg-white/10 z-20" />

      {/* Book edge gilding / top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-black/40 via-amber-200/30 to-black/30 z-20" />

      {/* Tactile fabric texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4px 4px'
        }}
      />

      {/* Foil Ornamental Border Frame */}
      <div className="absolute inset-3 sm:inset-4 border z-10 pointer-events-none rounded-[1px] flex flex-col justify-between"
        style={{ borderColor: `${coverDesign.foilColor}35` }}
      >
        <div className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t-2 border-l-2" style={{ borderColor: coverDesign.foilColor }} />
        <div className="absolute -top-[3px] -right-[3px] w-2 h-2 border-t-2 border-r-2" style={{ borderColor: coverDesign.foilColor }} />
        <div className="absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b-2 border-l-2" style={{ borderColor: coverDesign.foilColor }} />
        <div className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b-2 border-r-2" style={{ borderColor: coverDesign.foilColor }} />
      </div>

      {/* Inner Decorative Content Layout */}
      <div className="relative h-full flex flex-col justify-between p-5 sm:p-6 pl-7 sm:pl-8 z-10">
        {/* Top Header Stamp */}
        <div className="text-center pt-2">
          <p 
            className="tracking-[0.25em] uppercase font-medium text-[9px] sm:text-[10px] opacity-80"
            style={{ color: coverDesign.accentColor }}
          >
            Folio & Quill
          </p>
          <div className="w-8 h-[1px] mx-auto mt-1.5 opacity-40" style={{ backgroundColor: coverDesign.foilColor }} />
        </div>

        {/* Center Title & Motif Lockup */}
        <div className="text-center my-auto py-2">
          <div className="flex justify-center mb-3">
            {renderMotif()}
          </div>
          
          <h3 
            className="font-serif-display font-semibold tracking-wide leading-tight px-1 text-center"
            style={{ 
              fontSize: size === 'sm' ? '12px' : size === 'md' ? '18px' : '22px',
              textShadow: '0 1px 2px rgba(0,0,0,0.4)'
            }}
          >
            {title}
          </h3>

          {book.subtitle && size !== 'sm' && (
            <p className="mt-2 text-[10px] sm:text-[11px] font-reading italic opacity-75 max-w-[85%] mx-auto leading-tight line-clamp-2">
              {book.subtitle}
            </p>
          )}

          <div className="w-12 h-[1px] mx-auto my-3 opacity-50" style={{ backgroundColor: coverDesign.foilColor }} />

          <p 
            className="tracking-[0.15em] uppercase font-medium text-[10px] sm:text-[11px]"
            style={{ color: coverDesign.accentColor }}
          >
            {author}
          </p>
        </div>

        {/* Bottom Colophon / Year Stamp */}
        <div className="text-center pb-1">
          <div className="flex items-center justify-center gap-2 text-[9px] sm:text-[10px] opacity-70 font-mono tracking-widest">
            <span>EST. 1888</span>
            <span>·</span>
            <span>{year}</span>
          </div>
        </div>
      </div>

      {/* Staff Pick Ribbon Marker dangling */}
      {book.isStaffPick && (
        <div 
          className="absolute -top-1 right-5 w-4 h-9 shadow-md z-30 pointer-events-none"
          style={{
            backgroundColor: '#8C2D19',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)'
          }}
          title="Staff Recommendation"
        />
      )}
    </div>
  );
};
