import React from 'react';
import { Book } from '../types';
import { BookCover } from './BookCover';
import { X, Bookmark, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Book[];
  onRemoveFromWishlist: (bookId: string) => void;
  onAddToCart: (book: Book) => void;
  onViewBook: (book: Book) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onViewBook
}) => {
  if (!isOpen) return null;

  const totalValue = wishlist.reduce((acc, b) => acc + b.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#D5CDBD] text-[#1C1917]">
          {/* Header */}
          <div className="p-5 border-b border-[#E7E2D8] bg-[#F7F4EE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#8C2D19] fill-current" />
              <h2 className="font-serif-display text-lg font-semibold tracking-wide">
                Reading List & Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#78716C] hover:text-[#1C1917] hover:bg-[#EBE5DA] rounded-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EBE6DC]">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#78716C]">
                <Bookmark className="w-12 h-12 stroke-[1.2] text-[#A8A29E] mb-3" />
                <p className="font-serif-display text-lg text-[#292524] mb-1">Your reading list is empty</p>
                <p className="text-xs max-w-xs font-reading leading-relaxed">
                  Click the ribbon bookmark on any book cover to save volumes to your personal library ledger.
                </p>
              </div>
            ) : (
              wishlist.map((book) => (
                <div key={book.id} className="py-4 flex gap-4">
                  <div 
                    onClick={() => { onViewBook(book); onClose(); }}
                    className="w-16 h-24 flex-shrink-0 bg-[#F4EFE6] p-1 border border-[#E7E2D8] shadow-sm flex items-center justify-center cursor-pointer hover:opacity-90"
                  >
                    <BookCover book={book} size="sm" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 
                          onClick={() => { onViewBook(book); onClose(); }}
                          className="font-serif-display text-sm font-semibold text-[#1C1917] leading-snug line-clamp-1 hover:text-[#8C2D19] cursor-pointer"
                        >
                          {book.title}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(book.id)}
                          className="text-[#A8A29E] hover:text-[#8C2D19] transition-colors p-1"
                          title="Remove from list"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#78716C]">by {book.author}</p>
                      <p className="text-[11px] text-[#8C2D19] font-medium mt-0.5">{book.genre}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0EBE1]">
                      <span className="text-xs font-mono font-bold text-[#1C1917] tabular-nums">
                        ${book.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => onAddToCart(book)}
                        className="py-1 px-3 text-xs font-medium text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-sm flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-[#E7E2D8] bg-[#F7F4EE] space-y-3">
              <div className="flex justify-between text-xs text-[#57534E]">
                <span>Total Reading List Valuation</span>
                <span className="font-mono font-bold text-[#1C1917] tabular-nums">${totalValue.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  wishlist.forEach((b) => onAddToCart(b));
                  onClose();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#2C2724] transition-colors rounded-sm shadow-sm flex items-center justify-center gap-2"
              >
                <span>Add All {wishlist.length} Volumes to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
