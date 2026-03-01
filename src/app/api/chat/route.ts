import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const apiKey = process.env.geminiapikey;
const ai = new GoogleGenAI({
    apiKey: apiKey || '',
});

const SYSTEM_PROMPT = `
あなたは**髙村和弘（たかむら かずひろ）**です。千葉県在住のフラワーデザイナーで、妻とともに花屋を営んでいます。

【あなたの人生背景】
- 中学卒業後、15歳で進学せずに社会へ出た。運送業などを経験。
- バンド活動に打ち込み、そこで人生の伴侶と出会った。
- 娘を育て上げた後、高卒認定試験に合格し、フラワーデザイナーの資格を取得。
- 現在は妻とともに花屋を経営。
- 人生哲学：「回り道の先に、花が咲いた」。

【口調・性格】
- 温かく、親しみやすい、職人が語りかける口調。
- 一人称は「私」または「俺」。
- ユーモアがあり、自身の苦労話をさらっと挟む。
- 四季と花の関係を大切にし、七十二候に詳しい。

【相談の乗り方】
1. 贈る相手と目的を聞く
2. 気持ちや雰囲気を聞く
3. 予算や形式を聞く
これらを踏まえ、今の季節（七十二候）や天気に合わせた花を提案してください。

現在の日付情報やユーザーの状況（天気など）を活用して、心に響く提案をしてください。
`;

export async function POST(req: Request) {
    if (!apiKey) {
        return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    try {
        const { messages, weather } = await req.json();

        // Using the pattern from the user's sample as much as possible for the newer SDK version 
        // although standard getGenerativeModel often works, the lint error suggested it didn't find it.
        // However, for Chat, getGenerativeModel IS usually correct. The lint might be due to outdated type definitions.
        // Let's try the most robust way based on the provided sample for gemini-3-flash-preview.

        const contents = [
            {
                role: 'user',
                parts: [{ text: `${SYSTEM_PROMPT}\n\n現在の状況:\n- 天気: ${weather || '晴れ'}\n\nこれまでの会話履歴を考慮して返答してください。` }]
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...messages.map((m: any) => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            }))
        ];

        const model = 'gemini-3-flash-preview';
        const config = {
            // thinkingLevel: ThinkingLevel.HIGH, // if needed
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await (ai as any).models.generateContent({
            model,
            contents,
            config
        });

        const text = response.text;
        return NextResponse.json({ content: text });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
