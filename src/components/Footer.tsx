import React, { useState } from 'react';
import { Mail, Check, Feather } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#181615] text-[#D6D3D1] border-t border-[#2C2926] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#2C2926]">
          {/* Brand & Colophon */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif-display text-2xl font-bold tracking-tight text-[#FAF8F5] block">
              Folio & Quill
            </span>
            <p className="font-reading text-xs text-[#A8A29E] leading-relaxed max-w-sm">
              Independent booksellers, antiquarian binders, and keepers of quiet spaces in Bloomsbury since 1888. 
              Makers of clothbound editions for readers of patience and inquiry.
            </p>
            <div className="text-[11px] text-[#78716C] font-mono">
              48 Great Russell Street, London WC1B 3DG
            </div>
          </div>

          {/* Catalog Navigation */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-mono uppercase tracking-widest text-[#FAF8F5] text-[11px] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Literary Fiction
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Essays & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Natural History
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Art & Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Rare & Antiquarian
                </button>
              </li>
            </ul>
          </div>

          {/* Bookshop Spaces */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-mono uppercase tracking-widest text-[#FAF8F5] text-[11px] font-semibold">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li>
                <button onClick={() => onNavigate('reading-room')} className="hover:text-white transition-colors">
                  Reading Rooms & Desks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                  Candlelit Salons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bindery')} className="hover:text-white transition-colors">
                  The London Bindery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('staff-picks')} className="hover:text-white transition-colors">
                  Curator Recommends
                </button>
              </li>
            </ul>
          </div>

          {/* Literary Gazette Subscription */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono uppercase tracking-widest text-[#FAF8F5] text-[11px] font-semibold">
              The Folio Gazette
            </h4>
            <p className="font-reading text-xs text-[#A8A29E] leading-relaxed">
              A monthly dispatch on neglected books, typography history, and upcoming salon announcements. No promotional clamor.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#24211E] border border-[#3D3833] rounded-sm text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>You are inscribed in our dispatch register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="your.email@library.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-2 text-xs bg-[#24211E] border border-[#3D3833] text-white rounded-sm focus:outline-none focus:border-[#C5A880] placeholder:text-[#666]"
                />
                <button
                  type="submit"
                  className="py-2 px-3 text-xs uppercase tracking-wider font-semibold text-[#181615] bg-[#C5A880] hover:bg-[#D4B996] rounded-sm transition-colors whitespace-nowrap"
                >
                  Inscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716C]">
          <p>© 1888–2026 Folio & Quill Booksellers Ltd. All editions typeset with care.</p>
          <div className="flex items-center gap-4">
            <span>Smyth-sewn bindings</span>
            <span>·</span>
            <span>Carbon-neutral dispatch</span>
            <span>·</span>
            <span>Bloomsbury, London</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
