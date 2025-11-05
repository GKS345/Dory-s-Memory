import { GoogleGenAI } from "@google/genai";

const getAIResponse = async (prompt: string): Promise<string> => {
  try {
    // Check if an API key has been selected. If not, open the selection dialog.
    // This is the standard way to handle API keys in this environment.
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
    }

    // We now assume a key is available and proceed.
    // The GoogleGenAI constructor or the API call will throw an error if the key is
    // missing or invalid, which will be caught below.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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

    // If the error is related to the API key (either missing or invalid),
    // prompt the user to select a key.
    if (error instanceof Error && (error.message.includes("API key") || error.message.includes("Requested entity was not found"))) {
       if (window.aistudio) {
         // Don't await, just trigger the dialog for the user to fix the issue.
         window.aistudio.openSelectKey();
       }
       return "There's an issue with the API key. Please select a valid key from the dialog and try your request again.";
    }

    return "Sorry, I encountered an error while processing your request.";
  }
};

export { getAIResponse };
