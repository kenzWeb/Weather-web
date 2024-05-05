import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface WeatherState {
	favorites: string[]
	unit: 'celsius' | 'fahrenheit'
	theme: 'light' | 'dark' | 'system'
	addFavorite: (city: string) => void
	removeFavorite: (city: string) => void
	setUnit: (unit: 'celsius' | 'fahrenheit') => void
	setTheme: (theme: 'light' | 'dark' | 'system') => void
}

export const useWeatherStore = create<WeatherState>()(
	persist(
		(set) => ({
			favorites: [],
			unit: 'celsius',
			theme: 'system',
			addFavorite: (city) =>
				set((state) => ({
					favorites: [...new Set([...state.favorites, city])],
				})),
			removeFavorite: (city) =>
				set((state) => ({
					favorites: state.favorites.filter((f) => f !== city),
				})),
			setUnit: (unit) => set({unit}),
			setTheme: (theme) => set({theme}),
		}),
		{
			name: 'weather-storage',
		},
	),
)
