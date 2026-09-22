import { Box, keyframes } from '@mui/material';

const fall = keyframes`
    0%   { transform: translate(0, -10%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translate(20px, 100vh); opacity: 0; }
`;

export const Snow = () => {
    const flakes = Array.from({ length: 60 });

    return (
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 1,
            }}
        >
            {flakes.map((_, i) => {
                const left = Math.random() * 100;
                const delay = Math.random() * 3;
                const duration = 4 + Math.random() * 4;
                const size = 4 + Math.random() * 6;
                return (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            top: '-10%',
                            left: `${left}%`,
                            width: size,
                            height: size,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.9)',
                            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
                            animation: `${fall} ${duration}s linear ${delay}s infinite`,
                        }}
                    />
                );
            })}
        </Box>
    );
};