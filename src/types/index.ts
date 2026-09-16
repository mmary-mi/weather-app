export interface Coordinates {
    name: string;
    country: string;
    local_names?: Record<string, string>;
    state?: string;
    lat: number;
    lon: number;
}

export interface CurrentWeather {
    name: string;
    weather: {
        main: string;
        description: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    visibility: number;
    wind: {
        speed: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    rain?: {
        '1h': number;
    };
    snow?: {
        '1h': number;
    }
};

export interface CoordinatesReturn {
    data: Coordinates[];
    isLoading: boolean;
    error: string | null;
    search: (cityName: string) => Promise<void>
}

export interface CityListProps {
    cities: Coordinates[];
    onSelect: (city: Coordinates) => void
}

export interface WeatherReturn {
    data: CurrentWeather | null;
    isLoading: boolean;
    error: string | null;
    receiveWeather: (lat :number, lon: number) => Promise<void>
}

export interface WeatherCardProps {
    weather: CurrentWeather;
}