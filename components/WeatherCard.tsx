"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CloudRain, Wind, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { WeatherData } from "@/lib/types";
import { useWeatherStore } from "@/lib/store";
import { celsiusToFahrenheit } from "@/lib/weather";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const { unit, addFavorite, favorites } = useWeatherStore();
  const isFavorite = favorites.includes(data.name);

  const temperature = unit === "celsius" 
    ? Math.round(data.main.temp)
    : celsiusToFahrenheit(data.main.temp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-card/50 to-card shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">{data.name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-5xl font-bold mt-4">
                {temperature}°{unit === "celsius" ? "C" : "F"}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-16 h-16"
              />
            </div>
            <p className="text-muted-foreground mt-1 capitalize">
              {data.weather[0].description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => addFavorite(data.name)}
            className={isFavorite ? "text-red-500" : ""}
          >
            <Heart className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <CloudRain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="font-medium">
                {unit === "celsius"
                  ? Math.round(data.main.feels_like)
                  : celsiusToFahrenheit(data.main.feels_like)}
                °{unit === "celsius" ? "C" : "F"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Droplets className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{data.main.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Wind className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-medium">{Math.round(data.wind.speed)} m/s</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}