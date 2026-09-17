import type { FiveDayWeather, ForecastItem } from "../types";

export const groupByDay = (list: FiveDayWeather['list']): Record<string, ForecastItem[]> => {
    const grouped: Record<string, ForecastItem[]> = {};

    list.forEach((item) => {
        const date = item.dt_txt.slice(0,10);

        if(!grouped[date]) {
            grouped[date] =[]
        }

        grouped[date].push(item)
    })

    return grouped
}