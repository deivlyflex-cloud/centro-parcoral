import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, CheckCircle2, Download, AlertCircle, FileCheck, Phone, Mail, Shield } from 'lucide-react';
import { SPECIALTIES, DOCTORS, Specialty, Doctor } from '../data/medicalData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpecialtyId?: string;
  initialDoctorId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialSpecialtyId,
  initialDoctorId
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Patient details form
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [insurance, setInsurance] = useState('INPS');
  const [notes, setNotes] = useState('');
  const [confirmedCode, setConfirmedCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialSpecialtyId) {
      setSelectedSpecialty(initialSpecialtyId);
    } else if (SPECIALTIES.length > 0 && !selectedSpecialty) {
      setSelectedSpecialty(SPECIALTIES[0].id);
    }

    if (initialDoctorId) {
      setSelectedDoctor(initialDoctorId);
    }
  }, [initialSpecialtyId, initialDoctorId, isOpen]);

  // Set default date to tomorrow
  useEffect(() => {
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setSelectedDate(`${yyyy}-${mm}-${dd}`);
    }
  }, []);

  if (!isOpen) return null;

  // Filter available doctors by specialty
  const availableDoctors = DOCTORS.filter(
    (doc) => !selectedSpecialty || doc.specialtyId === selectedSpecialty
  );

  const activeSpecialtyObj = SPECIALTIES.find((s) => s.id === selectedSpecialty);
  const activeDoctorObj = DOCTORS.find((d) => d.id === selectedDoctor);

  const availableTimeSlots = [
    '08:30', '09:15', '10:00', '10:45', '11:30',
    '14:00', '14:45', '15:30', '16:15', '17:00', '18:00'
  ];

  const handleValidation = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) errs.name = 'Por favor indique o nome completo do paciente.';
    if (!patientPhone.trim()) errs.phone = 'Por favor indique o contacto telefónico.';
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      errs.email = 'Por favor indique um email válido para envio de comprovativo.';
    }
    if (!selectedTime) errs.time = 'Por favor escolha um horário disponível.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    const randomId = 'CMP-' + Math.floor(1000 + Math.random() * 9000);
    setConfirmedCode(randomId);

    // Save to localStorage for patient portal lookup
    try {
      const existing = JSON.parse(localStorage.getItem('cmp_appointments') || '[]');
      const newAppt = {
        code: randomId,
        patientName,
        phone: patientPhone,
        email: patientEmail,
        specialtyName: activeSpecialtyObj?.name || 'Consulta Médica',
        doctorName: activeDoctorObj?.name || 'Primeiro Especialista Disponível',
        date: selectedDate,
        time: selectedTime,
        insurance,
        notes,
        createdAt: new Date().toISOString()
      };
      existing.unshift(newAppt);
      localStorage.setItem('cmp_appointments', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setStep(4);
  };

  const downloadCalendarFile = () => {
    const calendarData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Centro Medico Porcelana//Agendamento//PT
BEGIN:VEVENT
SUMMARY:Consulta no Centro Médico Porcelana: ${activeSpecialtyObj?.name || 'Consulta Médica'}
DESCRIPTION:Consulta agendada com ${activeDoctorObj?.name || 'Médico Especialista'}. Código de marcação: ${confirmedCode}. Por favor compareça 10 minutos antes.
LOCATION:Centro Médico Porcelana, Av. Amílcar Cabral, Praia, Cabo Verde
DTSTART:${selectedDate.replace(/-/g, '')}T${selectedTime.replace(':', '')}00
DURATION:PT45M
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `consulta-porcelana-${confirmedCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadReceipt = () => {
    const textReceipt = `================================================
CENTRO MÉDICO PORCELANA - COMPROVATIVO DE AGENDAMENTO
================================================
Código de Marcação: ${confirmedCode}
Data de Emissão: ${new Date().toLocaleDateString('pt-PT')}

DADOS DO PACIENTE:
Nome: ${patientName}
Contacto Telefónico: ${patientPhone}
Email: ${patientEmail}
Convenção / Seguro: ${insurance}

DADOS DA CONSULTA:
Especialidade: ${activeSpecialtyObj?.name || 'Consulta Médica'}
Médico Assistente: ${activeDoctorObj?.name || 'Primeiro Especialista Disponível'}
Data Agendada: ${selectedDate}
Horário Previsto: ${selectedTime}
Duração Estimada: ${activeSpecialtyObj?.duration || '30-45 min'}

LOCALIZAÇÃO & CONTACTOS:
Centro Médico Porcelana
Av. Amílcar Cabral, Edifício Porcelana, Praia, Cabo Verde
Linha Geral: (+238) 261 4455 / WhatsApp: (+238) 991 2233

INSTRUÇÕES IMPORTANTES:
- Por favor compareça 10 minutos antes da hora marcada.
- Traga consigo o seu documento de identificação e cartão de seguro/INPS.
- Se necessitar remarcar ou cancelar, avise-nos com 24h de antecedência.
================================================`;

    const blob = new Blob([textReceipt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `comprovativo-${confirmedCode}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-800 flex items-center justify-center text-teal-100">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Agendamento de Consulta Online
              </h3>
              <p className="text-xs text-slate-300">
                Centro Médico Porcelana · Resposta e confirmação imediata
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression (Zero-Pill discipline) */}
        {step < 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${step >= 1 ? 'text-teal-900' : 'text-slate-400'}`}>
                1. Especialidade
              </span>
              <span>·</span>
              <span className={`font-semibold ${step >= 2 ? 'text-teal-900' : 'text-slate-400'}`}>
                2. Médico & Data
              </span>
              <span>·</span>
              <span className={`font-semibold ${step >= 3 ? 'text-teal-900' : 'text-slate-400'}`}>
                3. Dados do Paciente
              </span>
            </div>
            <span className="font-mono text-slate-400 tabular-nums">Passo {step} de 3</span>
          </div>
        )}

        <div className="p-6">
          {/* STEP 1: Choose Specialty */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  Selecione a Especialidade Clínica
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Escolha o serviço ou especialidade pretendida para esta consulta.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {SPECIALTIES.map((spec) => {
                  const isSelected = selectedSpecialty === spec.id;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => {
                        setSelectedSpecialty(spec.id);
                        // Reset doctor if not in specialty
                        setSelectedDoctor('');
                      }}
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-800 bg-teal-50/60 shadow-sm ring-1 ring-teal-800'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-slate-900 block">
                          {spec.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                          {spec.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {spec.description}
                      </p>
                      <div className="mt-2 text-xs font-semibold text-teal-800">
                        Consulta: {spec.consultationFee}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-500">
                  Dúvida sobre o especialista? Consulte o nosso Guia de Sintomas.
                </span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!selectedSpecialty}
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 disabled:opacity-50 rounded-lg transition-all"
                >
                  Continuar para Horários
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Doctor, Date & Time */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  Médico Especialista & Escolha de Horário
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Especialidade selecionada: <strong className="text-slate-800">{activeSpecialtyObj?.name}</strong>
                </p>
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                  Médico Assistente
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDoctor('')}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      selectedDoctor === ''
                        ? 'border-teal-800 bg-teal-50/60 font-semibold text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="block font-bold">Primeiro Médico Disponível</span>
                    <span className="text-[11px] text-slate-500">Atribuição conforme menor tempo de espera</span>
                  </button>

                  {availableDoctors.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDoctor(doc.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                        selectedDoctor === doc.id
                          ? 'border-teal-800 bg-teal-50/60 font-semibold text-slate-900 ring-1 ring-teal-800'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="block font-bold">{doc.name}</span>
                      <span className="text-[11px] text-slate-500">{doc.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label htmlFor="appointment-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Data da Consulta
                  </label>
                  <input
                    id="appointment-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Horário normal: Seg a Sáb das 07h30 às 21h00
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Horário Disponível
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                    {availableTimeSlots.map((slot) => {
                      const isChosen = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                            isChosen
                              ? 'bg-teal-800 text-white font-bold shadow-sm'
                              : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  {errors.time && (
                    <span className="text-xs text-rose-600 mt-1 block">{errors.time}</span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedTime) {
                      setErrors({ time: 'Escolha uma hora para a consulta' });
                      return;
                    }
                    setErrors({});
                    setStep(3);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-all"
                >
                  Continuar para Identificação
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Form & Insurance */}
          {step === 3 && (
            <form onSubmit={handleConfirmAppointment} className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  Identificação do Paciente
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Resumo: <strong className="text-slate-800">{activeSpecialtyObj?.name}</strong> com{' '}
                  <strong className="text-slate-800">{activeDoctorObj?.name || 'Primeiro Disponível'}</strong> em{' '}
                  <strong className="text-teal-800">{selectedDate} às {selectedTime}</strong>
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo do Paciente *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Ex: Maria Alice Rodrigues"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                    />
                  </div>
                  {errors.name && <span className="text-xs text-rose-600 mt-1 block">{errors.name}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telemóvel / WhatsApp *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        placeholder="(+238) 991 0000"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                      />
                    </div>
                    {errors.phone && <span className="text-xs text-rose-600 mt-1 block">{errors.phone}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email (para comprovativo) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        placeholder="paciente@exemplo.cv"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                      />
                    </div>
                    {errors.email && <span className="text-xs text-rose-600 mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Seguro de Saúde / Convenção
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Shield className="w-4 h-4" />
                      </div>
                      <select
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                      >
                        <option value="INPS">INPS (Previdência Social)</option>
                        <option value="Ímpar Seguros">Ímpar Seguros</option>
                        <option value="Garantia Seguros">Garantia Seguros</option>
                        <option value="Multicare">Multicare Internacional</option>
                        <option value="Médis">Médis / AdvanceCare</option>
                        <option value="Particular">Particular (Sem Seguro)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Motivo ou Sintomas Principais (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Consulta de rotina, dor persistente..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-100 flex items-start gap-2.5 text-xs text-teal-900">
                <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  O pagamento e a validação do seguro são realizados na receção da clínica no dia da consulta. Enviaremos lembrete por SMS com antecedência.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Confirmar Agendamento</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation Ticket */}
          {step === 4 && (
            <div className="text-center py-2 space-y-5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold font-display text-slate-900">
                  Consulta Confirmada com Sucesso!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  O seu agendamento foi registado no sistema clínico do Centro Médico Porcelana.
                </p>
              </div>

              {/* Ticket Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Código da Consulta</span>
                    <span className="text-lg font-mono font-bold text-teal-900">{confirmedCode}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Convenção</span>
                    <span className="text-xs font-semibold text-slate-800">{insurance}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Paciente:</span>
                    <span className="font-semibold text-slate-900">{patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Especialidade:</span>
                    <span className="font-semibold text-slate-900">{activeSpecialtyObj?.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Data & Hora:</span>
                    <span className="font-semibold text-teal-800">{selectedDate} às {selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Médico:</span>
                    <span className="font-semibold text-slate-900">{activeDoctorObj?.name || 'Médico de Piquete'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={downloadReceipt}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-teal-700" />
                  <span>Descarregar Comprovativo</span>
                </button>

                <button
                  type="button"
                  onClick={downloadCalendarFile}
                  className="px-4 py-2 text-xs font-semibold text-teal-900 bg-teal-50 border border-teal-200 hover:bg-teal-100 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Guardar no Calendário (.ics)</span>
                </button>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Concluir & Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
