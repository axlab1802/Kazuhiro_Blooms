'use client';

import { SeasonData, getSeasonImageAssetPath } from '@/lib/seasons';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FlowerHero({ season }: { season: SeasonData }) {
    return (
        <div className="relative w-full rounded-3xl overflow-hidden glass premium-shadow mb-16 aspect-[21/9] md:aspect-[21/7] max-h-[500px] flex items-center">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-radial from-[#d4a373] to-transparent pointer-events-none" />

            <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-block px-3 py-1 bg-[#faedcd] text-[#a5a58d] text-xs font-bold tracking-widest rounded-full mb-4">
                        現在の七十二候: {season.id}/72
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-[#2d3a3a] mb-4">
                        {season.name}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 italic font-serif border-l-2 border-accent pl-4 mb-4">
                        — {season.meaning}
                    </p>
                    <div className="flex items-center space-x-2 text-[#a5a58d] font-serif">
                        <span className="text-xs uppercase tracking-widest">季節の花:</span>
                        <span className="text-lg font-medium">{season.flower}</span>
                    </div>
                </motion.div>
            </div>

            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full flex justify-center items-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="relative w-full h-full max-h-[400px]"
                >
                    <Image
                        src={getSeasonImageAssetPath(season)}
                        alt={season.flower}
                        fill
                        className="object-contain p-4 md:p-12 hover:scale-105 transition-transform duration-700 pointer-events-auto"
                        onError={(e) => {
                            // Fallback if image not generated yet
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1490750967868-886a502c3821?q=80&w=2070&auto=format&fit=crop';
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
