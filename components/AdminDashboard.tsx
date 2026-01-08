
import React, { useState, useRef } from 'react';
import { X, Plus, Trash2, Edit3, Save, UserPlus, ShieldCheck, Box, Users, ChevronRight, Upload, Image as ImageIcon, Palette } from 'lucide-react';
import { Product, User } from '../types';

interface AdminDashboardProps {
  products: Product[];
  coOwners: User[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddCoOwner: (u: User) => void;
  onRemoveCoOwner: (id: string) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products, coOwners, onAddProduct, onUpdateProduct, onDeleteProduct, onAddCoOwner, onRemoveCoOwner, onClose
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'team'>('inventory');
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', 
    price: 0, 
    category: 'Essentials', 
    colors: [{ name: 'Carbon', hex: '#050505' }], 
    sizes: ['S', 'M', 'L', 'XL'],
    modelColor: '#050505',
    imageUrl: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("System Error: Mandatory identity (name) and value (price) missing.");
      return;
    }
    
    const finalProduct = {
      ...newProduct,
      id: editingId || `p-${Date.now()}`,
      imageUrl: newProduct.imageUrl || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'
    } as Product;

    if (editingId) {
      onUpdateProduct(finalProduct);
      setEditingId(null);
    } else {
      onAddProduct(finalProduct);
    }
    
