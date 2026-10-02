export interface Specialty {
  id: string;
  name: string;
  category: 'clinical' | 'surgical' | 'diagnostic' | 'wellness';
  description: string;
  indications: string[];
  leadDoctorId: string;
  iconName: string;
  consultationFee: string;
  duration: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialtyId: string;
  specialtyName: string;
  orderNumber: string;
  experienceYears: number;
  languages: string[];
  education: string;
  biography: string;
  availableDays: string[];
  rating: number;
  reviewsCount: number;
  photoUrl: string;
}

export interface ExamService {
  id: string;
  title: string;
  category: 'Laboratório' | 'Imagiologia' | 'Cardiologia' | 'Check-up';
  description: string;
  deliveryTime: string;
  fastingRequired: boolean;
  preparationInstructions: string;
  popular: boolean;
}

export interface TestResult {
  code: string;
  patientName: string;
  date: string;
  examType: string;
  doctorName: string;
  status: 'Concluído' | 'Em Análise';
  summary: string;
  parameters: { name: string; value: string; reference: string; status: 'normal' | 'attention' }[];
  pdfAvailable: boolean;
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  authorName: string;
  authorRole: string;
  summary: string;
  content: string[];
}

export interface InsurancePartner {
  id: string;
  name: string;
  type: 'Previdência Social' | 'Seguradora Privada' | 'Subsistema de Saúde';
  coverage: string;
  description: string;
}

