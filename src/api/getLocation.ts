// src/api/getLocation.ts

export async function fetchLocation(): Promise<string> {
  try {
    /** * Since this is on the same domain as your app, 
     * there are ZERO CORS issues.
     */
    const response = await fetch('/api/getLocation');
    
    if (!response.ok) throw new Error("Internal API fetch failed");

    const data = await response.json();
    return data.city || "Jaipur"; 
  } catch (error) {
    console.error("Vercel Geo lookup error:", error);
    return "Jaipur"; // Safe fallback for local development
  }
}