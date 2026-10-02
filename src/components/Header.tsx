import React, { useState } from 'react';
import { Calendar, FileText, Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (specialtyId?: string, doctorId?: string) => void;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Emergency & Quick Info Top Bar Alert */}
      <div className="bg-teal-900 text-teal-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-teal-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Atendimento Permanente
            </span>
            <span className="hidden sm:inline text-teal-300/60">·</span>
            <span className="hidden sm:inline text-teal-200">Segunda a Sábado 07h30 – 21h00</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:+2382614455" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium text-teal-200"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
              <span>Linha Direta: (+238) 261 4455</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Zone 1: Brand, Zone 2: Nav, Zone 3: Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single element brand mark */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1"
        >
          <div className="w-11 h-11 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-900/10 group-hover:bg-teal-700 transition-colors">
            {/* Elegant porcelain cross icon */}
            <svg 
              className="w-6 h-6 text-teal-50" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 3v18M3 12h18" />
              <circle cx="12" cy="12" r="9" strokeWidth="1.6" className="opacity-40" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-extrabold tracking-tight text-slate-900 leading-none">
              Centro Médico Porcelana
            </span>
            <span className="text-[11px] font-medium text-teal-800 tracking-wider uppercase mt-1">
              Saúde · Diagnóstico · Excelência
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <a href="#especialidades" className="hover:text-teal-700 transition-colors py-1">
            Especialidades
          </a>
          <a href="#exames" className="hover:text-teal-700 transition-colors py-1">
            Exames & Laboratório
          </a>
          <a href="#corpo-clinico" className="hover:text-teal-700 transition-colors py-1">
            Corpo Clínico
          </a>
          <a href="#triagem" className="hover:text-teal-700 transition-colors py-1">
            Guia de Sintomas
          </a>
          <a href="#prevencao" className="hover:text-teal-700 transition-colors py-1">
            Saúde & Artigos
          </a>
          <a href="#contactos" className="hover:text-teal-700 transition-colors py-1">
            Contactos
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenPortal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/90 whitespace-nowrap cursor-pointer"
            title="Consulte os resultados de análises ou gerencie consultas"
          >
            <FileText className="w-3.5 h-3.5 text-teal-700" />
            <span>Resultados de Exames</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-teal-200" />
            <span>Marcar Consulta</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 text-xs font-bold text-white bg-teal-800 rounded-lg"
          >
            Marcar
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-800">
            <a 
              href="#especialidades" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-800"
            >
              Especialidades Médicas
            </a>
            <a 
              href="#exames" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-800"
            >
              Exames & Laboratório
            </a>
            <a 
              href="#corpo-clinico" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-800"
            >
              Corpo Clínico
            </a>
            <a 
              href="#triagem" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-800"
            >
              Guia Rápido de Sintomas
            </a>
            <a 
              href="#prevencao" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-800"
            >
              Saúde & Artigos
            </a>
            <a 
              href="#contactos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-800"
            >
              Contactos & Localização
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-teal-700" />
              <span>Ver Resultados de Exames</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Consulta Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