export const SPECIALTIES: Specialty[] = [
  {
    id: 'medicina-geral',
    name: 'Medicina Geral e Familiar',
    category: 'clinical',
    description: 'Acompanhamento global da saúde, prevenção de doenças crónicas, check-ups regulares e encaminhamento clínico especializado.',
    indications: ['Avaliação de rotina', 'Controlo de hipertensão e diabetes', 'Sintomas gripais e infeções', 'Atestados médicos'],
    leadDoctorId: 'doc-nuno',
    iconName: 'Stethoscope',
    consultationFee: '3.500 CVE',
    duration: '30 min'
  },
  {
    id: 'cardiologia',
    name: 'Cardiologia & Saúde Vascular',
    category: 'clinical',
    description: 'Diagnóstico e tratamento de patologias cardiovasculares com eletrocardiografia digital, ecocardiograma e monitorização contínua.',
    indications: ['Palpitações e arritmias', 'Dor no peito', 'Hipertensão arterial resistente', 'Check-up pré-desportivo'],
    leadDoctorId: 'doc-arlindo',
    iconName: 'HeartPulse',
    consultationFee: '5.000 CVE',
    duration: '45 min'
  },
  {
    id: 'pediatria',
    name: 'Pediatria e Neonatologia',
    category: 'clinical',
    description: 'Acompanhamento do desenvolvimento infantil desde os primeiros dias até à adolescência, vacinação e tratamento de patologias pediátricas.',
    indications: ['Consultas de puericultura', 'Febre e infeções respiratórias', 'Acompanhamento de crescimento', 'Vacinação infantil'],
    leadDoctorId: 'doc-marisa',
    iconName: 'Baby',
    consultationFee: '4.500 CVE',
    duration: '40 min'
  },
  {
    id: 'ginecologia',
    name: 'Ginecologia & Obstetrícia',
    category: 'surgical',
    description: 'Cuidado integral da mulher em todas as fases da vida, rastreio oncológico, planeamento familiar e seguimento pré-natal com ecografia 4D.',
    indications: ['Vigilância pré-natal', 'Rastreio do colo do útero', 'Menopausa e equilíbrio hormonal', 'Ecografia ginecológica'],
    leadDoctorId: 'doc-cecilia',
    iconName: 'UserCheck',
    consultationFee: '5.000 CVE',
    duration: '40 min'
  },
  {
    id: 'ortopedia',
    name: 'Ortopedia & Traumatologia',
    category: 'surgical',
    description: 'Tratamento de lesões músculo-esqueléticas, dores articulares e na coluna, fraturas, reabilitação articular e infiltrações.',
    indications: ['Dores na coluna e ciática', 'Lesões no joelho e ombro', 'Traumatismos e entorses', 'Artrose e desgaste articular'],
    leadDoctorId: 'doc-joao',
    iconName: 'Activity',
    consultationFee: '4.500 CVE',
    duration: '35 min'
  },
  {
    id: 'oftalmologia',
    name: 'Oftalmologia Clínica',
    category: 'clinical',
    description: 'Exames completos de acuidade visual, medição de tensão ocular, rastreio de cataratas, glaucoma e prescrição de lentes graduadas.',
    indications: ['Diminuição de visão', 'Olhos secos ou vermelhos', 'Rastreio de glaucoma e catarata', 'Prescrição de óculos'],
    leadDoctorId: 'doc-vanessa',
    iconName: 'Eye',
    consultationFee: '4.500 CVE',
    duration: '30 min'
  },
  {
    id: 'dermatologia',
    name: 'Dermatologia & Venereologia',
    category: 'clinical',
    description: 'Diagnóstico e tratamento de doenças da pele, cabelo e unhas, dermatoscopia de sinais (nevos) e procedimentos dermatológicos menores.',
    indications: ['Vigilância de sinais e manchas', 'Acne persistente e rosácea', 'Eczema e psoríase', 'Queda de cabelo'],
    leadDoctorId: 'doc-denise',
    iconName: 'Sparkles',
    consultationFee: '4.500 CVE',
    duration: '30 min'
  },
  {
    id: 'medicina-dentaria',
    name: 'Medicina Dentária & Implantologia',
    category: 'surgical',
    description: 'Tratamento oral completo com tecnologia indolor, ortodontia, destartarização ultrassónica, branqueamento e reabilitação protética.',
    indications: ['Limpeza dentária e prevenção', 'Dor de dentes e cáries', 'Alinhamento com aparelho', 'Implantes e coroas cerâmicas'],
    leadDoctorId: 'doc-paulo',
    iconName: 'Smile',
    consultationFee: '4.000 CVE',
    duration: '45 min'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-nuno',
    name: 'Dr. Nuno Pires',
    title: 'Especialista em Medicina Geral e Familiar',
    specialtyId: 'medicina-geral',
    specialtyName: 'Medicina Geral e Familiar',
    orderNumber: 'OM-CV 0418',
    experienceYears: 16,
    languages: ['Português', 'Kriolu', 'Inglês'],
    education: 'Faculdade de Medicina da Universidade de Coimbra / Pós-graduação em Gestão de Doenças Crónicas',
    biography: 'Com mais de uma década e meia de prática clínica, o Dr. Nuno foca-se na medicina preventiva personalizada, garantindo um acompanhamento holístico a famílias e pacientes com comorbilidades.',
    availableDays: ['Segunda', 'Quarta', 'Sexta'],
    rating: 4.9,
    reviewsCount: 142,
    photoUrl: '/src/assets/images/doctor_consultation_1790924862032.jpg'
  },
  {
    id: 'doc-arlindo',
    name: 'Dr. Arlindo Tavares',
    title: 'Cardiologista Intervencionista & Clínico',
    specialtyId: 'cardiologia',
    specialtyName: 'Cardiologia & Saúde Vascular',
    orderNumber: 'OM-CV 0295',
    experienceYears: 20,
    languages: ['Português', 'Kriolu', 'Francês', 'Inglês'],
    education: 'Hospital de Santa Maria (Lisboa) / Fellowship em Ecocardiografia Avançada (Bordeaux)',
    biography: 'Referência em diagnóstico de patologias cardíacas, o Dr. Arlindo lidera o departamento de cardiologia preventiva do Centro Médico Porcelana com foco em inovação diagnóstica.',
    availableDays: ['Terça', 'Quinta', 'Sábado'],
    rating: 5.0,
    reviewsCount: 188,
    photoUrl: '/src/assets/images/doctor_consultation_1790924862032.jpg'
  },
  {
    id: 'doc-marisa',
    name: 'Dra. Marisa Fortes',
    title: 'Pediatra & Especialista em Puericultura',
    specialtyId: 'pediatria',
    specialtyName: 'Pediatria e Neonatologia',
    orderNumber: 'OM-CV 0532',
    experienceYears: 13,
    languages: ['Português', 'Kriolu', 'Inglês'],
    education: 'Universidade Nova de Lisboa / Especialização em Cuidados Pediátricos de Urgência',
    biography: 'Reconhecida pelo seu trato afetuoso e rigor científico, a Dra. Marisa acompanha o crescimento saudável de centenas de crianças, orientando pais com empatia e tranquilidade.',
    availableDays: ['Segunda', 'Terça', 'Quinta', 'Sexta'],
    rating: 4.95,
    reviewsCount: 215,
    photoUrl: '/src/assets/images/pediatric_care_1790924885769.jpg'
  },
  {
    id: 'doc-cecilia',
    name: 'Dra. Cecília Gomes',
    title: 'Ginecologista & Obstetra',
    specialtyId: 'ginecologia',
    specialtyName: 'Ginecologia & Obstetrícia',
    orderNumber: 'OM-CV 0367',
    experienceYears: 18,
    languages: ['Português', 'Kriolu', 'Espanhol'],
    education: 'Faculdade de Medicina do Porto / Certificação em Ecografia Morfológica e Obstétrica Avançada',
    biography: 'Especialista em saúde da mulher e vigilância gestacional de alto risco, pioneira na utilização de tecnologias de ultrassom 4D para diagnóstico pré-natal detalhado.',
    availableDays: ['Segunda', 'Quarta', 'Quinta'],
    rating: 4.9,
    reviewsCount: 176,
    photoUrl: '/src/assets/images/pediatric_care_1790924885769.jpg'
  },
  {
    id: 'doc-joao',
    name: 'Dr. João Delgado',
    title: 'Cirurgião Ortopedista & Traumatologista',
    specialtyId: 'ortopedia',
    specialtyName: 'Ortopedia & Traumatologia',
    orderNumber: 'OM-CV 0481',
    experienceYears: 15,
    languages: ['Português', 'Kriolu', 'Inglês'],
    education: 'Centro Hospitalar Universitário de Coimbra / Especialização em Medicina Desportiva',
    biography: 'Dedicado ao alívio de dor e recuperação funcional de articulações em atletas, adultos ativos e idosos com artrose, recorrendo a abordagens minimamente invasivas.',
    availableDays: ['Terça', 'Sexta', 'Sábado'],
    rating: 4.88,
    reviewsCount: 120,
    photoUrl: '/src/assets/images/doctor_consultation_1790924862032.jpg'
  },
  {
    id: 'doc-vanessa',
    name: 'Dra. Vanessa Semedo',
    title: 'Médica Oftalmologista',
    specialtyId: 'oftalmologia',
    specialtyName: 'Oftalmologia Clínica',
    orderNumber: 'OM-CV 0612',
    experienceYears: 11,
    languages: ['Português', 'Kriolu', 'Inglês'],
    education: 'Faculdade de Medicina de Lisboa / Especialização em Doenças da Córnea e Rastreio de Glaucoma',
    biography: 'Focada na saúde ocular preventiva e diagnóstico precoce de retinopatia e tensão ocular com equipamentos digitais de última geração.',
    availableDays: ['Segunda', 'Quarta', 'Sexta'],
    rating: 4.92,
    reviewsCount: 94,
    photoUrl: '/src/assets/images/pediatric_care_1790924885769.jpg'
  },
  {
    id: 'doc-denise',
    name: 'Dra. Denise Cabral',
    title: 'Dermatologista Clínica',
    specialtyId: 'dermatologia',
    specialtyName: 'Dermatologia & Venereologia',
    orderNumber: 'OM-CV 0574',
    experienceYears: 12,
    languages: ['Português', 'Kriolu', 'Francês'],
    education: 'Instituto de Dermatologia de Lisboa / Membro da Sociedade Portuguesa de Dermatologia',
    biography: 'Especialista em dermatoscopia digital de sinais, tratamentos capilares e regeneração cutânea com os mais elevados padrões de segurança e discrição.',
    availableDays: ['Terça', 'Quinta', 'Sábado'],
    rating: 4.96,
    reviewsCount: 160,
    photoUrl: '/src/assets/images/pediatric_care_1790924885769.jpg'
  },
  {
    id: 'doc-paulo',
    name: 'Dr. Paulo Miranda',
    title: 'Médico Dentista & Reabilitador Oral',
    specialtyId: 'medicina-dentaria',
    specialtyName: 'Medicina Dentária & Implantologia',
    orderNumber: 'OMD 0884',
    experienceYears: 14,
    languages: ['Português', 'Kriolu', 'Inglês'],
    education: 'Faculdade de Medicina Dentária da Universidade de Lisboa / Pós-graduação em Prótese Fixa e Implantes',
    biography: 'Dedicado à devolução do sorriso funcional e estético através de tratamentos suaves, anestesia computorizada sem dor e materiais de porcelana de alta biocompatibilidade.',
    availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    rating: 4.97,
    reviewsCount: 230,
    photoUrl: '/src/assets/images/doctor_consultation_1790924862032.jpg'
  }
];

