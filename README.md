Gemini said
Here is the full content for your README.md. I have updated it to reflect the specific "Pitch Black" design system, the Visual Crossing API integration, and your project structure.

🌦️ Weather-UI
A high-performance, aesthetically driven weather dashboard featuring a professional Pitch Black Bento Grid layout. This application provides real-time meteorological data, interactive mapping, and a custom-built AI Climate Assistant.

✨ Key Features
Pitch Black Bento Design: A sleek, high-contrast UI utilizing glassmorphism and the Bricolage Grotesque typeface for a modern feel.

AI Climate Assistant: A specialized chat interface with internal auto-scrolling and a VS Code-inspired input area for atmospheric queries.

Precision Metrics: Real-time tracking of:

Atmosphere: Pressure in hPa.

Humidity & Dew Point: Rounded percentage and degree tracking.

Sun Cycles: Visualized Sunrise and Sunset timings.

Cloud Cover: Integrated with Visibility (km) data points.

Hourly Trend Graph: Custom SVG-based 24-hour temperature trend with a linear gradient area fill.

Dynamic Search: Intelligent city search with auto-formatting and error-handling to prevent dashboard crashes.

Smart Location: Automatically detects the user's city on mount to provide immediate local data.

🚀 Tech Stack
Frontend: React.js, TypeScript

Styling: CSS3 (Custom Variables, Flexbox, CSS Grid)

Data Source: Visual Crossing Weather API

Icons: MetNo Weather Icons (SVG)

🛠️ Installation & Setup
Clone the repository:

Bash
git clone https://github.com/keshav-provus/Weather-UI.git
cd Weather-UI
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your Visual Crossing API key:

Code snippet
VITE_WEATHER_API_KEY=your_api_key_here
Start the development server:

Bash
npm run dev
📐 Project Architecture
App.tsx: The central orchestrator. It manages the city state and ensures the API isn't called redundantly on mount.

weatherService.ts: A robust service layer that maps complex API responses into a flattened, type-safe interface.

style.css: The design system. Includes the bulletproof Send button fix and the grey-bold visual hierarchy for metrics.

left-panel.tsx: Manages current weather conditions and dynamically loads icons based on atmospheric codes.

🎨 UI Showcase
Metric Grid
All metric sub-labels are styled in Bold Grey (--text-secondary) to ensure a clear visual hierarchy between primary data and units.

Chat Assistant
The input area features a pill-shaped design with an absolutely-positioned Send button to ensure zero overflow, regardless of input length
