import React, { useState } from 'react';
import { Book, BookFormat } from '../types';
import { BookCover } from './BookCover';
import { 
  X, 
  Star, 
  ShoppingBag, 
  BookOpen, 
  Bookmark, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book, format: BookFormat, quantity: number) => void;
  onLookInside: (book: Book) => void;
  isWishlisted: boolean;
  onToggleWishlist: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
  onLookInside,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!isOpen || !book) return null;

  const [selectedFormat, setSelectedFormat] = useState<BookFormat>(book.formats[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'synopsis' | 'specs' | 'reviews'>('synopsis');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(book, selectedFormat, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#FBF9F5] text-[#1C1917] rounded-sm shadow-2xl border border-[#D5CDBD] z-10 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E2D8] bg-[#F7F4EE]">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <span className="uppercase tracking-widest text-[#8C2D19] font-medium">{book.genre}</span>
            <span aria-hidden="true">/</span>
            <span>ISBN {book.isbn}</span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] transition-colors rounded-sm hover:bg-[#EBE5DA]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Tactile Book Display & Excerpt Trigger */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-56 sm:w-64 p-3 bg-[#F4EFE6] rounded-sm border border-[#E2DBD0] shadow-inner flex items-center justify-center">
                <BookCover book={book} size="lg" />
              </div>

              <div className="mt-5 w-full space-y-2.5">
                <button
                  onClick={() => onLookInside(book)}
                  className="w-full py-2.5 px-4 text-xs font-medium text-[#1C1917] bg-white border border-[#D5CDBD] hover:bg-[#F3EFE7] transition-colors shadow-sm flex items-center justify-center gap-2 rounded-sm"
                >
                  <BookOpen className="w-4 h-4 text-[#8C2D19]" />
                  <span>Look Inside: Read First Chapter</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(book)}
                  className={`w-full py-2.5 px-4 text-xs font-medium transition-colors border rounded-sm flex items-center justify-center gap-2 ${
                    isWishlisted 
                      ? 'bg-[#F2ECE1] border-[#C5A880] text-[#8C2D19]' 
                      : 'bg-transparent border-[#D5CDBD] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Reading List' : 'Save to Reading List'}</span>
                </button>
              </div>

              {/* Physical details bullet points */}
              <div className="mt-6 w-full pt-4 border-t border-[#E7E2D8] text-[11px] text-[#78716C] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#57534E]" />
                  <span>Bespoke archival parcel dispatch worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#57534E]" />
                  <span>100% Acid-free sustainably milled paper</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                  {book.title}
                </h2>
                
                {book.subtitle && (
                  <p className="mt-1 text-sm font-reading italic text-[#66605A]">
                    {book.subtitle}
                  </p>
                )}

                <p className="mt-2 text-sm text-[#1C1917] font-medium">
                  By <span className="underline decoration-[#C5A880] underline-offset-4">{book.author}</span>
                  {book.translator && (
                    <span className="block text-xs text-[#78716C] font-normal mt-0.5 font-reading italic">
                      {book.translator}
                    </span>
                  )}
                </p>

                {/* Rating and Reviews Count */}
                <div className="flex items-center gap-3 mt-3 pb-4 border-b border-[#E7E2D8]">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'fill-[#C5A880] text-[#C5A880]' : 'text-[#D5CDBD]'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#1C1917]">{book.rating.toFixed(1)}</span>
                  <span className="text-xs text-[#78716C]">({book.reviewCount} customer reviews)</span>
                  <span className="text-xs text-[#78716C]">·</span>
                  <span className="text-xs text-emerald-800 font-medium">In stock at bindery</span>
                </div>

                {/* Format / Edition Selector */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-[#57534E] uppercase tracking-wider mb-2">
                    Select Binding / Edition
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {book.formats.map((fmt) => {
                      const isSelected = selectedFormat.id === fmt.id;
                      return (
                        <button
                          key={fmt.id}
                          onClick={() => setSelectedFormat(fmt)}
                          className={`p-3 text-left border rounded-sm transition-all flex flex-col justify-between ${
                            isSelected 
                              ? 'border-[#8C2D19] bg-[#FAF5EE] ring-1 ring-[#8C2D19]' 
                              : 'border-[#E2DBD0] bg-white hover:border-[#C5A880]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-[#1C1917] leading-tight">
                              {fmt.name}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#1C1917] tabular-nums whitespace-nowrap">
                              ${fmt.price.toFixed(2)}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#78716C] mt-1.5 leading-snug line-clamp-2">
                            {fmt.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price and Quantity Action Module */}
                <div className="mt-6 p-4 bg-[#F5F0E6] rounded-sm border border-[#E2DBD0] space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-[#78716C]">Total Price</span>
                      <div className="text-2xl font-serif-display font-bold text-[#1C1917] tabular-nums">
                        ${(selectedFormat.price * quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#D5CDBD] bg-white rounded-sm">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-sm text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE7] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-xs font-mono font-semibold text-[#1C1917] tabular-nums">
                        {quantity}
                      </span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-sm text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE7] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#2C2724] transition-colors shadow-sm flex items-center justify-center gap-2 rounded-sm"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Shopping Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Shopping Bag — ${(selectedFormat.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Informational Tabs: Synopsis / Specs / Reviews */}
              <div className="mt-6 pt-4 border-t border-[#E7E2D8]">
                <div className="flex items-center gap-6 border-b border-[#E7E2D8] pb-2 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('synopsis')}
                    className={`pb-1 transition-colors ${activeTab === 'synopsis' ? 'text-[#8C2D19] border-b-2 border-[#8C2D19] font-semibold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                  >
                    Synopsis & Author
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-1 transition-colors ${activeTab === 'specs' ? 'text-[#8C2D19] border-b-2 border-[#8C2D19] font-semibold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                  >
                    Bindery & Paper Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-1 transition-colors ${activeTab === 'reviews' ? 'text-[#8C2D19] border-b-2 border-[#8C2D19] font-semibold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                  >
                    Reader Reviews ({book.reviews.length})
                  </button>
                </div>

                <div className="pt-3 text-xs leading-relaxed text-[#57534E]">
                  {activeTab === 'synopsis' && (
                    <div className="space-y-3 font-reading">
                      <p className="text-[13px] text-[#292524]">{book.synopsis}</p>
                      <div className="pt-2 border-t border-[#F0EBE1]">
                        <span className="font-semibold font-sans-body uppercase text-[10px] tracking-wider text-[#78716C] block mb-1">
                          About the Author
                        </span>
                        <p>{book.authorBio}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 py-1 border-b border-[#F0EBE1]">
                        <span className="text-[#78716C]">Binding</span>
                        <span className="col-span-2 text-[#1C1917] font-medium">{book.specs.binding}</span>
                      </div>
                      <div className="grid grid-cols-3 py-1 border-b border-[#F0EBE1]">
                        <span className="text-[#78716C]">Paper Stock</span>
                        <span className="col-span-2 text-[#1C1917] font-medium">{book.specs.paperStock}</span>
                      </div>
                      <div className="grid grid-cols-3 py-1 border-b border-[#F0EBE1]">
                        <span className="text-[#78716C]">Dimensions</span>
                        <span className="col-span-2 text-[#1C1917] font-medium">{book.specs.dimensions}</span>
                      </div>
                      <div className="grid grid-cols-3 py-1 border-b border-[#F0EBE1]">
                        <span className="text-[#78716C]">Weight</span>
                        <span className="col-span-2 text-[#1C1917] font-medium">{book.specs.weight}</span>
                      </div>
                      <div className="grid grid-cols-3 py-1">
                        <span className="text-[#78716C]">Colophon</span>
                        <span className="col-span-2 text-[#1C1917] font-medium">{book.specs.editionInfo}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3">
                      {book.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-white border border-[#E7E2D8] rounded-sm">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < rev.rating ? 'fill-[#C5A880] text-[#C5A880]' : 'text-slate-300'}`} 
                                />
                              ))}
                              <span className="ml-1 text-[11px] font-semibold text-[#1C1917]">{rev.title}</span>
                            </div>
                            <span className="text-[10px] text-[#78716C]">{rev.date}</span>
                          </div>
                          <p className="text-[12px] font-reading text-[#44403C]">{rev.body}</p>
                          <span className="text-[10px] text-[#78716C] block mt-1">By {rev.author} · Verified Reader</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
