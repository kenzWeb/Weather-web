const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_API = 'https://api.open-meteo.com/v1';

export async function getWeatherData(city: string) {
  try {
    // First, get coordinates for the city
    const geoResponse = await fetch(
      `${GEOCODING_API}/search?name=${encodeURIComponent(city.trim())}&count=1`
    );
    
    if (!geoResponse.ok) {
      throw new Error('Failed to find location');
    }

    const geoData = await geoResponse.json();
    
    if (!geoData.results?.[0]) {
      throw new Error('City not found. Please check the spelling and try again.');
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Then, get weather data for those coordinates
    const weatherResponse = await fetch(
      `${WEATHER_API}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();

    // Transform the data to match our interface
    return {
      name,
      main: {
        temp: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        feels_like: weatherData.current.temperature_2m, // API doesn't provide feels like temp
      },
      weather: [{
        main: getWeatherDescription(weatherData.current.weather_code),
        description: getWeatherDescription(weatherData.current.weather_code),
        icon: getWeatherIcon(weatherData.current.weather_code),
      }],
      wind: {
        speed: weatherData.current.wind_speed_10m,
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data');
  }
}

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  
  return weatherCodes[code] || 'Unknown';
}

function getWeatherIcon(code: number): string {
  // Map WMO codes to icon names
  const timeOfDay = new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'd' : 'n';
  
  if (code === 0) return `01${timeOfDay}`;
  if (code === 1) return `02${timeOfDay}`;
  if (code === 2) return `03${timeOfDay}`;
  if (code === 3) return `04${timeOfDay}`;
  if (code >= 45 && code <= 48) return `50${timeOfDay}`; // Fog
  if (code >= 51 && code <= 55) return `09${timeOfDay}`; // Drizzle
  if (code >= 61 && code <= 65) return `10${timeOfDay}`; // Rain
  if (code >= 71 && code <= 77) return `13${timeOfDay}`; // Snow
  if (code >= 80 && code <= 82) return `09${timeOfDay}`; // Rain showers
  if (code >= 85 && code <= 86) return `13${timeOfDay}`; // Snow showers
  if (code >= 95) return `11${timeOfDay}`; // Thunderstorm
  
  return `01${timeOfDay}`;
}