import { useEffect, useState } from "react";

export function useLocalStorageState(key, defaultValue) {
    const [state, setState] = useState(() =>{
        const storedValue = JSON.parse(localStorage.getItem(key));
        return storedValue ? storedValue : defaultValue;
    });

    useEffect(function(){
        localStorage.setItem(key, JSON.stringify(state));

    },[state, key]);


    return [state, setState];
}