    setNewProduct({ 
      name: '', 
      price: 0, 
      category: 'Essentials', 
      colors: [{ name: 'Carbon', hex: '#050505' }], 
      sizes: ['S', 'M', 'L', 'XL'],
      modelColor: '#050505',
      imageUrl: ''
    });
  };

  const startEditing = (p: Product) => {
    setEditingId(p.id);
    setNewProduct(p);
    setActiveTab('inventory');
  };

  return (
    <div className="fixed inset-0 z-[160] bg-black flex items-center justify-center animate-in fade-in duration-500">
      <div className="w-full h-full bg-[#030303] flex flex-col md:flex-row overflow-hidden border border-white/5 shadow-2xl">
        {/* Sidebar Terminal */}
        <div className="w-full md:w-96 bg-black border-r border-white/5 flex flex-col p-12">
          <div className="mb-24">
            <h2 className="text-2xl font-serif-premium tracking-[0.6em] font-bold text-premium-gold mb-3">ATELIER CORE</h2>
            <p className="text-[9px] text-zinc-700 uppercase tracking-[0.4em] font-bold">The Human Club Terminal v3.0</p>
          </div>

          <nav className="flex-1 space-y-6">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center justify-between p-6 text-[10px] font-bold uppercase tracking-[0.5em] transition-all border border-transparent ${activeTab === 'inventory' ? 'bg-premium-gold text-black shadow-xl' : 'text-zinc-600 hover:text-white hover:bg-white/5 hover:border-white/5'}`}
            >
              <div className="flex items-center gap-6">
                <Box className="w-5 h-5" /> Registry
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center justify-between p-6 text-[10px] font-bold uppercase tracking-[0.5em] transition-all border border-transparent ${activeTab === 'team' ? 'bg-premium-gold text-black shadow-xl' : 'text-zinc-600 hover:text-white hover:bg-white/5 hover:border-white/5'}`}
            >
              <div className="flex items-center gap-6">
                <Users className="w-5 h-5" /> Personnel
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>

          <button 
            onClick={onClose}
            className="w-full py-6 border border-white/10 text-[10px] uppercase tracking-[0.6em] font-bold hover:bg-white hover:text-black transition-all group"
          >
            Terminate Session
          </button>
        </div>

        {/* Console Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#050505] p-12 md:p-32">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'inventory' ? (
              <div className="space-y-24">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-5xl font-serif-premium font-bold mb-6 text-glow">Unit Catalog</h3>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-[0.5em]">{products.length} Active Human Assets</p>
                  </div>
                </div>

                {/* Injection Form */}
                <div className="glass-panel p-16 space-y-12 animate-in slide-in-from-top-6 duration-700 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                  <div className="flex justify-between items-center border-b border-white/5 pb-8">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.6em] text-premium-gold flex items-center gap-4">
                      {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {editingId ? 'Refining Unit Record' : 'Injecting New Asset'}
                    </h4>
                    {editingId && (
                      <button onClick={() => { setEditingId(null); setNewProduct({}); }} className="text-[9px] uppercase tracking-[0.5em] text-red-400 hover:text-red-300 font-bold transition-colors">Discard Edits</button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Visual Asset Capture */}
                    <div className="lg:col-span-4 space-y-6">
                       <label className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold block">Visual Archive</label>
                       <div 
                         onClick={() => fileInputRef.current?.click()}
                         className="relative aspect-[3/4] bg-black border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer group hover:border-premium-gold transition-all duration-700 overflow-hidden shadow-2xl"
                       >
                         {newProduct.imageUrl ? (
                           <>
                             <img src={newProduct.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                             <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                               <Upload className="w-8 h-8 text-white" />
                             </div>
                           </>
                         ) : (
                           <>
                             <ImageIcon className="w-12 h-12 text-zinc-900 mb-6 group-hover:text-premium-gold transition-colors duration-700" />
                             <p className="text-[9px] uppercase tracking-[0.6em] text-zinc-700 font-bold">Inject Frame</p>
                           </>
                         )}
                         <input 
                           type="file" 
                           ref={fileInputRef} 
                           className="hidden" 
                           accept="image/*"
                           onChange={handleImageUpload}
                         />
                       </div>
                    </div>

                    {/* Meta Data Ingress */}
                    <div className="lg:col-span-8 space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <label className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold">Unit Identity</label>
                          <input 
                            type="text" 
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none text-sm tracking-[0.2em] uppercase placeholder:text-zinc-900 transition-colors focus:border-premium-gold"
                            placeholder="Unit Name"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold">Base Value (USD)</label>
                          <input 
                            type="number" 
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none text-sm tracking-widest placeholder:text-zinc-900 focus:border-premium-gold"
                            placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold">Classification</label>
                          <select 
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none text-[10px] tracking-[0.5em] text-zinc-500 uppercase cursor-pointer"
                          >
                            <option value="Essentials">Club Essentials</option>
                            <option value="Luxury">Luxury Units</option>
                            <option value="Limited">Limited Series</option>
                          </select>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold flex items-center gap-3">
                            <Palette className="w-4 h-4" /> Baseline Color Hex
                          </label>
                          <div className="flex items-center gap-6">
                            <input 
                              type="color" 
                              value={newProduct.modelColor}
                              onChange={(e) => setNewProduct({ ...newProduct, modelColor: e.target.value })}
                              className="w-12 h-12 bg-transparent border-none cursor-pointer p-0"
                            />
                            <span className="text-[11px] text-zinc-600 font-mono uppercase font-bold">{newProduct.modelColor}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold">Technical Brief</label>
                        <textarea 
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          placeholder="Architectural specs, textile composition, human fit analysis..."
                          className="w-full bg-transparent border border-white/10 p-6 text-[11px] tracking-[0.3em] uppercase h-32 focus:outline-none focus:border-premium-gold transition-colors placeholder:text-zinc-900"
                        />
                      </div>

                      <div className="flex justify-end pt-8">
                        <button 
                          onClick={handleSaveProduct}
                          className="px-20 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.6em] hover:bg-premium-gold transition-all duration-700 shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:-translate-y-2 active:translate-y-0"
                        >
                          {editingId ? 'Update Record' : 'Commit To Archive'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table Registry */}
                <div className="space-y-12">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.8em] text-zinc-800 border-b border-white/5 pb-8">Active Asset Registry</h4>
                  <div className="grid grid-cols-1 gap-6">
                    {products.map(p => (
                      <div key={p.id} className="group flex items-center justify-between p-10 border border-white/5 hover:bg-white/[0.02] transition-all duration-700 bg-[#080808] shadow-lg hover:shadow-2xl">
                        <div className="flex items-center gap-12">
                          <div className="w-24 h-32 bg-black overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/5">
                            <img src={p.imageUrl} className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-3">
                            <p className="text-[13px] font-bold uppercase tracking-[0.5em] mb-1">{p.name}</p>
                            <div className="flex items-center gap-6">
                                <span className="text-[9px] text-zinc-700 uppercase tracking-[0.4em] font-bold">{p.category}</span>
                                <span className="text-[9px] text-premium-gold uppercase tracking-[0.4em] font-bold">${p.price.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <div className="w-3 h-3 rounded-full shadow-inner border border-white/10" style={{ backgroundColor: p.modelColor }} />
                               <span className="text-[8px] text-zinc-800 uppercase tracking-widest font-bold">Base Color: {p.modelColor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-8 opacity-20 group-hover:opacity-100 transition-all duration-500">
                          <button 
                            onClick={() => startEditing(p)} 
                            className="p-5 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all"
                            title="Edit Record"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              if(confirm('System Warning: Are you certain you want to purge this asset record?')) {
                                onDeleteProduct(p.id);
                              }
                            }} 
                            className="p-5 bg-white/5 hover:bg-red-600 hover:text-white rounded-full transition-all"
                            title="Purge Record"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-32">
                <div>
                  <h3 className="text-5xl font-serif-premium font-bold mb-8 text-glow">Personnel Registry</h3>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-[0.6em]">System Access & Privilege Control</p>
                </div>

                <div className="glass-panel p-20 space-y-12 border border-white/10 shadow-2xl">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.8em] text-premium-gold flex items-center gap-4">
                    <UserPlus className="w-5 h-5" /> Appoint System Authorized Identity
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                       <label className="text-[9px] uppercase tracking-[0.6em] text-zinc-700 font-bold">Full Identity</label>
                       <input type="text" placeholder="LEGAL NAME" className="w-full bg-transparent border-b border-white/10 py-4 text-sm tracking-[0.4em] uppercase focus:outline-none focus:border-white transition-all placeholder:text-zinc-900" />
                    </div>
                    <div className="space-y-6">
                       <label className="text-[9px] uppercase tracking-[0.6em] text-zinc-700 font-bold">Communication ID</label>
                       <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-white/10 py-4 text-sm tracking-[0.4em] uppercase focus:outline-none focus:border-white transition-all placeholder:text-zinc-900" />
                    </div>
                  </div>
                  <button className="px-20 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.6em] hover:bg-premium-gold transition-all duration-700 shadow-xl">
                    Grant Privilege Keys
                  </button>
                </div>

                <div className="space-y-12">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.8em] text-zinc-800 pb-8">Authorized Personnel</h4>
                  {coOwners.length === 0 ? (
                    <div className="p-32 text-center border border-white/5 bg-[#080808]">
                       <p className="text-[11px] uppercase tracking-[0.8em] text-zinc-900 font-bold">No co-owners designated.</p>
                    </div>
                  ) : (
                    coOwners.map(user => (
                      <div key={user.id} className="flex items-center justify-between p-10 border border-white/5 group bg-[#080808] hover:bg-white/[0.02] transition-all duration-700">
                        <div className="flex items-center gap-10">
                          <div className="w-16 h-16 bg-premium-gold/5 flex items-center justify-center rounded-full border border-premium-gold/20 shadow-inner">
                            <ShieldCheck className="w-8 h-8 text-premium-gold" />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.5em] mb-2">{user.name}</p>
                            <p className="text-[9px] text-zinc-700 tracking-[0.4em] uppercase font-bold">{user.email || user.phone}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => onRemoveCoOwner(user.id)} 
                          className="p-5 text-zinc-800 hover:text-red-500 transition-all duration-500 hover:scale-110"
                          title="Revoke System Access"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
