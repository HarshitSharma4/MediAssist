import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
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

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const MainTabs = () => {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.outline,
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: keyof typeof Icon.glyphMap = 'circle';

                    if (route.name === 'Home') {
                        iconName = 'view-dashboard';
                    } else if (route.name === 'Upload') {
                        iconName = 'cloud-upload';
                    } else if (route.name === 'Ask') {
                        iconName = 'robot';
                    } else if (route.name === 'Hospitals') {
                        iconName = 'hospital-marker';
                    } else if (route.name === 'Profile') {
                        iconName = 'account';
                    }

                    if (route.name === 'Ask') {
                        return (
                            <View style={{
                                top: -20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: theme.colors.primary,
                                elevation: 5,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                            }}>
                                <Icon name="robot" size={30} color={theme.colors.onPrimary} />
                            </View>
                        )
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarLabel: ({ focused, color }) => {
                    if (route.name === 'Ask') return null;
                    return <Text style={{ color, fontSize: 10, fontWeight: focused ? 'bold' : 'normal' }}>{route.name}</Text>;
                }
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
                <Stack.Screen name="ReportMetadata" component={ReportMetadataScreen} options={{ headerShown: true, title: 'Report Details' }} />
                <Stack.Screen name="HospitalDetails" component={HospitalDetailsScreen} options={{ headerShown: true, title: 'Hospital Details' }} />
                <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} options={{ headerShown: true, title: 'View Report' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
