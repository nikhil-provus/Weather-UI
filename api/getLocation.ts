// api/getLocation.ts
import { geolocation } from '@vercel/functions';

export const config = {
  runtime: 'edge', // This makes it run at the edge (closest to the user)
};

export default function handler(request: Request) {
  // Extract geo-data from Vercel's incoming request headers
  const { city } = geolocation(request);

  // Return the city as JSON
  return new Response(
    JSON.stringify({ city: city || "Jaipur" }), // Fallback city
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }
  );
}