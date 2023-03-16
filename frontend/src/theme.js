import {createTheme} from '@mui/material/styles';
import {createContext, useState, useMemo} from "react";


export const themeSettings = (mode) => {

    return {
        palette: {
            mode: mode,
            ...(mode === 'light'
                ? {
                    primary: {
                        main: '#c8ddd8'
                    },
                    secondary: {
                        main: '#e5cc8e'
                    },
                    background: {
                        light: 'whitesmoke',
                        main: '#fdfdfd',
                    },
                    text: {
                        main: '#272727',
                    },
                    black: {
                        main: '#272727',
                    }
                }
                : {
                    primary: {
                        main: '#c8ddd8'
                    },
                    secondary: {
                        main: '#e5cc8e'
                    },
                    background: {
                        light: '#1b1b1b',
                        main: '#272727',
                    },
                    text: {
                        main: '#fdfdfd',
                    },
                    black: {
                        main: '#fdfdfd',
                    }
                }),
        },
    }
}


export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
})

export const useMode = () => {
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode]
}
