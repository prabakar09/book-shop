import React, { useState } from 'react';
import { CartItem } from '../types';
import { BookCover } from './BookCover';
import { X, Trash2, ArrowRight, Gift, Sparkles, Check, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onToggleGiftWrap: (id: string) => void;
  onProceedToCheckout: (discountAmount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onToggleGiftWrap,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  const rawSubtotal = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    const giftCost = item.giftWrap ? 4.50 * item.quantity : 0;
    return acc + itemTotal + giftCost;
  }, 0);

  const FREE_SHIPPING_THRESHOLD = 50.00;
  const progressToFreeShipping = Math.min(100, (rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'FIRSTCHAPTER') {
      const discount = rawSubtotal * 0.15;
      setPromoDiscount(discount);
      setAppliedPromo('FIRSTCHAPTER (15% Off)');
      setPromoError(null);
    } else if (code === 'BOOKLOVER') {
      const discount = Math.min(rawSubtotal, 10.00);
      setPromoDiscount(discount);
      setAppliedPromo('BOOKLOVER ($10.00 Off)');
      setPromoError(null);
    } else {
      setPromoError('Invalid code. Try FIRSTCHAPTER or BOOKLOVER');
    }
  };

  const finalSubtotal = Math.max(0, rawSubtotal - promoDiscount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#D5CDBD] text-[#1C1917]">
          {/* Header */}
          <div className="p-5 border-b border-[#E7E2D8] bg-[#F7F4EE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#8C2D19]" />
              <h2 className="font-serif-display text-lg font-semibold tracking-wide">
                Your Book Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#78716C] hover:text-[#1C1917] hover:bg-[#EBE5DA] rounded-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="px-5 py-3 bg-[#F3EFE6] border-b border-[#E7E2D8] text-xs">
            <div className="flex justify-between items-center mb-1.5 font-medium">
              <span className="text-[#57534E]">
                {remainingForFree === 0 ? (
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Qualified for Complimentary Worldwide Shipping!
                  </span>
                ) : (
                  <span>Add <strong className="text-[#1C1917] font-mono">${remainingForFree.toFixed(2)}</strong> for free shipping</span>
                )}
              </span>
              <span className="text-[#78716C] text-[10px] font-mono">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2DBD0] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#8C2D19] transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EBE6DC]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#78716C]">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] text-[#A8A29E] mb-3" />
                <p className="font-serif-display text-lg text-[#292524] mb-1">Your bag is currently empty</p>
                <p className="text-xs max-w-xs font-reading leading-relaxed">
                  Browse our catalog of clothbound editions, philosophical essays, and rare manuscripts.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Book thumbnail */}
                  <div className="w-16 h-24 flex-shrink-0 bg-[#F4EFE6] p-1 border border-[#E7E2D8] shadow-sm flex items-center justify-center">
                    <BookCover book={item.book} size="sm" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif-display text-sm font-semibold text-[#1C1917] leading-snug line-clamp-1">
                          {item.book.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#A8A29E] hover:text-[#8C2D19] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#78716C]">by {item.book.author}</p>
                      <p className="text-[11px] text-[#8C2D19] font-medium mt-0.5">{item.formatName}</p>
                    </div>

                    {/* Gift wrap checkbox */}
                    <label className="flex items-center gap-1.5 text-[11px] text-[#57534E] cursor-pointer mt-1">
                      <input 
                        type="checkbox" 
                        checked={item.giftWrap} 
                        onChange={() => onToggleGiftWrap(item.id)}
                        className="rounded border-[#D5CDBD] text-[#8C2D19] focus:ring-[#8C2D19]"
                      />
                      <Gift className="w-3 h-3 text-[#A07E4A]" />
                      <span>Kraft wrap & wax seal (+$4.50)</span>
                    </label>

                    {/* Quantity stepper & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0EBE1]">
                      <div className="flex items-center border border-[#D5CDBD] bg-white rounded-sm text-xs">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#57534E] hover:text-[#1C1917]"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-mono font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#57534E] hover:text-[#1C1917]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-[#1C1917] tabular-nums">
                        ${((item.price + (item.giftWrap ? 4.50 : 0)) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E7E2D8] bg-[#F7F4EE] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g. FIRSTCHAPTER)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 py-1.5 px-3 text-xs bg-white border border-[#D5CDBD] rounded-sm focus:outline-none focus:border-[#8C2D19] uppercase font-mono"
                />
                <button
                  type="submit"
                  className="py-1.5 px-3 text-xs font-medium bg-[#E7E0D3] hover:bg-[#DDD5C5] text-[#1C1917] rounded-sm transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 border border-emerald-200 rounded-sm">
                  <span>Applied: {appliedPromo}</span>
                  <span className="font-mono font-semibold">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              {promoError && (
                <div className="text-[11px] text-red-700 bg-red-50 px-2.5 py-1 border border-red-200 rounded-sm">
                  {promoError}
                </div>
              )}

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs text-[#57534E] pt-2 border-t border-[#E7E2D8]">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal</span>
                  <span className="font-mono text-[#1C1917] tabular-nums">${rawSubtotal.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Promotional Discount</span>
                    <span className="font-mono tabular-nums">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-[#1C1917]">
                    {remainingForFree === 0 ? 'Complimentary ($0.00)' : '$4.95 standard'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1C1917] pt-2 border-t border-[#E7E2D8]">
                  <span className="font-serif-display text-base">Estimated Total</span>
                  <span className="font-mono text-base tabular-nums font-bold">
                    ${(finalSubtotal + (remainingForFree === 0 ? 0 : 4.95)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => onProceedToCheckout(promoDiscount, appliedPromo || '')}
                className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#2C2724] transition-colors rounded-sm shadow-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Dispatch & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#78716C] font-reading">
                Archival parcel wrapping · Monogrammed dispatch note included
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
