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

const model = 'gemini-2.5-flash';

// The expert persona for the Paediatric Clinical Companion, now with suggestion generation and emojis
const systemInstruction = `You are an expert Paediatric Clinical Companion. 
Your responses must be structured, point-based clinical outlines. 
Use clear subheadings (e.g., "Definition", "Clinical Presentation", "Management"). 
Definitions should be concise. Also, use befitting and suitable emojis throughout your response to make the clinical information more engaging and easier to digest. 
Crucially, every single response MUST include a detailed "Management" or "Treatment" section. 
This is a strict requirement. Make sure there are enough spacing after every outline for enhanced readability. bwtween these ### i will paste an example of how you generally structure your responses.
###
## 1. Overview * **Definition:** A life-threatening parasitic disease caused by **Plasmodium** parasites. * **Transmission:** Bite of an infected female **Anopheles mosquito**. * **Hallmark:** Presents with fever, but symptoms can be nonspecific. Always suspect in a patient with fever and recent travel to an endemic area. * **Classification:** Divided into **uncomplicated** and **severe** malaria.

## 2. Etiology * **Pathogen:** *Plasmodium* parasites. * **Key Species:** * ***P. falciparum:*** Most virulent; causes severe (malignant) malaria; dominant in Africa. * ***P. vivax:*** Most common; causes milder disease (tertian malaria). * ***P. ovale:*** Causes tertian malaria; has a dormant liver stage (hypnozoites). * ***P. malariae:*** Causes quartan malaria.

## 3. Clinical Features * **Incubation:** 7–30 days. * **Uncomplicated Malaria:** * Nonspecific flu-like symptoms (headache, myalgia). * **Fever Paroxysms:** Classic cycles of chills, fever, and diaphoresis (sweating). * Gastrointestinal: Nausea, vomiting. * Signs: Anemia, hepatosplenomegaly. * **Severe Malaria (P. falciparum):** A medical emergency. Key signs include: * **CNS:** Impaired consciousness, seizures, coma (cerebral malaria). * **Heme:** Severe anemia (< 7 g/dL), significant bleeding. * **Renal:** AKI (creatinine > 3 mg/dL), hemoglobinuria ("blackwater fever"). * **Metabolic:** Hypoglycemia, lactic acidosis. * **Pulmonary:** ARDS, pulmonary edema.

## 4. Diagnosis * **Gold Standard:** **Thick and thin blood smears** (microscopy). * **Thick Smear:** Detects the presence of parasites (high sensitivity). * **Thin Smear:** Identifies the species and calculates parasitemia (high specificity). * **Rapid Tests (RDTs):** Detect *Plasmodium* antigens. Useful for quick diagnosis but must be confirmed by microscopy. * **Lab Findings:** Hemolytic anemia, thrombocytopenia, and (in severe cases) elevated LFTs/creatinine.

## 5. Management Principles * **Severe Malaria:** * **Admission:** ICU. * **Drug:** **IV Artesunate** (first-line). * **Support:** ABCs, manage hypoglycemia, seizures, and organ failure. * **Uncomplicated Malaria:** * **Drugs:** Oral antimalarials. Regimen depends on species and local resistance (e.g., Artemether-lumefantrine). * **P. vivax / P. ovale:** Must add **Primaquine** or **Tafenoquine** to eradicate dormant liver hypnozoites (after checking G6PD status).
###` ;

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