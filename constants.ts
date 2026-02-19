import { BudgetItem, Deliverable, ImpactItem, KPIMetric, TechItem, Sensor, Enterprise } from "./types";

export const BUDGET_DATA: BudgetItem[] = [
  { year: '2026', amount: 2497.8, phase: '1-bosqich' },
  { year: '2027', amount: 2495.4, phase: '2-bosqich' },
  { year: '2028', amount: 2472.9, phase: '3-bosqich' },
];

export const KPI_DATA: KPIMetric[] = [
  { 
    id: '1', 
    label: 'Xarajatlarni tejash', 
    value: '10% – 25%', 
    subtext: 'AI optimallashtirish hisobiga',
    icon: 'trending-up',
    color: 'bg-emerald-100 text-emerald-600'
  },
  { 
    id: '2', 
    label: 'Xavflarni kamaytirish', 
    value: '70% – 80%', 
    subtext: 'Avariya va qoidabuzarliklar oldini olish',
    icon: 'shield',
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    id: '3', 
    label: 'Ma\'lumot rejimi', 
    value: 'Real-Time', 
    subtext: 'Haqiqiy vaqt rejimi',
    icon: 'clock',
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    id: '4', 
    label: 'Integratsiya', 
    value: 'SDE', 
    subtext: 'Yagona ma\'lumotlar tizimi',
    icon: 'database',
    color: 'bg-orange-100 text-orange-600'
  },
];

export const TECH_STACK: TechItem[] = [
  { category: 'Datchiklar (Hardware)', items: 'IoT sensorlar, Sanoat datchiklari (havo, suv, chiqindi)', icon: 'cpu' },
  { category: 'Ma\'lumot uzatish', items: 'MQTT, Apache Kafka, OPC UA', icon: 'network' },
  { category: 'Sun\'iy Intellekt', items: 'Machine Learning, TensorFlow, PyTorch, Scikit-Learn', icon: 'brain' },
  { category: 'Backend & Cloud', items: 'Virtual serverlar, Bulutli texnologiyalar', icon: 'server' },
  { category: 'Xavfsizlik', items: 'Kuchli shifrlash (Encryption), Autentifikatsiya', icon: 'lock' },
];

export const DELIVERABLES: Deliverable[] = [
  { type: 'Scopus / Web of Science', count: '2 ta', comment: 'Xalqaro maqola' },
  { type: 'Hamkorlikdagi maqolalar', count: '3 ta', comment: 'Turkiya olimlari bilan (Scopus)' },
  { type: 'Mahalliy maqolalar', count: '6 ta', comment: 'Ilmiy jurnallarda' },
  { type: 'Monografiya', count: '1 ta', comment: 'Ilmiy asar' },
  { type: 'O\'quv qo\'llanma', count: '1 ta', comment: 'Talabalar uchun' },
  { type: 'Intellektual mulk', count: '2 ta', comment: 'DGU va Platforma' },
];

export const IMPACT_DATA: ImpactItem[] = [
  { area: 'Ekologik', description: 'Chiqindilarni kamaytirish, toza havo va suv monitoringi.', icon: 'leaf' },
  { area: 'Ijtimoiy', description: 'Aholi salomatligini yaxshilash, ekologik madaniyatni oshirish.', icon: 'users' },
  { area: 'Iqtisodiy', description: '"Yashil" kreditlar va ESG investitsiyalarni jalb qilish imkoniyati.', icon: 'dollar-sign' },
  { area: 'Shaffoflik', description: 'Jamoatchilik nazorati va ochiq ma\'lumotlar.', icon: 'eye' },
];

export const ENTERPRISES: Enterprise[] = [
  { id: 'nmmc', name: 'Navoiy Metallurgiya Kombinati', location: 'Navoiy', status: 'active' },
  { id: 'ung', name: 'O\'zbekneftgaz GTL', location: 'Qashqadaryo', status: 'active' },
  { id: 'navoiyazot', name: 'Navoiyazot AJ', location: 'Navoiy', status: 'maintenance' },
  { id: 'maxam', name: 'Maxam-Chirchiq', location: 'Chirchiq', status: 'active' },
];

export const SENSORS: Sensor[] = [
  { id: 's1', name: 'Havo Sifati (PM2.5)', type: 'air', value: 12.5, unit: 'µg/m³', status: 'normal', location: { x: 25, y: 30 } },
  { id: 's2', name: 'Suv Sarfi (Main Inlet)', type: 'water', value: 450, unit: 'm³/h', status: 'normal', location: { x: 60, y: 15 } },
  { id: 's3', name: 'Zararli Gazlar (CO2)', type: 'air', value: 850, unit: 'ppm', status: 'warning', location: { x: 45, y: 55 } },
  { id: 's4', name: 'Chiqindi Rejimi', type: 'waste', value: 2.1, unit: 't/kun', status: 'normal', location: { x: 80, y: 70 } },
  { id: 's5', name: 'Energiya Sarfi', type: 'energy', value: 1240, unit: 'kWh', status: 'normal', location: { x: 20, y: 75 } },
  { id: 's6', name: 'Suv Ishqori (PH)', type: 'water', value: 7.2, unit: 'pH', status: 'normal', location: { x: 75, y: 35 } },
  { id: 's7', name: 'Shovqin Darajasi', type: 'noise', value: 68, unit: 'dB', status: 'normal', location: { x: 10, y: 20 } },
  { id: 's8', name: 'Vibratsiya Monitoringi', type: 'vibration', value: 0.15, unit: 'mm/s', status: 'normal', location: { x: 35, y: 40 } },
  { id: 's9', name: 'Radiatsiya Foni', type: 'radiation', value: 0.12, unit: 'µSv/h', status: 'normal', location: { x: 90, y: 10 } },
  { id: 's10', name: 'Sex Shovqini (Industrial)', type: 'noise', value: 87, unit: 'dB', status: 'warning', location: { x: 55, y: 85 } },
];