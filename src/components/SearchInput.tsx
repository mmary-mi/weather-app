import { useEffect, useState } from "react";
import type { SearchInputProps } from "../types";
import { Box, InputBase } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export const SearchInput = ({ onSearch, children }: SearchInputProps) => {
    const [inputValue, setInputValue] = useState<string>('')

    useEffect(() => {
        if (inputValue.trim() === '') {
            return
        }

        const timer = setTimeout(() => onSearch(inputValue), 500)

        return () => clearTimeout(timer)
    }, [inputValue]);

    return (
        <Box
            data-dropdown
            sx={{ position: 'relative', width: '100%', maxWidth: '500px' }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.2s ease',
                    '&:focus-within': {
                        bgcolor: 'rgba(255,255,255,0.15)',
                        borderColor: 'rgba(255,255,255,0.4)',
                    },
                }}
            >
                <InputBase
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Введите город"
                    sx={{
                        flex: 1,
                        color: '#fff',
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: 16,
                                                '& input::placeholder': {
                            color: 'rgba(255,255,255,0.6)',
                            opacity: 1,
                        }
                    }}

                        />
                        <SearchRoundedIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                
            </Box>
                    {children}
        </Box>)
}