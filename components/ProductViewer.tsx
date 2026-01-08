
import React from 'react';

interface ProductImageGalleryProps {
  imageUrl: string;
  name: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ imageUrl, name }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5 group">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-[3/4] bg-zinc-900 border border-white/5 opacity-50 overflow-hidden">
          <img src={imageUrl} className="w-full h-full object-cover grayscale brightness-50" />
        </div>
        <div className="aspect-[3/4] bg-zinc-900 border border-white/5 opacity-30 overflow-hidden">
          <img src={imageUrl} className="w-full h-full object-cover grayscale blur-sm" />
        </div>
      </div>
    </div>
  );
};
