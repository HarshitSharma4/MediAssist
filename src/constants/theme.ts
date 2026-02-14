import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
    fontFamily: 'System',
};

export const LightTheme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
        ...MD3LightTheme.colors,
        primary: '#006d77', // Teal
        onPrimary: '#ffffff',
        secondary: '#83c5be',
        onSecondary: '#000000',
        tertiary: '#edf6f9',
        background: '#ffffff',
        surface: '#edf6f9',
    },
};

export const DarkTheme = {
    ...MD3DarkTheme,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#83c5be',
        onPrimary: '#00353a',
        secondary: '#006d77',
        onSecondary: '#ffffff',
        tertiary: '#2d333b',
        background: '#121212',
        surface: '#1e1e1e',
    },
};