export const EXAMS: ExamService[] = [
  {
    id: 'hemograma-completo',
    title: 'Hemograma Completo + Bioquímica Geral',
    category: 'Laboratório',
    description: 'Análise sanguínea detalhada para avaliação de glóbulos vermelhos, leucócitos, plaquetas, função renal e hepática.',
    deliveryTime: 'Disponível no mesmo dia (4 horas)',
    fastingRequired: true,
    preparationInstructions: 'Requer jejum prévio de 8 a 12 horas. Ingestão de água pura é permitida.',
    popular: true
  },
  {
    id: 'ecografia-abdominal',
    title: 'Ecografia Abdominal Total',
    category: 'Imagiologia',
    description: 'Exame de ultrassom de alta resolução para avaliação do fígado, vesícula biliar, pâncreas, baço e rins.',
    deliveryTime: 'Relatório e imagens entregues no final do exame',
    fastingRequired: true,
    preparationInstructions: 'Jejum de 6 horas. Beba 4 copos de água 1 hora antes sem urinar para bexiga cheia.',
    popular: true
  },
  {
    id: 'ecocardiograma-doppler',
    title: 'Ecocardiograma Transtorácico com Doppler',
    category: 'Cardiologia',
    description: 'Avaliação da estrutura, espessura e contratilidade do músculo cardíaco e fluxo das válvulas.',
    deliveryTime: 'Relatório médico imediato',
    fastingRequired: false,
    preparationInstructions: 'Não requer jejum. Recomenda-se roupa confortável de duas peças.',
    popular: true
  },
  {
    id: 'ecografia-obstetrica-4d',
    title: 'Ecografia Obstétrica 4D em Tempo Real',
    category: 'Imagiologia',
    description: 'Visualização tridimensional volumétrica do bebé com gravação digital e fotos de alta definição.',
    deliveryTime: 'Fotos e vídeo digital instantâneos',
    fastingRequired: false,
    preparationInstructions: 'Não aplicar cremes ou óleos na barriga nas 48h anteriores.',
    popular: true
  },
  {
    id: 'ecg-12-derivacoes',
    title: 'Eletrocardiograma (ECG) de 12 Derivações',
    category: 'Cardiologia',
    description: 'Registo elétrico da atividade cardíaca interpretado por cardiologista especialista.',
    deliveryTime: 'Entrega imediata com laudo',
    fastingRequired: false,
    preparationInstructions: 'Não requer preparação. Evite cafeína 2 horas antes.',
    popular: false
  },
  {
    id: 'perfil-lipidico-glicemia',
    title: 'Perfil Lipídico Completo & Hemoglobina Glicada',
    category: 'Laboratório',
    description: 'Doseamento de colesterol total, HDL, LDL, triglicerídeos e controlo glicémico dos últimos 3 meses.',
    deliveryTime: '24 horas',
    fastingRequired: true,
    preparationInstructions: 'Jejum obrigatório de 10 a 12 horas.',
    popular: false
  },
  {
    id: 'raio-x-digital',
    title: 'Raio-X Digital de Tórax e Articulações',
    category: 'Imagiologia',
    description: 'Radiografia com dose reduzida de radiação e processamento de imagem de alta definição.',
    deliveryTime: 'Disponível em 1 hora',
    fastingRequired: false,
    preparationInstructions: 'Retirar objetos metálicos, joias ou fechos na zona a radiografar.',
    popular: false
  },
  {
    id: 'checkup-executivo',
    title: 'Check-Up Geral de Saúde Porcelana',
    category: 'Check-up',
    description: 'Painel integrado: Análises completas + ECG + Ecografia Abdominal + Consulta de Medicina Geral.',
    deliveryTime: 'Relatório integrado consolidado em 48h',
    fastingRequired: true,
    preparationInstructions: 'Agendamento prévio na parte da manhã com jejum de 10 horas.',
    popular: true
  }
];

