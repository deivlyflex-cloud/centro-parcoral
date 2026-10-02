import React, { useState } from 'react';
import { Calendar, ShieldCheck, Clock, Award, ArrowRight, Search, Activity } from 'lucide-react';
import { SPECIALTIES } from '../data/medicalData';

interface HeroProps {
  onOpenBooking: (specialtyId?: string) => void;
  onOpenPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenPortal }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedSpecialty || undefined);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/90 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid: Headline + Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Proposition & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quiet Editorial Tag (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <span className="flex h-2 w-2 rounded-full bg-teal-600"></span>
              <span>Centro Clínico & Diagnóstico Especializado</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Praia, Cabo Verde</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.12] [text-wrap:balance]">
              Saúde de excelência com diagnóstico rigoroso e cuidado humano.
            </h1>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              No <strong className="font-semibold text-slate-900">Centro Médico Porcelana</strong>, unimos um corpo clínico sénior multidisciplinar, análises laboratoriais com resultados no mesmo dia e tecnologia imagiológica de ponta.
            </p>

            {/* Quick Consultation Selector Form */}
            <div className="pt-2">
              <form 
                onSubmit={handleQuickBook}
                className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row gap-3 items-stretch max-w-xl"
              >
                <div className="relative flex-1">
                  <label htmlFor="quick-specialty" className="sr-only">Selecione a Especialidade</label>
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <select
                    id="quick-specialty"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700 transition-colors"
                  >
                    <option value="">Qual a especialidade ou exame pretendido?</option>
                    {SPECIALTIES.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.name} ({spec.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Marcar Consulta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 pl-1">
                <span>Atendimento presencial e teleconsulta</span>
                <span aria-hidden="true">·</span>
                <button 
                  onClick={onOpenPortal}
                  className="text-teal-800 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Consultar resultado de exame já realizado</span>
                </button>
              </div>
            </div>

            {/* Claim-to-Proof Adjacency Stats */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/90 max-w-2xl">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tabular-nums">
                  +8
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Especialidades Médicas
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-teal-800 tabular-nums">
                  07h30
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Abertura Segunda a Sáb.
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tabular-nums">
                  3 Horas
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Análises de Rotina
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-700">
                  INPS
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  & Seguros Convencionados
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Focal Anchor */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200 bg-white aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/src/assets/images/hero_medical_center_1790924850634.jpg"
                alt="Instalações modernas e acolhedoras do Centro Médico Porcelana"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Measured Scrim for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Inset Badge Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white p-4 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-1.5 text-white">
                      <Award className="w-4 h-4 text-teal-300" />
                      <span>Excelência e Segurança Clínica</span>
                    </div>
                    <p className="text-xs text-slate-200 mt-1">
                      Instalações com esterilização cirúrgica e ecografia 4D de alta definição.
                    </p>
                  </div>
                  <div className="hidden sm:block text-right shrink-0 pl-3">
                    <span className="text-[11px] text-teal-300 font-mono font-medium block">
                      Acreditação Sanitária
                    </span>
                    <span className="text-xs font-semibold text-white">
                      Certificado CV-2026
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Card Floating */}
            <div className="hidden sm:flex items-center gap-3.5 absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xl max-w-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Marcações Imediatas</span>
                <span className="text-slate-500">Confirmação instantânea por SMS e email</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3.5 absolute -top-4 -right-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs pr-2">
                <span className="font-bold text-slate-900 block">Médicos Certificados</span>
                <span className="text-slate-500">Ordem dos Médicos</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
