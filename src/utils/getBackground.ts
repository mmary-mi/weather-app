export const getBackground = (main?: string): string => {
    switch (main) {
        case 'Clear':
    return 'linear-gradient(135deg, #4a2800 0%, #c87a00 50%, #4a2800 100%)';
        case 'Clouds':
            return 'linear-gradient(135deg, #2a3540 0%, #8a9ba8 50%, #2a3540 100%)';
        case 'Rain':
        case 'Drizzle':
            return 'linear-gradient(135deg, #1a2a3a 0%, #4a6d8c 50%, #1a2a3a 100%)';
        case 'Thunderstorm':
            return 'linear-gradient(135deg, #2a1a3a 0%, #6a4a8c 50%, #2a1a3a 100%)';
        case 'Snow':
            return 'linear-gradient(135deg, #1a2a30 0%, #6a9aad 50%, #1a2a30 100%)';
        case 'Mist':
        case 'Fog':
        case 'Haze':
            return 'linear-gradient(135deg, #2a2a30 0%, #7a7a85 50%, #2a2a30 100%)';
        default:
            return 'linear-gradient(135deg, #4a3a1a 0%, #d4a017 50%, #4a3a1a 100%)';
    }
};