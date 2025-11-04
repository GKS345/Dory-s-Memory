
import { GoogleGenAI } from "@google/genai";

const getAIResponse = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Please set the API_KEY environment variable.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful AI assistant in a chat room. A user is asking you a question. Keep your response concise and helpful. User's prompt: "${prompt}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};

export { getAIResponse };
