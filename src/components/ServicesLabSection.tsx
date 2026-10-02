import React, { useState } from 'react';
import { 
  FlaskConical, Activity, Clock, FileCheck, CheckCircle2, 
  HelpCircle, ArrowRight, Download, Search, AlertCircle
} from 'lucide-react';
import { EXAMS, SAMPLE_TEST_RESULTS, ExamService } from '../data/medicalData';

interface ServicesLabSectionProps {
  onOpenBooking: (specialtyId?: string) => void;
  onOpenPortal: (code?: string) => void;
}

export const ServicesLabSection: React.FC<ServicesLabSectionProps> = ({ 
  onOpenBooking,
  onOpenPortal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchCode, setSearchCode] = useState<string>('CMP-2026-9842');
  const [selectedExamForPrep, setSelectedExamForPrep] = useState<ExamService | null>(null);

  const categories = ['Todos', 'Laboratório', 'Imagiologia', 'Cardiologia', 'Check-up'];

  const filteredExams = EXAMS.filter((exam) => {
    if (activeCategory === 'Todos') return true;
    return exam.category === activeCategory;
  });

  const handleSearchExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      onOpenPortal(searchCode.trim().toUpperCase());
    }
  };

  return (
    <section id="exames" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Diagnóstico de Alta Resolução
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Laboratório Próprio de Análises & Centro de Imagiologia
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Resultados rigorosos com calibração diária e tecnologia automatizada. Faça os seus exames de manhã e consulte os relatórios digitais no mesmo dia.
          </p>
        </div>

        {/* Highlight Grid: Lab Presentation & Quick Result Checker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-center">
          
          {/* Left: High-fidelity Lab Photo & Highlights */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/10] bg-slate-900">
              <img
                src="/src/assets/images/clinical_laboratory_1790924875517.jpg"
                alt="Laboratório de análises clínicas robotizado do Centro Médico Porcelana"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                  <FlaskConical className="w-4 h-4" />
                  <span>Laboratório de Bioquímica, Hematologia e Microbiologia</span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Controlo de Qualidade com Resultados em poucas Horas
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Processamento robotizado com rastreabilidade por código de barras e validação médica antes da disponibilização online.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quick Online Test Results Lookup Box */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Consultar Resultados Online
                </h3>
                <span className="text-xs text-slate-500">
                  Aceda aos seus relatórios laboratoriais e imagiológicos
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Insira o código impresso no seu talão de colheita ou enviado por SMS para visualizar os parâmetros de referência e descarregar o relatório assinado digitalmente.
            </p>

            <form onSubmit={handleSearchExam} className="space-y-3">
              <div>
                <label htmlFor="exam-code-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Código de Requisição / Análise
                </label>
                <div className="relative">
                  <input
                    id="exam-code-input"
                    type="text"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    placeholder="Ex: CMP-2026-9842"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Exemplo demonstrativo:</span>
                <button
                  type="button"
                  onClick={() => setSearchCode('CMP-2026-9842')}
                  className="font-mono text-teal-800 font-semibold hover:underline cursor-pointer"
                >
                  CMP-2026-9842
                </button>
                <span>ou</span>
                <button
                  type="button"
                  onClick={() => setSearchCode('CMP-2026-4411')}
                  className="font-mono text-teal-800 font-semibold hover:underline cursor-pointer"
                >
                  CMP-2026-4411
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Aceder ao Relatório Clínico</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Dados encriptados de ponta a ponta
              </span>
              <span className="font-mono">RGPD / ISO 15189</span>
            </div>
          </div>

        </div>

        {/* Filterable Exam Directory */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900">
                Catálogo de Exames & Diagnósticos
              </h3>
              <p className="text-xs text-slate-500">
                Consulte horários de colheita e tempos médios de entrega de resultados.
              </p>
            </div>

            {/* Filter Pills / Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-teal-800 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl border border-slate-200/90 p-4 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                      {exam.category}
                    </span>
                    {exam.fastingRequired && (
                      <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        Requer Jejum
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {exam.title}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                    {exam.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{exam.deliveryTime}</span>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedExamForPrep(exam)}
                    className="text-xs text-slate-600 hover:text-teal-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Como preparar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking()}
                    className="text-xs font-bold text-teal-800 hover:text-teal-900 cursor-pointer"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Guide Modal */}
        {selectedExamForPrep && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Instruções de Preparação de Exame</span>
                </div>
                <button
                  onClick={() => setSelectedExamForPrep(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2 font-display">
                {selectedExamForPrep.title}
              </h4>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2 mb-4 leading-relaxed">
                <div>
                  <strong className="block text-slate-900 mb-1">Requisitos:</strong>
                  {selectedExamForPrep.preparationInstructions}
                </div>
                <div>
                  <strong className="block text-slate-900 mb-1">Prazo de Entrega:</strong>
                  {selectedExamForPrep.deliveryTime}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedExamForPrep(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Entendido
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedExamForPrep(null);
                    onOpenBooking();
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg"
                >
                  Marcar este Exame
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
