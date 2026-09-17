import type { ForecastProps } from "../types"
import { groupByDay } from "../utils/groupByDay"

export const Forecast = ({forecast}: ForecastProps) => {
    const grouped = groupByDay(forecast.list);
    const dates = Object.keys(grouped).slice(0,5)


    return(
        <>
            <div>
                {dates.map((date) => {
                    const records = grouped[date];
                    const noonRecord = records.find((r) => r.dt_txt. includes('12:00:00')) || records[0];

                    return (
                        <div key={date}>
                            <h3>{date}</h3>
                            <p>{noonRecord.main.temp}°C</p>
                            <p>{noonRecord.weather[0].description}</p>
                        </div>

                    )
                })}
            </div>
        </>
    )
}