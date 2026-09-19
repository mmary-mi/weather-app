import { useEffect, useState } from "react";
import type { SearchInputProps } from "../types";

export const SearchInput = ({onSearch}: SearchInputProps) => {
    const [inputValue, setInputValue] = useState<string>('')

    useEffect(() => {
        if(inputValue.trim() === ''){
            return
        }

        const timer = setTimeout(()=> onSearch(inputValue), 500)

        return () => clearTimeout(timer)
    }, [inputValue])

    return <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите город"
            />
}