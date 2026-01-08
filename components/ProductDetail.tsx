
import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Share2, Ruler, ShieldCheck, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductImageGallery } from './ProductViewer';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  allProducts: Product[];
  onProductClick: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, onClose, onAddToCart, allProducts, onProductClick, isWishlisted, onToggleWishlist 
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

  const isIndia = navigator.language === 'en-IN' || Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kolkata';
  const currencySymbol = isIndia ? '₹' : '$';
  const formattedPrice = isIndia ? (product.price * 83).toLocaleString('en-IN') : product.price.toFixed(2);

  const suggestedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category))
    .slice(0, 4);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  return (
    <div className="fixed inset-0 z-[200] bg-black overflow-y-auto animate-in fade-in duration-500">
      <div className="min-h-screen bg-premium-black">
        {/* Detail Header / Nav */}
        <div className="sticky top-0 z-[210] glass-panel px-6 py-4 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Close Archive</span>
          </button>
          <div className="text-center hidden md:block">
            <h1 className="text-sm font-serif-premium tracking-[0.5em] font-bold text-premium-gold">YOUR BRAND NAME</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-2 text-zinc-400 hover:text-white"><Share2 className="w-5 h-5" /></button>
            <button onClick={() => onToggleWishlist(product.id)} className={`p-2 transition-colors ${isWishlisted ? 'text-premium-gold' : 'text-zinc-400 hover:text-white'}`}>
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            {/* Gallery Section */}
            <div className="lg:col-span-7">
              <ProductImageGallery imageUrl={product.imageUrl} name={product.name} />
            </div>

            {/* Info Section */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-premium-gold text-[10px] uppercase tracking-[0.4em] font-bold">{product.category}</span>
                  <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                  <span className="text-zinc-500 text-[10px] uppercase tracking-[0.4em]">Unit ID: {product.id}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif-premium font-bold tracking-tight mb-4">{product.name}</h1>
                <p className="text-3xl font-light text-white tracking-widest">
                  {currencySymbol}{formattedPrice}
                </p>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-2">inclusive of all taxes</p>
              </div>

              <div className="space-y-8">
                {/* Colors */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-4">Color Palette</h4>
                  <div className="flex gap-4">
                    {product.colors.map(c => (
                      <button 
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-12 h-12 rounded-full border-2 transition-all p-1 ${selectedColor === c.name ? 'border-premium-gold scale-110' : 'border-transparent hover:border-zinc-800'}`}
                      >
                        <div className="w-full h-full rounded-full border border-white/5" style={{ backgroundColor: c.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Select Architecture</h4>
                    <button className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-premium-gold hover:underline">
                      <Ruler className="w-3 h-3" /> Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-4 border text-[10px] font-bold transition-all uppercase tracking-widest ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-400 hover:border-white/40'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-6">
                  <button 
                    onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                    className="flex-[2] py-6 bg-premium-gold text-black font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-4"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Wardrobe
                  </button>
                  <button 
                    onClick={() => onToggleWishlist(product.id)}
                    className="flex-1 py-6 border border-white/10 text-white font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-4"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-premium-gold text-premium-gold' : ''}`} /> {isWishlisted ? 'Saved' : 'Wishlist'}
                  </button>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-4">Unit Specifications</h4>
                  <p className="text-zinc-500 text-xs leading-loose tracking-widest uppercase font-light">
                    {product.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Material</p>
                     <p className="text-[10px] uppercase tracking-widest text-zinc-600">Premium Organic Cotton</p>
                   </div>
                   <div className="space-y-2">
                     <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Maintenance</p>
                     <p className="text-[10px] uppercase tracking-widest text-zinc-600">Atelier Cold Wash Only</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-zinc-900/30 border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-premium-gold" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Authentic YOUR BRAND NAME Registry Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Products Section */}
          <div className="mt-40 pt-40 border-t border-white/5">
            <div className="flex items-center justify-between mb-20">
              <h3 className="text-3xl md:text-5xl font-serif-premium font-bold">Suggested <span className="italic text-zinc-600">Units</span></h3>
              <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-premium-gold hover:text-white transition-colors">
                View All Archives <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {suggestedProducts.map(suggested => (
                <ProductCard 
                  key={suggested.id}
                  product={suggested}
                  onQuickView={() => onProductClick(suggested)}
                  isWishlisted={false}
                  onToggleWishlist={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
