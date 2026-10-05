import React from 'react';
import { Layers, ShieldCheck, Feather, Sparkles, BookOpen, Clock } from 'lucide-react';

export const BinderySection: React.FC = () => {
  return (
    <section id="bindery" className="py-16 sm:py-24 bg-[#1C1917] text-[#FAF8F5] relative overflow-hidden">
      {/* Background motif */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FAF8F5 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#C5A880] font-semibold block mb-2">
            The London Bindery & Press
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            The Tactile Anatomy of Our Editions
          </h2>
          <p className="font-reading text-sm text-[#A8A29E] mt-3 leading-relaxed">
            In an era of fleeting pixels, we believe the physical book is an enduring sanctuary. 
            Every Folio & Quill edition is crafted to outlive its reader.
          </p>
        </div>

        {/* 4 Craft Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-[#262320] border border-[#3A3632] rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-[#332E29] border border-[#48423B] flex items-center justify-center text-[#C5A880] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-[#F5F2EB] mb-2">
                Smyth-Sewn Signatures
              </h3>
              <p className="font-reading text-xs text-[#B5AEA4] leading-relaxed">
                Pages are grouped into 16-page signatures and sewn with unbleached linen thread. The book opens completely flat on your desk without cracking the spine.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#3A3632] text-[11px] font-mono text-[#C5A880]">
              Lays Flat · Zero Plastic Glues
            </div>
          </div>

          <div className="p-6 bg-[#262320] border border-[#3A3632] rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-[#332E29] border border-[#48423B] flex items-center justify-center text-[#C5A880] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-[#F5F2EB] mb-2">
                Acid-Free Munken Paper
              </h3>
              <p className="font-reading text-xs text-[#B5AEA4] leading-relaxed">
                Milled in Sweden from certified sustainable forestry. Buffered to resist yellowing and embrittlement for over three hundred years.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#3A3632] text-[11px] font-mono text-[#C5A880]">
              120gsm Pure Cream · ISO 9706
            </div>
          </div>

          <div className="p-6 bg-[#262320] border border-[#3A3632] rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-[#332E29] border border-[#48423B] flex items-center justify-center text-[#C5A880] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-[#F5F2EB] mb-2">
                Hot-Foil Stamping & Cloth
              </h3>
              <p className="font-reading text-xs text-[#B5AEA4] leading-relaxed">
                Cased in heavy buckram and fine book cloth imported from Bergamo, then struck with brass dies at 280°F using metallic gold and copper foils.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#3A3632] text-[11px] font-mono text-[#C5A880]">
              Tactile Embossing · Hand-tooled
            </div>
          </div>

          <div className="p-6 bg-[#262320] border border-[#3A3632] rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-[#332E29] border border-[#48423B] flex items-center justify-center text-[#C5A880] mb-4">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-[#F5F2EB] mb-2">
                Archival Parcel Dispatch
              </h3>
              <p className="font-reading text-xs text-[#B5AEA4] leading-relaxed">
                Every order is wrapped by hand in heavy unbleached kraft paper, tied with hemp twine, and stamped with our red beeswax colophon seal.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#3A3632] text-[11px] font-mono text-[#C5A880]">
              Worldwide Tracked · Gift Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
