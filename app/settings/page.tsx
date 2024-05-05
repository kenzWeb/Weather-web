"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useWeatherStore } from "@/lib/store";
import { Thermometer, Monitor, Sun, Moon } from "lucide-react";

export default function Settings() {
  const { unit, theme, setUnit, setTheme } = useWeatherStore();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tighter">Settings</h1>

      <div className="grid gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Temperature Unit</h2>
          </div>
          <RadioGroup
            value={unit}
            onValueChange={(value) => setUnit(value as "celsius" | "fahrenheit")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="celsius" id="celsius" />
              <Label htmlFor="celsius">Celsius (°C)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fahrenheit" id="fahrenheit" />
              <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Theme Preference</h2>
          </div>
          <RadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center gap-2">
                <Sun className="h-4 w-4" /> Light
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center gap-2">
                <Moon className="h-4 w-4" /> Dark
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" /> System
              </Label>
            </div>
          </RadioGroup>
        </Card>
      </div>
    </div>
  );
}