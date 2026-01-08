
import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vanta-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vanta-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, size: string, color: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.selectedSize === size && i.selectedColor === color);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.selectedSize === size && i.selectedColor === color)));
  };

  const updateQuantity = (id: string, size: string, color: string, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id && i.selectedSize === size && i.selectedColor === color) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return { items, addToCart, removeFromCart, updateQuantity, total };
};
