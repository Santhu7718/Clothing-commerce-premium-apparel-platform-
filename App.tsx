
import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetail } from './components/ProductDetail';
import { CustomDesignForm } from './components/CustomDesignForm';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Theme, Product } from './types';
import { useShop } from './store/shopStore';
import { Instagram, Twitter, Facebook, Mail, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [userCountry, setUserCountry] = useState('Global');

  const { 
    products, setProducts, cartItems, wishlistIds, currentUser, isAdmin, login, logout,
    coOwners, setCoOwners, addToCart, removeFromCart, updateCartQuantity, toggleWishlist, 
    cartTotal 
  } = useShop();

  useEffect(() => {
    document.documentElement.className = theme;
    
    // Geolocation for currency and location display
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const isIndia = navigator.language === 'en-IN' || Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kolkata';
          setUserCountry(isIndia ? 'India (South Asia Sector)' : 'International Sector');
        },
        () => setUserCountry('Global Distribution')
      );
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lower) || 
        p.description.toLowerCase().includes(lower)
      );
    }
    
    return result;
  }, [products, searchQuery, activeCategory]);

  const wishlistItems = useMemo(() => 
    products.filter(p => wishlistIds.includes(p.id)), 
  [products, wishlistIds]);

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setIsAdminOpen(true);
    } else {
      alert("System Refused: Administrator or Co-Owner privileges required.");
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-700 bg-premium-black text-white selection:bg-premium-gold selection:text-black">
      <Navbar 
        theme={theme} 
        user={currentUser}
        toggleTheme={toggleTheme} 
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        openAuth={() => setIsAuthOpen(true)}
        onLogout={logout}
        openAdmin={handleOpenAdmin}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Hero />

      <div className="w-full py-12 px-6 border-y border-white/5 bg-[#050505] flex flex-wrap justify-center gap-16 md:gap-32 items-center">
        <div className="flex items-center gap-3 group">
          <MapPin className="w-4 h-4 text-premium-gold animate-pulse" />
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400 group-hover:text-white transition-colors">{userCountry}</p>
        </div>
        <div className="text-center hidden sm:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-1.5 text-premium-gold">Human Club Certified</p>
          <p className="text-[8px] text-zinc-600 uppercase tracking-[0.3em] font-medium">Atelier Quality Assurance</p>
        </div>
      </div>

      <section id="catalog" className="py-24 md:py-40 px-6 md:px-12 max-w-[1500px] mx-auto scroll-mt-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 md:mb-32 gap-12 md:gap-16">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-16 h-[1px] bg-premium-gold" />
              <span className="text-premium-gold text-[9px] uppercase tracking-[0.8em] font-bold">Registry Archive</span>
            </div>
            <h2 className="text-5xl md:text-9xl font-serif-premium font-bold leading-tight">Collective <br/><span className="text-zinc-600 italic font-light">Inventory</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-6 md:gap-10 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
            {['All', 'Essentials', 'Luxury', 'Limited'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-all pb-4 px-2 border-b-2 ${activeCategory === cat ? 'text-white border-premium-gold' : 'border-transparent hover:text-white'}`}
              >
                {cat === 'All' ? `Complete Archive (${products.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 md:gap-x-16 gap-y-24 md:gap-y-32">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setSelectedProduct}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="py-40 md:py-56 text-center space-y-12">
            <div className="text-zinc-900/40 text-[100px] md:text-[180px] leading-none font-serif-premium tracking-[0.5em] select-none uppercase">Void</div>
            <p className="text-zinc-700 font-serif-premium tracking-[0.6em] text-lg uppercase">Inventory Record Missing</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}} 
              className="text-[10px] uppercase tracking-[0.5em] font-bold text-premium-gold border border-premium-gold/20 px-16 py-6 hover:bg-premium-gold hover:text-black transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <CustomDesignForm />

      <footer className="py-24 md:py-40 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-24 mb-24 md:mb-32">
            <div className="lg:col-span-6 space-y-10 md:space-y-12">
              <h1 className="text-3xl md:text-4xl font-serif-premium tracking-[0.6em] font-bold text-premium-gold mb-10 text-glow">THE HUMAN CLUB</h1>
              <p className="text-zinc-600 text-[10px] md:text-[11px] font-medium max-w-md leading-[2.2] uppercase tracking-[0.4em]">
                Premium apparel designed for modern humans. Engineered with integrity, draped for presence.
              </p>
              <div className="flex gap-10 md:gap-16 text-zinc-700">
                <Instagram className="w-6 h-6 hover:text-premium-gold cursor-pointer transition-all" />
                <Twitter className="w-6 h-6 hover:text-premium-gold cursor-pointer transition-all" />
                <Facebook className="w-6 h-6 hover:text-premium-gold cursor-pointer transition-all" />
                <Mail className="w-6 h-6 hover:text-premium-gold cursor-pointer transition-all" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] mb-10 md:mb-12 text-white/50">Atelier Archives</h4>
              <ul className="space-y-6 md:space-y-8 text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-800">
                <li><a href="#catalog" className="hover:text-premium-gold transition-colors">Unit Inventory</a></li>
                <li><a href="#bespoke" className="hover:text-premium-gold transition-colors">Bespoke Lab</a></li>
                <li><a href="#" className="hover:text-premium-gold transition-colors">Textile Ethics</a></li>
              </ul>
            </div>
            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] mb-10 md:mb-12 text-white/50">System Protocols</h4>
              <ul className="space-y-6 md:space-y-8 text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-800">
                <li><a href="#" className="hover:text-premium-gold transition-colors">Logistics Hub</a></li>
                <li><a href="#" className="hover:text-premium-gold transition-colors">Identity Rights</a></li>
                <li><a href="#" className="hover:text-premium-gold transition-colors">Support Terminal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <p className="text-[10px] text-zinc-800 uppercase tracking-[0.6em] font-bold text-center md:text-left">
              © 2024 THE HUMAN CLUB | ATELIER CLOTHING SYSTEM
            </p>

            <div 
              className="w-10 h-10 bg-transparent cursor-default opacity-0 hover:opacity-10 transition-opacity" 
              title="Staff Entrance"
              onDoubleClick={handleOpenAdmin} 
            />

            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] uppercase tracking-[0.6em] font-bold text-zinc-800">
              <span className="hover:text-premium-gold cursor-pointer transition-colors">India</span>
              <span className="hover:text-premium-gold cursor-pointer transition-colors">France</span>
              <span className="hover:text-premium-gold cursor-pointer transition-colors">USA</span>
              <span className="hover:text-premium-gold cursor-pointer transition-colors">Japan</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        total={cartTotal}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemove={toggleWishlist}
        onAddToCart={(p) => addToCart(p, p.sizes[0], p.colors[0].name)}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={login}
      />
      
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
          allProducts={products}
          onProductClick={setSelectedProduct}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {isAdminOpen && isAdmin && (
        <AdminDashboard 
          products={products}
          coOwners={coOwners}
          onAddProduct={(p) => setProducts([p, ...products])}
          onUpdateProduct={(p) => setProducts(products.map(old => old.id === p.id ? p : old))}
          onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
          onAddCoOwner={(u) => setCoOwners([...coOwners, u])}
          onRemoveCoOwner={(id) => setCoOwners(coOwners.filter(u => u.id !== id))}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
