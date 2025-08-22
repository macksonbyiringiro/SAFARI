
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedQuizQuestion } from "../types";

// IMPORTANT: In a real-world application, the API key would be stored securely
// and not be hardcoded or exposed on the client-side. We are assuming
// `process.env.API_KEY` is being properly replaced by a build tool.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to disable the feature or show a message.
  console.warn("API_KEY environment variable not set. Gemini API features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

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
  if (!API_KEY) {
    throw new Error("API Key is not configured.");
  }

  try {
    const response = await ai.models.generateContent({
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
