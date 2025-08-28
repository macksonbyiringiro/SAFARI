

import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedQuizQuestion } from "../types";

// Lazily initialize the AI client to prevent app crash on load if API key is missing.
let ai: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (ai) {
    return ai;
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable not set. Gemini API features will not work.");
    throw new Error("API Key is not configured.");
  }
  
  ai = new GoogleGenAI({ apiKey });
  return ai;
}

const quizSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: "A simple math word problem for a 10-year-old, using Rwandan context like fruits, animals, or objects.",
            },
            answer: {
                type: Type.INTEGER,
                description: "The numerical answer to the question.",
            },
        },
        required: ["question", "answer"],
    },
};

export const generateQuiz = async (): Promise<GeneratedQuizQuestion[]> => {
  try {
    const aiClient = getAiClient();
    const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Generate 5 simple math word problems (addition and subtraction) for a 10-year-old child in Rwanda. Use items they would be familiar with, like bananas, francs, goats, or baskets.",
        config: {
            responseMimeType: "application/json",
            responseSchema: quizSchema,
        },
    });
    
    const text = response.text.trim();
    const quizData = JSON.parse(text);
    
    // Basic validation
    if (!Array.isArray(quizData)) {
      throw new Error("API returned an unexpected format.");
    }

    return quizData as GeneratedQuizQuestion[];

  } catch (error) {
    console.error("Error generating quiz from Gemini:", error);
    // Re-throw a more user-friendly error
    throw new Error("Failed to generate quiz. The API may be unavailable or the request was malformed.");
  }
};
