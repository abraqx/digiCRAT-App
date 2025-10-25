import { GoogleGenAI, Type } from "@google/genai";
import { Advocate } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const advocateSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: "A unique identifier for the advocate" },
    name: { type: Type.STRING, description: "Full name of the advocate" },
    specialty: { type: Type.STRING, description: "Primary area of legal expertise" },
    location: { type: Type.STRING, description: "City and State of practice" },
    experienceYears: { type: Type.INTEGER, description: "Total years of professional experience" },
    bio: { type: Type.STRING, description: "A brief, professional biography of 2-3 sentences." },
    casesWon: { type: Type.INTEGER, description: "Number of cases won in their career" },
    trustworthinessScore: { type: Type.INTEGER, description: "A score from 80 to 100 indicating trustworthiness" },
    profileImageUrl: { type: Type.STRING, description: "A URL for a professional-looking, AI-generated style profile picture of a diverse advocate. Use a real, publicly accessible image URL from a service like Unsplash. The photo should be a clear headshot. Example: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=200&auto=format&fit=crop'. Ensure each URL is unique and directly links to an image." },
  },
  required: ["id", "name", "specialty", "location", "experienceYears", "bio", "casesWon", "trustworthinessScore", "profileImageUrl"],
};


export const findAdvocates = async (query: string): Promise<Advocate[]> => {
  const prompt = `Generate a list of 5 diverse, fictional advocates specializing in ${query}. Provide realistic and distinct data for each, including unique names, locations, and bios. Ensure the profile image URLs are unique for each advocate and are valid, public image URLs.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: advocateSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        console.error("Gemini API returned an empty response.");
        return [];
    }
    
    try {
      const parsedAdvocates: Advocate[] = JSON.parse(jsonText);
      return parsedAdvocates;
    } catch (parseError) {
      console.error("Failed to parse JSON response from Gemini API:", parseError);
      console.error("Raw response text for debugging:", jsonText);
      return [];
    }

  } catch (apiError) {
    console.error("Error fetching advocates from Gemini API:", apiError);
    // In case of an API error, you might want to return an empty array or throw the error
    return [];
  }
};