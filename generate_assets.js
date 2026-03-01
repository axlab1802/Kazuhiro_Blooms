const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');
require('dotenv').config();

const flowers = JSON.parse(fs.readFileSync('flowers.json', 'utf8'));

// Blob result mapping
let mapping = {};
try {
    if (fs.existsSync('src/lib/season_blobs.json')) {
        mapping = JSON.parse(fs.readFileSync('src/lib/season_blobs.json', 'utf8'));
    }
} catch (e) { }

async function uploadToBlob(filePath, fileName) {
    const fileContent = fs.readFileSync(filePath);
    try {
        const { url } = await put(`flowers/${fileName}`, fileContent, {
            access: 'public',
            contentType: 'image/png',
            addRandomSuffix: false, // Keep it clean for replacement mapping if needed
            token: process.env.BLOB_READ_WRITE_TOKEN
        });
        return url;
    } catch (err) {
        console.error(`Upload error for ${fileName}:`, err.message);
        return null;
    }
}

async function generateImage(index, season, flower) {
    // Use geminiapikey as defined in user's .env
    const ai = new GoogleGenAI({
        apiKey: process.env.geminiapikey,
    });

    const config = {
        imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K",
        },
        responseModalities: ['IMAGE'],
    };
    const model = 'gemini-3-pro-image-preview';

    const prompt = `A beautiful high-quality professional studio photograph of ${flower} flower arrangement. Japanese aesthetic, representing the micro-season "${season}". Pure white background, isolated, soft bright natural light. Elegant, minimalist design.`;

    const contents = [
        {
            role: 'user',
            parts: [{ text: prompt }],
        },
    ];

    try {
        const responseStream = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        for await (const chunk of responseStream) {
            if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
                const inlineData = chunk.candidates[0].content.parts[0].inlineData;
                const buffer = Buffer.from(inlineData.data, 'base64');
                const fileName = `${String(index + 1).padStart(2, '0')}_${season}.png`;
                const filePath = path.join(__dirname, 'src/assets/flowers', fileName);

                fs.writeFileSync(filePath, buffer);
                console.log(`- Generated: ${fileName}`);

                // Upload to Blob
                console.log(`- Uploading to Blob...`);
                const url = await uploadToBlob(filePath, fileName);
                if (url) {
                    mapping[index + 1] = url;
                    // Save mapping periodically
                    fs.writeFileSync('src/lib/season_blobs.json', JSON.stringify(mapping, null, 2));
                    console.log(`- Saved mapping for ${index + 1}: ${url}`);
                }

                return true;
            }
        }
        return false;
    } catch (error) {
        console.error(`Error for ${season}:`, error.message);
        return false;
    }
}

async function main() {
    console.log("Starting generation and upload process...");
    for (let i = 0; i < flowers.length; i++) {
        // skip if already done? 
        if (mapping[i + 1]) {
            console.log(`Skipping [${i + 1}/${flowers.length}] ${flowers[i].season} - already exists.`);
            continue;
        }

        console.log(`\n[${i + 1}/${flowers.length}] Processing ${flowers[i].season}...`);
        const success = await generateImage(i, flowers[i].season, flowers[i].flower);

        if (success) {
            console.log(`- Success. Waiting 5s...`);
            await new Promise(r => setTimeout(r, 5000));
        } else {
            console.log(`- Failed. Waiting 10s...`);
            await new Promise(r => setTimeout(r, 10000));
        }
    }
    console.log("\nAll Done!");
}

main();
