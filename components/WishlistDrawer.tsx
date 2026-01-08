
import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ 
  isOpen, onClose, items, onRemove, onAddToCart 
}) => {
  return (
    <>
      <div 
        className={`fixed inset-0 z-[60] bg-black/80 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 z-[70] h-full w-full md:w-[450px] bg-premium-dark border-l border-zinc-800 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-premium-gold fill-premium-gold" />
              <h2 className="text-xl font-serif-premium font-bold uppercase tracking-widest">Saved Archives</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <Heart className="w-16 h-16 text-zinc-800" />
                <p className="text-zinc-500 font-light italic">Your wishlist is waiting for a muse.</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 group animate-in slide-in-from-right duration-300">
                  <div className="w-24 h-32 bg-zinc-900 overflow-hidden flex-shrink-0 relative">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold uppercase tracking-wider">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">{item.category}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-premium-gold">${item.price.toFixed(2)}</span>
                      <button 
                        onClick={() => { onAddToCart(item); onRemove(item.id); }}
                        className="p-2 bg-white/5 hover:bg-premium-gold hover:text-black rounded-full transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