export const SAMPLE_TEST_RESULTS: Record<string, TestResult> = {
  'CMP-2026-9842': {
    code: 'CMP-2026-9842',
    patientName: 'Maria Silva Rodrigues',
    date: '28 de Setembro de 2026',
    examType: 'Hemograma Completo + Perfil Lipídico',
    doctorName: 'Dr. Nuno Pires',
    status: 'Concluído',
    summary: 'Valores globais dentro dos parâmetros normais de referência para a faixa etária. Sem sinais de anemia ou processo inflamatório agudo.',
    parameters: [
      { name: 'Hemoglobina', value: '13.8 g/dL', reference: '12.0 - 15.5 g/dL', status: 'normal' },
      { name: 'Leucócitos Totais', value: '6.400 /mm³', reference: '4.000 - 10.000 /mm³', status: 'normal' },
      { name: 'Plaquetas', value: '245.000 /mm³', reference: '150.000 - 400.000 /mm³', status: 'normal' },
      { name: 'Glicemia em Jejum', value: '88 mg/dL', reference: '70 - 99 mg/dL', status: 'normal' },
      { name: 'Colesterol Total', value: '182 mg/dL', reference: '< 200 mg/dL', status: 'normal' },
      { name: 'Colesterol HDL (Bom)', value: '58 mg/dL', reference: '> 50 mg/dL', status: 'normal' },
      { name: 'Triglicerídeos', value: '115 mg/dL', reference: '< 150 mg/dL', status: 'normal' }
    ],
    pdfAvailable: true
  },
  'CMP-2026-4411': {
    code: 'CMP-2026-4411',
    patientName: 'Carlos Manuel Mendes',
    date: '24 de Setembro de 2026',
    examType: 'Eletrocardiograma (ECG) + Ecografia Abdominal',
    doctorName: 'Dr. Arlindo Tavares',
    status: 'Concluído',
    summary: 'Ritmo sinusal regular a 68 bpm. Fígado, vesícula biliar e rins com dimensões e ecogenicidade preservadas. Sem litíase.',
    parameters: [
      { name: 'Frequência Cardíaca', value: '68 bpm', reference: '60 - 100 bpm', status: 'normal' },
      { name: 'Intervalo PR', value: '152 ms', reference: '120 - 200 ms', status: 'normal' },
      { name: 'Eixo Elétrico Cardíaco', value: '+45°', reference: '-30° a +90°', status: 'normal' },
      { name: 'Dimensão Hepática', value: 'Regular / Homogéneo', reference: 'Homogéneo', status: 'normal' },
      { name: 'Vesícula Biliar', value: 'Sem cálculos', reference: 'Alitiásica', status: 'normal' }
    ],
    pdfAvailable: true
  }
};

