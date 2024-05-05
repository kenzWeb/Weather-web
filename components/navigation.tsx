"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Cloud, Heart, Settings } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Cloud className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Weather App
            </span>
          </Link>
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Weather
            </Link>
            <Link
              href="/favorites"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/favorites"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Favorites
            </Link>
            <Link
              href="/settings"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/settings"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Settings
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              asChild
            >
              <Link href="/">
                <Cloud className="h-5 w-5" />
                <span className="sr-only">Weather</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              asChild
            >
              <Link href="/favorites">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              asChild
            >
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  );
}