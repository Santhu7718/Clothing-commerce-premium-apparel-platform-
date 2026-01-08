import React, { useState } from 'react';
import { ShoppingBag, Menu, User as UserIcon, Search, Heart, X, LogOut, Settings } from 'lucide-react';
import { Theme, User } from '../types';

interface NavbarProps {
  theme: Theme;
  user: User | null;
  toggleTheme: () => void;
  openCart: () => void;
  openWishlist: () => void;
  openAuth: () => void;
  onLogout: () => void;
  openAdmin: () => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, openCart, openWishlist, openAuth, onLogout, openAdmin,
  cartCount, wishlistCount, searchQuery, setSearchQuery 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.role === 'co-owner';

  return (
    // FIX 1: Reduced px-6 to px-3 on mobile to maximize available width
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-3 md:px-16 py-4 md:py-6 transition-all duration-500 glass-panel border-b border-white/[0.05]">
      {/* Left Links */}
      <div className="flex items-center gap-6 md:gap-12 shrink-0">
        <button className="lg:hidden p-2 hover:bg-white/5 rounded-full transition-colors">
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="hidden lg:flex space-x-10 text-[10px] font-bold tracking-[0.5em] uppercase text-zinc-400">
          <a href="#catalog" className="hover:text-premium-gold transition-all hover:translate-x-1">The Archive</a>
          <a href="#bespoke" className="hover:text-premium-gold transition-all hover:translate-x-1">Laboratory</a>
          {isAdmin && (
            <button onClick={openAdmin} className="text-premium-gold flex items-center gap-2 animate-pulse hover:text-white transition-colors">
              <Settings className="w-3 h-3" /> Management
            </button>
          )}
        </div>
      </div>

      {/* Center Brand - FIXED OVERLAP */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none md:pointer-events-auto z-0">
        <h1 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          // FIX 2: Responsive text size (text-[10px]) and reduced tracking (tracking-[0.15em]) on mobile
          className="text-[10px] sm:text-xs md:text-2xl font-serif-premium tracking-[0.15em] md:tracking-[0.6em] font-bold text-white cursor-pointer select-none text-glow text-center whitespace-nowrap transition-all duration-300"
        >
          THE HUMAN CLUB
        </h1>
      </div>

      {/* Right Icons */}
      {/* FIX 3: shrink-0 prevents icons from being squashed, gap-1 tightens layout on mobile */}
      <div className="flex items-center gap-1 md:gap-5 shrink-0 z-10">
        <div className={`flex items-center transition-all duration-700 overflow-hidden ${isSearchOpen ? 'w-24 md:w-64 opacity-100' : 'w-0 opacity-0'}`}>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent border-b border-premium-gold/30 text-[10px] tracking-[0.1em] md:tracking-[0.3em] w-full py-2 focus:outline-none placeholder:text-zinc-800 uppercase text-white"
          />
        </div>
        
        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-all">
          {isSearchOpen ? <X className="w-4 h-4 md:w-5 md:h-5 text-premium-gold" /> : <Search className="w-4 h-4 md:w-5 md:h-5" />}
        </button>

        <button onClick={openWishlist} className="relative p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-all group">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 group-hover:text-premium-gold transition-colors ${wishlistCount > 0 ? 'fill-premium-gold text-premium-gold' : ''}`} />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 md:w-3.5 md:h-3.5 text-[8px] font-bold text-black bg-white rounded-full">
              {wishlistCount}
            </span>
          )}
        </button>

        <button onClick={openCart} className="relative p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-all group">
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 group-hover:text-premium-gold transition-colors" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 md:w-3.5 md:h-3.5 text-[8px] font-bold text-black bg-premium-gold rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        <div className="relative ml-0.5 md:ml-2">
          <button 
            onClick={() => user ? setIsProfileMenuOpen(!isProfileMenuOpen) : openAuth()}
            className="p-1 hover:bg-white/10 rounded-full transition-all flex items-center gap-2 border border-white/5 pr-1 md:pr-3 pl-1"
          >
            {user?.avatar ? (
              <img src={user.avatar} className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-premium-gold/30" alt="Avatar" />
            ) : (
              <div className={`p-1 md:p-1.5 rounded-full ${user ? 'bg-premium-gold/20 text-premium-gold' : 'bg-white/5'}`}>
                <UserIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
            )}
            {user && <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-zinc-500 hidden md:block">Profile</span>}
          </button>

          {isProfileMenuOpen && user && (
            <div className="absolute right-0 mt-4 w-60 bg-[#080808] border border-white/10 shadow-2xl p-2 animate-in slide-in-from-top-2 duration-300">
              <div className="p-4 border-b border-white/5 mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest truncate text-white">{user.name}</p>
                <p className="text-[8px] text-zinc-600 uppercase tracking-widest truncate">{user.email || user.phone}</p>
              </div>
              <button className="w-full text-left px-4 py-3 text-[9px] uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all">Orders Archive</button>
              <button 
                onClick={() => { onLogout(); setIsProfileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-[9px] uppercase tracking-widest text-red-400 hover:bg-red-400/5 transition-all border-t border-white/5 mt-2"
              >
                <LogOut className="w-3 h-3 inline mr-2" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};