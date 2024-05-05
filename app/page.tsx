"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { WeatherCard } from "@/components/WeatherCard";
import { toast } from "sonner";
import { getWeatherData } from "@/lib/weather";
import type { WeatherData } from "@/lib/types";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error('Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      const data = await getWeatherData(city);
      setWeather(data);
      setCity("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          Check Your Weather
        </h1>
        <p className="text-muted-foreground text-center max-w-[600px] md:text-xl">
          Enter a city name to get detailed weather information instantly
        </p>
        <form 
          onSubmit={handleSearch}
          className="flex w-full max-w-sm items-center space-x-2"
        >
          <Input
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-12"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-12 w-12"
            disabled={loading}
          >
            <Search className="h-5 w-5" />
          </Button>
        </form>
      </div>

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}