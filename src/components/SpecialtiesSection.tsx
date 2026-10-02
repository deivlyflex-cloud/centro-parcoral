import React, { useState } from 'react';
import { 
  Stethoscope, HeartPulse, Baby, UserCheck, Activity, Eye, Sparkles, Smile,
  Calendar, Check, ArrowRight, Clock, ShieldCheck
} from 'lucide-react';
import { SPECIALTIES, Specialty } from '../data/medicalData';

interface SpecialtiesSectionProps {
  onSelectSpecialty: (specialtyId: string) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ onSelectSpecialty }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clinical' | 'surgical'>('all');
  const [activeModalSpec, setActiveModalSpec] = useState<Specialty | null>(null);

  const getSpecialtyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-teal-800" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'Baby': return <Baby className="w-5 h-5 text-sky-600" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-purple-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-amber-600" />;
      case 'Eye': return <Eye className="w-5 h-5 text-indigo-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-600" />;
      case 'Smile': return <Smile className="w-5 h-5 text-emerald-600" />;
      default: return <Stethoscope className="w-5 h-5 text-teal-800" />;
    }
  };

  const filtered = SPECIALTIES.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="especialidades" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              Corpo Clínico Integrado
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight [text-wrap:balance]">
              Especialidades Médicas & Cuidados Diferenciados
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Acompanhamento rigoroso em todas as etapas da vida com consultas presenciais detalhadas e equipamentos com calibração hospitalar.
            </p>
          </div>

          {/* Interactive Segmented Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas as Especialidades ({SPECIALTIES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('clinical')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'clinical'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Consultas Clínicas
            </button>
            <button
              onClick={() => setSelectedCategory('surgical')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'surgical'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cirúrgicas & Saúde Oral
            </button>
          </div>
        </div>

        {/* Bento Grid of Specialties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((spec) => (
            <div
              key={spec.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-teal-700/60 hover:shadow-lg hover:shadow-slate-200/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getSpecialtyIcon(spec.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 tabular-nums flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {spec.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-teal-900 transition-colors">
                  {spec.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {spec.description}
                </p>

                {/* Common Indications */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide block">
                    Principais Indicações:
                  </span>
                  {spec.indications.slice(0, 2).map((ind, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action & Fee */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Valor Base</span>
                  <span className="text-xs font-bold text-slate-900">{spec.consultationFee}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectSpecialty(spec.id)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-900 group-hover:translate-x-0.5 transition-all p-1.5 cursor-pointer"
                >
                  <span>Agendar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner Below Specialties */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                Cobertura com INPS & Principais Seguradoras
              </div>
              <div className="text-xs text-slate-600">
                Apresente o seu cartão de seguro ou número de beneficiário para usufruir da comparticipação no ato da consulta.
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectSpecialty('')}
            className="px-4 py-2 text-xs font-bold text-teal-900 bg-white hover:bg-teal-50 border border-slate-200 rounded-lg shadow-sm whitespace-nowrap cursor-pointer transition-colors"
          >
            Ver Calendário Global
          </button>
        </div>

      </div>
    </section>
  );
};
