
import { GoogleGenAI, Type } from '@google/genai';
import { Itinerary, ItineraryRequest } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    city: { type: Type.STRING, description: "The city for the itinerary." },
    country: { type: Type.STRING, description: "The country where the city is located." },
    dailyPlans: {
      type: Type.ARRAY,
      description: "An array of daily plans for the trip.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER, description: "The day number of the trip (e.g., 1, 2, 3)." },
          date: { type: Type.STRING, description: "The specific date for this day's plan (e.g., 'July 20, 2024')." },
          theme: { type: Type.STRING, description: "A creative theme for the day's activities (e.g., 'Historical Heartbeat')." },
          activities: {
            type: Type.ARRAY,
            description: "A list of activities for the day.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Suggested time for the activity (e.g., '9:00 AM - 11:00 AM')." },
                description: { type: Type.STRING, description: "A detailed description of the activity." },
                location: { type: Type.STRING, description: "The name and address of the location." },
                transit: { type: Type.STRING, description: "A short hint about how to get there (e.g., '15-min walk from last activity', 'Metro Line 1')." },
                type: { type: Type.STRING, description: "A category for the activity (e.g., 'Food & Culinary', 'Museum', 'Outdoor')." }
              },
              required: ["time", "description", "location", "transit", "type"]
            }
          },
          alternatives: {
            type: Type.ARRAY,
            description: "A few alternative suggestions if the user wants to swap an activity.",
            items: { type: Type.STRING }
          }
        },
        required: ["day", "date", "theme", "activities", "alternatives"]
      }
    }
  },
  required: ["city", "country", "dailyPlans"]
};

export const generateItinerary = async (request: ItineraryRequest): Promise<Itinerary> => {
  const prompt = `
    Create a personalized travel itinerary based on the following details.
    The response must be a valid JSON object that adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.
    
    Travel Details:
    - City: ${request.city}
    - Start Date: ${request.startDate}
    - End Date: ${request.endDate}
    - Interests: ${request.interests.join(', ')}
    - Pace: ${request.pace}
    - Budget: ${request.budget}
    
    Instructions:
    1.  Generate a day-by-day itinerary from the start date to the end date.
    2.  For each day, provide a creative theme and a sequence of timed activities.
    3.  Each activity must include a description, location (with address if possible), and a transit hint.
    4.  Categorize each activity based on the user's interests.
    5.  Include 2-3 alternative suggestions for each day.
    6.  The number of activities per day should reflect the user's chosen 'Pace'.
    7.  The type of activities and venues should reflect the user's chosen 'Budget'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
      },
    });

    const jsonText = response.text.trim();
    const itineraryData: Itinerary = JSON.parse(jsonText);
    
    // Simple validation
    if (!itineraryData.city || !itineraryData.dailyPlans || itineraryData.dailyPlans.length === 0) {
      throw new Error("Generated itinerary is missing required fields.");
    }

    return itineraryData;
  } catch (error) {
    console.error("Error generating itinerary from Gemini API:", error);
    throw new Error("The AI failed to generate a valid itinerary. This could be due to an unusual request or an API issue. Please try again.");
  }
};
