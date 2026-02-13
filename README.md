Weather Dashboard 🌦️
---------------------

A sleek, responsive, and performance-driven **Weather Dashboard** built with **React**, **Vite**, and **TypeScript**. This application provides real-time weather updates, interactive maps, and detailed forecasts using high-performance Edge functions on Vercel.

### 🚀 Features

*   **Real-Time Geolocation**: Automatically detects your current location via Vercel Edge Headers for instant local weather.
    
*   **Interactive Maps**: Full MapLibre GL integration with a modern "Alidade Smooth Dark" UI from Stadia Maps.
    
*   **Smart Forecasts**: 24-hour hourly trends and sun rise/set tracking.
    
*   **Edge-Powered Backend**: Custom Vercel Edge functions bypass CORS issues and provide lightning-fast data fetching.
    
*   **Responsive Bento UI**: A modern, high-contrast dashboard layout optimized for all screen sizes.
    

### 🛠️ Tech Stack

*   **Frontend**: React (Vite), TypeScript, Tailwind CSS
    
*   **Map Engine**: MapLibre GL JS
    
*   **API Providers**: Visual Crossing (Weather), Stadia Maps (Tiles), Nominatim (Geocoding)
    
*   **Deployment**: Vercel (Edge Functions & Hosting)
    

### 📦 Installation

1.  Bashgit clone https://github.com/keshav-provus/Weather-UI.gitcd Weather-UI
    
2.  Bashnpm install
    
3.  Code snippetVITE\_WEATHER\_API\_KEY=your\_visual\_crossing\_keyVITE\_STADIA\_API\_KEY=your\_stadia\_maps\_key
    
4.  Bashnpm run dev
    

### ☁️ Deployment

This project is optimized for **Vercel**.

1.  Push your code to GitHub.
    
2.  Connect your repository to Vercel.
    
3.  Add your VITE\_WEATHER\_API\_KEY and VITE\_STADIA\_API\_KEY in the **Environment Variables** section of the Vercel dashboard.
    
4.  Vercel will automatically detect the api/ folder and deploy your geolocation edge functions.
    
