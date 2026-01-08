
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, ShieldCheck, CreditCard, Smartphone, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, color: string, delta: number) => void;
  onRemove: (id: string, size: string, color: string) => void;
  total: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, total }) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment'>('cart');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const isIndia = navigator.language === 'en-IN' || Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kolkata';
  const currencySymbol = isIndia ? '₹' : '$';
  const formattedTotal = isIndia ? (total * 83).toLocaleString('en-IN') : total.toFixed(2);

  const handleCheckout = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('payment');
    } else {
      if (!selectedMethod) {
        alert("Please select a secure payment channel.");
        return;
      }
      
      setIsProcessing(true);
      // Simulate Payment Gateway Interaction
      setTimeout(() => {
        setIsProcessing(false);
        alert(`Payment via ${selectedMethod === 'razorpay' ? 'Razorpay' : 'Stripe'} successful. Identity confirmed. Your units are being archived for shipment.`);
        onClose();
        setCheckoutStep('cart');
      }, 2500);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 z-[120] h-full w-full md:w-[500px] bg-[#050505] border-l border-white/5 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {isProcessing && (
          <div className="absolute inset-0 z-[130] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-6">
            <RefreshCw className="w-12 h-12 text-premium-gold animate-spin" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-premium-gold">Contacting Secure Gateway...</p>
          </div>
        )}

        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-8 border-b border-white/5">
            <div className="flex items-center gap-4">
              <ShoppingBag className="w-6 h-6 text-premium-gold" />
              <h2 className="text-xl font-serif-premium font-bold uppercase tracking-widest">
                {checkoutStep === 'cart' ? 'Your Atelier' : 'Payment Protocol'}
              </h2>
            </div>
            <button onClick={() => {onClose(); setCheckoutStep('cart');}} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <ShoppingBag className="w-20 h-20 text-zinc-900" />
                <p className="text-zinc-500 font-light tracking-widest uppercase text-xs">Your wardrobe archive is devoid of apparel.</p>
                <button 
                  onClick={onClose}
                  className="px-12 py-4 border border-premium-gold text-premium-gold text-[10px] font-bold uppercase tracking-widest hover:bg-premium-gold hover:text-black transition-all"
                >
                  Return to Registry
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              <div className="space-y-8">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-6 group animate-in slide-in-from-right duration-500">
                    <div className="w-28 h-36 bg-zinc-900 overflow-hidden flex-shrink-0 border border-white/5">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-bold uppercase tracking-widest">{item.name}</h3>
                          <button onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)} className="text-zinc-700 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-600 mt-2 uppercase tracking-[0.2em]">
                          {item.selectedColor} • {item.selectedSize}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/10 bg-white/5 rounded-sm overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                            className="p-2 hover:bg-white/10 text-zinc-400"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-5 text-[10px] font-bold font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                            className="p-2 hover:bg-white/10 text-zinc-400"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-white">
                            {currencySymbol}{isIndia ? (item.price * item.quantity * 83).toLocaleString('en-IN') : (item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Secure Channels</p>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Razorpay Option */}
                    <button 
                      onClick={() => setSelectedMethod('razorpay')}
                      className={`flex items-center justify-between p-6 border transition-all ${selectedMethod === 'razorpay' ? 'border-premium-gold bg-premium-gold/5' : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'}`}
                    >
                      <div className="flex items-center gap-5">
                        <Smartphone className={`w-5 h-5 ${selectedMethod === 'razorpay' ? 'text-premium-gold' : 'text-zinc-600'}`} />
                        <div className="text-left">
                          <span className="text-[10px] font-bold uppercase tracking-widest block">Razorpay Secure</span>
                          <span className="text-[8px] text-zinc-600 uppercase tracking-widest">UPI, NetBanking, Cards (INR)</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border ${selectedMethod === 'razorpay' ? 'border-premium-gold bg-premium-gold' : 'border-zinc-800'}`} />
                    </button>

                    {/* Stripe Option */}
                    <button 
                      onClick={() => setSelectedMethod('stripe')}
                      className={`flex items-center justify-between p-6 border transition-all ${selectedMethod === 'stripe' ? 'border-premium-gold bg-premium-gold/5' : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'}`}
                    >
                      <div className="flex items-center gap-5">
                        <CreditCard className={`w-5 h-5 ${selectedMethod === 'stripe' ? 'text-premium-gold' : 'text-zinc-600'}`} />
                        <div className="text-left">
                          <span className="text-[10px] font-bold uppercase tracking-widest block">Stripe Global</span>
                          <span className="text-[8px] text-zinc-600 uppercase tracking-widest">International Cards & Apple Pay</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border ${selectedMethod === 'stripe' ? 'border-premium-gold bg-premium-gold' : 'border-zinc-800'}`} />
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-sm">
                   <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-loose">
                      All transactions are protected by Human Club's advanced SSL layer. Identity data is purged immediately after transaction confirmation.
                   </p>
                </div>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 bg-[#080808] border-t border-white/5 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  <span>Unit Archive Value</span>
                  <span>{currencySymbol}{formattedTotal}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  <span>Archival Logistics</span>
                  <span className="text-green-500">Priority Complimentary</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold uppercase tracking-[0.2em] border-t border-white/5 pt-6 text-white">
                  <span>Total Value</span>
                  <span className="text-premium-gold">{currencySymbol}{formattedTotal}</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                {checkoutStep === 'payment' && (
                  <button 
                    onClick={() => setCheckoutStep('cart')}
                    className="flex-1 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={handleCheckout}
                  className="flex-[2] py-5 bg-premium-gold text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all duration-500 shadow-2xl"
                >
                  {checkoutStep === 'cart' ? 'Initiate Procurement' : `Pay via ${selectedMethod === 'razorpay' ? 'Razorpay' : selectedMethod === 'stripe' ? 'Stripe' : 'Channel'}`}
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-zinc-800 pt-2">
                 <ShieldCheck className="w-3.5 h-3.5" />
                 <span className="text-[8px] uppercase tracking-[0.5em] font-bold">Encrypted via ATELIER SECURE™</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
