import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

// Medical Color Palette
// Primary: Deep Teal / Blue (Trust, Calm)
// Secondary: Soft Coral / Orange (Action, Alert)
// Surface: clean White / Light Grey

const medicalColors = {
    primary: '#00695C', // Deep Teal
    onPrimary: '#FFFFFF',
    primaryContainer: '#B2DFDB',
    onPrimaryContainer: '#004D40',

    secondary: '#FF7043', // Soft Coral
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFCCBC',
    onSecondaryContainer: '#BF360C',

    tertiary: '#0288D1', // Light Blue
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#B3E5FC',
    onTertiaryContainer: '#01579B',

    error: '#D32F2F',
    onError: '#FFFFFF',

    background: '#F5F5F5',
    onBackground: '#191C1C',
    surface: '#FFFFFF',
    onSurface: '#191C1C',
    surfaceVariant: '#E0F2F1',
    onSurfaceVariant: '#404948',

    outline: '#6F7978',
};

const darkMedicalColors = {
    primary: '#80CBC4',
    onPrimary: '#003730',
    primaryContainer: '#004D40',
    onPrimaryContainer: '#B2DFDB',

    secondary: '#FFAB91',
    onSecondary: '#5D1F0C',
    secondaryContainer: '#BF360C',
    onSecondaryContainer: '#FFCCBC',

    tertiary: '#4FC3F7',
    onTertiary: '#002E4C',
    tertiaryContainer: '#01579B',
    onTertiaryContainer: '#B3E5FC',

    background: '#191C1C',
    onBackground: '#E1E3E2',
    surface: '#191C1C',
    onSurface: '#E1E3E2',
    surfaceVariant: '#404948',
    onSurfaceVariant: '#BFC8C7',

    outline: '#899392',
};

const fontConfig = {
    fontFamily: 'System', // Use default system font for now
};

export const LightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...medicalColors,
    },
    // fonts: configureFonts({config: fontConfig}),
};

export const DarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...darkMedicalColors,
    },
    // fonts: configureFonts({config: fontConfig}),
};
