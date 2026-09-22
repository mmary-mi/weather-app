import { Box, Typography } from "@mui/material";
import type { ForecastProps } from "../types"
import { groupByDay } from "../utils/groupByDay"
import { Widget } from "./Widget";

export const Forecast = ({forecast}: ForecastProps) => {
    const grouped = groupByDay(forecast.list);
    const dates = Object.keys(grouped).slice(0,5)


    return(
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
            }}
        >
            {dates.map((date) => {
                    const records = grouped[date];
                    const noonRecord = records.find((r) => r.dt_txt. includes('12:00:00')) || records[0];

                    return (
                        <Widget key={date}>
                            <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                                    {date}
                                </Typography>
                                    
                                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                                    {noonRecord.main.temp}°C
                                </Typography>

                                <Typography 
                                    variant="body2"
                                    sx={{ opacity: 0.85, textTransform: 'capitalize', mt: 1 }}>
                                        {noonRecord.weather[0].description}
                                    </Typography>
                            </Box>
                        </Widget>
                    )
                })}

        </Box>
        
    )
}