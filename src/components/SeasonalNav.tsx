'use client';

import { SEASONS, SeasonData } from '@/lib/seasons';
import { motion } from 'framer-motion';

interface SeasonalNavProps {
    currentId: number;
    onSelect?: (season: SeasonData) => void;
}

export default function SeasonalNav({ currentId, onSelect }: SeasonalNavProps) {
    return (
        <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {SEASONS.map((s) => (
                <button
                    key={s.id}
                    onClick={() => onSelect?.(s)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border text-left group ${s.id === currentId
                            ? 'bg-[#faedcd]/40 border-[#d4a373]/30 shadow-sm'
                            : 'hover:bg-white border-transparent text-gray-500'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center transition-colors ${s.id === currentId ? 'bg-accent text-white shadow-md' : 'bg-gray-100 text-gray-400 group-hover:bg-accent/10'
                            }`}>
                            {s.id}
                        </span>
                        <div className="flex flex-col">
                            <span className={`text-sm font-playfair font-bold ${s.id === currentId ? 'text-[#2d3a3a]' : 'text-gray-600'}`}>
                                {s.name}
                            </span>
                            <span className="text-[10px] font-sans opacity-60 uppercase tracking-widest font-semibold">{s.period}</span>
                        </div>
                    </div>
                    <div className="text-[10px] font-serif italic text-[#a5a58d] max-w-[80px] text-right leading-tight">
                        {s.flower}
                    </div>
                </button>
            ))}
        </div>
    );
}
