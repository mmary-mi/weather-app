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
    search: (cityName: string) => Promise<void>;
    clear: () => void
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
    city: Coordinates;
}

export interface FiveDayWeather {
    list: {
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather:{
            main: string;
            description:string;
        }[];
        pop: number;
        sys: {
            pod: string
        };
        dt_txt: string;
    }[]
}

export interface ForecastReturn {
    data: FiveDayWeather | null;
    isLoading: boolean;
    error: string | null;
    receiveForecast: (lat: number, lon: number) => Promise<void>
}

export type ForecastItem = FiveDayWeather["list"][number]

export interface ForecastProps {
    forecast: FiveDayWeather
}

export interface FavoritesState {
    items: Coordinates[]
}

export interface FavoriteListProps {
    onSelect: (city: Coordinates) => void;
    isOpen: boolean
}

export interface GeolocationReturn {
    data: {
        lat: number;
        lon: number
    } | null;
    isLoading: boolean;
    error: string | null;
    getGeolocation: () => void;
}

export interface SearchInputProps {
    onSearch : (value: string) => void;
    children?: React.ReactNode;
    onSelectCity?: () => void;
}

