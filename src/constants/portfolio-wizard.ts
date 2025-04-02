import { Company } from '@/store/portfolio-wizard-store';

// Preguntas para la evaluación de riesgo
export const riskAssessmentQuestions = [
  {
    id: 'timeHorizon',
    question: '¿Cuál es tu horizonte temporal de inversión?',
    options: [
      { value: 1, text: 'Menos de 1 año' },
      { value: 2, text: 'Entre 1 y 3 años' },
      { value: 3, text: 'Entre 3 y 5 años' },
      { value: 4, text: 'Entre 5 y 10 años' },
      { value: 5, text: 'Más de 10 años' }
    ]
  },
  {
    id: 'investmentGoal',
    question: '¿Cuál es tu principal objetivo de inversión?',
    options: [
      { value: 1, text: 'Preservar mi capital con mínimo riesgo' },
      { value: 2, text: 'Generar ingresos regulares (dividendos)' },
      { value: 3, text: 'Obtener un equilibrio entre crecimiento e ingresos' },
      { value: 4, text: 'Lograr un crecimiento moderado a largo plazo' },
      { value: 5, text: 'Maximizar el crecimiento a largo plazo' }
    ]
  },
  {
    id: 'riskTolerance',
    question: 'Si tu inversión perdiera un 20% de su valor en un mes, ¿qué harías?',
    options: [
      { value: 1, text: 'Vender todo inmediatamente para evitar más pérdidas' },
      { value: 2, text: 'Vender una parte para reducir el riesgo' },
      { value: 3, text: 'No hacer nada y esperar a que se recupere' },
      { value: 4, text: 'Analizar si es una oportunidad para invertir un poco más' },
      { value: 5, text: 'Invertir significativamente más aprovechando los precios bajos' }
    ]
  },
  {
    id: 'investmentKnowledge',
    question: '¿Cuál es tu nivel de conocimiento sobre inversiones?',
    options: [
      { value: 1, text: 'Muy limitado' },
      { value: 2, text: 'Básico' },
      { value: 3, text: 'Intermedio' },
      { value: 4, text: 'Avanzado' },
      { value: 5, text: 'Experto' }
    ]
  },
  {
    id: 'incomeStability',
    question: '¿Cómo describirías la estabilidad de tus ingresos regulares?',
    options: [
      { value: 1, text: 'Muy inestable o impredecible' },
      { value: 2, text: 'Algo inestable' },
      { value: 3, text: 'Moderadamente estable' },
      { value: 4, text: 'Bastante estable' },
      { value: 5, text: 'Muy estable y predecible' }
    ]
  }
];

