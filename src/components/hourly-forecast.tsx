import { Unit } from "../config/types";

export default function HourlyForecast({ hourly, unit }: { hourly: any[], unit: Unit }) {
  const colWidth = 85; 
  const graphHeight = 70; 
  const MET_BASE = "https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/";

  const data = hourly?.slice(0, 24) || [];
  const temps = data.map(h => h.temp);
  const max = Math.max(...temps) + 2;
  const min = Math.min(...temps) - 2;
  
  const getY = (t: number) => graphHeight - ((t - min) / (max - min)) * graphHeight;

  const points = data.map((h, i) => ({
    x: i * colWidth + colWidth / 2,
    y: getY(h.temp)
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${graphHeight} L ${points[0].x} ${graphHeight} Z`;

  const getIcon = (code: string) => {
    const icon = code.toLowerCase();
    if (icon.includes("thunder")) return "thunderstorm";
    if (icon.includes("rain")) return "rain";
    if (icon.includes("snow")) return "snow";
    if (icon.includes("clear")) return icon.includes("night") ? "clearsky_night" : "clearsky_day";
    return "cloudy";
  };

  return (
    <div className="hourly-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <span className="stat-label">24-hour temperature trend ({unit === Unit.Metric ? '°C' : '°F'})</span>
      
      <div className="scroll-wrapper">
        <div className="graph-svg-container" style={{ width: `${data.length * colWidth}px` }}>
          
          <svg 
            width={data.length * colWidth} 
            height={graphHeight} 
            style={{ position: 'absolute', top: '70px', zIndex: 1 }}
          >
            <defs>
              <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#graphGradient)" />
            <path d={linePath} fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2.5" strokeLinecap="round" />
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#fff" />
            ))}
          </svg>
          
          <div className="hourly-data-overlay">
            {data.map((h, i) => (
              <div key={i} className="hour-column">
                <div style={{ textAlign: 'center' }}>
                    <div className="temp-label">{Math.round(h.temp)}°</div>
                    <img 
                        src={`${MET_BASE}${getIcon(h.icon)}.svg`} 
                        style={{ width: '26px', height: '26px', marginTop: '4px' }} 
                        alt="weather-icon" 
                    />
                </div>
                <div className="time-label">{h.datetime.slice(0, 5)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}