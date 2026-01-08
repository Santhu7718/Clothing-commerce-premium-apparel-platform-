
import React, { useState } from 'react';
import { Send, Sparkles, Wand2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const CustomDesignForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      // Fixed: Initialize GoogleGenAI strictly with the named parameter for API key from environment variables.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Fixed: Using gemini-3-pro-preview for advanced reasoning and creative design proposals as it is a complex text task.
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Act as a luxury fashion designer for Vantablack Apparel. A customer wants a custom t-shirt design with the following request: "${description}". Provide a sophisticated, professional critique and an elevated design proposal that aligns with high-end architectural fashion. Keep the response elegant and under 150 words.`,
      });

      // Fixed: accessing the .text property of the response object according to the SDK's GenerateContentResponse structure.
      setResult(response.text || 'Our designers are contemplating your vision. Please try again.');
    } catch (err) {
      setResult('The muse is silent at the moment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="bespoke" className="py-24 px-6 md:px-12 bg-zinc-950">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <span className="text-premium-gold text-xs uppercase tracking-[0.4em] font-medium">Atelier Bespoke</span>
          <h2 className="text-4xl md:text-6xl font-serif-premium font-bold mt-4 mb-8">Conceptualize <br/><span className="text-zinc-500">Your Vision</span></h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-8">
            Collaborate with our AI-enhanced design team to create a one-of-a-kind garment. 
            Describe your aesthetic, mood, or structural preferences.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Minimalist brutalism, matte textures, draped silhouette in midnight navy..."
                className="w-full h-40 bg-zinc-900 border border-zinc-800 p-6 text-sm font-light focus:outline-none focus:border-premium-gold transition-colors resize-none placeholder:text-zinc-700"
              />
              <div className="absolute bottom-4 right-4 text-zinc-600">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            
            <button 
              disabled={loading}
              className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-zinc-800 text-white hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Wand2 className="w-5 h-5 animate-spin" />
                  <span>Invoking the Muse...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Submit Proposal</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:w-1/2 w-full h-full min-h-[400px] glass-panel p-8 md:p-12 relative flex items-center justify-center">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h3 className="text-premium-gold text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Designer's Response
              </h3>
              <p className="text-zinc-200 italic font-serif-premium text-lg leading-relaxed mb-8">
                "{result}"
              </p>
              <div className="flex gap-4">
                <button className="text-xs uppercase tracking-widest font-bold border-b border-premium-gold pb-1 hover:text-premium-gold transition-colors">Confirm Concept</button>
                <button onClick={() => setResult(null)} className="text-xs uppercase tracking-widest font-bold text-zinc-500 hover:text-white transition-colors">Revise</button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-8 h-8 text-zinc-700" />
              </div>
              <p className="text-zinc-600 font-serif-premium tracking-widest italic">Awaiting your conceptual input...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
