
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Product } from '../types';
// Fixed: ProductViewer.tsx exports ProductImageGallery, not ProductViewer.
import { ProductImageGallery } from './ProductViewer';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || '');
  const [activeColorHex, setActiveColorHex] = useState(product?.colors[0].hex || '#000000');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl glass-panel overflow-hidden flex flex-col md:flex-row h-full md:h-[auto] max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-black/50 hover:bg-white hover:text-black rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full md:w-1/2 relative bg-zinc-900/50">
          {/* Fixed: Replaced the missing ProductViewer with ProductImageGallery and provided required props. */}
          <ProductImageGallery imageUrl={product.imageUrl} name={product.name} />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-premium-dark/80 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-premium-gold text-xs uppercase tracking-[0.3em] font-medium">{product.category}</span>
            <h2 className="text-3xl md:text-5xl font-serif-premium font-bold mt-2 mb-4 leading-tight">{product.name}</h2>
            <p className="text-2xl font-light text-zinc-300">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-zinc-400 font-light text-sm leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Select Palette</h4>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setActiveColorHex(color.hex);
                    }}
                    className={`group relative w-12 h-12 rounded-full border-2 transition-all p-1 ${selectedColor === color.name ? 'border-premium-gold scale-110' : 'border-transparent hover:border-zinc-700'}`}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                    {selectedColor === color.name && (
                      <div className="absolute -top-1 -right-1 bg-premium-gold text-black rounded-full p-0.5 shadow-lg">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Select Architecture (Size)</h4>
                <button className="text-[10px] uppercase tracking-widest text-premium-gold hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-[50px] border text-xs font-bold transition-all uppercase tracking-widest ${selectedSize === size ? 'bg-premium-gold border-premium-gold text-black' : 'border-zinc-800 hover:border-white text-zinc-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                onAddToCart(product, selectedSize, selectedColor);
                onClose();
              }}
              className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-sm hover:bg-premium-gold transition-colors duration-500 shadow-2xl"
            >
              Integrate into Wardrobe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
