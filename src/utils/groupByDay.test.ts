import { describe, it, expect } from 'vitest';
import { groupByDay } from './groupByDay';
import type { FiveDayWeather } from '../types';

const makeItem = (dt_txt: string): FiveDayWeather['list'][number] => ({
    main: {
        temp: 10,
        temp_min: 5,
        temp_max: 15,
        pressure: 1010,
        humidity: 80,
    },
    weather: [{ main: 'Clear', description: 'ясно' }],
    pop: 0,
    sys: { pod: 'd' },
    dt_txt,
});

describe('groupByDay', () => {
    it('группирует записи по дате', () => {
        const list = [
            makeItem('2024-01-15 09:00:00'),
            makeItem('2024-01-15 12:00:00'),
            makeItem('2024-01-16 12:00:00'),
        ];

        const result = groupByDay(list);

        expect(Object.keys(result)).toEqual(['2024-01-15', '2024-01-16']);
        expect(result['2024-01-15']).toHaveLength(2);
        expect(result['2024-01-16']).toHaveLength(1);
    });
});