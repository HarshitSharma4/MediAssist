import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { LightTheme, DarkTheme } from './src/constants/theme';
import RootNavigator from './src/navigation/RootNavigator';
import { useColorScheme } from 'react-native';

import Toast from 'react-native-toast-message';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <RootNavigator />
        <StatusBar style="auto" />
        <Toast />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
