
import { GoogleGenAI, Type } from 'https://aistudiocdn.com/@google/genai@^1.16.0';

// Define types needed for the function, mirroring the main `types.ts`
enum Pace { Relaxed = 'Relaxed', Moderate = 'Moderate', Packed = 'Packed' }
enum Budget { Budget = 'Budget-Friendly', MidRange = 'Mid-Range', Luxury = 'Luxury' }
interface ItineraryRequest { city: string; startDate: string; endDate: string; interests: string[]; pace: Pace; budget: Budget; }
interface EventSource { uri: string; title: string; }

// --- Gemini API Schema and Logic (lives securely on the server) ---

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    city: { type: Type.STRING }, country: { type: Type.STRING },
    dailyPlans: {
      type: Type.ARRAY, items: {
        type: Type.OBJECT, properties: {
          day: { type: Type.INTEGER }, date: { type: Type.STRING }, theme: { type: Type.STRING },
          activities: {
            type: Type.ARRAY, items: {
              type: Type.OBJECT, properties: {
                time: { type: Type.STRING }, description: { type: Type.STRING }, location: { type: Type.STRING },
                transit: { type: Type.STRING }, type: { type: Type.STRING }
              }, required: ["time", "description", "location", "transit", "type"]
            }
          },
          alternatives: { type: Type.ARRAY, items: { type: Type.STRING } }
        }, required: ["day", "date", "theme", "activities", "alternatives"]
      }
    }
  }, required: ["city", "country", "dailyPlans"]
};

const generateItineraryInternal = async (request: ItineraryRequest, ai: GoogleGenAI) => {
  const prompt = `Create a personalized travel itinerary based on the following details. The response must be a valid JSON object that adheres to the provided schema. Do not include any markdown formatting.
    Travel Details: City: ${request.city}, Start Date: ${request.startDate}, End Date: ${request.endDate}, Interests: ${request.interests.join(', ')}, Pace: ${request.pace}, Budget: ${request.budget}
    Instructions: Generate a day-by-day itinerary. For each day, provide a theme and timed activities with descriptions, locations, and transit hints. Categorize activities and include alternative suggestions. The number and type of activities should reflect the user's chosen pace and budget.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", contents: prompt,
    config: { responseMimeType: "application/json", responseSchema: itinerarySchema },
  });
  return JSON.parse(response.text.trim());
};

const findLocalEventsInternal = async (request: ItineraryRequest, ai: GoogleGenAI) => {
    const prompt = `Based on the travel details, find relevant local events. The response must be a valid JSON object with a single key "events" (an array of event objects), and no markdown formatting. Each event object must have "name", "date", "location", and "description".
    Travel Details: City: ${request.city}, Start Date: ${request.startDate}, End Date: ${request.endDate}, Interests: ${request.interests.join(', ')}
    Instructions: Search for events (concerts, festivals, exhibitions) in ${request.city} between ${request.startDate} and ${request.endDate} that align with interests: ${request.interests.join(', ')}. If none are found, return an empty "events" array.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", contents: prompt,
      config: { tools: [{ googleSearch: {} }] },
    });

    const sources: EventSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
        uri: chunk.web?.uri || '', title: chunk.web?.title || 'Source',
    })).filter(source => source.uri) || [];
    
    const textResponse = response.text.trim();
    const jsonMatch = textResponse.match(/{[\s\S]*}/);
    if (!jsonMatch) throw new Error("AI did not return a valid JSON object.");
    
    const parsedJson = JSON.parse(jsonMatch[0]);
    return { events: parsedJson.events || [], sources };
};


// --- Netlify Function Handler ---
// This is the entry point for the serverless function.
export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // IMPORTANT: Your Gemini API key is stored securely as an environment variable on Netlify.
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in the server environment.");
    }
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    
    const { action, request } = await req.json();
    let result;

    if (action === 'generateItinerary') {
      result = await generateItineraryInternal(request, ai);
    } else if (action === 'findLocalEvents') {
      result = await findLocalEventsInternal(request, ai);
    } else {
      throw new Error('Invalid action provided.');
    }

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in Netlify function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};
