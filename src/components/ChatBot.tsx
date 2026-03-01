'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatBot({ weather }: { weather: string }) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'こんにちは、高村です。今日はどんなお花をお探しかな？誰かに贈りたいのか、今の自分を変えたいのか、なんでも話してみてください。回り道の話でも歓迎ですよ。' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    async function handleSend() {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    weather: weather
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'すみません、少し考え込んでしまいました（接続エラーですな）。また少し時間を空けて話しかけてもらえますか？' }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col flex-1 h-full max-h-[1200px] gap-4">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar"
            >
                <AnimatePresence>
                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[85%] gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-accent' : 'bg-[#2d3a3a]'} text-white`}>
                                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl group relative ${m.role === 'user'
                                    ? 'bg-accent text-white rounded-tr-none'
                                    : 'bg-white/80 border border-[#e9edc9] text-[#2d3a3a] shadow-sm rounded-tl-none'
                                    }`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex max-w-[85%] gap-3 items-center text-gray-400 italic">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2d3a3a]/10 flex items-center justify-center">
                                <Loader2 className="animate-spin" size={16} />
                            </div>
                            <span className="text-xs">和弘が考えています...</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-4 mt-auto border-t border-[#ccd5ae]/20">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="relative flex items-center group"
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        placeholder="どんなお花にしましょうか..."
                        className="w-full bg-[#fefae0]/50 border-none rounded-2xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-accent/30 outline-none transition-all placeholder:italic placeholder:text-[#a5a58d]"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-3 p-3 bg-accent text-white rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-30 flex items-center justify-center"
                    >
                        <Send size={18} />
                    </button>
                </form>
                <p className="text-[10px] text-center mt-3 text-gray-400 font-serif">
                    誠実に、ひとつひとつの相談に向き合います。
                </p>
            </div>
        </div>
    );
}
