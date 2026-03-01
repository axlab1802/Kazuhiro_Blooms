'use client';

import { getCurrentSeason, SeasonData } from '@/lib/seasons';
import FlowerHero from '@/components/FlowerHero';
import ChatBot from '@/components/ChatBot';
import SeasonalNav from '@/components/SeasonalNav';
import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';

export default function Home() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonData | null>(null);
  const [weather, setWeather] = useState('晴れ');

  // Initialize with current season
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSeason(getCurrentSeason());
  }, []);

  const weatherOptions = [
    { name: '晴れ', icon: Sun },
    { name: '曇り', icon: Cloud },
    { name: '雨', icon: CloudRain },
    { name: '雪', icon: Snowflake },
  ];

  if (!selectedSeason) return null;

  return (
    <main className="min-h-screen bg-[#fdfcfb] pt-8 md:pt-12 pb-12 px-4 md:px-8">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30 overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-[#faedcd] blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-[#e9edc9] blur-3xl opacity-60" />
      </div>

      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 pb-8 border-b border-black/5">
        <div>
          <h1 className="text-3xl md:text-5xl font-playfair tracking-tight text-[#2d3a3a] font-black">
            Kazuhiro Blooms
          </h1>
          <p className="text-[10px] sm:text-xs font-sans font-black text-accent tracking-[0.4em] uppercase mt-2">
            千葉の空の下、心に寄り添う一輪を
          </p>
        </div>

        <div className="flex items-center gap-6 glass px-6 py-4 rounded-3xl premium-shadow border border-white/60">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.1em] mb-2">Today&apos;s Weather</p>
            <div className="flex gap-2">
              {weatherOptions.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => setWeather(opt.name)}
                  className={`p-2 rounded-xl transition-all ${weather === opt.name ? 'bg-accent text-white shadow-lg scale-110' : 'bg-white/50 text-gray-400 hover:text-accent'
                    }`}
                  title={opt.name}
                >
                  <opt.icon size={16} />
                </button>
              ))}
            </div>
          </div>
          <div className="w-px h-10 bg-black/10" />
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.1em] mb-1">Seasonal Focus</p>
            <p className="text-lg font-playfair font-black text-[#2d3a3a]">{selectedSeason.name}</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Flower Hero Section */}
        <section>
          <FlowerHero season={selectedSeason} />
        </section>

        {/* Interaction Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-stretch">
          {/* Chatbot Column */}
          <section className="xl:col-span-8 flex flex-col h-full">
            <div className="glass rounded-[3rem] p-6 md:p-12 premium-shadow flex-1 flex flex-col border border-white/60 bg-white/40">
              <div className="flex items-center justify-between mb-10 pb-8 border-b border-black/5">
                <div>
                  <h2 className="text-3xl font-playfair text-[#2d3a3a] font-bold">高村和弘 AI 相談室</h2>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-[0.2em] font-black italic opacity-70">Design & Purpose Consultant</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <span className="text-[10px] text-green-700 font-black uppercase">Active Studio</span>
                </div>
              </div>

              <div className="flex-1 min-h-[600px] flex flex-col">
                <ChatBot weather={weather} season={selectedSeason} />
              </div>
            </div>
          </section>

          {/* Sidebar / Seasonal Nav */}
          <section className="xl:col-span-4 flex flex-col gap-8">
            <div className="glass rounded-[3rem] p-8 md:p-10 premium-shadow border border-white/60 flex-1 flex flex-col bg-white/40">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-playfair text-[#2d3a3a] font-bold">暦の調べ</h3>
                  <p className="text-[8px] uppercase tracking-widest font-black text-accent mt-1">Japanese 72 Micro-Seasons</p>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <SeasonalNav
                  currentId={selectedSeason.id}
                  onSelect={(season: SeasonData) => setSelectedSeason(season)}
                />
              </div>
            </div>

            <div className="bg-[#2d3a3a] text-white rounded-[3rem] p-10 md:p-12 premium-shadow overflow-hidden relative group border border-white/10">
              <div className="relative z-10">
                <div className="w-16 h-1 bg-accent mb-8 group-hover:w-24 transition-all duration-700 ease-out" />
                <h3 className="text-xl font-playfair italic mb-6 opacity-95 tracking-wider leading-relaxed">デザイナーの独り言</h3>
                <p className="text-sm md:text-base leading-relaxed text-gray-300 font-serif italic font-light">
                  「回ってきたから、見える。遠回りしたから、手触りがわかる。お花も人生も、きっとそんなもんです。鋏の重みを感じながら、今日も一輪を届けます。」
                  <br /><br />
                  <span className="text-accent text-xs font-black uppercase tracking-widest mt-4 block">
                    千葉にて、高村和弘
                  </span>
                </p>
              </div>
              {/* Abstract animations */}
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
              <div className="absolute top-10 right-10 w-12 h-12 border border-white/5 rounded-full" />
            </div>
          </section>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto mt-24 text-center border-t border-[#ccd5ae]/30 pt-16 pb-16 text-[#a5a58d] text-[10px] uppercase font-black tracking-[0.4em] opacity-60">
        &copy; 2026 Kazuhiro Blooms &bull; Master Floral Designer in Chiba &bull; Powered by Google AI
      </footer>
    </main>
  );
}