export const INSURANCES: InsurancePartner[] = [
  {
    id: 'inps',
    name: 'INPS - Previdência Social',
    type: 'Previdência Social',
    coverage: 'Comparticipação direta em consultas e análises',
    description: 'Convenção oficial para segurados e beneficiários do Instituto Nacional de Previdência Social.'
  },
  {
    id: 'impar',
    name: 'Ímpar Seguros',
    type: 'Seguradora Privada',
    coverage: 'Cobertura até 90% conforme plano contratado',
    description: 'Atendimento direto com autorização imediata para consultas de especialidade e exames de diagnóstico.'
  },
  {
    id: 'garantia',
    name: 'Garantia Seguros',
    type: 'Seguradora Privada',
    coverage: 'Rede convencionada com copagamento reduzido',
    description: 'Acesso simplificado a medicina dentária, cardiologia, ginecologia e análises laboratoriais.'
  },
  {
    id: 'multicare',
    name: 'Multicare Internacional',
    type: 'Subsistema de Saúde',
    coverage: 'Reembolso e autorização direta internacional',
    description: 'Válido para residentes e expatriados com seguros internacionais de saúde.'
  },
  {
    id: 'medis',
    name: 'Médis & AdvanceCare',
    type: 'Subsistema de Saúde',
    coverage: 'Acesso por reembolso facilitado e fatura detalhada',
    description: 'Emissão de relatório clínico em conformidade com as exigências dos seguros europeus e globais.'
  }
];

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'artigo-hipertensao',
    title: 'Hipertensão Arterial Silenciosa: Como Proteger o Seu Coração Antes dos Primeiros Sinais',
    category: 'Saúde Cardiovascular',
    readTime: '4 min de leitura',
    date: '29 de Setembro de 2026',
    authorName: 'Dr. Arlindo Tavares',
    authorRole: 'Cardiologista',
    summary: 'A hipertensão é frequentemente apelidada de ameaça invisível porque raramente causa sintomas no início. Saiba quais são as verificações essenciais que salvam vidas.',
    content: [
      'A pressão arterial elevada sobrecarrega as paredes dos vasos sanguíneos e o músculo cardíaco de forma silenciosa e gradual.',
      'Em Cabo Verde e nos países lusófonos, os hábitos alimentares ricos em sal e o sedentarismo aceleram o aparecimento precoce da hipertensão em adultos jovens.',
      'Recomenda-se medir a pressão pelo menos duas vezes por ano a partir dos 25 anos, mesmo sem histórico familiar prévio.',
      'No Centro Médico Porcelana dispomos de MAPA (Monitorização Ambulatória da Pressão Arterial) para diagnóstico preciso em 24 horas.'
    ]
  },
  {
    id: 'artigo-vacinacao-infantil',
    title: 'Calendário de Vacinas e Puericultura: O Guia dos Primeiros 1.000 Dias do Bebé',
    category: 'Pediatria',
    readTime: '5 min de leitura',
    date: '15 de Setembro de 2026',
    authorName: 'Dra. Marisa Fortes',
    authorRole: 'Pediatra',
    summary: 'Os primeiros mil dias de vida definem a imunidade e o desenvolvimento cognitivo da criança. Veja como estruturar as consultas preventivas sem ansiedade.',
    content: [
      'A vigilância regular de puericultura no primeiro ano deve ser mensal até aos 6 meses, permitindo avaliar peso, comprimento e perímetro cefálico.',
      'A amamentação materna exclusiva nos primeiros 6 meses fornece anticorpos insubstituíveis para proteger o trato respiratório e gastrointestinal.',
      'Mantenha sempre o boletim de vacinas atualizado e esclareça dúvidas antes de recorrer a medicamentos caseiros sem indicação pediátrica.'
    ]
  },
  {
    id: 'artigo-saude-oral',
    title: 'Higiene Oral e Facetas de Porcelana: O Futuro da Medicina Dentária Minimamente Invasiva',
    category: 'Medicina Dentária',
    readTime: '3 min de leitura',
    date: '02 de Setembro de 2026',
    authorName: 'Dr. Paulo Miranda',
    authorRole: 'Médico Dentista',
    summary: 'Descubra como a tecnologia digital moderna preserva a estrutura natural do dente com máxima estética e conforto.',
    content: [
      'A destartarização profissional a cada 6 meses remove o biofilme bacteriano que as escovas convencionais não alcançam.',
      'As porcelanas biomiméticas atuais oferecem uma resistência mecânica idêntica ao esmalte dental saudável, sem desgaste desnecessário da estrutura dentária.',
      'Com o scanner intraoral 3D disponível na nossa clínica, eliminamos moldes desconfortáveis e projetamos o sorriso no computador em minutos.'
    ]
  }
];

