import React from 'react';
import { Target, Briefcase, ChevronRight } from 'lucide-react';

export const Commercialization: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <Target size={24} />
                </div>
                <h2 className="text-2xl font-bold">Maqsadli Auditoriya</h2>
            </div>
            <ul className="space-y-3">
                {['Metallurgiya sanoati', 'Neft-gaz tarmog\'i', 'Kimyo sanoati', 'Qurilish materiallari'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-200">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="relative z-10">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <Briefcase size={24} />
                </div>
                <h2 className="text-2xl font-bold">Tijorat Xizmatlari</h2>
            </div>
             <div className="space-y-4">
                {[
                    'Yashil kredit monitoringi', 
                    'ESG auditi va konsalting', 
                    'Individual strategik modellar', 
                    'Yashil sertifikatlash integratsiyasi'
                ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center group p-3 border-b border-slate-700 hover:border-emerald-500/50 transition-colors cursor-default">
                        <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                        <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                ))}
             </div>
        </div>
    </div>
  );
};