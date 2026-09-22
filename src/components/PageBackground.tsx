import { Box } from '@mui/material';

interface PageBackgroundProps {
    background: string;
}

export const PageBackground = ({ background }: PageBackgroundProps) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                background,
                transition: 'background 0.6s ease',
            }}
        />
    );
};