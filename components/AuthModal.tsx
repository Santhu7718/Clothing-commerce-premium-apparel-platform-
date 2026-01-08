
import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, ArrowRight, ShieldCheck, Chrome, Smartphone, RefreshCw, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [method, setMethod] = useState<'options' | 'phone' | 'email'>('options');
  const [inputValue, setInputValue] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setMethod('options');
      setInputValue('');
      setOtp('');
      setIsOtpSent(false);
      setLoading(false);
      setIsVerified(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const simulateLoading = (callback: () => void, delay = 1200) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback();
    }, delay);
  };

  const handleGoogleLogin = () => {
    simulateLoading(() => {
      onLogin({
        id: 'g-' + Math.random().toString(36).substr(2, 9),
        name: 'Julian Vanta',
        email: 'member@gmail.com',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
      });
      onClose();
    });
  };

  const handleAction = () => {
    if (method === 'phone' && !isOtpSent) {
      if (inputValue.length < 10) {
        alert("System Refusal: Valid 10-digit mobile protocol required.");
        return;
      }
      simulateLoading(() => {
        setIsOtpSent(true);
        // Simulate Twilio SMS delivery
        console.log(`Twilio: SMS OTP sent to +91${inputValue}`);
      });
      return;
    }

    if (isOtpSent && otp.length < 4) {
      alert("System Refusal: Security sequence incomplete.");
      return;
    }
    
    // Check for admin identities
    const isAdminUser = inputValue === 'admin@humanclub.com' || inputValue === 'staff@humanclub.com' || inputValue === '9876543210';
    const role = isAdminUser ? 'admin' : 'customer';

    simulateLoading(() => {
      setIsVerified(true);
      setTimeout(() => {
        onLogin({
          id: 'u-' + Math.random().toString(36).substr(2, 9),
          name: method === 'phone' ? `Member ${inputValue.slice(-4)}` : inputValue.split('@')[0],
          [method === 'phone' ? 'phone' : 'email']: inputValue,
          role: role
        });
        onClose();
      }, 800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-[440px] bg-[#050505] border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-500">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 hover:bg-white/5 rounded-full text-zinc-600 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-40 bg-zinc-900/50 flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <h1 className="relative text-2xl font-serif-premium tracking-[0.8em] font-bold text-premium-gold text-glow">THE HUMAN CLUB</h1>
          <p className="relative text-[8px] uppercase tracking-[0.5em] text-zinc-600 mt-4 font-bold">Identity Protocol v4.2</p>
        </div>

        <div className="p-10 md:p-14">
          {isVerified ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <div className="text-center space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">Identity Verified</p>
                <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-500">Synchronizing Archive Access...</p>
              </div>
            </div>
          ) : loading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-pulse">
              <RefreshCw className="w-10 h-10 text-premium-gold animate-spin" />
              <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-500">Negotiating Secure Junction...</p>
            </div>
          ) : method === 'options' ? (
            <div className="space-y-4">
              <button 
                onClick={() => setMethod('phone')}
                className="w-full flex items-center justify-between px-8 py-5 bg-white text-black hover:bg-premium-gold transition-all duration-500 group"
              >
                <div className="flex items-center gap-5">
                  <Smartphone className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Mobile Number via SMS</span>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-[0.6em] text-zinc-700 bg-[#050505] px-4">Cloud Identity</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 py-5 border border-white/5 hover:bg-white/5 transition-all">
                  <Chrome className="w-4 h-4 text-zinc-500" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Gmail</span>
                </button>
                <button onClick={() => setMethod('email')} className="flex items-center justify-center gap-3 py-5 border border-white/5 hover:bg-white/5 transition-all">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Email</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-[0.4em] text-zinc-700 font-bold block ml-1">
                  {method === 'phone' ? 'Mobile Reference' : 'Email Reference'}
                </label>
                <div className="flex gap-3">
                  {method === 'phone' && (
                    <span className="flex items-center px-5 bg-zinc-900 border border-white/5 text-[11px] text-zinc-400 font-mono font-bold">+91</span>
                  )}
                  <input 
                    autoFocus
                    type={method === 'phone' ? 'tel' : 'email'}
                    placeholder={method === 'phone' ? '00000 00000' : 'IDENTITY@ATELIER.COM'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/5 p-4 text-sm tracking-widest focus:outline-none focus:border-premium-gold transition-colors placeholder:text-zinc-800 text-white font-mono"
                  />
                </div>
              </div>

              {isOtpSent && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-zinc-700 font-bold block ml-1">SMS Secure Code</label>
                    <button className="text-[8px] text-premium-gold uppercase tracking-widest hover:underline">Resend</button>
                  </div>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="• • • • • •"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/5 p-5 text-center text-xl tracking-[1em] focus:outline-none focus:border-premium-gold transition-colors font-mono text-premium-gold"
                  />
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-[8px] text-zinc-600 uppercase tracking-widest font-bold">Twilio Gateway Secure Connection</p>
                  </div>
                </div>
              )}

              <button 
                onClick={handleAction}
                className="w-full py-5 bg-premium-gold text-black font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all hover:bg-white"
              >
                {isOtpSent ? 'Verify Identity' : 'Transmit Access Request'}
              </button>

              <button 
                onClick={() => { setMethod('options'); setIsOtpSent(false); }}
                className="w-full text-[9px] uppercase tracking-[0.4em] text-zinc-600 hover:text-zinc-400 transition-colors font-bold"
              >
                Switch Channel
              </button>
            </div>
          )}

          <div className="mt-14 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
             <div className="flex items-center gap-3 text-zinc-800">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Encrypted Human Verification Protocol</span>
             </div>
             <p className="text-[7px] text-zinc-900 uppercase tracking-widest text-center leading-relaxed">
               All identity data is temporary and purged according to the Global Privacy Directive for the Human Collective.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
