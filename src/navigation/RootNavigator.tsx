import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useAuthStore } from '../store/useAuthStore';

import { RootStackParamList, MainTabParamList, AuthStackParamList } from '../types/navigation';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';
import UploadScreen from '../screens/home/UploadScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import HospitalsScreen from '../screens/hospitals/HospitalsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ReportMetadataScreen from '../screens/reports/metadata/ReportMetadataScreen';
import HospitalDetailsScreen from '../screens/hospitals/HospitalDetailsScreen';
import ReportDetailsScreen from '../screens/reports/details/ReportDetailsScreen';
import HistoryScreen from '../screens/reports/history/HistoryScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const MainTabs = () => {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true, // Added to improve typing experience
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 10,
                    backgroundColor: theme.colors.surface,
                    borderRadius: 25,
                    height: 70,
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.outline,
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: keyof typeof Icon.glyphMap = 'circle';

                    if (route.name === 'Home') iconName = 'view-dashboard-outline';
                    else if (route.name === 'Upload') iconName = 'plus-circle-outline';
                    else if (route.name === 'Ask') iconName = 'robot-happy-outline';
                    else if (route.name === 'Hospitals') iconName = 'map-marker-radius-outline'; // Changed
                    else if (route.name === 'Profile') iconName = 'account-circle-outline';

                    if (focused) {
                        iconName = iconName.replace('-outline', '') as any;
                    }

                    if (route.name === 'Ask') {
                        return (
                            <Surface style={[focused ? styles.askButtonFocused : styles.askButton, { backgroundColor: theme.colors.primary }]} elevation={4}>
                                <Icon name="robot" size={28} color={theme.colors.onPrimary} />
                            </Surface>
                        );
                    }

                    return (
                        <View style={styles.iconContainer}>
                            <Icon name={iconName} size={28} color={color} />
                            {focused && <View style={[styles.activeDot, { backgroundColor: theme.colors.primary }]} />}
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Upload" component={UploadScreen} />
            <Tab.Screen name="Ask" component={ChatScreen} />
            <Tab.Screen name="Hospitals" component={HospitalsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
};

const RootNavigator = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                ) : (
                    <Stack.Screen name="Main" component={MainTabs} />
                )}
                <Stack.Screen name="ReportMetadata" component={ReportMetadataScreen} options={{ headerShown: true, title: 'Report Analysis', headerTransparent: true }} />
                <Stack.Screen name="HospitalDetails" component={HospitalDetailsScreen} options={{ headerShown: true, title: 'Hospital Info', headerTransparent: true }} />
                <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} options={{ headerShown: true, title: 'Medical Report', headerTransparent: true }} />
                <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: true, title: 'Medical Records', headerTransparent: true }} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Edit Profile', headerTransparent: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    askButton: {
        bottom: 15,
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    askButtonFocused: {
        bottom: 0,
        width: 55,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginTop: 4,
    }
});

export default RootNavigator;
