import React, { useState } from 'react';
import { DOCTORS, Doctor } from '../data/medicalData';
import { Calendar, Award, Star, Clock, Globe, BookOpen, X, CheckCircle2 } from 'lucide-react';

interface DoctorsSectionProps {
  onBookDoctor: (doctorId: string, specialtyId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookDoctor }) => {
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState<Doctor | null>(null);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');

  const specialtiesList = Array.from(new Set(DOCTORS.map((d) => d.specialtyName)));

  const filteredDoctors = DOCTORS.filter((doc) => {
    if (filterSpecialty === 'all') return true;
    return doc.specialtyName === filterSpecialty;
  });

  return (
    <section id="corpo-clinico" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              Excelência Médica
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight [text-wrap:balance]">
              Corpo Clínico Sénior & Médicos Especialistas
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Profissionais dedicados, formados nas mais prestigiadas faculdades médicas e hospitais universitários, com registo oficial na Ordem dos Médicos.
            </p>
          </div>

          {/* Specialty Filter */}
          <div className="self-start md:self-auto">
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-800 cursor-pointer"
            >
              <option value="all">Todas as Especialidades Clínicas</option>
              {specialtiesList.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-teal-700/60 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Photo Frame */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={doc.photoUrl}
                    alt={`Foto de ${doc.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Order Number Badge */}
                  <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-white/95 font-medium bg-slate-900/75 backdrop-blur-sm px-2 py-0.5 rounded">
                    {doc.orderNumber}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-2.5 right-3 text-xs font-semibold text-amber-900 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{doc.rating}</span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-4 space-y-2">
                  <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider block">
                    {doc.specialtyName}
                  </span>

                  <h3 className="text-base font-bold font-display text-slate-900 leading-snug group-hover:text-teal-900 transition-colors">
                    {doc.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {doc.biography}
                  </p>

                  {/* Experience & Days */}
                  <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.availableDays.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.experienceYears} anos de experiência clínica</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => onBookDoctor(doc.id, doc.specialtyId)}
                  className="w-full py-2 px-3 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Marcar Consulta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDoctorForModal(doc)}
                  className="w-full py-1.5 px-3 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  Ver Perfil Completo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Detail Modal */}
        {selectedDoctorForModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                  Perfil do Corpo Clínico
                </div>
                <button
                  onClick={() => setSelectedDoctorForModal(null)}
                  className="text-slate-400 hover:text-slate-700 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 mb-5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                  <img
                    src={selectedDoctorForModal.photoUrl}
                    alt={selectedDoctorForModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold font-display text-slate-900">
                    {selectedDoctorForModal.name}
                  </h4>
                  <div className="text-xs font-semibold text-teal-800">
                    {selectedDoctorForModal.title}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Registo Oficial: {selectedDoctorForModal.orderNumber}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600 pt-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Idiomas: {selectedDoctorForModal.languages.join(' · ')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5">
                <div>
                  <strong className="block text-slate-900 mb-0.5">Formação Académica & Hospitalar:</strong>
                  {selectedDoctorForModal.education}
                </div>
                <div>
                  <strong className="block text-slate-900 mb-0.5">Biografia Clínica:</strong>
                  {selectedDoctorForModal.biography}
                </div>
                <div>
                  <strong className="block text-slate-900 mb-0.5">Dias de Consulta Regular:</strong>
                  {selectedDoctorForModal.availableDays.join(', ')} (mediante marcação prévia)
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoctorForModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const doc = selectedDoctorForModal;
                    setSelectedDoctorForModal(null);
                    onBookDoctor(doc.id, doc.specialtyId);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Marcar Consulta com {selectedDoctorForModal.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
