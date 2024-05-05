"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/lib/store";
import { Heart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getWeatherData } from "@/lib/weather";
import { WeatherData } from "@/lib/types";
import { toast } from "sonner";

export default function Favorites() {
  const { favorites, removeFavorite, unit } = useWeatherStore();
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      for (const city of favorites) {
        if (!weatherData[city]) {
          try {
            const data = await getWeatherData(city);
            setWeatherData(prev => ({
              ...prev,
              [city]: data
            }));
          } catch (error) {
            toast.error(`Failed to fetch weather data for ${city}`);
          }
        }
      }
    };

    fetchWeatherData();
  }, [favorites]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tighter flex items-center gap-2">
          <Heart className="h-8 w-8 text-red-500" fill="currentColor" />
          Favorite Locations
        </h1>
      </div>

      {favorites.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No favorite locations yet.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((city, index) => {
            const data = weatherData[city];
            return (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-card/50 to-card shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{city}</h2>
                      {data && (
                        <>
                          <p className="text-4xl font-bold mt-2">
                            {Math.round(data.main.temp)}°{unit === "celsius" ? "C" : "F"}
                          </p>
                          <p className="text-muted-foreground capitalize">
                            {data.weather[0].description}
                          </p>
                        </>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(city)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}