import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS_DATA } from '../data/racingData';
import { soundFX } from '../utils/audio';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'ALL MEDIA' },
    { id: 'Action', label: 'ON-TRACK ACTION' },
    { id: 'Night Racing', label: 'NIGHT RACING' },
    { id: 'Paddock', label: 'PIT & PADDOCK' },
    { id: 'Cars', label: 'THE MACHINES' },
    { id: 'Trophies', label: 'TROPHIES' },
  ];

  const filteredItems = GALLERY_ITEMS_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const openViewer = (index: number) => {
    soundFX.playTelemetryClick();
    setViewerIndex(index);
  };

  const closeViewer = () => {
    setViewerIndex(null);
  };

  const nextImage = () => {
    if (viewerIndex !== null) {
      soundFX.playTelemetryClick();
      setViewerIndex((viewerIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (viewerIndex !== null) {
      soundFX.playTelemetryClick();
      setViewerIndex((viewerIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>CINEMATIC ARCHIVE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            CHAMPIONSHIP GALLERY <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            High-contrast photography capturing titanium sparks, split-second pit stops, and high-G cornering.
          </p>
        </div>

        {/* Category Filters */}
        <div className="inline-flex flex-wrap p-1 bg-black/60 border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFX.playTelemetryClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 text-xs font-heading font-black italic uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openViewer(idx)}
            className="group relative h-64 overflow-hidden bg-black/50 border border-white/10 hover:border-red-600/60 transition-all duration-300 cursor-pointer shadow-xl"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Hover overlay content */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <span className="text-[9px] font-telemetry uppercase text-red-500 font-black tracking-widest block mb-1">
                  {item.category.toUpperCase()} • {item.location}
                </span>
                <h3 className="font-heading text-base font-black italic uppercase text-white leading-tight">
                  {item.title}
                </h3>
              </div>
              <div className="p-1.5 bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {viewerIndex !== null && filteredItems[viewerIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <button
            onClick={closeViewer}
            className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-3 sm:left-6 p-2.5 bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer border border-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-3 sm:right-6 p-2.5 bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer border border-white/10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image & Caption */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[viewerIndex].imageUrl}
              alt={filteredItems[viewerIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto object-contain border border-white/20 shadow-2xl"
            />
            <div className="text-center mt-3 font-telemetry">
              <span className="text-[10px] text-red-500 uppercase font-black tracking-widest">
                {filteredItems[viewerIndex].location} • {filteredItems[viewerIndex].category.toUpperCase()}
              </span>
              <h3 className="font-heading text-xl font-black italic uppercase text-white mt-0.5">
                {filteredItems[viewerIndex].title}
              </h3>
              <p className="text-xs text-white/50 mt-0.5 max-w-lg mx-auto">
                {filteredItems[viewerIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

