
import { useState, useEffect } from 'react';
import { CartItem, Product, User } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

export const useShop = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vanta-products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vanta-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('vanta-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vanta-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [coOwners, setCoOwners] = useState<User[]>(() => {
    const saved = localStorage.getItem('vanta-co-owners');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem('vanta-products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('vanta-cart', JSON.stringify(cartItems)), [cartItems]);
  useEffect(() => localStorage.setItem('vanta-wishlist', JSON.stringify(wishlistIds)), [wishlistIds]);
  useEffect(() => localStorage.setItem('vanta-user', JSON.stringify(currentUser)), [currentUser]);
  useEffect(() => localStorage.setItem('vanta-co-owners', JSON.stringify(coOwners)), [coOwners]);

  const login = (userData: User) => setCurrentUser(userData);
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vanta-user');
  };

  const addToCart = (product: Product, size: string, color: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.selectedSize === size && i.selectedColor === color);
      if (existing) return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.selectedSize === size && i.selectedColor === color)));
  };

  const updateCartQuantity = (id: string, size: string, color: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.id === id && i.selectedSize === size && i.selectedColor === color) {
        return { ...i, quantity: Math.max(1, i.quantity + delta) };
      }
      return i;
    }));
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'co-owner';

  return {
    products, setProducts, cartItems, wishlistIds, currentUser, isAdmin, login, logout,
    coOwners, setCoOwners, addToCart, removeFromCart, updateCartQuantity, toggleWishlist,
    cartTotal: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  };
};
