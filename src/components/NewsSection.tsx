import React, { useState } from 'react';
import { Newspaper, Clock, ArrowRight, X, User, Tag, Share2 } from 'lucide-react';
import { NEWS_ARTICLES_DATA } from '../data/racingData';
import { NewsArticle } from '../types';
import { soundFX } from '../utils/audio';

export const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <section id="news" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Newspaper className="w-3.5 h-3.5" />
            <span>PADDOCK INSIDER</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            NEWS & RACE REPORTS <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Exclusive paddock reports, technical aerodynamic dissections, and breaking driver market scoops.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {NEWS_ARTICLES_DATA.map((article) => (
          <div
            key={article.id}
            id={`news-card-${article.id}`}
            onClick={() => {
              soundFX.playTelemetryClick();
              setSelectedArticle(article);
            }}
            className="bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 shadow-xl overflow-hidden group cursor-pointer flex flex-col justify-between backdrop-blur-md"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative h-44 overflow-hidden bg-black/40">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 bg-red-600 text-white font-telemetry font-black text-[9px] uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 text-[9px] font-telemetry text-white/60 flex items-center gap-1 bg-black/80 px-2 py-0.5 border border-white/10">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-4">
                <div className="text-[10px] font-telemetry text-white/40 mb-1.5 uppercase">
                  {article.date} • {article.author}
                </div>
                <h3 className="font-heading text-lg font-black italic uppercase text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-1.5 leading-tight">
                  {article.title}
                </h3>
                <p className="text-[11px] font-telemetry text-white/50 line-clamp-3 leading-relaxed">
                  {article.subtitle}
                </p>
              </div>
            </div>

            {/* Read Article Link */}
            <div className="p-4 pt-0">
              <div className="flex items-center gap-1 text-[11px] font-heading font-black italic text-red-500 uppercase tracking-wider group-hover:text-red-400">
                <span>READ FULL DISPATCH</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Modal Reader */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0c] border border-white/20 p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-1.5 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="mb-3">
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-telemetry font-black text-[10px] uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <div className="text-xs font-telemetry text-white/40 mt-2">
                {selectedArticle.date} • By {selectedArticle.author} • {selectedArticle.readTime}
              </div>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tight mb-4">
              {selectedArticle.title}
            </h2>

            <div className="relative h-64 sm:h-80 overflow-hidden mb-5 bg-black border border-white/10">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content paragraphs */}
            <div className="text-white/80 text-xs sm:text-sm leading-relaxed space-y-3 font-telemetry">
              <p className="font-bold text-white text-sm leading-relaxed border-l-2 border-red-600 pl-3">
                {selectedArticle.subtitle}
              </p>
              {selectedArticle.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

