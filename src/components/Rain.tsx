import { Box, keyframes } from '@mui/material';

const fall = keyframes`
    0%   { transform: translateY(-10%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
`;

export const Rain = () => {
    const drops = Array.from({ length: 80 });

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
            {drops.map((_, i) => {
                const left = Math.random() * 100;
                const delay = Math.random() * 2;
                const duration = 0.6 + Math.random() * 0.6;
                return (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            top: '-10%',
                            left: `${left}%`,
                            width: '2px',
                            height: '18px',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.75))',
                            borderRadius: '1px',
                            animation: `${fall} ${duration}s linear ${delay}s infinite`,
                        }}
                    />
                );
            })}
        </Box>
    );
};