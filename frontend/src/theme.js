import {createTheme} from '@mui/material/styles';
import {createContext, useState, useMemo} from "react";
import {purple, pink} from "@mui/material/colors";


export const themeSettings = (mode) => {

    return {
        palette: {
            mode: mode,
            ...(mode === 'light'
                ? {
                    primary: {
                        light: purple[200],
                        main: purple[300],
                        dark: purple[400],
                    },
                    secondary: {
                        light: pink[50],
                        main: pink[100],
                        dark: pink[200]
                    },
                    background: {
                        light: '#fafcfe',
                        main: '#FAFCFE',
                        dark: '#191919',
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
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "25px"
                    }
                }
            },
        }

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
