import { useEffect, useState } from "react";
import type { SearchInputProps } from "../types";

export const SearchInput = ({ onSearch, children }: SearchInputProps) => {
    const [inputValue, setInputValue] = useState<string>('')

    useEffect(() => {
        if(inputValue.trim() === ''){
            return
        }

        const timer = setTimeout(()=> onSearch(inputValue), 500)

        return () => clearTimeout(timer)
    }, [inputValue]);

    return(
    <div
        data-dropdown
        style={{ position: 'relative', width: '100%', maxWidth: '500px'}}
    >
        <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите город"
                style={{ boxSizing: 'border-box', 
                    width: '100%', 
                    height: '100%'
                }}
            />
            {children}
    </div> )
}