import { GoogleGenAI, Chat } from "@google/genai";
import type { Message } from '../types';

const API_KEY = process.env.API_KEY;

console.log('Gemini Service initializing...');
console.log('API_KEY available:', !!API_KEY);

if (!API_KEY) {
    console.error("API_KEY environment variable is not set. The application will not be able to connect to the Gemini API.");
}

let ai: any = null;

try {
    if (API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
        console.log('GoogleGenAI initialized successfully');
    } else {
        console.warn('Skipping GoogleGenAI initialization - no API key');
    }
} catch (error) {
    console.error('Failed to initialize GoogleGenAI:', error);
}

const model = 'gemini-2.5-flash';

// The expert persona for the Paediatric Clinical Companion, now with suggestion generation and emojis
const systemInstruction = "You are an expert Paediatric Clinical Companion. Your responses must be structured, point-based clinical outlines. Use clear subheadings (e.g., 'Definition', 'Clinical Presentation', 'Management'). Definitions should be concise. Also, use befitting and suitable emojis throughout your response to make the clinical information more engaging and easier to digest. Crucially, every single response MUST include a detailed 'Management' or 'Treatment' section. This is a strict requirement. After providing the clinical outline, you MUST provide a JSON array of 2-3 relevant follow-up questions a user might ask. This JSON array must be the VERY LAST thing in your response, with no other text after it. Example: [\"Tell me more about treatment options\", \"What are the common complications?\"]";

export const sendMessageToGemini = async (history: Message[]): Promise<{ mainResponse: string; suggestions: string[] }> => {
    if (!API_KEY || !ai) {
        const errorResult = {
            mainResponse: "Error: API key is not configured. Please ensure the VITE_GEMINI_API_KEY environment variable is set in Netlify.",
            suggestions: []
        };
        console.warn('Cannot send message - API not configured:', { API_KEY: !!API_KEY, ai: !!ai });
        return errorResult;
    }
    
    try {
        const chat: Chat = ai.chats.create({
            model: model,
            config: {
                systemInstruction: systemInstruction,
            },
            history: history.slice(0, -1).map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }))
        });

        const lastMessage = history[history.length - 1];
        if (!lastMessage || lastMessage.role !== 'user') {
            throw new Error("Last message must be from the user.");
        }

        const result = await chat.sendMessage({ message: lastMessage.text });
        const rawText = result.text;
        
        // --- Parsing Logic ---
        let mainResponse = rawText;
        let suggestions: string[] = [];

        const jsonStartIndex = rawText.lastIndexOf('[');
        // FIX: Corrected typo from `raw` to `rawText`.
        const jsonEndIndex = rawText.lastIndexOf(']');

        if (jsonStartIndex > -1 && jsonEndIndex > jsonStartIndex) {
            const jsonString = rawText.substring(jsonStartIndex, jsonEndIndex + 1);
            try {
                const parsedJson = JSON.parse(jsonString);
                if (Array.isArray(parsedJson) && parsedJson.every(item => typeof item === 'string')) {
                    suggestions = parsedJson;
                    // Trim the JSON part from the main response
                    mainResponse = rawText.substring(0, jsonStartIndex).trim();
                }
            } catch (e) {
                // If parsing fails, treat the whole thing as the main response
                console.warn("Failed to parse suggestions JSON, treating as part of the main response.", e);
            }
        }
        
        return { mainResponse, suggestions };

    } catch (error) {
        console.error("Error communicating with Gemini API:", error);
        throw error;
    }
};