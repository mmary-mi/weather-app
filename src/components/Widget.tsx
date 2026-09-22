import Paper from '@mui/material/Paper';
import type { ReactNode } from 'react';

interface WidgetProps {
    children: ReactNode;
}

export const Widget = ({ children }: WidgetProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                color: '#fff',
                display: 'inline-block',  
            }}
        >
            {children}
        </Paper>
    );
};