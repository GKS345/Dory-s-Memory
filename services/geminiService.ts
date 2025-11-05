import { GoogleGenAI } from "@google/genai";

const getAIResponse = async (prompt: string): Promise<string> => {
  try {
    // Check if an API key has been selected. If not, open the selection dialog.
    // This is the standard way to handle API keys in this environment.
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
      // After the dialog, we assume a key is selected and the environment
      // will populate process.env.API_KEY.
    }

    if (!process.env.API_KEY) {
      return "API key not configured. Please select an API key to use the AI Assistant.";
    }

    // Create a new instance right before the call to ensure the latest key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Fix: Refactored to use systemInstruction for providing context to the model, which is a better practice than concatenating it with the user prompt.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful AI assistant in a chat room. A user is asking you a question. Keep your response concise and helpful.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);

    // Handle the specific case where the API key is invalid or not found.
    if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
       if (window.aistudio) {
         await window.aistudio.openSelectKey();
       }
       return "Your API key seems invalid. Please select a valid key and try your request again.";
    }

    return "Sorry, I encountered an error while processing your request.";
  }
};

export { getAIResponse };