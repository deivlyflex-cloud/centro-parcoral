import React, { useState, useEffect } from 'react';
import { X, Search, FileText, Calendar, CheckCircle2, Download, Printer, User, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { SAMPLE_TEST_RESULTS, TestResult } from '../data/medicalData';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  initialCode,
  onOpenBooking
}) => {
  const [activeTab, setActiveTab] = useState<'exams' | 'appointments'>('exams');
  const [searchCode, setSearchCode] = useState<string>('');
  const [activeResult, setActiveResult] = useState<TestResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState<any[]>([]);

  const lookupResult = (codeToSearch: string) => {
    const formatted = codeToSearch.trim().toUpperCase();
    if (SAMPLE_TEST_RESULTS[formatted]) {
      setActiveResult(SAMPLE_TEST_RESULTS[formatted]);
      setNotFound(false);
    } else {
      setActiveResult(null);
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (initialCode) {
      setSearchCode(initialCode);
      lookupResult(initialCode);
    } else {
      // Default to first demo result for convenience
      lookupResult('CMP-2026-9842');
      setSearchCode('CMP-2026-9842');
    }

    // Load saved appointments from local storage
    try {
      const stored = JSON.parse(localStorage.getItem('cmp_appointments') || '[]');
      setAppointmentsList(stored);
    } catch {
      setAppointmentsList([]);
    }
  }, [initialCode, isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupResult(searchCode);
  };

  const printReport = () => {
    window.print();
  };

  const downloadReportTxt = () => {
    if (!activeResult) return;
    const txt = `================================================
CENTRO MÉDICO PORCELANA - RELATÓRIO CLÍNICO DE ANÁLISES
================================================
Código de Identificação: ${activeResult.code}
Paciente: ${activeResult.patientName}
Data da Realização: ${activeResult.date}
Tipo de Exame: ${activeResult.examType}
Médico Requisitante / Validador: ${activeResult.doctorName}
Estado: ${activeResult.status}

SUMÁRIO CLÍNICO:
${activeResult.summary}

RESULTADOS & PARÂMETROS BIOLÓGICOS:
${activeResult.parameters.map((p) => `- ${p.name}: ${p.value} (Referência: ${p.reference})`).join('\n')}

VALIDAÇÃO:
Validação eletrónica realizada pelo Laboratório Central do Centro Médico Porcelana.
Certificação de Qualidade ISO 15189.
================================================`;

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `relatorio-${activeResult.code}.txt`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-800 flex items-center justify-center text-teal-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Portal do Paciente & Resultados de Exames
              </h3>
              <p className="text-xs text-slate-300">
                Centro Médico Porcelana · Acesso seguro e confidencial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'exams'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-teal-700" />
              <span>Resultados de Exames</span>
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'appointments'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-teal-700" />
              <span>Minhas Consultas Agendadas ({appointmentsList.length})</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Acesso Encriptado
          </span>
        </div>

        <div className="p-6">
          {/* TAB 1: EXAM RESULTS */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Introduza o código (ex: CMP-2026-9842 ou CMP-2026-4411)"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-800"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Pesquisar
                </button>
              </form>

              {/* Demo quick links */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Códigos demonstrativos:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchCode('CMP-2026-9842');
                    lookupResult('CMP-2026-9842');
                  }}
                  className="font-mono text-teal-800 font-semibold hover:underline cursor-pointer"
                >
                  CMP-2026-9842 (Hemograma)
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchCode('CMP-2026-4411');
                    lookupResult('CMP-2026-4411');
                  }}
                  className="font-mono text-teal-800 font-semibold hover:underline cursor-pointer"
                >
                  CMP-2026-4411 (ECG & Eco)
                </button>
              </div>

              {/* Not Found State */}
              {notFound && (
                <div className="p-6 text-center bg-rose-50 border border-rose-200 rounded-xl text-rose-800 space-y-2">
                  <AlertCircle className="w-6 h-6 mx-auto text-rose-600" />
                  <h4 className="font-bold text-sm">Nenhum exame localizado com este código</h4>
                  <p className="text-xs text-rose-700">
                    Verifique se digitou o código exatamente como consta no seu talão ou SMS de aviso.
                  </p>
                </div>
              )}

              {/* Found Exam Result Document */}
              {activeResult && !notFound && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
                  
                  {/* Document Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-teal-900 bg-teal-100/70 px-2 py-0.5 rounded">
                          {activeResult.code}
                        </span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                          {activeResult.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold font-display text-slate-900 mt-1">
                        {activeResult.examType}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={printReport}
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="Imprimir laudo"
                      >
                        <Printer className="w-4 h-4" />
                        <span className="hidden sm:inline">Imprimir</span>
                      </button>
                      <button
                        onClick={downloadReportTxt}
                        className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descarregar Relatório</span>
                      </button>
                    </div>
                  </div>

                  {/* Patient Info Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-500 block">Paciente:</span>
                      <strong className="text-slate-900">{activeResult.patientName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Data de Colheita / Realização:</span>
                      <strong className="text-slate-900">{activeResult.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Médico Responsável:</span>
                      <strong className="text-slate-900">{activeResult.doctorName}</strong>
                    </div>
                  </div>

                  {/* Clinical Summary */}
                  <div>
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide block mb-1">
                      Conclusão & Interpretação Médica:
                    </span>
                    <p className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                      {activeResult.summary}
                    </p>
                  </div>

                  {/* Parameter Table */}
                  <div>
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide block mb-2">
                      Parâmetros Analíticos:
                    </span>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-3">Parâmetro</th>
                            <th className="py-2.5 px-3">Resultado</th>
                            <th className="py-2.5 px-3">Valores de Referência</th>
                            <th className="py-2.5 px-3 text-right">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                          {activeResult.parameters.map((param, index) => (
                            <tr key={index} className="hover:bg-slate-50/70">
                              <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                                {param.name}
                              </td>
                              <td className="py-2.5 px-3 font-bold text-teal-900 tabular-nums">
                                {param.value}
                              </td>
                              <td className="py-2.5 px-3 text-slate-500 tabular-nums">
                                {param.reference}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-emerald-700">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Normal
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Assinado digitalmente por chave biométrica médica.</span>
                    <span>Centro Médico Porcelana · Laboratório Central</span>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* TAB 2: REGISTERED APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {appointmentsList.length === 0 ? (
                <div className="py-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">
                    Ainda não tem consultas agendadas neste dispositivo
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Pode agendar uma consulta online em minutos com confirmação imediata.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg cursor-pointer"
                  >
                    Agendar Nova Consulta
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointmentsList.map((appt, i) => (
                    <div 
                      key={i}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-teal-900 bg-teal-100/70 px-2 py-0.5 rounded">
                            {appt.code}
                          </span>
                          <span className="text-xs font-semibold text-slate-700">
                            {appt.specialtyName}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          Médico: <strong className="text-slate-900">{appt.doctorName}</strong> · Paciente:{' '}
                          <strong className="text-slate-900">{appt.patientName}</strong>
                        </div>
                        <div className="text-xs text-teal-800 font-medium">
                          Data: {appt.date} às {appt.time} (Seguro: {appt.insurance})
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                          Confirmada
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg cursor-pointer"
                    >
                      Marcar Outra Consulta
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center text-xs text-slate-500">
          <span>Dúvidas com os resultados? Contacte o secretariado clínico: (+238) 261 4455</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
