import {createTheme} from '@mui/material/styles';
import {createContext, useState, useMemo} from "react";


export const themeSettings = (mode) => {

    return {
        palette: {
            mode: mode,
            ...(mode === 'light'
                ? {
                    primary: {
                        main: '#B8ADA7'
                    },
                    secondary: {
                        main: '#d0ab88'
                    },
                    background: {
                        light: '#E8EFEC',
                        main: '#FAFCFE',
                        dark: '#222e2d',
                    },
                    text: {
                        main: '#3a3b3e',
                    },
                    black: {
                        main: '#222e2d',
                    }
                }
                : {
                    primary: {
                        main: '#B8ADA7'
                    },
                    secondary: {
                        main: '#d0ab88'
                    },
                    background: {
                        light: '#1b1b1b',
                        main: '#272727',
                        dark: '#fdfdfd',
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
