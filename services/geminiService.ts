import { GoogleGenAI, Chat } from "@google/genai";
import type { Message } from '../types';

// Try multiple ways to get the API key
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string) || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY;

console.log('Gemini Service initializing...');
console.log('API_KEY available:', !!API_KEY);
console.log('API_KEY value (first 10 chars):', API_KEY?.substring(0, 10) || 'undefined');

if (!API_KEY) {
    console.error("❌ CRITICAL: API_KEY not found! Checked:", {
        'import.meta.env.VITE_GEMINI_API_KEY': !!import.meta.env.VITE_GEMINI_API_KEY,
        'process.env.API_KEY': !!process.env.API_KEY,
        'process.env.VITE_GEMINI_API_KEY': !!process.env.VITE_GEMINI_API_KEY
    });
}

let ai: any = null;

try {
    if (API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
        console.log('✅ GoogleGenAI initialized successfully');
    } else {
        console.warn('⚠️ Skipping GoogleGenAI initialization - no API key');
    }
} catch (error) {
    console.error('❌ Failed to initialize GoogleGenAI:', error);
}

const model = 'gemini-flash-lite-latest';

// The expert persona for the Paediatric Clinical Companion, now with suggestion generation and emojis
const systemInstruction = `You are an expert Paediatric Clinical Companion. 🩺

Your responses must follow these strict rules:

1.  **Format:** Use structured, point-based outlines ONLY.
2.  **Headings:** Use clear, numbered markdown headings (e.g., ## 1. Overview).
3.  **Brevity:** Keep ALL points and definitions extremely short and concise.
4.  **Points:** Use bullet points (*) for all information under a heading.
5.  **Spacing:** Ensure generous blank-line spacing between each numbered section.
6.  **Tone:** Use relevant emojis 🧠🩹💊 to make clinical information engaging.
7.  **MANDATORY SECTION:** Every single response MUST include a "## X. Management" or "## X. Treatment" section.

Below is a perfect example of the required output structure. Follow this format precisely.

###
## 1. Overview

* **Definition:** A life-threatening parasitic disease caused by **Plasmodium**.
* **Transmission:** Bite of an infected female **Anopheles mosquito**.
* **Hallmark:** Fever + travel to an endemic area.
* **Classification:** Uncomplicated vs. Severe.

## 2. Etiology

* **Pathogen:** *Plasmodium* parasites.
* **Key Species:**
    * ***P. falciparum:*** Most virulent; causes severe malaria.
    * ***P. vivax:*** Milder disease (tertian malaria).
    * ***P. ovale:*** Tertian malaria; dormant liver stage (hypnozoites).
    * ***P. malariae:*** Quartan malaria.

## 3. Clinical Features

* **Incubation:** 7–30 days.
* **Uncomplicated:** Flu-like symptoms, classic fever paroxysms (chills, fever, sweats).
* **Severe (P. falciparum):** Medical emergency.
    * **CNS:** Coma, seizures.
    * **Heme:** Severe anemia (< 7 g/dL).
    * **Renal:** AKI ("blackwater fever").
    * **Metabolic:** Hypoglycemia, acidosis.

## 4. Diagnosis

* **Gold Standard:** **Thick and thin blood smears**.
    * **Thick Smear:** Detects parasites.
    * **Thin Smear:** Identifies species.
* **Rapid Tests (RDTs):** Detect *Plasmodium* antigens; confirm with microscopy.
* **Labs:** Anemia, thrombocytopenia.

## 5. Management

* **Severe Malaria:**
    * **Admission:** ICU.
    * **Drug:** **IV Artesunate** (first-line).
    * **Support:** ABCs, manage hypoglycemia, seizures.
* **Uncomplicated Malaria:**
    * **Drugs:** Oral antimalarials (e.g., Artemether-lumefantrine).
* **P. vivax / P. ovale:**
    * **Add:** **Primaquine** (after G6PD check) to kill liver hypnozoites.
###
`;

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
                temperature: 1.25,
                maxOutputTokens: 10000,
                thinkingConfig: {
                thinkingBudget: -1,
                },
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