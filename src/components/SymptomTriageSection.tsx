import React, { useState } from 'react';
import { SYMPTOM_TRIAGE_GUIDE } from '../data/medicalData';
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, PhoneCall } from 'lucide-react';

interface SymptomTriageSectionProps {
  onSelectSpecialty: (specialtyId: string) => void;
}

export const SymptomTriageSection: React.FC<SymptomTriageSectionProps> = ({ onSelectSpecialty }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('cardio');

  const activeGuide = SYMPTOM_TRIAGE_GUIDE.find((g) => g.id === selectedGuideId) || SYMPTOM_TRIAGE_GUIDE[0];

  const getSpecialtyIdByName = (name: string) => {
    if (name.includes('Cardio')) return 'cardiologia';
    if (name.includes('Geral')) return 'medicina-geral';
    if (name.includes('Pediatria')) return 'pediatria';
    if (name.includes('Ortopedia')) return 'ortopedia';
    if (name.includes('Oftalmo')) return 'oftalmologia';
    return 'medicina-geral';
  };

  return (
    <section id="triagem" className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>Apoio à Decisão Clínica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight [text-wrap:balance]">
            Guia Rápido de Sintomas: Encontre o Médico Certo
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal">
            Dúvidas sobre a que especialista recorrer? Selecione a sua queixa ou área corporal para obter uma orientação clínica imediata e recomendação do profissional mais indicado.
          </p>
        </div>

        {/* Triage Interactive Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Category Selector Buttons */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Selecione o Grupo de Queixas:
            </span>

            {SYMPTOM_TRIAGE_GUIDE.map((guide) => {
              const isSelected = selectedGuideId === guide.id;
              return (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all border cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-teal-950/80 border-teal-500 text-white shadow-lg'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{guide.category}</span>
                    <span className="text-xs text-slate-400">
                      {guide.symptoms.length} sintomas frequentes
                    </span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-teal-400' : 'text-slate-500'}`} />
                </button>
              );
            })}

            {/* Emergency Notice */}
            <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-xs text-rose-200 mt-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Situação de Emergência Médica Vital?</span>
              </div>
              <p className="leading-relaxed">
                Em caso de dor súbita e intensa no peito, perda de consciência ou dificuldade respiratória grave, ligue imediatamente para a Emergência Nacional (130) ou dirija-se ao nosso serviço.
              </p>
              <a
                href="tel:+2382614455"
                className="inline-flex items-center gap-1.5 font-bold text-white hover:underline pt-1"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>Ligar para Urgência Porcelana (+238 261 4455)</span>
              </a>
            </div>
          </div>

          {/* Right: Detailed Recommendation Box */}
          <div className="lg:col-span-8 bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div>
                <span className="text-xs text-teal-400 font-mono font-medium block">
                  Orientação para: {activeGuide.category}
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-0.5">
                  {activeGuide.recommendedSpecialty}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Nível de Urgência</span>
                <span className="text-xs font-semibold text-teal-300">
                  {activeGuide.urgencyLevel}
                </span>
              </div>
            </div>

            {/* Symptoms list */}
            <div>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                Sintomas Típicos Identificados:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeGuide.symptoms.map((symptom, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical advice */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
              <strong className="text-white block mb-1">Recomendação da Equipa Médica:</strong>
              {activeGuide.advice}
            </div>

            {/* Specialist lead and booking action */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-700/80">
              <div>
                <span className="text-xs text-slate-400 block">Médico Responsável no Centro:</span>
                <span className="text-sm font-bold text-white">{activeGuide.recommendedDoctor}</span>
              </div>

              <button
                type="button"
                onClick={() => onSelectSpecialty(getSpecialtyIdByName(activeGuide.recommendedSpecialty))}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Marcar Consulta de {activeGuide.recommendedSpecialty.split('&')[0].trim()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
