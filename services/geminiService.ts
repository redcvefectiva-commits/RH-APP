import { GoogleGenAI } from "@google/genai";

export const generateTaskDescription = async (title: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
    return "Clave de API no configurada. Por favor, establece la variable de entorno API_KEY.";
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `Genera una descripción de tarea breve y profesional para un entorno corporativo. El título de la tarea es: "${title}". La descripción debe tener 1-2 frases.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // For low latency
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error al generar la descripción de la tarea:", error);
    return "No se pudo generar la descripción. Por favor, inténtalo de nuevo.";
  }
};