// Datos de empresas simuladas
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Tecnológica Global',
    ticker: 'TECG',
    sector: 'Tecnología',
    region: 'Norteamérica',
    marketCap: 2500000000000, // 2.5T
    price: 180.50,
    dividend: 0.5,
    volatility: 25
  },
  {
    id: '2',
    name: 'Bancaria Internacional',
    ticker: 'BINT',
    sector: 'Financiero',
    region: 'Europa',
    marketCap: 350000000000, // 350B
    price: 65.75,
    dividend: 3.2,
    volatility: 18
  },
  {
    id: '3',
    name: 'Energía Renovable',
    ticker: 'ERNV',
    sector: 'Energía',
    region: 'Europa',
    marketCap: 85000000000, // 85B
    price: 42.30,
    dividend: 1.8,
    volatility: 30
  },
  {
    id: '4',
    name: 'Farmacéutica Avanzada',
    ticker: 'FARM',
    sector: 'Salud',
    region: 'Norteamérica',
    marketCap: 420000000000, // 420B
    price: 95.60,
    dividend: 2.1,
    volatility: 22
  },
  {
    id: '5',
    name: 'Consumo Retail',
    ticker: 'CONS',
    sector: 'Consumo',
    region: 'Norteamérica',
    marketCap: 320000000000, // 320B
    price: 54.25,
    dividend: 2.5,
    volatility: 15
  },
  {
    id: '6',
    name: 'Telecomunicaciones Unidas',
    ticker: 'TELC',
    sector: 'Telecomunicaciones',
    region: 'Asia',
    marketCap: 210000000000, // 210B
    price: 38.90,
    dividend: 4.2,
    volatility: 12
  },
  {
    id: '7',
    name: 'Automotriz Eléctrica',
    ticker: 'AUTO',
    sector: 'Automotriz',
    region: 'Norteamérica',
    marketCap: 650000000000, // 650B
    price: 275.20,
    dividend: 0,
    volatility: 45
  },
  {
    id: '8',
    name: 'Minería Sostenible',
    ticker: 'MINE',
    sector: 'Materiales',
    region: 'Latinoamérica',
    marketCap: 65000000000, // 65B
    price: 32.75,
    dividend: 3.5,
    volatility: 28
  },
  {
    id: '9',
    name: 'Aerolínea Global',
    ticker: 'AERO',
    sector: 'Transporte',
    region: 'Europa',
    marketCap: 45000000000, // 45B
    price: 28.15,
    dividend: 1.2,
    volatility: 38
  },
  {
    id: '10',
    name: 'Constructora Internacional',
    ticker: 'CNST',
    sector: 'Inmobiliario',
    region: 'Asia',
    marketCap: 35000000000, // 35B
    price: 48.30,
    dividend: 2.8,
    volatility: 20
  },
  {
    id: '11',
    name: 'Agroindustria Verde',
    ticker: 'AGRO',
    sector: 'Agricultura',
    region: 'Latinoamérica',
    marketCap: 28000000000, // 28B
    price: 36.45,
    dividend: 2.2,
    volatility: 25
  },
  {
    id: '12',
    name: 'Software Empresarial',
    ticker: 'SOFT',
    sector: 'Tecnología',
    region: 'Norteamérica',
    marketCap: 580000000000, // 580B
    price: 215.70,
    dividend: 0.8,
    volatility: 32
  },
  {
    id: '13',
    name: 'Seguros Confiables',
    ticker: 'SEGR',
    sector: 'Financiero',
    region: 'Europa',
    marketCap: 120000000000, // 120B
    price: 72.50,
    dividend: 3.8,
    volatility: 14
  },
  {
    id: '14',
    name: 'Petróleo y Gas',
    ticker: 'PETR',
    sector: 'Energía',
    region: 'Medio Oriente',
    marketCap: 310000000000, // 310B
    price: 68.25,
    dividend: 4.5,
    volatility: 24
  },
  {
    id: '15',
    name: 'Biotecnología Innovadora',
    ticker: 'BIOT',
    sector: 'Salud',
    region: 'Norteamérica',
    marketCap: 95000000000, // 95B
    price: 128.35,
    dividend: 0,
    volatility: 48
  },
  {
    id: '16',
    name: 'Alimentos Procesados',
    ticker: 'ALIM',
    sector: 'Consumo',
    region: 'Europa',
    marketCap: 75000000000, // 75B
    price: 43.20,
    dividend: 2.6,
    volatility: 16
  },
  {
    id: '17',
    name: 'Medios Digitales',
    ticker: 'MEDI',
    sector: 'Comunicaciones',
    region: 'Norteamérica',
    marketCap: 180000000000, // 180B
    price: 86.75,
    dividend: 1.1,
    volatility: 35
  },
  {
    id: '18',
    name: 'Manufactura Industrial',
    ticker: 'MANU',
    sector: 'Industrial',
    region: 'Asia',
    marketCap: 58000000000, // 58B
    price: 52.40,
    dividend: 2.9,
    volatility: 22
  },
  {
    id: '19',
    name: 'Comercio Electrónico',
    ticker: 'ECOM',
    sector: 'Tecnología',
    region: 'Global',
    marketCap: 870000000000, // 870B
    price: 325.15,
    dividend: 0,
    volatility: 30
  },
  {
    id: '20',
    name: 'Servicios Nube',
    ticker: 'CLOD',
    sector: 'Tecnología',
    region: 'Norteamérica',
    marketCap: 1200000000000, // 1.2T
    price: 268.50,
    dividend: 0.3,
    volatility: 28
  },
  {
    id: '21',
    name: 'Turismo y Ocio',
    ticker: 'TOUR',
    sector: 'Servicios',
    region: 'Global',
    marketCap: 42000000000, // 42B
    price: 36.80,
    dividend: 1.9,
    volatility: 32
  },
  {
    id: '22',
    name: 'Metales Preciosos',
    ticker: 'METL',
    sector: 'Materiales',
    region: 'África',
    marketCap: 25000000000, // 25B
    price: 45.30,
    dividend: 3.3,
    volatility: 26
  },
  {
    id: '23',
    name: 'Infraestructura Global',
    ticker: 'INFR',
    sector: 'Industrial',
    region: 'Global',
    marketCap: 65000000000, // 65B
    price: 54.25,
    dividend: 3.7,
    volatility: 18
  },
  {
    id: '24',
    name: 'Defensa y Seguridad',
    ticker: 'DEFS',
    sector: 'Industrial',
    region: 'Norteamérica',
    marketCap: 110000000000, // 110B
    price: 78.90,
    dividend: 2.4,
    volatility: 22
  },
  {
    id: '25',
    name: 'Productos Lujo',
    ticker: 'LUJO',
    sector: 'Consumo',
    region: 'Europa',
    marketCap: 95000000000, // 95B
    price: 425.60,
    dividend: 1.6,
    volatility: 24
  }
];

// Lista de todos los sectores disponibles
export const allSectors = [...new Set(mockCompanies.map(company => company.sector))];

// Lista de todas las regiones disponibles
export const allRegions = [...new Set(mockCompanies.map(company => company.region))];

// Textos descriptivos para perfiles de riesgo
export const riskProfileDescriptions = {
  conservador: 'Este perfil busca preservar el capital con mínima exposición a la volatilidad. Enfatiza inversiones más seguras y estables, priorizando la protección del capital sobre el rendimiento.',
  moderado: 'Este perfil busca un crecimiento modesto con riesgo limitado. Combina inversiones estables con algunas oportunidades de crecimiento controlado.',
  equilibrado: 'Este perfil busca un balance entre crecimiento e ingresos. Distribuye las inversiones entre opciones estables y de mayor potencial de crecimiento.',
  crecimiento: 'Este perfil prioriza el crecimiento a largo plazo, tolerando mayor volatilidad. Incluye mayor proporción de inversiones con potencial de apreciación significativa.',
  agresivo: 'Este perfil busca maximizar el crecimiento a largo plazo, asumiendo alta volatilidad. Concentra inversiones en sectores de alto crecimiento y mayor riesgo.'
}; 