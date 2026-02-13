export interface HourlyData {
  datetime: string;
  temp: number;
  condition: string;
  icon: string;
  unit: Unit;
}

export interface WeatherData {
  temp: number;
  condition: string;
  description: string;
  humidity: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  dew: number;
  windSpeed: number;
  cloudcover: number;
  visibility: number;
  hours: HourlyData[];
  unit: Unit;
}

export interface Props {
  city: string;
  weather: WeatherData | null;
}

export interface NavbarProps {
  onSearch: (city: string) => void;
  onGoHome: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export interface GridCellProps {
  label: string;
  value?: string | number;
  sub?: string;
  children?: React.ReactNode;
}

export enum Unit {
  Metric = "metric",
  Imperial = "us",
}

export interface NavbarProps {
  onSearch: (city: string) => void;
  onGoHome: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  unit: Unit;
  toggleUnit: () => void;
}