export const SYMPTOM_TRIAGE_GUIDE = [
  {
    id: 'cardio',
    category: 'Coração & Circulação',
    symptoms: ['Dor ou aperto no peito', 'Palpitações ou batimento acelerado', 'Inchaço nos tornozelos', 'Cansaço anormal ao subir escadas'],
    recommendedSpecialty: 'Cardiologia & Saúde Vascular',
    recommendedDoctor: 'Dr. Arlindo Tavares',
    urgencyLevel: 'Atenção Prioritária (Hoje ou Urgência se dor persistente)',
    advice: 'Se sentir dor intensa no peito com irradiação para o braço esquerdo ou mandíbula, dirija-se imediatamente à nossa urgência ou chame o 130.'
  },
  {
    id: 'geral',
    category: 'Sintomas Gerais & Cansaço',
    symptoms: ['Febre persistente há mais de 48h', 'Fadiga constante e fraqueza', 'Perda de peso involuntária', 'Tonturas ou mal-estar'],
    recommendedSpecialty: 'Medicina Geral e Familiar',
    recommendedDoctor: 'Dr. Nuno Pires',
    urgencyLevel: 'Consulta Regular (Próximas 24h a 48h)',
    advice: 'Um painel de análises clínicas associado a exame físico completo permite identificar causas comuns como anemias, carências vitamínicas ou infeções.'
  },
  {
    id: 'pediatrico',
    category: 'Crianças & Bebés',
    symptoms: ['Febre na criança ou recém-nascido', 'Dificuldade para respirar ou tosse chiada', 'Vómitos repetidos e recusa de líquidos', 'Manchas repentinas na pele'],
    recommendedSpecialty: 'Pediatria e Neonatologia',
    recommendedDoctor: 'Dra. Marisa Fortes',
    urgencyLevel: 'Atendimento Rápido Pediátrico',
    advice: 'Em recém-nascidos com febre superior a 38°C, a observação médica imediata é recomendada.'
  },
  {
    id: 'ossos',
    category: 'Coluna & Articulações',
    symptoms: ['Dor lombar aguda ao levantar', 'Dor no joelho após esforço físico', 'Rigidez matinal nas articulações', 'Traumatismo por queda'],
    recommendedSpecialty: 'Ortopedia & Traumatologia',
    recommendedDoctor: 'Dr. João Delgado',
    urgencyLevel: 'Consulta Especializada',
    advice: 'Evite automedicação com anti-inflamatórios prolongados sem proteção gástrica e avaliação diagnóstica com raio-x ou ecografia.'
  },
  {
    id: 'visao',
    category: 'Olhos & Visão',
    symptoms: ['Visão turva ou embaçada', 'Dor nos olhos ou sensibilidade extrema à luz', 'Manchas escuras flutuantes', 'Dores de cabeça ao ler'],
    recommendedSpecialty: 'Oftalmologia Clínica',
    recommendedDoctor: 'Dra. Vanessa Semedo',
    urgencyLevel: 'Avaliação Oftalmológica',
    advice: 'A medição periódica da pressão intraocular é indispensável para prevenir danos no nervo ótico.'
  }
];

