/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BOOKS } from './data/books';
import { Book, BookFormat, CartItem, Order } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StaffPicksSection } from './components/StaffPicksSection';
import { CatalogSection } from './components/CatalogSection';
import { BinderySection } from './components/BinderySection';
import { EventsAndReadingRoom } from './components/EventsAndReadingRoom';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { SampleReaderModal } from './components/SampleReaderModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Check, Bookmark, ShoppingBag, X } from 'lucide-react';

export default function App() {
  // State for persistent cart & wishlist
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('folio_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Default initial book in cart for instant delight
    return [
      {
        id: 'init-1',
        bookId: BOOKS[0].id,
        book: BOOKS[0],
        formatId: 'clothbound',
        formatName: "Clothbound Collector's Edition",
        price: BOOKS[0].price,
        quantity: 1,
        giftWrap: false
      }
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('folio_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [BOOKS[2].id, BOOKS[4].id];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('folio_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [];
  });

  // UI state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState<string>('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('folio_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('folio_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('folio_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Wishlist items derived
  const wishlistBooks = BOOKS.filter((b) => wishlistIds.includes(b.id));

  // Cart actions
  const handleAddToCart = (book: Book, format?: BookFormat, quantity: number = 1) => {
    const chosenFormat = format || book.formats[0];
    const itemId = `${book.id}-${chosenFormat.id}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.bookId === book.id && item.formatId === chosenFormat.id);
      if (existing) {
        return prev.map((item) =>
          item.bookId === book.id && item.formatId === chosenFormat.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          bookId: book.id,
          book,
          formatId: chosenFormat.id,
          formatName: chosenFormat.name,
          price: chosenFormat.price,
          quantity,
          giftWrap: false
        }
      ];
    });

    showToast(`Added "${book.title}" (${chosenFormat.name}) to your bag.`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleGiftWrap = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, giftWrap: !item.giftWrap } : item))
    );
  };

  // Wishlist actions
  const handleToggleWishlist = (book: Book, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (wishlistIds.includes(book.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== book.id));
      showToast(`Removed "${book.title}" from your reading list.`);
    } else {
      setWishlistIds((prev) => [...prev, book.id]);
      showToast(`Saved "${book.title}" to your reading list.`);
    }
  };

  const handleRemoveFromWishlist = (bookId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== bookId));
  };

  // Checkout transitions
  const handleProceedToCheckout = (discount: number, promo: string) => {
    setCheckoutDiscount(discount);
    setCheckoutPromoCode(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
  };

  // Navigation helper
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col font-sans-body">
      {/* Top Promotional Announcement Banner (Section 2C: <= 40px, non-intrusive) */}
      <div className="h-9 bg-[#1C1917] text-[#FAF8F5] text-[11px] font-mono tracking-wider flex items-center justify-center px-4 overflow-hidden border-b border-[#2C2926]">
        <div className="flex items-center gap-2 truncate">
          <span>Complimentary tracked parcel delivery on all orders over $50</span>
          <span className="opacity-40">·</span>
          <span className="text-[#C5A880]">Use code FIRSTCHAPTER for 15% off</span>
        </div>
      </div>

      {/* Primary Top Bar Contract */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearchBar={showSearchBar}
        onToggleSearch={() => setShowSearchBar(!showSearchBar)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          featuredBook={BOOKS[0]}
          onSelectBook={(book) => setSelectedBook(book)}
          onLookInside={(book) => setReadingBook(book)}
          onExploreCatalog={() => handleNavigate('catalog')}
        />

        {/* Staff Curator Picks */}
        <StaffPicksSection
          books={BOOKS}
          onSelectBook={(book) => setSelectedBook(book)}
          onLookInside={(book) => setReadingBook(book)}
          onQuickAdd={(book, e) => {
            e.stopPropagation();
            handleAddToCart(book);
          }}
        />

        {/* Complete Catalog & Category Filter */}
        <CatalogSection
          books={BOOKS}
          onSelectBook={(book) => setSelectedBook(book)}
          onQuickAdd={(book, e) => {
            e.stopPropagation();
            handleAddToCart(book);
          }}
          onLookInside={(book, e) => {
            e.stopPropagation();
            setReadingBook(book);
          }}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* London Bindery Craftsmanship & Specs */}
        <BinderySection />

        {/* Literary Salons & Bloomsbury Reading Room */}
        <EventsAndReadingRoom />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Slide-over Drawers */}
      <BookDetailModal
        book={selectedBook}
        isOpen={Boolean(selectedBook)}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
        onLookInside={(book) => {
          setSelectedBook(null);
          setReadingBook(book);
        }}
        isWishlisted={selectedBook ? wishlistIds.includes(selectedBook.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <SampleReaderModal
        book={readingBook}
        isOpen={Boolean(readingBook)}
        onClose={() => setReadingBook(null)}
        onAddToCart={(book) => handleAddToCart(book)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onToggleGiftWrap={handleToggleGiftWrap}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistBooks}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(book) => handleAddToCart(book)}
        onViewBook={(book) => setSelectedBook(book)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderComplete={handleOrderComplete}
      />

      {/* Quick feedback toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white text-xs px-4 py-3 rounded-sm shadow-xl border border-[#3A3632] flex items-center gap-3 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-reading">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#A8A29E] hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
