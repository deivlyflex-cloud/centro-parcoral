import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenPortal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center">
                <svg 
                  className="w-5 h-5 text-teal-100" 
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
              <span className="text-lg font-display font-bold text-white tracking-tight">
                Centro Médico Porcelana
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Unidade de saúde privada de referência em Cabo Verde, dedicada a consultas de especialidade, exames de diagnóstico de alta resolução e medicina preventiva humanizada.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-teal-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Licença Sanitária n.º 084/DGS/2026</span>
            </div>
          </div>

          {/* Quick Links 1: Especialidades */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Especialidades
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#especialidades" className="hover:text-white transition-colors">Cardiologia & Vascular</a></li>
              <li><a href="#especialidades" className="hover:text-white transition-colors">Pediatria & Puericultura</a></li>
              <li><a href="#especialidades" className="hover:text-white transition-colors">Ginecologia & Obstetrícia</a></li>
              <li><a href="#especialidades" className="hover:text-white transition-colors">Medicina Geral e Familiar</a></li>
              <li><a href="#especialidades" className="hover:text-white transition-colors">Ortopedia & Traumatologia</a></li>
              <li><a href="#especialidades" className="hover:text-white transition-colors">Medicina Dentária</a></li>
            </ul>
          </div>

          {/* Quick Links 2: Utentes */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Serviços aos Utentes
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={onOpenPortal} className="hover:text-white transition-colors text-left cursor-pointer">
                  Portal do Paciente
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-white transition-colors text-left cursor-pointer">
                  Resultados de Análises
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  Agendamento Online
                </button>
              </li>
              <li><a href="#exames" className="hover:text-white transition-colors">Guia de Preparação de Exames</a></li>
              <li><a href="#triagem" className="hover:text-white transition-colors">Triagem de Sintomas</a></li>
              <li><a href="#prevencao" className="hover:text-white transition-colors">Artigos de Saúde</a></li>
            </ul>
          </div>

          {/* Urgent & Contact */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Linha de Apoio
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Telefone Geral:</span>
                <a href="tel:+2382614455" className="text-white font-bold hover:text-teal-300">
                  (+238) 261 4455
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Urgência / Triagem:</span>
                <a href="tel:+2382614456" className="text-teal-400 font-bold hover:text-teal-300">
                  (+238) 261 4456
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Email Clínico:</span>
                <span className="text-slate-300">geral@centromedico-porcelana.cv</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Horário:</span>
                <span className="text-slate-300">Seg a Sáb: 07h30 – 21h00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Legal Baseline */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Centro Médico Porcelana. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Política de Privacidade & RGPD</a>
            <span>·</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Termos de Prestação de Cuidados</a>
            <span>·</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Livro de Elogios e Reclamações</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
