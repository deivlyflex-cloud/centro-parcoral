import React, { useState, useRef } from 'react';
import { 
  Activity, 
  Smartphone, 
  FlaskConical, 
  Stethoscope, 
  Baby, 
  Briefcase, 
  Plus, 
  Clock, 
  UserCheck, 
  Home, 
  MessageSquare, 
  CheckCircle, 
  CalendarCheck, 
  MapPin, 
  Phone, 
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const WHATSAPP_LINK = "https://wa.me/244948332710?text=Ol%C3%A1%2C%20gostaria%20de%20marcar%20uma%20consulta.";
  const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Por+tr%C3%A1s+da+Ag%C3%AAncia+da+EPAL+Estrada+da+Brigada+Rua+4+Rangel+Luanda";

  const getServiceWhatsAppLink = (serviceName: string) => {
    return `https://wa.me/244948332710?text=${encodeURIComponent(`Olá, gostaria de agendar: ${serviceName}`)}`;
  };

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const firstChild = carouselRef.current.children[0] as HTMLElement | undefined;
      const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 300;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveSlide(Math.min(Math.max(0, index), services.length - 1));
    }
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const firstChild = carouselRef.current.children[0] as HTMLElement | undefined;
      const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 300;
      carouselRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  const scrollByDirection = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const firstChild = carouselRef.current.children[0] as HTMLElement | undefined;
      const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 300;
      const amount = direction === 'left' ? -itemWidth : itemWidth;
      carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      question: "Preciso de agendamento prévio para urgências?",
      answer: "Não. Para situações de urgência e emergência, o atendimento é imediato e funciona 24 horas por dia, todos os dias da semana, sem necessidade de marcação prévia. Basta dirigir-se diretamente à nossa clínica no Rangel."
    },
    {
      question: "Quais documentos levar?",
      answer: "Para a sua consulta ou realização de exames, traga o seu documento de identificação oficial (Bilhete de Identidade ou Passaporte) e, se tiver, exames anteriores ou receitas médicas que possam auxiliar na avaliação clínica."
    },
    {
      question: "Como funciona a teleconsulta?",
      answer: "Após solicitar a teleconsulta pelo nosso WhatsApp, a nossa equipa confirma o horário e o médico entra em contacto diretamente consigo através do seu telemóvel. Pode realizar a consulta com toda a privacidade no conforto da sua casa ou trabalho."
    },
    {
      question: "Em quanto tempo são entregues os resultados dos exames?",
      answer: "A maioria das análises laboratoriais e exames clínicos de rotina fica pronta no próprio dia útil ou em poucas horas, assegurando rapidez e confiança no diagnóstico."
    },
    {
      question: "Como posso efetuar o pagamento da consulta ou exame?",
      answer: "Aceitamos pagamentos presenciais por Multicaixa (TPA) e em numerário na receção da clínica, além de transferência bancária para o serviço de teleconsulta."
    }
  ];

  const services = [
    {
      title: "Consulta de Endocrinologia",
      description: "Acompanhamento especializado para tiroide, diabetes, distúrbios hormonais e metabolismo.",
      icon: Activity,
    },
    {
      title: "Teleconsulta personalizada",
      description: "Consulta médica individual à distância com toda a comodidade e rapidez no seu telemóvel.",
      icon: Smartphone,
    },
    {
      title: "Exames laboratoriais",
      description: "Colheitas e análises clínicas com equipamentos modernos e entrega rápida de resultados.",
      icon: FlaskConical,
    },
    {
      title: "Clínica geral",
      description: "Atendimento médico completo para diagnóstico de rotina, sintomas agudos e cuidados contínuos.",
      icon: Stethoscope,
    },
    {
      title: "Consultas pré-natal",
      description: "Vigilância regular da saúde da mãe e do desenvolvimento do bebé durante toda a gestação.",
      icon: Baby,
    },
    {
      title: "Medicina do trabalho",
      description: "Exames médicos admissionais, periódicos e demissionais para colaboradores e empresas.",
      icon: Briefcase,
    },
    {
      title: "E muito mais",
      description: "Várias outras especialidades médicas e serviços de enfermagem disponíveis na clínica.",
      icon: Plus,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-teal-700 selection:text-white pb-24 md:pb-0">
      
      {/* 1. TOPO / CABEÇALHO & HERO */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          
          {/* Espaço para o Logótipo da Clínica */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl bg-teal-50 border-2 border-dashed border-teal-700/60 flex items-center justify-center text-teal-800 shrink-0 shadow-inner"
              title="Espaço reservado para o logótipo oficial do Centro Médico Porcelana"
            >
              {/* Símbolo Cruz Médica / Brasão */}
              <svg 
                className="w-7 h-7 text-teal-700" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 4v16M4 12h16" />
                <rect x="3" y="3" width="18" height="18" rx="4" strokeWidth="1.6" className="opacity-40" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                Centro Médico Porcelana
              </span>
              <span className="text-xs font-semibold text-teal-700">
                Rangel, Luanda · Aberto 24 Horas
              </span>
            </div>
          </div>

          {/* Botão no topo para desktop */}
          <div className="hidden sm:block">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95"
            >
              {/* Ícone autêntico do WhatsApp */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95a.75.75 0 00.923.923l4.782-1.388A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-8.5 10c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5a8.47 8.47 0 01-4.42-1.233.75.75 0 00-.47-.116l-3.234.938.938-3.234a.75.75 0 00-.116-.47A8.47 8.47 0 013.5 12z" />
              </svg>
              <span>Marcar no WhatsApp</span>
            </a>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white pt-10 pb-12 sm:pt-14 sm:pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Badge Aberto 24h */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 text-teal-800 text-xs sm:text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Aberto 24 horas, todos os dias</span>
          </div>

          {/* Nome e Frase Curta */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Centro Médico Porcelana
          </h1>

          <p className="text-xl sm:text-2xl text-slate-700 font-medium max-w-xl mx-auto leading-snug">
            Cuidado médico perto de si, a qualquer hora
          </p>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            Atendimento presencial no Rangel e teleconsulta rápida sem sair de casa em Luanda.
          </p>

          {/* Botão de Destaque Oficial do WhatsApp */}
          <div className="pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-base sm:text-lg font-bold rounded-2xl shadow-lg shadow-[#25D366]/25 transition-all transform active:scale-98"
            >
              <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95a.75.75 0 00.923.923l4.782-1.388A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-8.5 10c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5a8.47 8.47 0 01-4.42-1.233.75.75 0 00-.47-.116l-3.234.938.938-3.234a.75.75 0 00-.116-.47A8.47 8.47 0 013.5 12z" />
              </svg>
              <span>Marcar consulta no WhatsApp</span>
            </a>
          </div>

          {/* Imagem Real de Equipamentos de Exame (Sem pessoas) */}
          <div className="pt-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[16/9] bg-slate-100 max-w-2xl mx-auto">
              <img 
                src="/src/assets/images/medical_exams_equipment_1790925490205.jpg" 
                alt="Equipamentos modernos para exames laboratoriais e diagnóstico clínico no Centro Médico Porcelana"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 text-left">
                <span className="text-white text-xs sm:text-sm font-semibold block">
                  Exames Laboratoriais e Diagnóstico Clínico
                </span>
                <span className="text-teal-200 text-xs">
                  Equipamentos precisos e resultados confiáveis
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVIÇOS (CARROSSEL HORIZONTAL OTIMIZADO PARA TELEMÓVEL) */}
      <section id="servicos" className="py-12 sm:py-16 px-4 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div className="space-y-1.5 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Nossos Serviços
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-lg">
                Cuidados médicos pensados para a sua saúde e bem-estar em Luanda.
              </p>
            </div>

            {/* Controles de Navegação (Botões de seta e dica de deslizar) */}
            <div className="flex items-center justify-center sm:justify-end gap-3">
              <span className="text-xs font-medium text-slate-400 sm:hidden">
                ← Deslize para ver todos →
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollByDirection('left')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 active:scale-95"
                  aria-label="Serviço anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByDirection('right')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 active:scale-95"
                  aria-label="Próximo serviço"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Carrossel Horizontal com Snap suave */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-2 px-1 -mx-1"
          >
            {services.map((serv, index) => {
              const Icon = serv.icon;
              return (
                <div
                  key={index}
                  className="snap-center sm:snap-start shrink-0 w-[84vw] max-w-[320px] sm:w-[320px] bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-teal-700/60 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-teal-700" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {serv.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {serv.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <a
                      href={getServiceWhatsAppLink(serv.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
                    >
                      <span>Marcar este serviço</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicadores de Posição (Bolinhas interativas) */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {services.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => scrollToSlide(dotIndex)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === dotIndex
                    ? 'w-7 bg-teal-700'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Ir para o serviço ${dotIndex + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. PORQUÊ ESCOLHER-NOS */}
      <section className="py-12 sm:py-16 px-4 bg-teal-50/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Porquê escolher-nos
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
              Dedicação total à saúde de quem confia no Centro Médico Porcelana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Aberto 24h */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Aberto 24h
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Estamos prontos para atender a qualquer hora do dia ou da noite, todos os dias da semana, sem interrupção.
              </p>
            </div>

            {/* Atendimento personalizado */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Atendimento personalizado
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cada utente recebe atenção dedicada e um plano de cuidados adaptado às suas necessidades de saúde.
              </p>
            </div>

            {/* Teleconsulta sem sair de casa */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Teleconsulta sem sair de casa
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fale com um médico no conforto do seu lar através do seu telemóvel, com facilidade e rapidez.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. COMO MARCAR (3 PASSOS) */}
      <section className="py-12 sm:py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Como marcar
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              É muito simples e rápido marcar a sua consulta ou exame em apenas 3 passos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Passo 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold text-base flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Enviar mensagem no WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Clique no botão de WhatsApp e inicie a conversa diretamente connosco.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold text-base flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Escolher o serviço
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Diga qual a consulta ou exame pretendido e o dia de sua preferência.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold text-base flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Receber a confirmação
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                A nossa equipa confirma de imediato a sua marcação e os detalhes.
              </p>
            </div>

          </div>

          {/* Botão de ação central */}
          <div className="text-center pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-base font-bold rounded-2xl shadow-md transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95a.75.75 0 00.923.923l4.782-1.388A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-8.5 10c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5a8.47 8.47 0 01-4.42-1.233.75.75 0 00-.47-.116l-3.234.938.938-3.234a.75.75 0 00-.116-.47A8.47 8.47 0 013.5 12z" />
              </svg>
              <span>Falar no WhatsApp agora</span>
            </a>
          </div>

        </div>
      </section>

      {/* 5. PERGUNTAS FREQUENTES (FAQ ACCORDION) */}
      <section id="faq" className="py-12 sm:py-16 px-4 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Perguntas Frequentes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
              Respostas claras às dúvidas mais comuns sobre as nossas consultas, urgências e exames em Luanda.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 hover:text-teal-700 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-teal-700' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dúvida adicional chamada para ação */}
          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-slate-600 mb-3">
              Ainda tem alguma dúvida? Fale diretamente com o nosso secretariado.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 hover:underline"
            >
              <span>Tirar dúvidas no WhatsApp</span>
              <span>→</span>
            </a>
          </div>

        </div>
      </section>

      {/* 6. LOCALIZAÇÃO E CONTACTOS */}
      <section id="contactos" className="py-12 sm:py-16 px-4 bg-teal-50/40 border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Localização e Contactos
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Estamos situados no Rangel, com fácil acesso para si e a sua família.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            
            {/* Morada */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-teal-700" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                  Morada
                </span>
                <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  Por trás da Agência da EPAL, Estrada da Brigada, Rua 4, Rangel, Luanda
                </p>
              </div>
            </div>

            {/* Horário */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-teal-700" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                  Horário de Atendimento
                </span>
                <p className="text-base sm:text-lg font-semibold text-slate-900">
                  Aberto 24 horas, todos os dias
                </p>
              </div>
            </div>

            {/* Telefone / WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-5 h-5 text-teal-700" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                  Telefone / WhatsApp
                </span>
                <a 
                  href="tel:+244948332710" 
                  className="text-lg sm:text-xl font-bold text-teal-800 hover:underline block"
                >
                  +244 948 332 710
                </a>
              </div>
            </div>

            {/* Botão Ver no Mapa */}
            <div className="pt-2">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white text-sm sm:text-base font-bold rounded-2xl shadow-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Ver no mapa (Google Maps)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 6. RODAPÉ SIMPLES */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto space-y-2">
          <p className="text-base sm:text-lg font-bold text-white">
            Centro Médico Porcelana
          </p>
          <p className="text-sm text-slate-300">
            Telefone / WhatsApp: <a href="tel:+244948332710" className="hover:text-white font-semibold">+244 948 332 710</a>
          </p>
          <p className="text-xs text-slate-400 pt-2">
            Por trás da Agência da EPAL, Estrada da Brigada, Rua 4, Rangel, Luanda, Angola
          </p>
          <p className="text-xs text-slate-400 pt-3">
            © {new Date().getFullYear()} Centro Médico Porcelana. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* BOTÃO FIXO DE WHATSAPP NO FUNDO DO ECRÃ (Mobile-first, sempre visível no telemóvel) */}
      <div className="fixed bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 md:hidden shadow-2xl">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-base font-bold rounded-xl shadow-md transition-all active:scale-98"
        >
          <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95a.75.75 0 00.923.923l4.782-1.388A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-8.5 10c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5a8.47 8.47 0 01-4.42-1.233.75.75 0 00-.47-.116l-3.234.938.938-3.234a.75.75 0 00-.116-.47A8.47 8.47 0 013.5 12z" />
          </svg>
          <span>Marcar consulta no WhatsApp</span>
        </a>
      </div>

    </div>
  );
}
