import React, { useState } from 'react';
import { Book } from '../types';
import { X, Type, BookOpen, ShoppingBag, Check } from 'lucide-react';

interface SampleReaderModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

export const SampleReaderModal: React.FC<SampleReaderModalProps> = ({
  book,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!isOpen || !book) return null;

  const [theme, setTheme] = useState<'parchment' | 'ivory' | 'dark'>('parchment');
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<'serif' | 'reading' | 'sans'>('reading');
  const [added, setAdded] = useState(false);

  const themeStyles = {
    parchment: {
      bg: 'bg-[#F5EFE4]',
      text: 'text-[#231F1C]',
      container: 'bg-[#FAF6EF]',
      border: 'border-[#E2D8C6]',
      header: 'bg-[#EFE7D8]'
    },
    ivory: {
      bg: 'bg-[#FCFAF7]',
      text: 'text-[#1C1917]',
      container: 'bg-[#FFFFFF]',
      border: 'border-[#E7E2D8]',
      header: 'bg-[#F7F4EE]'
    },
    dark: {
      bg: 'bg-[#181716]',
      text: 'text-[#D6D3D1]',
      container: 'bg-[#22201E]',
      border: 'border-[#33302C]',
      header: 'bg-[#2B2825]'
    }
  }[theme];

  const handleBuy = () => {
    onAddToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Container */}
      <div className={`relative w-full max-w-3xl rounded-sm shadow-2xl border ${themeStyles.border} ${themeStyles.container} ${themeStyles.text} flex flex-col max-h-[92vh] overflow-hidden`}>
        {/* Top Control Bar */}
        <div className={`flex items-center justify-between px-6 py-3.5 border-b ${themeStyles.border} ${themeStyles.header}`}>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8C2D19]" />
            <span className="text-xs font-serif-display font-medium tracking-wide">
              Sample Reading · {book.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme switcher */}
            <div className="flex items-center p-0.5 rounded border border-[#D5CDBD]/50 bg-black/5 gap-1">
              <button
                onClick={() => setTheme('parchment')}
                title="Parchment Theme"
                className={`w-5 h-5 rounded-full bg-[#F5EFE4] border ${theme === 'parchment' ? 'border-[#8C2D19] ring-1 ring-[#8C2D19]' : 'border-stone-400'}`}
              />
              <button
                onClick={() => setTheme('ivory')}
                title="Ivory Paper Theme"
                className={`w-5 h-5 rounded-full bg-[#FFFFFF] border ${theme === 'ivory' ? 'border-[#8C2D19] ring-1 ring-[#8C2D19]' : 'border-stone-400'}`}
              />
              <button
                onClick={() => setTheme('dark')}
                title="Night Ink Theme"
                className={`w-5 h-5 rounded-full bg-[#181716] border ${theme === 'dark' ? 'border-[#C5A880] ring-1 ring-[#C5A880]' : 'border-stone-600'}`}
              />
            </div>

            {/* Font Size controls */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="px-2 py-0.5 border border-[#D5CDBD]/40 rounded hover:bg-black/5"
                title="Smaller text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="px-2 py-0.5 border border-[#D5CDBD]/40 rounded hover:bg-black/5 font-semibold"
                title="Larger text"
              >
                A+
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 hover:bg-black/10 rounded transition-colors"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Book Excerpt Text Body */}
        <div className={`overflow-y-auto px-8 sm:px-16 py-10 flex-1 ${themeStyles.bg}`}>
          <div className="max-w-xl mx-auto space-y-8">
            {/* Title Page Header */}
            <div className="text-center pb-8 border-b border-black/10">
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2 font-mono">
                {book.author}
              </p>
              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="text-xs italic opacity-75 font-reading">
                  {book.subtitle}
                </p>
              )}
              <div className="w-12 h-[1px] bg-black/20 mx-auto mt-4" />
            </div>

            {/* Chapter Header */}
            <div className="text-center pt-2 pb-4">
              <h2 className="font-serif-display text-lg sm:text-xl italic font-medium">
                {book.excerpt.chapterTitle}
              </h2>
            </div>

            {/* Excerpt Paragraphs */}
            <div 
              className="space-y-6 leading-relaxed font-reading"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
            >
              {book.excerpt.paragraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 ? "first-letter:text-4xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:leading-none" : ""}>
                  {para}
                </p>
              ))}
            </div>

            {/* Excerpt End Colophon */}
            <div className="pt-10 text-center border-t border-black/10">
              <p className="text-xs italic opacity-70 mb-4 font-reading">
                End of preview excerpt. Discover the remaining {book.pages} pages in the full clothbound edition.
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleBuy}
                  className="py-2.5 px-5 text-xs font-medium uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#2F2B28] transition-colors rounded-sm shadow flex items-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order Book (${book.price.toFixed(2)})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="py-2.5 px-4 text-xs font-medium text-[#57534E] hover:text-[#1C1917] transition-colors"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