export const FAQS = [
  {
    q: 'Como posso marcar uma consulta no Centro Médico Porcelana?',
    a: 'Pode marcar diretamente nesta plataforma online através do formulário de agendamento em 4 passos, pelo WhatsApp oficial (+238 991 2233), ou ligando para a nossa linha direta (+238 261 4455).'
  },
  {
    q: 'Quais são as convenções e seguros de saúde aceites?',
    a: 'Aceitamos o INPS (comparticipação direta para segurados), Ímpar Seguros, Garantia Seguros, e seguradoras internacionais através de faturação detalhada e relatórios clínicos homologados.'
  },
  {
    q: 'Com que antecedência recebo os resultados das análises clínicas?',
    a: 'A maioria das análises de rotina (hemograma, glicemia, urina, perfil lipídico) fica pronta no mesmo dia útil (entre 3 a 5 horas). Pode consultar e descarregar o relatório em formato digital inserindo o seu código no Portal do Paciente neste site.'
  },
  {
    q: 'É necessário jejum para todas as análises de sangue?',
    a: 'Nem todas as análises requerem jejum, mas exames como glicemia, colesterol e triglicerídeos exigem jejum de 8 a 12 horas. Água simples é permitida. Consulte a nossa secção de Preparação de Exames ou contacte o nosso laboratório.'
  },
  {
    q: 'O Centro Médico tem atendimento de urgência ou permanência?',
    a: 'Dispomos de atendimento médico continuado das 07h30 às 21h00 de Segunda a Sábado, e piquete médico de triagem 24/7 através da nossa linha de apoio telefónico para orientação clínica imediata.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    author: 'Dra. Indira Veiga',
    role: 'Professora Universitária',
    date: 'Setembro 2026',
    specialty: 'Cardiologia & Check-up',
    comment: 'Instalações de nível europeu em pleno centro da cidade. Fiz o meu check-up cardiovascular com o Dr. Arlindo Tavares e fiquei impressionada com o rigor dos exames e a pontualidade do atendimento.',
    rating: 5
  },
  {
    id: 'test-2',
    author: 'Eng. Gilson Monteiro',
    role: 'Engenheiro Civil',
    date: 'Agosto 2026',
    specialty: 'Medicina Dentária & Implante',
    comment: 'Tinha receio de procedimentos dentários, mas o Dr. Paulo Miranda e a equipa da Porcelana foram excecionais. Tecnologia indolor e acabamento perfeito em cerâmica. Recomendo a 100%.',
    rating: 5
  },
  {
    id: 'test-3',
    author: 'Samira Sanches',
    role: 'Mãe de dois filhos',
    date: 'Julho 2026',
    specialty: 'Pediatria',
    comment: 'A Dra. Marisa Fortes trata os meus pequenos com um carinho ímpar. Sempre disponível para esclarecer dúvidas e com um diagnóstico pediátrico impecável. O laboratório próprio também facilita imenso.',
    rating: 5
  }
];
