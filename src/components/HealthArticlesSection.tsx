import React, { useState } from 'react';
import { HEALTH_ARTICLES, HealthArticle } from '../data/medicalData';
import { BookOpen, Clock, ArrowRight, User, X, Calendar } from 'lucide-react';

interface HealthArticlesSectionProps {
  onOpenBooking: () => void;
}

export const HealthArticlesSection: React.FC<HealthArticlesSectionProps> = ({ onOpenBooking }) => {
  const [readingArticle, setReadingArticle] = useState<HealthArticle | null>(null);

  return (
    <section id="prevencao" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-700" />
              <span>Educação para a Saúde</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight [text-wrap:balance]">
              Espaço Saúde & Medicina Preventiva
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Orientações clínicas e recomendações práticas redigidas pelos médicos especialistas do Centro Médico Porcelana para cuidar de si e da sua família.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEALTH_ARTICLES.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-teal-800">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 leading-snug group-hover:text-teal-900 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[11px]">
                    {art.authorName.charAt(3) || 'D'}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block leading-none">{art.authorName}</span>
                    <span className="text-[10px] text-slate-500">{art.authorRole}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setReadingArticle(art)}
                  className="text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  <span>Ler Artigo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal for Reading Full Article */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold uppercase tracking-wider">
                  <span>{readingArticle.category}</span>
                  <span>·</span>
                  <span>{readingArticle.date}</span>
                </div>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight mb-4">
                {readingArticle.title}
              </h3>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-6 text-xs text-slate-700">
                <div className="w-9 h-9 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold">
                  {readingArticle.authorName.charAt(3) || 'D'}
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">{readingArticle.authorName}</strong>
                  <span className="text-slate-500">{readingArticle.authorRole} no Centro Médico Porcelana</span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {readingArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-xs text-slate-500">
                  Tem dúvidas sobre a sua saúde? Agende uma avaliação presencial.
                </span>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setReadingArticle(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex-1 sm:flex-initial"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setReadingArticle(null);
                      onOpenBooking();
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Marcar Consulta</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
