import React from 'react';
import { INSURANCES } from '../data/medicalData';
import { Shield, CheckCircle, FileText, HelpCircle } from 'lucide-react';

export const InsurancesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-teal-700" />
            <span>Acesso Facilitado aos Cuidados de Saúde</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Convenções, Seguros de Saúde & Parcerias
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Trabalhamos com as principais seguradoras e sistemas de previdência social para assegurar que os melhores cuidados médicos estejam ao seu alcance com copagamentos reduzidos.
          </p>
        </div>

        {/* Insurance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INSURANCES.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:border-teal-700/60 hover:bg-teal-50/20 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-800 block mb-1">
                  {item.type}
                </span>
                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-medium text-emerald-800 flex items-start gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item.coverage}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Instructions Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-teal-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Como Usufruir da Sua Convenção</span>
            </div>
            <h4 className="text-lg font-bold font-display text-white">
              Basta apresentar o documento de identificação e o cartão do seguro
            </h4>
            <p className="text-xs text-teal-100/80 max-w-2xl leading-relaxed">
              A nossa receção trata da autorização e faturação direta junto da sua seguradora. Para beneficiários particulares ou com outros seguros internacionais, emitimos fatura-recibo detalhada com codificação médica internacional (CIE-10).
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#contactos"
              className="px-4 py-2.5 bg-white hover:bg-teal-50 text-teal-950 text-xs font-bold rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-teal-800" />
              <span>Dúvidas sobre o seu Plano?</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
