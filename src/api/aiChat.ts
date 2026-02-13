import { config } from "../config/config";

export async function getClimateResponse(
  message: string,
  city: string,
  weather: any,
) {
  const API_KEY = config.api.geminiKey;

  if (!API_KEY) {
    console.error("Gemini API Key is missing in config!");
    return "The Climate Assistant is unavailable.";
  }

  const URL = `${config.api.geminiBaseUrl}?key=${API_KEY}`;

  const context = `You are a helpful Climate Assistant and Tourist helper for ${city}. 
  Current Weather: ${weather?.temp}°C, ${weather?.condition}, Humidity: ${weather?.humidity}%. 
  Don't use MD formatting. Just plain text. Give short and precise answers.`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `${context}\nUser Question: ${message}` }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Gemini API Error:", errorBody);
      throw new Error("AI request failed");
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    return "I processed your request but couldn't generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting to the climate station.";
  }
}
