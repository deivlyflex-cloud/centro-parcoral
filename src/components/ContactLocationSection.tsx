import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, MessageCircle, AlertCircle } from 'lucide-react';

export const ContactLocationSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Dúvida sobre Consultas');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Por favor preencha todos os campos obrigatórios (*).');
      return;
    }
    setError('');
    setFormSubmitted(true);
  };

  return (
    <section id="contactos" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-teal-700" />
            <span>Localização Central & Secretariado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Visite as Nossas Instalações ou Fale Connosco
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Estamos situados no coração da cidade com acessibilidade total para utentes com mobilidade reduzida e estacionamento reservado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clinic Contact Info & Simulated Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold font-display text-slate-900">
                Informações de Contacto & Atendimento
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Endereço Principal:</strong>
                    <span>Avenida Amílcar Cabral, Edifício Porcelana, Pisos 1 e 2, Plateau, Praia, Cabo Verde</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Telefones & Linha Direta:</strong>
                    <span>Geral: (+238) 261 4455 / Urgência: (+238) 261 4456</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">WhatsApp Oficial Secretariado:</strong>
                    <a 
                      href="https://wa.me/2389912233" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-teal-800 font-bold hover:underline"
                    >
                      (+238) 991 2233
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Horário de Funcionamento:</strong>
                    <span>Segunda a Sexta: 07h30 – 21h00 · Sábado: 07h30 – 17h00</span>
                    <span className="block text-teal-800 font-medium mt-0.5">Colheitas de Análises: Seg a Sáb a partir das 07h30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Simulator */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 text-white p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                  <Navigation className="w-4 h-4" />
                  <span>Como Chegar ao Centro Médico</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Coordenadas: 14.9197° N, 23.5087° W</span>
              </div>

              {/* Stylized Architectural Location Map Layout */}
              <div className="h-44 bg-slate-800 rounded-xl relative overflow-hidden border border-slate-700/80 p-4 flex flex-col justify-between">
                {/* Street lines grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>

                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-xs font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">
                    Av. Amílcar Cabral
                  </span>
                  <span className="text-[11px] text-teal-300">Ponto de Referência: Próximo à Praça Central</span>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <div className="flex items-center gap-2 bg-teal-800 text-white px-3 py-1.5 rounded-xl shadow-lg border border-teal-500 animate-bounce">
                    <MapPin className="w-4 h-4 text-teal-200" />
                    <span className="text-xs font-bold font-display">Centro Médico Porcelana</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Estacionamento Privativo Subterrâneo</span>
                  <span>Acesso sem degraus / Elevador</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Inquiries Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold font-display text-slate-900 mb-1">
              Envie uma Mensagem ao Secretariado
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Respondemos habitualmente em menos de 2 horas úteis. Para agendamento direto de consultas, utilize o botão «Marcar Consulta».
            </p>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3 bg-teal-50/70 border border-teal-200 rounded-xl p-6">
                <CheckCircle2 className="w-10 h-10 text-teal-700 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Mensagem Enviada com Sucesso</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Agradecemos o seu contacto. A nossa equipa de receção entrará em contacto através do telefone ou email indicado.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-teal-900 bg-white border border-teal-200 rounded-lg hover:bg-teal-50"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Telemóvel *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="(+238) 991 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="seu.email@exemplo.cv"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                    Assunto da Mensagem
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                  >
                    <option value="Dúvida sobre Consultas">Dúvida sobre Consultas e Especialistas</option>
                    <option value="Exames e Laboratório">Informações sobre Exames e Análises</option>
                    <option value="Acordos e Seguros">Convenções (INPS, Seguradoras)</option>
                    <option value="Atestados e Certificados">Atestados Médicos e Exames de Condução</option>
                    <option value="Outro">Outro Assunto</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                    Mensagem ou Pedido de Esclarecimento *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Descreva como o podemos ajudar..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Pedido de Informação</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
