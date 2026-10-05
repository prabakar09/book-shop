import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { X, CheckCircle, ShieldCheck, Truck, MapPin, CreditCard, ArrowLeft, Printer, ShoppingBag } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  promoCode: string;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  promoCode,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    giftNote: string;
    shippingMethod: 'Heritage Post (3-5 days)' | 'Express Courier (Next Day)' | 'Bloomsbury Shop Pickup';
    paymentMethod: 'card' | 'cod' | 'apple_pay';
  }>({
    name: 'Julian Sterling',
    email: 'j.sterling@london-letters.org',
    address: '44 Great Russell Street, Flat 2B',
    city: 'London',
    postalCode: 'WC1B 3DG',
    country: 'United Kingdom',
    giftNote: 'Please include the letterpress colophon card if available.',
    shippingMethod: 'Heritage Post (3-5 days)',
    paymentMethod: 'card'
  });

  const rawSubtotal = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    const giftCost = item.giftWrap ? 4.50 * item.quantity : 0;
    return acc + itemTotal + giftCost;
  }, 0);

  const shippingFee = formData.shippingMethod === 'Bloomsbury Shop Pickup' 
    ? 0 
    : formData.shippingMethod === 'Express Courier (Next Day)' 
      ? 12.00 
      : rawSubtotal >= 50.00 ? 0 : 4.95;

  const total = Math.max(0, rawSubtotal - discount + shippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `FQ-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: [...items],
      subtotal: rawSubtotal,
      shippingFee,
      discount,
      total,
      customer: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        giftNote: formData.giftNote
      },
      shippingMethod: formData.shippingMethod,
      status: 'Processing in Bindery'
    };

    setConfirmedOrder(newOrder);
    setStep('confirmation');
    onOrderComplete(newOrder);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FBF9F5] text-[#1C1917] rounded-sm shadow-2xl border border-[#D5CDBD] z-10 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E2D8] bg-[#F7F4EE]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#8C2D19]" />
            <h3 className="font-serif-display text-base font-semibold">
              {step === 'details' ? 'Archival Dispatch & Order Placement' : 'Order Receipt & Dispatch Confirmation'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#EBE5DA] rounded transition-colors">
            <X className="w-5 h-5 text-[#78716C]" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Delivery address */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-3">
                1. Recipient & Archival Delivery Address
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D5CDBD] rounded-sm focus:border-[#8C2D19] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium">Email Address (for Dispatch Tracking)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D5CDBD] rounded-sm focus:border-[#8C2D19] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#57534E] mb-1 font-medium">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D5CDBD] rounded-sm focus:border-[#8C2D19] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D5CDBD] rounded-sm focus:border-[#8C2D19] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D5CDBD] rounded-sm focus:border-[#8C2D19] focus:outline-none uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Shipping method options */}
            <div className="pt-4 border-t border-[#E7E2D8]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-3">
                2. Shipping & Handling
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {[
                  {
                    id: 'Heritage Post (3-5 days)',
                    title: 'Heritage Post',
                    subtitle: '3-5 business days',
                    fee: rawSubtotal >= 50.00 ? 'Free' : '$4.95'
                  },
                  {
                    id: 'Express Courier (Next Day)',
                    title: 'Express Courier',
                    subtitle: 'Next day tracked parcel',
                    fee: '$12.00'
                  },
                  {
                    id: 'Bloomsbury Shop Pickup',
                    title: 'Bloomsbury Pickup',
                    subtitle: 'Hold at front desk',
                    fee: 'Complimentary'
                  }
                ].map((method) => (
                  <button
                    type="button"
                    key={method.id}
                    onClick={() => setFormData({ ...formData, shippingMethod: method.id as any })}
                    className={`p-3 text-left border rounded-sm transition-all flex flex-col justify-between ${
                      formData.shippingMethod === method.id 
                        ? 'border-[#8C2D19] bg-[#FAF5EE] ring-1 ring-[#8C2D19]' 
                        : 'border-[#E2DBD0] bg-white hover:border-[#C5A880]'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-[#1C1917] block leading-tight">{method.title}</span>
                      <span className="text-[10px] text-[#78716C]">{method.subtitle}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8C2D19] mt-2 block">{method.fee}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment method selector */}
            <div className="pt-4 border-t border-[#E7E2D8]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-3">
                3. Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-2.5 border rounded-sm flex items-center justify-center gap-2 ${
                    formData.paymentMethod === 'card' ? 'border-[#8C2D19] bg-[#FAF5EE] font-semibold' : 'border-[#E2DBD0] bg-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card / Amex</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                  className={`p-2.5 border rounded-sm flex items-center justify-center gap-2 ${
                    formData.paymentMethod === 'apple_pay' ? 'border-[#8C2D19] bg-[#FAF5EE] font-semibold' : 'border-[#E2DBD0] bg-white'
                  }`}
                >
                  <span>Pay with Wallet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-2.5 border rounded-sm flex items-center justify-center gap-2 ${
                    formData.paymentMethod === 'cod' ? 'border-[#8C2D19] bg-[#FAF5EE] font-semibold' : 'border-[#E2DBD0] bg-white'
                  }`}
                >
                  <span>Pay on Pickup</span>
                </button>
              </div>
            </div>

            {/* Order summary box */}
            <div className="p-4 bg-[#F5F0E6] rounded-sm border border-[#E2DBD0] text-xs space-y-2">
              <div className="flex justify-between">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)} volumes)</span>
                <span className="font-mono tabular-nums">${rawSubtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Promotional code discount ({promoCode})</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({formData.shippingMethod})</span>
                <span className="font-mono tabular-nums">${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1C1917] pt-2 border-t border-[#E2DBD0]">
                <span className="font-serif-display">Total to Authorize</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#2C2724] transition-colors rounded-sm shadow flex items-center justify-center gap-2"
            >
              <span>Confirm & Place Order (${total.toFixed(2)})</span>
            </button>
          </form>
        ) : (
          /* Order Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#8C2D19] font-medium">
                Order Confirmed
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#1C1917] mt-1">
                Thank you, {formData.name}
              </h3>
              <p className="text-xs text-[#57534E] mt-1 font-reading">
                Your order <strong className="font-mono text-[#1C1917]">{confirmedOrder?.id}</strong> has been logged in our London bindery ledger.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="text-left bg-white p-5 border border-[#E7E2D8] rounded-sm text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-[#F0EBE1] text-[#78716C]">
                <span>Date: {confirmedOrder?.date}</span>
                <span>Status: <strong className="text-emerald-700">Processing in Bindery</strong></span>
              </div>

              <div>
                <p className="font-medium text-[#1C1917] mb-1">Delivering to:</p>
                <p className="text-[#57534E]">{formData.address}, {formData.city}, {formData.postalCode}</p>
                <p className="text-[#78716C] text-[11px] mt-0.5">Shipping Method: {confirmedOrder?.shippingMethod}</p>
              </div>

              <div className="pt-2 border-t border-[#F0EBE1]">
                <p className="font-medium text-[#1C1917] mb-1.5">Purchased Volumes:</p>
                <ul className="space-y-1">
                  {confirmedOrder?.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-[#57534E]">
                      <span>{item.quantity}× {item.book.title} ({item.formatName})</span>
                      <span className="font-mono tabular-nums">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#F0EBE1] flex justify-between font-bold text-sm text-[#1C1917]">
                <span>Total Paid</span>
                <span className="font-mono tabular-nums">${confirmedOrder?.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="py-2 px-4 text-xs font-medium border border-[#D5CDBD] text-[#1C1917] hover:bg-[#F3EFE7] rounded-sm flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Archival Receipt</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-2 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-sm"
              >
                Return to Bookstore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
