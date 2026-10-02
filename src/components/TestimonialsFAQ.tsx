import React, { useState } from 'react';
import { TESTIMONIALS, FAQS } from '../data/medicalData';
import { Star, ChevronDown, MessageSquareQuote, HelpCircle, CheckCircle2 } from 'lucide-react';

export const TestimonialsFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* PART 1: TESTIMONIALS */}
        <div>
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4 text-teal-700" />
              <span>A Confiança dos Nossos Pacientes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight [text-wrap:balance]">
              Histórias Reais de Cuidado & Rigor Clínico
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              O testemunho de quem confia a sua saúde e a da sua família à equipa do Centro Médico Porcelana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{test.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 font-bold block">{test.author}</strong>
                    <span className="text-slate-500 text-[11px]">{test.role}</span>
                  </div>
                  <span className="text-teal-800 font-medium text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                    {test.specialty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: FREQUENTLY ASKED QUESTIONS */}
        <div className="pt-6 border-t border-slate-200">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-700" />
              <span>Esclarecimento de Dúvidas</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Perguntas Frequentes dos Nossos Utentes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Tudo o que precisa de saber antes da sua consulta, preparação de exames ou funcionamento com o INPS.
            </p>
          </div>

          <div className="max-w-3xl space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-teal-900 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-teal-800' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
