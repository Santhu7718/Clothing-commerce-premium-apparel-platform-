
import React from 'react';
import { Heart, Plus, MoveRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, onQuickView, isWishlisted, onToggleWishlist 
}) => {
  return (
    <div className="group relative flex flex-col h-full animate-in fade-in duration-1000">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0A0A] mb-8 rounded-sm cursor-pointer product-card-shadow border border-white/[0.03]">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100" 
          onClick={() => onQuickView(product)}
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-6 right-6 z-20 p-2.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/5 hover:bg-premium-gold hover:text-black hover:scale-110 transition-all duration-500"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : 'text-white'}`} />
        </button>

        {/* Quick View Button - Modern Hover Effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
          <button 
            onClick={() => onQuickView(product)}
            className="px-10 py-4 bg-white text-black text-[9px] font-bold uppercase tracking-[0.4em] transform translate-y-10 group-hover:translate-y-0 transition-all duration-500 hover:bg-premium-gold flex items-center gap-3 shadow-2xl"
          >
            Inspect Unit <MoveRight className="w-3 h-3" />
          </button>
        </div>
        
        {/* Category Label */}
        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
          <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-premium-gold">{product.category}</p>
        </div>
      </div>

      <div className="flex justify-between items-start px-2 mt-auto">
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] group-hover:text-premium-gold transition-colors duration-500">
            {product.name}
          </h3>
          <div className="flex gap-1.5">
            {product.colors.map(c => (
              <div key={c.hex} className="w-2.5 h-2.5 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold tracking-[0.2em] text-white/90">
            {new Intl.NumberFormat(navigator.language === 'en-IN' ? 'en-IN' : 'en-US', {
                style: 'currency',
                currency: navigator.language === 'en-IN' ? 'INR' : 'USD',
            }).format(navigator.language === 'en-IN' ? product.price * 83 : product.price)}
          </p>
        </div>
      </div>
    </div>
  );
};
