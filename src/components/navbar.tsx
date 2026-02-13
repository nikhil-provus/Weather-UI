import type { NavbarProps } from "../config/types";
import { Unit } from "../config/types";

export default function Navbar({ onSearch, onGoHome, searchQuery, setSearchQuery, unit, toggleUnit }: NavbarProps) {
  return (
    <nav className="action-controls">
      <button className="home-nav-btn" onClick={onGoHome}>🏠</button>
      
      <input 
        className="search-input-inline" 
        placeholder="Search city..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(searchQuery)}
      />

      {/* The switcher container must have position: relative */}
      <div className="unit-switcher" onClick={toggleUnit}>
        {/* Sliding background indicator */}
        <div className={`unit-indicator ${unit === Unit.Imperial ? 'right' : ''}`} />
        
        {/* Label grid container */}
        <div className="unit-labels-container">
          <span className={unit === Unit.Metric ? 'active' : ''}>C°</span>
          <span className={unit === Unit.Imperial ? 'active' : ''}>F°</span>
        </div>
      </div>
    </nav>
  );
}